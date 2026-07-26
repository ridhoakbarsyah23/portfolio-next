import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import type { BlogPost } from "@/types/blog";
import { readPosts, writePosts, BlogStorageError } from "@/lib/blogStorage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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
    content: String(post.content || fallback?.content || "").trim(),
    image: String(post.image || fallback?.image || "/images-blog/blog-1.jpg").trim(),
    published: typeof post.published === "boolean" ? post.published : fallback?.published ?? true,
  };
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

    const posts = await readPosts();
    posts.unshift(post);
    await writePosts(posts);

    return NextResponse.json({ message: "Blog berhasil ditambahkan", data: post }, { status: 201 });
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

    if (!body.id) {
      return NextResponse.json({ message: "ID blog diperlukan" }, { status: 400 });
    }

    const posts = await readPosts();
    const index = posts.findIndex((p) => p.id === body.id);

    if (index === -1) {
      return NextResponse.json({ message: "Blog tidak ditemukan" }, { status: 404 });
    }

    const updatedPost = cleanPost(body, posts[index]);
    posts[index] = updatedPost;
    await writePosts(posts);

    return NextResponse.json({ message: "Blog berhasil diperbarui", data: updatedPost });
  } catch (error) {
    return handleBlogError(error);
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ message: "ID blog diperlukan" }, { status: 400 });
    }

    const posts = await readPosts();
    const index = posts.findIndex((p) => p.id === id);

    if (index === -1) {
      return NextResponse.json({ message: "Blog tidak ditemukan" }, { status: 404 });
    }

    posts.splice(index, 1);
    await writePosts(posts);

    return NextResponse.json({ message: "Blog berhasil dihapus" });
  } catch (error) {
    return handleBlogError(error);
  }
}
