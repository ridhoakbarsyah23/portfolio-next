"use client";

import { useState } from "react";
import { Container, Button, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight, FaEye } from "react-icons/fa";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useLanguage } from "@/components/LanguageProvider";

const PDFViewer = dynamic(() => import("./PDFViewer"), { ssr: false });

export default function HomeSection() {
  const [showCV, setShowCV] = useState(false);
  const { language } = useLanguage();


  return (
    <section
      id="home"
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        minHeight: "100vh",
        padding: "40px 0",
        background: "var(--color-background)",
        color: "var(--color-foreground)",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-5 mx-auto"
          style={{ maxWidth: "750px" }}
        >
          <motion.div
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 180, damping: 14 }}
            className="mx-auto mb-4"
            style={{
              width: "100%",
              maxWidth: 280,
              aspectRatio: "1 / 1",
              borderRadius: "50%",
              padding: "12px",
              background: "var(--color-card)",
              boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
              border: "1px solid var(--color-border)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                overflow: "hidden",
                background: "var(--color-muted)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/img-myself/Background-Merah.jpg"
                alt="Ridho Akbarsyah Ramadhan profile photo"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center top",
                }}
              />
            </div>
          </motion.div>

          <motion.h1
            className="fw-semibold mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: "3.5rem",
              color: "var(--color-foreground)",
            }}
          >
            Ridho Akbarsyah Ramadhan
          </motion.h1>

          <motion.p
            className="mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            style={{
              fontSize: "1.25rem",
              color: "var(--color-secondary)",
            }}
          >
            {language === "id" ? "Frontend Developer - Cilacap, Jawa Tengah" : "Frontend Developer - Cilacap, Central Java"}
          </motion.p>

          <motion.div
            className="d-flex flex-column flex-sm-row justify-content-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              size="lg"
              href="#projects"
              className="px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm"
              style={{
                background: "var(--color-primary)",
                color: "var(--color-on-primary)",
                border: "none",
                fontWeight: 600,
              }}
            >
              {language === "id" ? "Lihat Proyek" : "View Projects"} <FaArrowRight />
            </Button>

            <Button
              variant="outline-secondary"
              size="lg"
              className="px-4 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm"
              style={{ fontWeight: 600 }}
              onClick={() => setShowCV(true)}
            >
              <FaEye /> {language === "id" ? "Lihat CV" : "View CV"}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* CV Modal */}
      <Modal show={showCV} onHide={() => setShowCV(false)} size="lg" centered>
        <Modal.Header closeButton style={{ background: "var(--color-card)", color: "var(--color-card-foreground)", borderBottom: "1px solid var(--color-border)" }}>
          <Modal.Title>Curriculum Vitae</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0" style={{ background: "var(--color-card)" }}>
          <PDFViewer url="/CV_Ridho_Akbarsyah_Ramadhan.pdf" />
        </Modal.Body>
        <Modal.Footer style={{ background: "var(--color-card)", borderTop: "1px solid var(--color-border)" }}>
          <Button variant="secondary" onClick={() => setShowCV(false)}>
            {language === "id" ? "Tutup" : "Close"}
          </Button>
          <a href="/CV_Ridho_Akbarsyah_Ramadhan.pdf" download className="btn btn-primary d-flex align-items-center gap-2">
            <FaDownload /> {language === "id" ? "Unduh File" : "Download File"}
          </a>
        </Modal.Footer>
      </Modal>
    </section>
  );
}
