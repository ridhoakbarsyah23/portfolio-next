"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Fira_Sans, Fira_Code } from "next/font/google";
import Link from "next/link";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
import { Alert, Badge, Button, Form, Spinner, Tab, Tabs, Modal } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaEdit,
  FaFileAlt,
  FaKey,
  FaPlus,
  FaRegClock,
  FaSave,
  FaSignOutAlt,
  FaTrash,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { readJsonResponse } from "@/lib/readJsonResponse";
import type { BlogPost } from "@/types/blog";
import styles from "./page.module.css";

const createEmptyPost = (): BlogPost => ({
  id: "",
  title: "",
  category: "General",
  date: new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }),
  excerpt: "",
  content: "",
  image: "/images-blog/blog-1.jpg",
  published: true,
});

const defaultCategories = ["General", "Frontend", "Workflow", "Design"];
const newCategoryValue = "__new_category__";

type ViewMode = "list" | "form";

export default function AdminBlogPage() {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [form, setForm] = useState<BlogPost>(createEmptyPost);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [extraCategories, setExtraCategories] = useState<string[]>([]);
  const [categoryMode, setCategoryMode] = useState<"select" | "new">("select");
  const [newCategory, setNewCategory] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [activeTab, setActiveTab] = useState<string>("write");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const isEditing = Boolean(form.id);
  const selectedCategory = categoryMode === "new" ? newCategory.trim() : form.category.trim();
  const titleIsValid = form.title.trim().length >= 5;
  const excerptIsValid = form.excerpt.trim().length >= 20;
  const contentIsValid = (form.content || "").trim().length >= 10;
  const categoryIsValid = selectedCategory.length > 0;
  const dateIsValid = form.date.trim().length > 0;
  const imageValue = form.image.trim();
  const imageUrlIsValid = !imageValue || imageValue.startsWith("/") || imageValue.startsWith("http://") || imageValue.startsWith("https://");
  const formIsValid = titleIsValid && excerptIsValid && contentIsValid && categoryIsValid && dateIsValid && imageUrlIsValid;

  const publishedCount = useMemo(() => posts.filter((post) => post.published).length, [posts]);
  const draftCount = posts.length - publishedCount;

  const invalidFields = useMemo(
    () => [
      !titleIsValid && { id: "post-title", label: "Judul minimal 5 karakter" },
      !excerptIsValid && { id: "post-excerpt", label: "Ringkasan minimal 20 karakter" },
      !categoryIsValid && { id: "post-category", label: "Kategori wajib diisi" },
      !dateIsValid && { id: "post-date", label: "Tanggal wajib diisi" },
      !imageUrlIsValid && { id: "post-image", label: "Format URL gambar tidak valid" },
      !contentIsValid && { id: "post-content", label: "Konten minimal 10 karakter" },
    ].filter((field): field is { id: string; label: string } => Boolean(field)),
    [categoryIsValid, contentIsValid, dateIsValid, excerptIsValid, imageUrlIsValid, titleIsValid],
  );

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
      setAuthenticated(true);
      sessionStorage.setItem("blog-admin-key", key);
    } catch (err) {
      setAuthenticated(false);
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

  useEffect(() => {
    if (error) {
      errorRef.current?.focus();
    }
  }, [error]);

  const openForm = (post?: BlogPost) => {
    setForm(post ? { ...post } : createEmptyPost());
    setCategoryMode("select");
    setNewCategory("");
    setActiveTab("write");
    setViewMode("form");
    setShowValidation(false);
    setMessage("");
    setError("");
  };

  const closeForm = () => {
    setViewMode("list");
    setShowValidation(false);
    setError("");
  };

  const handleSignOutClick = () => setShowLogoutModal(true);

  const confirmSignOut = () => {
    sessionStorage.removeItem("blog-admin-key");
    setAdminKey("");
    setAuthenticated(false);
    setPosts([]);
    setViewMode("list");
    setMessage("");
    setError("");
    setShowLogoutModal(false);
  };

  const addCategory = () => {
    const category = newCategory.trim();
    if (!category) {
      setError("Nama kategori tidak boleh kosong.");
      return;
    }
    setExtraCategories((current) => (current.includes(category) ? current : [...current, category]));
    setForm((current) => ({ ...current, category }));
    setCategoryMode("select");
    setNewCategory("");
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowValidation(true);

    if (!adminKey) {
      setError("Masukkan admin key terlebih dahulu.");
      return;
    }

    if (!formIsValid) {
      setError("Periksa kembali field yang ditandai sebelum menyimpan artikel.");
      return;
    }

    setSaving(true);
    setError("");
    setMessage("");

    try {
      if (categoryMode === "new") {
        setExtraCategories((current) => (current.includes(selectedCategory) ? current : [...current, selectedCategory]));
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
      setMessage(isEditing ? "Artikel berhasil diperbarui." : "Artikel baru berhasil dibuat.");
      setViewMode("list");
      setShowValidation(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyimpan blog.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    setError("");
    setMessage("");

    try {
      const response = await fetch(`/api/blog?id=${encodeURIComponent(postToDelete.id)}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus artikel.");
      }

      await loadPosts(adminKey);
      setMessage("Artikel berhasil dihapus.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menghapus artikel.");
    } finally {
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

  const motionProps = reduceMotion
    ? { initial: false as const }
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.2 } };

  return (
    <main className={`${styles.page} ${firaSans.className}`}>
      <header className={styles.topbar}>
        <div className={styles.shell}>
          <Link href="/" className={styles.brand} aria-label="Kembali ke portfolio">
            Ridho<span>.</span>
          </Link>

          <div className={styles.topbarActions}>
            {authenticated && (
              <span className={styles.sessionStatus}>
                <FaCheckCircle aria-hidden="true" /> Sesi aktif
              </span>
            )}
            <Link href="/" className={styles.backLink}>
              <FaArrowLeft aria-hidden="true" /> Portfolio
            </Link>
            {authenticated && (
              <button type="button" className={styles.iconButton} onClick={handleSignOutClick} aria-label="Keluar dari sesi admin" title="Keluar dari sesi admin">
                <FaSignOutAlt aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </header>

      <div className={`${styles.shell} ${styles.content}`}>
        <div className={styles.pageHeading}>
          <div>
            <p className={styles.eyebrow}>Portfolio CMS</p>
            <h1>{viewMode === "form" ? (isEditing ? "Edit artikel" : "Artikel baru") : "Kelola blog"}</h1>
            <p>{viewMode === "form" ? "Tulis, tinjau, dan atur publikasi dalam satu ruang kerja." : "Kelola konten yang tampil pada bagian blog portfolio."}</p>
          </div>
          {authenticated && viewMode === "list" && (
            <Button className={styles.primaryButton} onClick={() => openForm()}>
              <FaPlus aria-hidden="true" /> Tulis artikel
            </Button>
          )}
        </div>

        {message && (
          <Alert variant="success" className={styles.feedback} role="status">
            <FaCheckCircle aria-hidden="true" /> {message}
          </Alert>
        )}
        {error && (
          <Alert ref={errorRef} tabIndex={-1} variant="danger" className={styles.feedback} role="alert">
            <strong>Ada yang perlu diperiksa.</strong>
            <span>{error}</span>
            {showValidation && invalidFields.length > 0 && (
              <ul>
                {invalidFields.map((field) => (
                  <li key={field.id}><a href={`#${field.id}`}>{field.label}</a></li>
                ))}
              </ul>
            )}
          </Alert>
        )}

        {!authenticated ? (
          <section className={styles.authLayout} aria-labelledby="admin-access-title">
            <div className={styles.authIntro}>
              <span className={styles.iconTile}><FaFileAlt aria-hidden="true" /></span>
              <h2>Ruang kerja editorial</h2>
              <p>Masuk menggunakan admin key untuk mengelola artikel portfolio. Key hanya disimpan selama sesi browser berlangsung.</p>
              <ul>
                <li>Kelola artikel terbit dan draft</li>
                <li>Tulis konten dengan Markdown</li>
                <li>Tinjau artikel sebelum dipublikasikan</li>
              </ul>
            </div>

            <div className={styles.authCard}>
              <div className={styles.cardHeading}>
                <span className={styles.iconTile}><FaKey aria-hidden="true" /></span>
                <div><h2 id="admin-access-title">Akses admin</h2><p>Masukkan key untuk melanjutkan.</p></div>
              </div>
              <Form onSubmit={(event) => { event.preventDefault(); loadPosts(adminKey); }}>
                <Form.Group controlId="admin-key" className="mb-4">
                  <Form.Label>Admin key</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={adminKey}
                      onChange={(event) => setAdminKey(event.target.value)}
                      placeholder="Masukkan admin key"
                      autoComplete="current-password"
                      required
                      style={{ paddingRight: "45px" }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={styles.passwordToggle}
                      aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                    >
                      {showPassword ? <FaEyeSlash aria-hidden="true" /> : <FaEye aria-hidden="true" />}
                    </button>
                  </div>
                  <Form.Text>Key tidak pernah ditampilkan pada halaman publik.</Form.Text>
                </Form.Group>
                <Button type="submit" className={`${styles.primaryButton} w-100`} disabled={loading || !adminKey.trim()}>
                  {loading ? <><Spinner size="sm" aria-hidden="true" /> Memverifikasi...</> : <><FaKey aria-hidden="true" /> Masuk ke dashboard</>}
                </Button>
              </Form>
            </div>
          </section>
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === "list" ? (
              <motion.div key="list" {...motionProps}>
                <section className={styles.statsGrid} aria-label="Ringkasan artikel">
                  <StatCard label="Total artikel" value={posts.length} icon={<FaFileAlt />} />
                  <StatCard label="Dipublikasikan" value={publishedCount} icon={<FaCheckCircle />} tone="success" />
                  <StatCard label="Draft" value={draftCount} icon={<FaRegClock />} tone="muted" />
                </section>

                <section className={styles.panel} aria-labelledby="article-list-title">
                  <div className={styles.panelHeader}>
                    <div><h2 id="article-list-title">Semua artikel</h2><p>Artikel terbaru ditampilkan lebih dahulu.</p></div>
                    <Badge className={styles.countBadge}>{posts.length} artikel</Badge>
                  </div>

                  {loading ? (
                    <div className={styles.loadingState} role="status"><Spinner animation="border" size="sm" /> Memuat artikel...</div>
                  ) : posts.length === 0 ? (
                    <div className={styles.emptyState}>
                      <span className={styles.iconTile}><FaFileAlt aria-hidden="true" /></span>
                      <h3>Belum ada artikel</h3>
                      <p>Buat artikel pertama untuk mulai mengisi blog portfolio.</p>
                      <Button className={styles.primaryButton} onClick={() => openForm()}><FaPlus aria-hidden="true" /> Tulis artikel</Button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.tableWrap}>
                        <table className={styles.articleTable}>
                          <thead><tr><th>Artikel</th><th>Kategori</th><th>Status</th><th><span className="visually-hidden">Tindakan</span></th></tr></thead>
                          <tbody>{posts.map((post) => <ArticleRow key={post.id} post={post} onEdit={openForm} onDelete={handleDeleteClick} />)}</tbody>
                        </table>
                      </div>
                      <div className={styles.mobileList}>{posts.map((post) => <ArticleCard key={post.id} post={post} onEdit={openForm} onDelete={handleDeleteClick} />)}</div>
                    </>
                  )}
                </section>
              </motion.div>
            ) : (
              <motion.div key="form" {...motionProps}>
                <Form noValidate onSubmit={handleSubmit}>
                  <div className={styles.editorGrid}>
                    <section className={styles.panel} aria-labelledby="content-heading">
                      <div className={styles.panelHeader}><div><h2 id="content-heading">Konten artikel</h2><p>Informasi utama yang akan dibaca pengunjung.</p></div></div>
                      <Form.Group controlId="post-title" className="mb-4">
                        <Form.Label>Judul artikel <span aria-hidden="true">*</span></Form.Label>
                        <Form.Control value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} minLength={5} required isInvalid={showValidation && !titleIsValid} placeholder="Contoh: Membangun UI yang konsisten" />
                        <Form.Control.Feedback type="invalid">Judul harus berisi minimal 5 karakter.</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group controlId="post-excerpt" className="mb-4">
                        <Form.Label>Ringkasan <span aria-hidden="true">*</span></Form.Label>
                        <Form.Control as="textarea" rows={3} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} minLength={20} required isInvalid={showValidation && !excerptIsValid} placeholder="Ringkasan singkat yang menjelaskan isi artikel..." />
                        <div className={styles.fieldMeta}><Form.Text>Minimal 20 karakter.</Form.Text><span>{form.excerpt.length} karakter</span></div>
                        <Form.Control.Feedback type="invalid">Ringkasan harus berisi minimal 20 karakter.</Form.Control.Feedback>
                      </Form.Group>

                      <Tabs activeKey={activeTab} onSelect={(key) => setActiveTab(key || "write")} className={styles.tabs}>
                        <Tab eventKey="write" title="Tulis Markdown">
                          <Form.Group controlId="post-content">
                            <Form.Label className="visually-hidden">Konten artikel</Form.Label>
                            <Form.Control as="textarea" className={`${styles.editor} ${firaCode.className}`} rows={18} value={form.content || ""} onChange={(event) => setForm({ ...form, content: event.target.value })} minLength={10} required isInvalid={showValidation && !contentIsValid} placeholder="# Mulai menulis artikel..." />
                            <Form.Control.Feedback type="invalid">Konten harus berisi minimal 10 karakter.</Form.Control.Feedback>
                          </Form.Group>
                        </Tab>
                        <Tab eventKey="preview" title="Pratinjau">
                          <div className={styles.preview}>
                            {form.content ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{form.content}</ReactMarkdown> : <p>Pratinjau akan muncul setelah kamu mulai menulis.</p>}
                          </div>
                        </Tab>
                      </Tabs>
                    </section>

                    <aside className={styles.sidebar} aria-label="Pengaturan publikasi">
                      <section className={styles.panel}>
                        <div className={styles.panelHeader}><div><h2>Publikasi</h2><p>Atur metadata dan status artikel.</p></div></div>
                        <Form.Group controlId="post-category" className="mb-4">
                          <Form.Label>Kategori <span aria-hidden="true">*</span></Form.Label>
                          <Form.Select value={categoryMode === "new" ? newCategoryValue : form.category} onChange={(event) => {
                            if (event.target.value === newCategoryValue) { setCategoryMode("new"); setNewCategory(""); return; }
                            setCategoryMode("select"); setForm({ ...form, category: event.target.value });
                          }} isInvalid={showValidation && !categoryIsValid} required>
                            {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                            <option value={newCategoryValue}>+ Kategori baru</option>
                          </Form.Select>
                          {categoryMode === "new" && (
                            <div className={styles.inlineField}>
                              <Form.Control value={newCategory} onChange={(event) => setNewCategory(event.target.value)} placeholder="Nama kategori" aria-label="Nama kategori baru" />
                              <Button type="button" variant="outline-primary" onClick={addCategory}>Tambah</Button>
                            </div>
                          )}
                          <Form.Control.Feedback type="invalid">Kategori wajib diisi.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="post-date" className="mb-4">
                          <Form.Label>Tanggal <span aria-hidden="true">*</span></Form.Label>
                          <Form.Control value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} isInvalid={showValidation && !dateIsValid} required />
                          <Form.Control.Feedback type="invalid">Tanggal wajib diisi.</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="post-image" className="mb-4">
                          <Form.Label>URL cover</Form.Label>
                          <Form.Control value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} placeholder="/images-blog/blog-1.jpg" isInvalid={showValidation && !imageUrlIsValid} />
                          <Form.Text>Gunakan path lokal atau URL http(s).</Form.Text>
                          <Form.Control.Feedback type="invalid">Format URL gambar tidak valid.</Form.Control.Feedback>
                        </Form.Group>
                        <div className={styles.publishToggle}>
                          <Form.Check type="switch" id="published-switch" label={form.published ? "Dipublikasikan" : "Simpan sebagai draft"} checked={form.published} onChange={(event) => setForm({ ...form, published: event.target.checked })} />
                          <small>{form.published ? "Artikel terlihat oleh pengunjung." : "Artikel hanya terlihat di dashboard."}</small>
                        </div>
                      </section>
                    </aside>
                  </div>

                  <div className={styles.formActions}>
                    <Button type="button" variant="outline-secondary" onClick={closeForm}><FaArrowLeft aria-hidden="true" /> Batal</Button>
                    <Button type="submit" className={styles.primaryButton} disabled={saving}>
                      {saving ? <><Spinner size="sm" aria-hidden="true" /> Menyimpan...</> : <>{isEditing ? <FaSave aria-hidden="true" /> : <FaPlus aria-hidden="true" />}{isEditing ? "Simpan perubahan" : "Simpan artikel"}</>}
                    </Button>
                  </div>
                </Form>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      <Modal show={showLogoutModal} onHide={() => setShowLogoutModal(false)} centered contentClassName={styles.glassModal}>
        <Modal.Header closeButton closeVariant="white" className={styles.glassModalHeader}>
          <Modal.Title className={styles.glassModalTitle}>Konfirmasi Keluar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin keluar dari sesi admin? Anda perlu memasukkan admin key kembali untuk masuk.
        </Modal.Body>
        <Modal.Footer className={styles.glassModalFooter}>
          <Button variant="outline-light" onClick={() => setShowLogoutModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmSignOut}>
            Keluar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered contentClassName={styles.glassModal}>
        <Modal.Header closeButton closeVariant="white" className={styles.glassModalHeader}>
          <Modal.Title className={styles.glassModalTitle}>Hapus Artikel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Apakah Anda yakin ingin menghapus artikel <strong>&quot;{postToDelete?.title}&quot;</strong>? Tindakan ini tidak dapat dibatalkan.
        </Modal.Body>
        <Modal.Footer className={styles.glassModalFooter}>
          <Button variant="outline-light" onClick={() => setShowDeleteModal(false)}>
            Batal
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            <FaTrash aria-hidden="true" /> Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

