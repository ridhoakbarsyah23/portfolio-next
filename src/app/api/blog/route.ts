import { NextRequest, NextResponse } from "next/server";
import type { BlogPost } from "@/types/blog";
import { readPosts, writePosts, BlogStorageError } from "@/lib/blogStorage";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_BLOG_IMAGE = "/images-blog/blog-1.jpg";

function getAdminKey() {
  const adminKey = process.env.BLOG_ADMIN_KEY?.trim();

  if (!adminKey) {
    throw new BlogStorageError("BLOG_ADMIN_KEY belum dikonfigurasi. Tambahkan key ini di .env.local atau Environment Variables production.", 500);
  }

  return adminKey;
}

function isAuthorized(request: NextRequest) {
  return request.headers.get("x-admin-key") === getAdminKey();
}

function createSlug(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function createUniquePostId(title: string, posts: BlogPost[]) {
  const baseSlug = createSlug(title) || "blog-post";
  let candidate = baseSlug;
  let suffix = 2;

  while (posts.some((post) => post.id === candidate)) {
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}

function isValidImageUrl(value: string) {
  return value.startsWith("/") || value.startsWith("http://") || value.startsWith("https://");
}

function cleanPost(post: Partial<BlogPost>, fallback?: BlogPost, id?: string): BlogPost {
  return {
    id: fallback?.id || id || String(post.id || "").trim(),
    title: String(post.title || fallback?.title || "").trim(),
    category: String(post.category || fallback?.category || "General").trim(),
    date: String(post.date || fallback?.date || new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })).trim(),
    excerpt: String(post.excerpt || fallback?.excerpt || "").trim(),
    content: String(post.content || fallback?.content || "").trim(),
    image: String(post.image || fallback?.image || DEFAULT_BLOG_IMAGE).trim(),
    published: typeof post.published === "boolean" ? post.published : fallback?.published ?? true,
  };
}

function validatePost(post: BlogPost, options: { requireContent: boolean }) {
  const content = post.content || "";

  if (post.title.length < 5) {
    throw new BlogStorageError("Judul blog minimal 5 karakter.", 400);
  }

  if (!post.category) {
    throw new BlogStorageError("Kategori blog diperlukan.", 400);
  }

  if (!post.date) {
    throw new BlogStorageError("Tanggal blog diperlukan.", 400);
  }

  if (post.excerpt.length < 20) {
    throw new BlogStorageError("Excerpt blog minimal 20 karakter.", 400);
  }

  if (options.requireContent && content.length < 10) {
    throw new BlogStorageError("Konten blog minimal 10 karakter.", 400);
  }

  if (!isValidImageUrl(post.image)) {
    throw new BlogStorageError("Cover image harus memakai path lokal /... atau URL http(s).", 400);
  }
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
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as Partial<BlogPost>;
    const posts = await readPosts();
    const post = cleanPost(body, undefined, createUniquePostId(String(body.title || ""), posts));

    validatePost(post, { requireContent: true });

    posts.unshift(post);
    await writePosts(posts);

    return NextResponse.json({ message: "Blog berhasil ditambahkan", data: post }, { status: 201 });
  } catch (error) {
    return handleBlogError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
    validatePost(updatedPost, { requireContent: Boolean(updatedPost.content) });

    posts[index] = updatedPost;
    await writePosts(posts);

    return NextResponse.json({ message: "Blog berhasil diperbarui", data: updatedPost });
  } catch (error) {
    return handleBlogError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

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
