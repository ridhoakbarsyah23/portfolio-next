import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { BlogPost } from "@/types/blog";
import Image from "next/image";
import { readPosts } from "@/lib/blogStorage";
import { absoluteUrl, siteConfig } from "@/lib/seo";

// Using the route directly to fetch data
async function getPost(id: string): Promise<BlogPost | null> {
  try {
    const posts = await readPosts();
    return posts.find((p) => p.id === id && p.published) || null;
  } catch (error) {
    console.error("Error reading blog post:", error);
    return null;
  }
}

interface BlogDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  if (!post) {
    return {
      title: "Blog Not Found - Ridho Akbarsyah",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.id}`),
    },
    keywords: [post.title, post.category, "Ridho Akbarsyah blog", "frontend development", "portfolio blog"],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: absoluteUrl(`/blog/${post.id}`),
      siteName: siteConfig.name,
      images: post.image ? [{ url: post.image }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const resolvedParams = await params;
  const post = await getPost(resolvedParams.id);

  if (!post) {
    notFound();
  }

  // Assuming global layout provides Bootstrap and basic styles.
  return (
    <div className="bg-dark text-light min-vh-100 py-5">
      <Container className="py-4" style={{ maxWidth: 800 }}>
        <Link href="/#blog" className="text-decoration-none mb-4 d-inline-flex align-items-center gap-2 text-info fw-semibold">
          <FaArrowLeft /> Back to Portfolio
        </Link>
        
        <article className="bg-black bg-opacity-50 rounded-4 shadow-sm p-4 p-md-5 mt-3 border border-secondary">
          <div className="mb-4">
            <Badge bg="primary" className="rounded-pill px-3 py-2 mb-3">
              {post.category}
            </Badge>
            <h1 className="fw-bold fs-1 mb-3">{post.title}</h1>
            <div className="text-muted small">
              Published on {post.date}
            </div>
          </div>

          {post.image && (
            <div className="position-relative w-100 rounded-4 overflow-hidden mb-5" style={{ height: 400 }}>
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                sizes="(max-width: 768px) 100vw, 800px"
                style={{ objectFit: "cover" }} 
              />
            </div>
          )}

          <div className="markdown-content lh-lg" style={{ fontSize: "1.1rem" }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content || post.excerpt || "*No content available.*"}
            </ReactMarkdown>
          </div>
        </article>
      </Container>

      {/* Global CSS for markdown specific elements */}
      <style>{`
        .markdown-content h1, .markdown-content h2, .markdown-content h3 {
          margin-top: 2rem;
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .markdown-content p {
          margin-bottom: 1.5rem;
        }
        .markdown-content img {
          max-width: 100%;
          border-radius: 8px;
          margin: 2rem 0;
        }
        .markdown-content pre {
          background-color: #212529;
          padding: 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .markdown-content code {
          background-color: #212529;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          font-family: monospace;
          color: #ff79c6;
        }
        .markdown-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }
        .markdown-content blockquote {
          border-left: 4px solid #0d6efd;
          padding-left: 1rem;
          color: #adb5bd;
          font-style: italic;
          margin-bottom: 1.5rem;
        }
        .markdown-content table {
          width: 100%;
          margin-bottom: 1.5rem;
          border-collapse: collapse;
        }
        .markdown-content th, .markdown-content td {
          padding: 0.75rem;
          border: 1px solid #495057;
        }
        .markdown-content th {
          background-color: #212529;
        }
      `}</style>
    </div>
  );
}
