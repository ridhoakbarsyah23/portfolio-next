"use client";

import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function FooterSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => { setMounted(true); }, []);

  
  return (

    <footer
      className="mt-5 pt-4"
      style={{
        background: "var(--color-card)",
      }}
    >
      <Container className="py-4 text-center">
        <div className="d-flex justify-content-center gap-3 mb-3">
          <a
            href="https://linkedin.com/in/ridhoakbarsyah"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{ fontSize: 22 }}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/ridhoakbarsyah23"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{ fontSize: 22 }}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.instagram.com/ridhoakbarsyah_?igsh=MWd0aTlhZmZqZjR0eg=="
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            style={{ fontSize: 22 }}
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
        </div>

        <p className="mb-0 small" style={{ color: "var(--color-secondary)" }}>
          (c) {new Date().getFullYear()} - <strong>Ridho Akbarsyah Ramadhan</strong>
        </p>
      </Container>
    </footer>
  );
}
