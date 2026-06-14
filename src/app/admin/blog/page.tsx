"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Alert, Badge, Button, Col, Container, Form, Row, Spinner, Table } from "react-bootstrap";
import { FaEdit, FaPlus, FaSave, FaTrash } from "react-icons/fa";
import type { BlogPost } from "@/types/blog";

const emptyPost: BlogPost = {
  id: "",
  title: "",
  category: "General",
  date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  excerpt: "",
  image: "/images-blog/blog-1.jpg",
  published: true,
};

const defaultCategories = ["General", "Frontend", "Workflow", "Design"];
const newCategoryValue = "__new_category__";

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

  const isEditing = useMemo(() => Boolean(form.id), [form.id]);
  const titleIsValid = form.title.trim().length >= 5;
  const excerptIsValid = form.excerpt.trim().length >= 20;
  const categoryIsValid = form.category.trim().length > 0;
  const dateIsValid = form.date.trim().length > 0;
  const imageValue = form.image.trim();
  const imageUrlIsValid = !imageValue || imageValue.startsWith("/") || imageValue.startsWith("http://") || imageValue.startsWith("https://");
  const formIsValid = titleIsValid && excerptIsValid && categoryIsValid && dateIsValid && imageUrlIsValid && categoryMode === "select";
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
    if (!key) {
      return;
    }

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

      const data = (await response.json()) as BlogPost[];
      setPosts(data);
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

  const resetForm = () => {
    setForm({
      ...emptyPost,
      date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
    });
    setCategoryMode("select");
    setNewCategory("");
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
      const payload = {
        ...form,
        title: form.title.trim(),
        category: form.category.trim(),
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
        const payload = (await response.json()) as { message?: string };
        throw new Error(payload.message || "Gagal menyimpan blog.");
      }

      await loadPosts(adminKey);
      resetForm();
      setMessage(isEditing ? "Blog berhasil diperbarui." : "Blog baru berhasil dibuat.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (post: BlogPost) => {
    const confirmed = window.confirm(`Hapus blog "${post.title}"?`);

    if (!confirmed) {
      return;
    }

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
    <main className="admin-blog-page bg-light min-vh-100 py-5">
      <Container>
        <div className="mb-4">
          <p className="text-primary fw-semibold text-uppercase small mb-2">Dashboard</p>
          <h1 className="fw-bold mb-2">Manage Blog</h1>
          <p className="text-muted mb-0">Tambah, edit, publish, atau hapus artikel yang tampil di section blog portfolio.</p>
        </div>

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}

        <Row className="g-4">
          <Col lg={4}>
            <section className="admin-panel bg-white border rounded-4 p-4 shadow-sm">
              <h2 className="h5 fw-bold mb-3">Admin Access</h2>
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  loadPosts(adminKey);
                }}
              >
                <Form.Group className="mb-3">
                  <Form.Label>Admin Key</Form.Label>
                  <Form.Control
                    type="password"
                    value={adminKey}
                    onChange={(event) => setAdminKey(event.target.value)}
                    placeholder="Masukkan admin key"
                  />
                </Form.Group>
                <Button type="submit" className="w-100 rounded-pill" disabled={loading || !adminKey}>
                  {loading ? <Spinner size="sm" /> : "Load Blog Data"}
                </Button>
              </Form>
            </section>

            <section className="admin-panel bg-white border rounded-4 p-4 shadow-sm mt-4">
              <h2 className="h5 fw-bold mb-3">{isEditing ? "Edit Blog" : "Create Blog"}</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Title <span className="text-danger">*</span></Form.Label>
                  <Form.Control value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required minLength={5} isInvalid={Boolean(form.title) && !titleIsValid} />
                  <Form.Control.Feedback type="invalid">Minimal 5 karakter.</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    value={categoryMode === "new" ? newCategoryValue : form.category}
                    onChange={(event) => {
                      if (event.target.value === newCategoryValue) {
                        setCategoryMode("new");
                        setNewCategory("");
                        return;
                      }

                      setCategoryMode("select");
                      setForm({ ...form, category: event.target.value });
                    }}
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                    <option value={newCategoryValue}>+ Add new category</option>
                  </Form.Select>
                  {categoryMode === "new" && (
                    <div className="d-flex gap-2 mt-2">
                      <Form.Control value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Nama kategori baru" />
                      <Button type="button" variant="outline-primary" className="rounded-pill px-3" onClick={addCategory}>
                        Add
                      </Button>
                    </div>
                  )}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date <span className="text-danger">*</span></Form.Label>
                  <Form.Control value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} required />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Image Path / URL</Form.Label>
                  <Form.Control value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="https://example.com/image.jpg" isInvalid={!imageUrlIsValid} />
                  <Form.Text>Kosongkan untuk gambar default. Bisa pakai /images-blog/blog-1.jpg atau URL https://...</Form.Text>
                  <Form.Control.Feedback type="invalid">Gunakan path lokal diawali / atau URL http(s).</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Excerpt <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={form.excerpt}
                    onChange={(event) => setForm({ ...form, excerpt: event.target.value })}
                    required
                    minLength={20}
                    isInvalid={Boolean(form.excerpt) && !excerptIsValid}
                  />
                  <Form.Control.Feedback type="invalid">Minimal 20 karakter.</Form.Control.Feedback>
                </Form.Group>

                <Form.Check
                  className="mb-4"
                  type="switch"
                  id="published-switch"
                  label="Published"
                  checked={form.published}
                  onChange={(event) => setForm({ ...form, published: event.target.checked })}
                />

                <div className="d-flex gap-2">
                  <Button type="submit" className="rounded-pill d-inline-flex align-items-center gap-2" disabled={saving || !formIsValid}>
                    {isEditing ? <FaSave /> : <FaPlus />}
                    {saving ? "Saving..." : isEditing ? "Update" : "Create"}
                  </Button>
                  {isEditing && (
                    <Button type="button" variant="outline-secondary" className="rounded-pill" onClick={resetForm}>
                      Cancel
                    </Button>
                  )}
                </div>
              </Form>
            </section>
          </Col>

          <Col lg={8}>
            <section className="admin-panel bg-white border rounded-4 p-4 shadow-sm">
              <div className="d-flex align-items-center justify-content-between gap-3 mb-3">
                <h2 className="h5 fw-bold mb-0">Blog Posts</h2>
                <Badge bg="primary" className="rounded-pill px-3 py-2">
                  {posts.length} Posts
                </Badge>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post.id}>
                        <td>
                          <div className="fw-semibold">{post.title}</div>
                          <div className="small text-muted">{post.date}</div>
                        </td>
                        <td>{post.category}</td>
                        <td>
                          <Badge bg={post.published ? "success" : "secondary"}>{post.published ? "Published" : "Draft"}</Badge>
                        </td>
                        <td className="text-end">
                          <div className="d-inline-flex gap-2">
                            <Button
                              size="sm"
                              variant="outline-primary"
                              className="rounded-pill"
                              onClick={() => {
                                setForm(post);
                                setCategoryMode("select");
                                setNewCategory("");
                              }}
                              aria-label={`Edit ${post.title}`}
                            >
                              <FaEdit />
                            </Button>
                            <Button size="sm" variant="outline-danger" className="rounded-pill" onClick={() => handleDelete(post)} aria-label={`Delete ${post.title}`}>
                              <FaTrash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {posts.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center text-muted py-5">
                          Belum ada data blog. Masukkan admin key lalu load data.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </div>
            </section>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
