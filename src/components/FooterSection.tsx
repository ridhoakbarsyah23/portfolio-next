"use client";

import { Container } from "react-bootstrap";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

interface Props {
  darkMode: boolean;
}

export default function FooterSection({ darkMode }: Props) {
  return (
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
  );
}
