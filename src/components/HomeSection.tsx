"use client";

import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

interface Props {
  darkMode?: boolean;
}

export default function HomeSection({ darkMode = false }: Props) {
  const isDark = Boolean(darkMode);

  return (
    <section
      id="home"
      className={`d-flex align-items-center justify-content-center text-center ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        background: isDark ? "#0d0d0d" : "#fafafa",
        transition: "0.5s ease",
      }}
    >
      <Container>
        <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="p-5 mx-auto" style={{ maxWidth: "750px" }}>
          {/* ===== Foto Profil (Sudah Responsive + Center) ===== */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="mx-auto mb-4"
            style={{
              width: "100%",
              maxWidth: 320,
              aspectRatio: "1 / 1",
              borderRadius: "40px",
              padding: "18px",
              background: isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.5)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              boxShadow: isDark ? "0 16px 50px rgba(0,0,0,0.6), inset 0 6px 12px rgba(255,255,255,0.02)" : "0 18px 50px rgba(0,0,0,0.12), inset 0 6px 12px rgba(255,255,255,0.30)",
              border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(255,255,255,0.6)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "30px",
                overflow: "hidden",
                background: "#ffffff", // supaya saat contain tidak ada area hitam
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/img-myself/Background-Merah.jpg"
                alt="My Profile"
                fill
                priority
                style={{
                  objectFit: "contain", // ⬅⬅ foto tidak terpotong sama sekali
                  objectPosition: "center", // selalu ditengah
                }}
              />
            </div>
          </motion.div>

          {/* ===== Nama ===== */}
          <motion.h1
            className="fw-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "2.8rem",
              letterSpacing: "-1px",
              color: isDark ? "#ffffff" : "#111111",
            }}
          >
            Ridho Akbarsyah Ramadhan
          </motion.h1>

          {/* ===== Deskripsi ===== */}
          <motion.p
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              fontSize: "1.15rem",
              color: isDark ? "#c7c7c7" : "#555555",
            }}
          >
            Frontend Developer — Cilacap, Central Java
          </motion.p>

          {/* ===== Tombol ===== */}
          <motion.div className="d-flex flex-column flex-sm-row justify-content-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <Button
              size="lg"
              href="#projects"
              className="px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm"
              style={{
                background: isDark ? "#ffffff" : "#000000",
                color: isDark ? "#000000" : "#ffffff",
                border: "none",
                fontWeight: 600,
              }}
            >
              View Projects <FaArrowRight />
            </Button>

            <a href="/CV_Ridho_Akbarsyah_Ramadhan.pdf" download className={`btn btn-lg px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm ${isDark ? "btn-outline-light" : "btn-outline-dark"}`} style={{ fontWeight: 600 }}>
              <FaDownload /> Download CV
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
