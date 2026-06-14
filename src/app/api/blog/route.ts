import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import type { BlogPost } from "@/types/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BLOG_FILE = path.join(process.cwd(), "src", "data", "blog-posts.json");
const ADMIN_KEY = process.env.BLOG_ADMIN_KEY || "ridho-blog-admin";

function isAuthorized(request: NextRequest) {
  return request.headers.get("x-admin-key") === ADMIN_KEY;
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
  try {
    const file = await fs.readFile(BLOG_FILE, "utf8");
    return JSON.parse(file) as BlogPost[];
  } catch {
    return [];
  }
}

async function writePosts(posts: BlogPost[]) {
  await fs.mkdir(path.dirname(BLOG_FILE), { recursive: true });
  await fs.writeFile(BLOG_FILE, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
}

export async function GET(request: NextRequest) {
  const posts = await readPosts();
  const isAdminRequest = request.nextUrl.searchParams.get("admin") === "1";

  if (isAdminRequest && !isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(isAdminRequest ? posts : posts.filter((post) => post.published));
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<BlogPost>;
  const post = cleanPost(body);

  if (!post.title || !post.excerpt) {
    return NextResponse.json({ message: "Title and excerpt are required" }, { status: 400 });
  }

  const posts = await readPosts();
  const nextPosts = [post, ...posts];
  await writePosts(nextPosts);

  return NextResponse.json(post, { status: 201 });
}

export async function PUT(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

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
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Post id is required" }, { status: 400 });
  }

  const posts = await readPosts();
  const nextPosts = posts.filter((post) => post.id !== id);
  await writePosts(nextPosts);

  return NextResponse.json({ ok: true });
}
