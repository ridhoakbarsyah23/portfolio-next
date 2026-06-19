"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge, Col, Container, Row, Spinner } from "react-bootstrap";
import { readJsonResponse } from "@/lib/readJsonResponse";
import type { BlogPost } from "@/types/blog";

interface Props {
  darkMode: boolean;
}

const fallbackPosts: BlogPost[] = [
  {
    id: "next-portfolio",
    title: "Cara Membuat Portofolio Website dengan Next.js",
    category: "Frontend",
    date: "20 Nov 2025",
    excerpt: "Catatan ringkas tentang struktur, komponen, dan detail UI saat membuat portofolio modern.",
    image: "/images-blog/blog-1.jpg",
    published: true,
  },
  {
    id: "coding-consistency",
    title: "Tips Menjaga Konsistensi Ngoding",
    category: "Workflow",
    date: "18 Nov 2025",
    excerpt: "Beberapa kebiasaan sederhana untuk menjaga progres belajar dan membangun project tetap jalan.",
    image: "/images-blog/blog-2.jpg",
    published: true,
  },
  {
    id: "ui-ux-developer",
    title: "Belajar UI/UX untuk Developer",
    category: "Design",
    date: "15 Nov 2025",
    excerpt: "Dasar-dasar visual dan pengalaman pengguna yang membantu developer membuat aplikasi lebih rapi.",
    image: "/images-blog/blog-3.jpg",
    published: true,
  },
];

export default function BlogSection({ darkMode }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadPosts = async () => {
      try {
        const response = await fetch("/api/blog", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load blog posts");
        }

        const data = await readJsonResponse<BlogPost[]>(response);

        if (mounted && data && data.length > 0) {
          setPosts(data);
        }
      } catch {
        setPosts(fallbackPosts);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadPosts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <motion.section
      id="blog"
      className={`py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <div className="text-center mb-5">
          <p className="text-primary fw-semibold text-uppercase small mb-2">Blog</p>
          <h2 className="fw-bold fs-2 mb-3">Writing Notes</h2>
          <p className={`mx-auto mb-0 ${darkMode ? "text-light opacity-75" : "text-muted"}`} style={{ maxWidth: 680 }}>
            Short notes about frontend development, workflow, and design lessons from building real projects.
          </p>
        </div>

        {loading ? (
          <div className="d-flex justify-content-center py-5">
            <Spinner animation="border" variant="primary" role="status" />
          </div>
        ) : (
          <Row className="g-4 justify-content-center">
            {posts.map((post, index) => (
              <Col key={post.id} md={6} lg={4} className="d-flex">
                <motion.article
                  className={`blog-card w-100 overflow-hidden ${darkMode ? "blog-card-dark" : "blog-card-light"}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="blog-image-wrapper position-relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt={post.title} className="blog-image" loading="lazy" />
                  </div>

                  <div className="p-4 d-flex flex-column flex-grow-1">
                    <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                      <Badge bg="primary" className="rounded-pill px-3 py-2">
                        {post.category}
                      </Badge>
                      <span className={`small ${darkMode ? "text-light opacity-75" : "text-muted"}`}>{post.date}</span>
                    </div>

                    <h3 className="h5 fw-bold mb-3">{post.title}</h3>
                    <p className={`small mb-0 ${darkMode ? "text-light opacity-75" : "text-muted"}`}>{post.excerpt}</p>
                  </div>
                </motion.article>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </motion.section>
  );
}
