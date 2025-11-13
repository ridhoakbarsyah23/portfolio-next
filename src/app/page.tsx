"use client";

import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Navbar, Nav, Form, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaInstagram, FaDownload } from "react-icons/fa";
import "@/app/globals.css";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [showAlert, setShowAlert] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      const scrollY = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollY >= section.offsetTop) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const projects = [
    {
      title: "SIMRS",
      desc: "Sistem Informasi Manajemen Rumah Sakit untuk mendukung operasional rumah sakit secara online.",
    },
    {
      title: "SISAPPRA Satpol PP DKI Jakarta",
      desc: "Platform monitoring dan pelaporan kegiatan operasional Satpol PP Provinsi DKI Jakarta.",
    },
    {
      title: "NEW LMS Bank BJB",
      desc: "Sistem Loan Management untuk pengelolaan pinjaman segmen UMKM di Bank BJB.",
    },
  ];

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* ======================== 🔹 NAVBAR ======================== */}
      <Navbar expand="lg" fixed="top" className={darkMode ? "navbar-dark bg-dark shadow-sm" : "navbar-light bg-white shadow-sm"}>
        <Container>
          <Navbar.Brand href="#home" className="fw-bold fs-3">
            🌐 Ridho
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto align-items-center gap-3">
              {["home", "about", "skills", "projects", "contact"].map((id) => (
                <Nav.Link key={id} href={`#${id}`} className={`${activeLink === id ? "fw-semibold text-primary" : ""}`}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </Nav.Link>
              ))}
              <Button variant={darkMode ? "light" : "dark"} size="sm" className="ms-3 rounded-circle" onClick={toggleTheme}>
                {darkMode ? "☀️" : "🌙"}
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ======================== 🏠 HOME SECTION ======================== */}
      <Container id="home" className="text-center py-5 main-content d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="profile-container p-4 rounded-4 shadow-sm"
          style={{
            background: darkMode ? "#1c1c1e" : "#ffffff",
            maxWidth: "420px",
            width: "90%",
          }}
        >
          <div className="d-flex flex-column align-items-center">
            <motion.img
              src="/Background-Merah.jpg"
              alt="Profile"
              className="profile-img mb-3 shadow"
              style={{
                width: "180px",
                height: "180px",
                borderRadius: "60%",
                objectFit: "cover",
                border: darkMode ? "4px solid #333" : "4px solid #fff",
              }}
            />
            <h1 className="fw-bold mb-2 display-6 text-primary text-center">Ridho Akbarsyah Ramadhan</h1>
            <p className="mb-4 fs-6 text-secondary text-center">Frontend Developer &nbsp;|&nbsp; Full Stack Developer</p>
            <div className="d-flex flex-column flex-sm-row gap-3">
              <Button variant="primary" href="#projects" size="lg" className="px-4 rounded-pill">
                🚀 Lihat Project
              </Button>
              <a href="/CV_Ridho_Akbarsyah_Ramadhan.pdf" download className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-primary"} btn-lg px-4 rounded-pill d-flex align-items-center justify-content-center gap-2`}>
                <FaDownload /> Unduh CV
              </a>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* ======================== 👨‍💻 ABOUT ======================== */}
      <motion.section id="about" className="text-center py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <Container>
          <h2 className="fw-bold mb-3 text-primary fs-2">Tentang Saya</h2>
          <p className="mx-auto fs-6" style={{ maxWidth: "700px" }}>
            Saya adalah lulusan S1 Rekayasa Perangkat Lunak dari Institut Teknologi Telkom Purwokerto. Berpengalaman membuat aplikasi web dengan React.js, Laravel, dan MySQL. Terlibat dalam pengembangan sistem besar seperti SISAPPRA Satpol
            PP DKI Jakarta dan SIMRS Rumah Sakit.
          </p>
        </Container>
      </motion.section>

      {/* ======================== 🛠️ SKILLS ======================== */}
      <motion.section id="skills" className={`text-center py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
        <Container>
          <h2 className="fw-bold mb-4 text-primary fs-2">Keahlian Saya</h2>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {["Next.js", "React", "Bootstrap", "Tailwind", "TypeScript", "Laravel"].map((skill, i) => (
              <motion.div
                key={i}
                className={`px-3 py-2 rounded-pill shadow-sm d-inline-flex align-items-center justify-content-center ${darkMode ? "bg-secondary text-light border-0" : "bg-white text-dark border"}`}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{ minWidth: 100, fontSize: "0.95rem" }}
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </Container>
      </motion.section>

      {/* ======================== 🚀 PROJECTS ======================== */}
      <motion.section id="projects" className="text-center py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <Container>
          <h2 className="fw-bold mb-5 text-primary fs-2">Project Saya</h2>
          <Row className="justify-content-center g-4">
            {projects.map((p, i) => (
              <Col key={i} lg={4} md={6} sm={12}>
                <motion.div
                  className={`p-4 rounded-4 shadow-sm project-card h-100 ${darkMode ? "bg-secondary text-light" : "bg-white"}`}
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 30px rgba(0,0,0,0.15)" }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <h5 className="fw-semibold mb-3 fs-5">{p.title}</h5>
                  <p className="text-muted fs-6 mb-0">{p.desc}</p>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </motion.section>

      {/* ======================== 💬 CONTACT ======================== */}
      <motion.section id="contact" className="text-center py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <Container style={{ maxWidth: "600px" }}>
          <h2 className="fw-bold mb-3 text-primary fs-2">Hubungi Saya</h2>
          <p className="fs-6">Kirim pesan di bawah jika ingin bekerja sama 👇</p>

          {showAlert && (
            <Alert variant="success" className="mt-3">
              ✅ Pesan berhasil dikirim! Terima kasih 🙌
            </Alert>
          )}

          <Form className="text-start mt-4" onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" placeholder="Masukkan nama" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Masukkan email" required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pesan</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="Tulis pesan kamu..." required />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100 rounded-pill fw-semibold">
              Kirim Pesan
            </Button>
          </Form>
        </Container>
      </motion.section>

      {/* ======================== ⚓ FOOTER ======================== */}
      <footer
        className="mt-5 pt-4"
        style={{
          background: darkMode ? "linear-gradient(180deg,#0b1220,#071022)" : "linear-gradient(180deg,#fff,#f8f9fb)",
        }}
      >
        <Container className="py-4 text-center">
          <div className="d-flex justify-content-center gap-3 mb-3">
            <a href="https://linkedin.com/in/ridhoakbarsyah" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${darkMode ? "text-light" : "text-dark"}`} style={{ fontSize: 22 }}>
              <FaLinkedin />
            </a>
            <a href="https://github.com/ridhoramadhan096-commits" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${darkMode ? "text-light" : "text-dark"}`} style={{ fontSize: 22 }}>
              <FaGithub />
            </a>
            <a href="https://instagram.com/@ridhoakbarsyah_" target="_blank" rel="noopener noreferrer" className={`text-decoration-none ${darkMode ? "text-light" : "text-dark"}`} style={{ fontSize: 22 }}>
              <FaInstagram />
            </a>
          </div>

          <p className="mb-1 fw-medium fs-6">Ridho Akbarsyah — Design • Code • Deploy</p>
          <p className="mb-0 small" style={{ color: darkMode ? "#9aa4b2" : "#6c757d" }}>
            © {new Date().getFullYear()} <strong>Ridho Akbarsyah</strong> — Built with ❤️ using <strong>Next.js</strong>
          </p>
        </Container>
      </footer>
    </div>
  );
}
