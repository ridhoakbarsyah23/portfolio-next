"use client";

import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight } from "react-icons/fa";

interface Props {
  darkMode: boolean;
}

export default function HomeSection({ darkMode }: Props) {
  return (
    <section
      id="home"
      className={`d-flex align-items-center justify-content-center text-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        minHeight: "100vh",
        background: darkMode ? "linear-gradient(135deg, #0d1117 0%, #161b22 100%)" : "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)",
        transition: "background 0.5s ease",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="profile-container p-5 rounded-4 shadow-lg mx-auto"
          style={{
            background: darkMode ? "rgba(28, 28, 30, 0.85)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            maxWidth: "550px",
          }}
        >
          <motion.img
            src="/Background-Merah.jpg"
            alt="Profile"
            className="profile-img mb-4 shadow-lg"
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              objectFit: "cover",
              border: darkMode ? "4px solid #333" : "4px solid #fff",
              boxShadow: darkMode ? "0 0 25px rgba(255,255,255,0.1)" : "0 0 25px rgba(0,0,0,0.1)",
            }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          />

          <motion.h1 className="fw-bold mb-2 display-6 text-primary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Ridho Akbarsyah Ramadhan
          </motion.h1>

          <motion.p className="mb-4 fs-5 text-secondary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Frontend Developer &nbsp;|&nbsp; Full Stack Developer
          </motion.p>

          <motion.div className="d-flex flex-column flex-sm-row justify-content-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Button variant="primary" href="#projects" size="lg" className="px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-sm">
              🚀 Lihat Project
              <FaArrowRight />
            </Button>

            <a
              href="/CV_Ridho_Akbarsyah_Ramadhan.pdf"
              download
              className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-primary"} btn-lg px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-sm cv-btn`}
            >
              <FaDownload /> Unduh CV
            </a>
          </motion.div>
        </motion.div>

        {/* Elemen Dekoratif */}
        <motion.div
          className="position-absolute"
          style={{
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.7,
            fontSize: "0.9rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            🔽 Scroll ke bawah
          </motion.span>
        </motion.div>
      </Container>
    </section>
  );
}
