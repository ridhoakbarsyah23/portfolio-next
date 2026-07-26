"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Container, Form, Spinner, Table, Tab, Tabs } from "react-bootstrap";
import { FaEdit, FaPlus, FaSave, FaTrash, FaArrowLeft, FaKey } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { readJsonResponse } from "@/lib/readJsonResponse";
import type { BlogPost } from "@/types/blog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const emptyPost: BlogPost = {
  id: "",
  title: "",
  category: "General",
  date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  excerpt: "",
  content: "",
  image: "/images-blog/blog-1.jpg",
  published: true,
};

const defaultCategories = ["General", "Frontend", "Workflow", "Design"];
const newCategoryValue = "__new_category__";

type ViewMode = "list" | "form";

export default function AdminBlogPage() {
  const [adminKey, setAdminKey] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(emptyPost);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  
  const [extraCategories, setExtraCategories] = useState<string[]>([]);
  const [categoryMode, setCategoryMode] = useState<"select" | "new">("select");
  const [newCategory, setNewCategory] = useState("");
  
  // New UI states
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeTab, setActiveTab] = useState<string>("write");

  const isEditing = useMemo(() => Boolean(form.id), [form.id]);
  const selectedCategory = categoryMode === "new" ? newCategory.trim() : form.category.trim();
  const titleIsValid = form.title.trim().length >= 5;
  const excerptIsValid = form.excerpt.trim().length >= 20;
  const contentIsValid = (form.content || "").trim().length >= 10;
  const categoryIsValid = selectedCategory.length > 0;
  const dateIsValid = form.date.trim().length > 0;
  const imageValue = form.image.trim();
  const imageUrlIsValid = !imageValue || imageValue.startsWith("/") || imageValue.startsWith("http://") || imageValue.startsWith("https://");
  const formIsValid = titleIsValid && excerptIsValid && contentIsValid && categoryIsValid && dateIsValid && imageUrlIsValid;
  
  const categories = useMemo(() => {
    const values = [...defaultCategories, ...posts.map((post) => post.category), ...extraCategories]
      .map((category) => category.trim())
      .filter(Boolean);

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [extraCategories, posts]);

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      "x-admin-key": adminKey,
    }),
    [adminKey],
  );

  const loadPosts = useCallback(async (key: string) => {
    if (!key) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/blog?admin=1", {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Admin key tidak valid atau data gagal dimuat.");
      }

      const data = await readJsonResponse<BlogPost[]>(response);
      setPosts(data || []);
      sessionStorage.setItem("blog-admin-key", key);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat blog.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedKey = sessionStorage.getItem("blog-admin-key") || "";
    setAdminKey(savedKey);

    if (savedKey) {
      loadPosts(savedKey);
    }
  }, [loadPosts]);

  const openForm = (post?: BlogPost) => {
    if (post) {
      setForm(post);
    } else {
      setForm({
        ...emptyPost,
        date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
      });
    }
    setCategoryMode("select");
    setNewCategory("");
    setActiveTab("write");
    setViewMode("form");
    setMessage("");
    setError("");
  };

  const closeForm = () => {
    setViewMode("list");
  };

  const addCategory = () => {
    const category = newCategory.trim();
    if (!category) {
      setError("Nama kategori tidak boleh kosong.");
      return;
    }
    setExtraCategories((currentCategories) => (currentCategories.includes(category) ? currentCategories : [...currentCategories, category]));
    setForm({ ...form, category });
    setCategoryMode("select");
    setNewCategory("");
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!adminKey) {
      setError("Masukkan admin key terlebih dahulu.");
      return;
    }

    if (!formIsValid) {
      setError("Lengkapi field wajib dan pastikan format data sudah benar.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (categoryMode === "new") {
        setExtraCategories((currentCategories) => (currentCategories.includes(selectedCategory) ? currentCategories : [...currentCategories, selectedCategory]));
      }

      const payload = {
        ...form,
        title: form.title.trim(),
        category: selectedCategory,
        date: form.date.trim(),
        excerpt: form.excerpt.trim(),
        image: form.image.trim() || "/images-blog/blog-1.jpg",
      };

      const response = await fetch("/api/blog", {
        method: isEditing ? "PUT" : "POST",
        headers,
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await readJsonResponse<{ message?: string }>(response);
        throw new Error(errorPayload?.message || "Gagal menyimpan blog.");
      }

      await loadPosts(adminKey);
      setMessage(isEditing ? "Blog berhasil diperbarui." : "Blog baru berhasil dibuat.");
      closeForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    const confirmed = window.confirm(`Hapus blog "${post.title}"?`);
    if (!confirmed) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/blog?id=${encodeURIComponent(post.id)}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus blog.");
      }

      await loadPosts(adminKey);
      setMessage("Blog berhasil dihapus.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus blog.");
    }
  };

  return (
    <main className="admin-blog-page bg-dark text-light min-vh-100 py-5">
      <Container>
        <div className="mb-4">
          <p className="text-info fw-semibold text-uppercase small mb-2">Dashboard</p>
          <h1 className="fw-bold mb-2">Manage Blog</h1>
          <p className="text-secondary mb-0">Tambah, edit, publish, atau hapus artikel yang tampil di section blog portfolio.</p>
        </div>

        {message && <Alert variant="success" className="bg-success text-white border-0 shadow-sm">{message}</Alert>}
        {error && <Alert variant="danger" className="bg-danger text-white border-0 shadow-sm">{error}</Alert>}

        {/* Authentication Panel (Always visible if no key or error loading) */}
        {!posts.length && !loading && (
          <section className="admin-panel bg-black bg-opacity-50 border border-secondary rounded-4 p-4 shadow-sm mb-4" style={{ maxWidth: 500 }}>
            <h2 className="h5 fw-bold mb-3 d-flex align-items-center gap-2"><FaKey /> Admin Access</h2>
            <Form onSubmit={(e) => { e.preventDefault(); loadPosts(adminKey); }}>
              <Form.Group className="mb-3">
                <Form.Label>Admin Key</Form.Label>
                <Form.Control
                  type="password"
                  className="bg-dark text-light border-secondary"
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Masukkan admin key"
                />
              </Form.Group>
              <Button type="submit" variant="info" className="w-100 rounded-pill fw-semibold" disabled={loading || !adminKey}>
                {loading ? <Spinner size="sm" /> : "Load Blog Data"}
              </Button>
            </Form>
          </section>
        )}

        <AnimatePresence mode="wait">
          {viewMode === "list" ? (
            <motion.div 
              key="list-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <section className="admin-panel bg-black bg-opacity-25 border border-secondary rounded-4 p-4 shadow-sm">
                <div className="d-flex align-items-center justify-content-between flex-wrap gap-3 mb-4">
                  <div className="d-flex align-items-center gap-3">
                    <h2 className="h5 fw-bold mb-0">Semua Artikel</h2>
                    <Badge bg="info" className="rounded-pill px-3 py-2 text-dark">
                      {posts.length} Posts
                    </Badge>
                  </div>
                  <Button variant="info" className="rounded-pill px-4 d-inline-flex align-items-center gap-2 fw-semibold" onClick={() => openForm()} disabled={!adminKey || posts.length === 0 && loading}>
                    <FaPlus /> Tulis Artikel Baru
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover variant="dark" className="align-middle mb-0" style={{ backgroundColor: 'transparent' }}>
                    <thead className="text-secondary">
                      <tr>
                        <th className="border-secondary fw-semibold">Title</th>
                        <th className="border-secondary fw-semibold">Category</th>
                        <th className="border-secondary fw-semibold">Status</th>
                        <th className="border-secondary text-end fw-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="border-secondary">
                            <div className="fw-semibold">{post.title}</div>
                            <div className="small text-secondary">{post.date}</div>
                          </td>
                          <td className="border-secondary text-info">{post.category}</td>
                          <td className="border-secondary">
                            <Badge bg={post.published ? "success" : "secondary"}>{post.published ? "Published" : "Draft"}</Badge>
                          </td>
                          <td className="border-secondary text-end">
                            <div className="d-inline-flex gap-2">
                              <Button size="sm" variant="outline-info" className="rounded-pill px-3" onClick={() => openForm(post)} aria-label={`Edit ${post.title}`}>
                                <FaEdit /> Edit
                              </Button>
                              <Button size="sm" variant="outline-danger" className="rounded-pill px-3" onClick={() => handleDelete(post)} aria-label={`Delete ${post.title}`}>
                                <FaTrash /> Hapus
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {posts.length === 0 && adminKey && !loading && (
                        <tr>
                          <td colSpan={4} className="text-center text-secondary py-5 border-secondary">
                            Belum ada artikel. Klik "Tulis Artikel Baru" untuk memulai.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="form-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <section className="admin-panel bg-black bg-opacity-50 border border-secondary rounded-4 p-4 shadow-lg">
                <div className="d-flex align-items-center justify-content-between mb-4 border-bottom border-secondary pb-3">
                  <h2 className="h4 fw-bold mb-0">{isEditing ? "Edit Artikel" : "Tulis Artikel Baru"}</h2>
                  <Button variant="outline-secondary" className="rounded-pill d-inline-flex align-items-center gap-2" onClick={closeForm}>
                    <FaArrowLeft /> Kembali
                  </Button>
                </div>

                <Form onSubmit={handleSubmit}>
                  <div className="row g-4 mb-4">
                    <div className="col-lg-8">
                      <Form.Group className="mb-3">
                        <Form.Label className="text-info fw-semibold">Title <span className="text-danger">*</span></Form.Label>
                        <Form.Control 
                          className="bg-dark text-light border-secondary fs-5 py-2"
                          value={form.title} 
                          onChange={(e) => setForm({ ...form, title: e.target.value })} 
                          required minLength={5} 
                          isInvalid={Boolean(form.title) && !titleIsValid} 
                          placeholder="Judul artikel yang menarik..."
                        />
                        <Form.Control.Feedback type="invalid">Minimal 5 karakter.</Form.Control.Feedback>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-info fw-semibold">Excerpt <span className="text-danger">*</span></Form.Label>
                        <Form.Control
                          as="textarea"
                          className="bg-dark text-light border-secondary"
                          rows={2}
                          value={form.excerpt}
                          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                          required
                          minLength={20}
                          isInvalid={Boolean(form.excerpt) && !excerptIsValid}
                          placeholder="Ringkasan singkat artikel..."
                        />
                        <Form.Control.Feedback type="invalid">Minimal 20 karakter.</Form.Control.Feedback>
                      </Form.Group>
                    </div>

                    <div className="col-lg-4">
                      <Form.Group className="mb-3">
                        <Form.Label className="text-info fw-semibold">Category <span className="text-danger">*</span></Form.Label>
                        <Form.Select
                          className="bg-dark text-light border-secondary"
                          value={categoryMode === "new" ? newCategoryValue : form.category}
                          onChange={(e) => {
                            if (e.target.value === newCategoryValue) {
                              setCategoryMode("new");
                              setNewCategory("");
                              return;
                            }
                            setCategoryMode("select");
                            setForm({ ...form, category: e.target.value });
                          }}
                          required
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                          <option value={newCategoryValue}>+ Add new category</option>
                        </Form.Select>
                        {categoryMode === "new" && (
                          <div className="d-flex gap-2 mt-2">
                            <Form.Control className="bg-dark text-light border-secondary" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Nama kategori baru" />
                            <Button type="button" variant="outline-info" onClick={addCategory}>Add</Button>
                          </div>
                        )}
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-info fw-semibold">Date <span className="text-danger">*</span></Form.Label>
                        <Form.Control className="bg-dark text-light border-secondary" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label className="text-info fw-semibold">Cover Image URL</Form.Label>
                        <Form.Control className="bg-dark text-light border-secondary" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="/images-blog/blog-1.jpg" isInvalid={!imageUrlIsValid} />
                        <Form.Control.Feedback type="invalid">Gunakan path lokal /... atau URL http(s).</Form.Control.Feedback>
                      </Form.Group>

                      <div className="p-3 bg-dark border border-secondary rounded-3 mt-4">
                        <Form.Check
                          type="switch"
                          id="published-switch"
                          label={<span className="fw-semibold ms-2">{form.published ? "Status: Published" : "Status: Draft"}</span>}
                          checked={form.published}
                          onChange={(e) => setForm({ ...form, published: e.target.checked })}
                          className="mb-0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <Tabs
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k || "write")}
                      className="mb-3 admin-tabs"
                    >
                      <Tab eventKey="write" title="Write (Markdown)">
                        <Form.Control
                          as="textarea"
                          className="bg-dark text-light border-secondary p-4 rounded-3"
                          rows={15}
                          value={form.content || ""}
                          onChange={(e) => setForm({ ...form, content: e.target.value })}
                          required
                          minLength={10}
                          isInvalid={Boolean(form.content) && !contentIsValid}
                          style={{ fontFamily: "'Fira Code', monospace", fontSize: "15px", lineHeight: 1.6 }}
                          placeholder="# Tulis artikel Anda di sini..."
                        />
                      </Tab>
                      <Tab eventKey="preview" title="Preview">
                        <div className="bg-dark border border-secondary p-4 rounded-3 markdown-preview markdown-content" style={{ minHeight: "350px" }}>
                          {form.content ? (
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {form.content}
                            </ReactMarkdown>
                          ) : (
                            <div className="text-secondary text-center py-5">Preview kosong. Mulai menulis di tab "Write".</div>
                          )}
                        </div>
                      </Tab>
                    </Tabs>
                  </div>

                  <div className="d-flex gap-3 justify-content-end pt-3 border-top border-secondary">
                    <Button type="button" variant="outline-secondary" className="rounded-pill px-4 fw-semibold" onClick={closeForm}>
                      Batal
                    </Button>
                    <Button type="submit" variant="info" className="rounded-pill px-5 d-inline-flex align-items-center gap-2 fw-bold text-dark" disabled={saving || !formIsValid}>
                      {isEditing ? <FaSave /> : <FaPlus />}
                      {saving ? "Menyimpan..." : isEditing ? "Simpan Perubahan" : "Terbitkan Artikel"}
                    </Button>
                  </div>
                </Form>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
      
      {/* Styles for Tabs and Preview Mode */}
      <style>{`
        .admin-tabs .nav-link {
          color: #6c757d;
          border: none;
          border-bottom: 2px solid transparent;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
        }
        .admin-tabs .nav-link:hover {
          color: #0dcaf0;
        }
        .admin-tabs .nav-link.active {
          color: #0dcaf0;
          background-color: transparent;
          border-color: #0dcaf0;
        }
        /* Resets for preview markdown similar to blog detail */
        .markdown-preview h1, .markdown-preview h2 { font-weight: 700; margin-top: 1.5rem; margin-bottom: 1rem; }
        .markdown-preview p { margin-bottom: 1rem; }
        .markdown-preview pre { background: #1a1d20; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; overflow-x: auto;}
        .markdown-preview code { color: #ff79c6; }
        .markdown-preview blockquote { border-left: 4px solid #0dcaf0; padding-left: 1rem; color: #adb5bd; }
        .markdown-preview img { max-width: 100%; border-radius: 8px; }
      `}</style>
    </main>
  );
}
