import { promises as fs } from "fs";
import path from "path";
import type { BlogPost } from "@/types/blog";

const BLOG_FILE_PATH = "src/data/blog-posts.json";
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

export class BlogStorageError extends Error {
  constructor(message: string, readonly status = 500) {
    super(message);
  }
}

export function toBlogStorageMessage(message: string, status: number) {
  if (status === 403 && message.toLowerCase().includes("resource not accessible by personal access token")) {
    return [
      "Token GitHub tidak punya izin menulis ke repository.",
      "Buat/ganti BLOG_GITHUB_TOKEN dengan akses repository yang benar dan permission Contents: Read and write.",
      "Jika memakai classic token, gunakan scope repo.",
    ].join(" ");
  }

  return message;
}

export function shouldUseGithubStorage() {
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

export async function readGithubFile() {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${BLOG_FILE_PATH}?ref=${encodeURIComponent(GITHUB_BRANCH)}`, {
    headers: githubHeaders(),
    cache: "no-store",
  });

  if (response.status === 404) {
    return { posts: [] as BlogPost[], sha: undefined };
  }

  const payload = (await response.json()) as GitHubContentResponse;

  if (!response.ok) {
    throw new BlogStorageError(toBlogStorageMessage(payload.message || "Gagal membaca data blog dari GitHub.", response.status), response.status);
  }

  const content = payload.content ? Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8") : "[]";

  return {
    posts: JSON.parse(content) as BlogPost[],
    sha: payload.sha,
  };
}

export async function writeGithubFile(posts: BlogPost[]) {
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
    throw new BlogStorageError(toBlogStorageMessage(payload.message || "Gagal menyimpan data blog ke GitHub.", response.status), response.status);
  }
}

export async function readPosts(): Promise<BlogPost[]> {
  if (shouldUseGithubStorage()) {
    const file = await readGithubFile();
    return file.posts;
  }

  try {
    const BLOG_FILE = path.join(process.cwd(), BLOG_FILE_PATH);
    const file = await fs.readFile(BLOG_FILE, "utf8");
    return JSON.parse(file) as BlogPost[];
  } catch {
    // Fallback to static bundle if fs fails (Vercel Serverless without Github)
    try {
      const postsData = await import("@/data/blog-posts.json");
      const posts: BlogPost[] = Array.isArray(postsData.default || postsData) ? (postsData.default || postsData) : [];
      return posts;
    } catch {
      return [];
    }
  }
}

export async function writePosts(posts: BlogPost[]) {
  if (shouldUseGithubStorage()) {
    await writeGithubFile(posts);
    return;
  }

  if (process.env.VERCEL) {
    throw new BlogStorageError("Storage blog production belum dikonfigurasi. Tambahkan BLOG_GITHUB_TOKEN, BLOG_GITHUB_REPO, dan BLOG_GITHUB_BRANCH di Environment Variables Vercel.", 500);
  }

  const BLOG_FILE = path.join(process.cwd(), BLOG_FILE_PATH);
  await fs.mkdir(path.dirname(BLOG_FILE), { recursive: true });
  await fs.writeFile(BLOG_FILE, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
}