function StatCard({ label, value, icon, tone = "default" }: { label: string; value: number; icon: React.ReactNode; tone?: "default" | "success" | "muted" }) {
  return <article className={`${styles.statCard} ${styles[tone]}`}><span aria-hidden="true">{icon}</span><div><strong>{value}</strong><p>{label}</p></div></article>;
}

function ArticleStatus({ published }: { published: boolean }) {
  return <span className={`${styles.statusBadge} ${published ? styles.published : styles.draft}`}>{published ? <FaCheckCircle aria-hidden="true" /> : <FaRegClock aria-hidden="true" />}{published ? "Terbit" : "Draft"}</span>;
}

function ArticleRow({ post, onEdit, onDelete }: { post: BlogPost; onEdit: (post: BlogPost) => void; onDelete: (post: BlogPost) => void }) {
  return (
    <tr>
      <td><strong>{post.title}</strong><span>{post.date}</span></td>
      <td>{post.category}</td>
      <td><ArticleStatus published={post.published} /></td>
      <td><div className={styles.rowActions}><button type="button" onClick={() => onEdit(post)} aria-label={`Edit ${post.title}`}><FaEdit aria-hidden="true" /> Edit</button><button type="button" className={styles.deleteButton} onClick={() => onDelete(post)} aria-label={`Hapus ${post.title}`}><FaTrash aria-hidden="true" /> Hapus</button></div></td>
    </tr>
  );
}

function ArticleCard({ post, onEdit, onDelete }: { post: BlogPost; onEdit: (post: BlogPost) => void; onDelete: (post: BlogPost) => void }) {
  return (
    <article className={styles.articleCard}>
      <div><ArticleStatus published={post.published} /><span className={styles.category}>{post.category}</span></div>
      <h3>{post.title}</h3><p>{post.date}</p>
      <div className={styles.rowActions}><button type="button" onClick={() => onEdit(post)}><FaEdit aria-hidden="true" /> Edit</button><button type="button" className={styles.deleteButton} onClick={() => onDelete(post)}><FaTrash aria-hidden="true" /> Hapus</button></div>
    </article>
  );
}
