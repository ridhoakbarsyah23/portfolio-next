import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import type { BlogPost } from "@/types/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOG_FILE_PATH = "src/data/blog-posts.json";
const BLOG_FILE = path.join(process.cwd(), BLOG_FILE_PATH);
const ADMIN_KEY = process.env.BLOG_ADMIN_KEY || "ridho-blog-admin";
const GITHUB_TOKEN = process.env.BLOG_GITHUB_TOKEN;
const GITHUB_REPO =
  process.env.BLOG_GITHUB_REPO ||
  (process.env.VERCEL_GIT_REPO_OWNER && process.env.VERCEL_GIT_REPO_SLUG
    ? `${process.env.VERCEL_GIT_REPO_OWNER}/${process.env.VERCEL_GIT_REPO_SLUG}`
    : "");
const GITHUB_BRANCH = process.env.BLOG_GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || "dev";
const GITHUB_API_VERSION = "2022-11-28";

interface GitHubContentResponse {
  content?: string;
  encoding?: string;
  sha?: string;
  message?: string;
}

class BlogStorageError extends Error {
  constructor(message: string, readonly status = 500) {
    super(message);
  }
}

function isAuthorized(request: NextRequest) {
  return request.headers.get("x-admin-key") === ADMIN_KEY;
}

function shouldUseGithubStorage() {
  return Boolean(GITHUB_TOKEN && GITHUB_REPO);
}

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
}

async function readGithubFile() {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_FILE_PATH}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (response.status === 404) {
    return { posts: [] as BlogPost[], sha: undefined };
  }

  const payload = (await response.json()) as GitHubContentResponse;

  if (!response.ok) {
    throw new BlogStorageError(payload.message || "Gagal membaca data blog dari GitHub.", response.status);
  }

  const content = payload.content ? Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8") : "[]";

  return {
    posts: JSON.parse(content) as BlogPost[],
    sha: payload.sha,
  };
}

async function writeGithubFile(posts: BlogPost[]) {
  const currentFile = await readGithubFile();
  const content = Buffer.from(`${JSON.stringify(posts, null, 2)}\n`, "utf8").toString("base64");
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_FILE_PATH}`, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message: "Update blog posts",
      content,
      branch: GITHUB_BRANCH,
      sha: currentFile.sha,
    }),
  });

  const payload = (await response.json()) as GitHubContentResponse;

  if (!response.ok) {
    throw new BlogStorageError(payload.message || "Gagal menyimpan data blog ke GitHub.", response.status);
  }
}

function cleanPost(post: Partial<BlogPost>, fallback?: BlogPost): BlogPost {
  return {
    id: fallback?.id || post.id || randomUUID(),
    title: String(post.title || fallback?.title || "").trim(),
    category: String(post.category || fallback?.category || "General").trim(),
    date: String(post.date || fallback?.date || new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })).trim(),
    excerpt: String(post.excerpt || fallback?.excerpt || "").trim(),
    image: String(post.image || fallback?.image || "/images-blog/blog-1.jpg").trim(),
    published: typeof post.published === "boolean" ? post.published : fallback?.published ?? true,
  };
}

async function readPosts(): Promise<BlogPost[]> {
  if (shouldUseGithubStorage()) {
    const file = await readGithubFile();
    return file.posts;
  }

  try {
    const file = await fs.readFile(BLOG_FILE, "utf8");
    return JSON.parse(file) as BlogPost[];
  } catch {
    return [];
  }
}

async function writePosts(posts: BlogPost[]) {
  if (shouldUseGithubStorage()) {
    await writeGithubFile(posts);
    return;
  }

  if (process.env.VERCEL) {
    throw new BlogStorageError("Storage blog production belum dikonfigurasi. Tambahkan BLOG_GITHUB_TOKEN, BLOG_GITHUB_REPO, dan BLOG_GITHUB_BRANCH di Environment Variables Vercel.", 500);
  }

  await fs.mkdir(path.dirname(BLOG_FILE), { recursive: true });
  await fs.writeFile(BLOG_FILE, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
}

function handleBlogError(error: unknown) {
  if (error instanceof BlogStorageError) {
    return NextResponse.json({ message: error.message }, { status: error.status });
  }

  return NextResponse.json({ message: error instanceof Error ? error.message : "Terjadi kesalahan pada server blog." }, { status: 500 });
}

export async function GET(request: NextRequest) {
  try {
    const posts = await readPosts();
    const isAdminRequest = request.nextUrl.searchParams.get("admin") === "1";

    if (isAdminRequest && !isAuthorized(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json(isAdminRequest ? posts : posts.filter((post) => post.published));
  } catch (error) {
    return handleBlogError(error);
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<BlogPost>;
    const post = cleanPost(body);

    if (!post.title || !post.excerpt) {
      return NextResponse.json({ message: "Title and excerpt are required" }, { status: 400 });
    }

    const posts = await readPosts();
    const nextPosts = [post, ...posts];
    await writePosts(nextPosts);

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return handleBlogError(error);
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Partial<BlogPost>;
    const posts = await readPosts();
    const currentPost = posts.find((post) => post.id === body.id);

    if (!currentPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const updatedPost = cleanPost(body, currentPost);
    const nextPosts = posts.map((post) => (post.id === updatedPost.id ? updatedPost : post));
    await writePosts(nextPosts);

    return NextResponse.json(updatedPost);
  } catch (error) {
    return handleBlogError(error);
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "Post id is required" }, { status: 400 });
    }

    const posts = await readPosts();
    const nextPosts = posts.filter((post) => post.id !== id);
    await writePosts(nextPosts);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return handleBlogError(error);
  }
}
