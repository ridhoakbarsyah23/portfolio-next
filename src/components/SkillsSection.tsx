"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaLaravel, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiMysql } from "react-icons/si";
import { useLanguage } from "@/components/LanguageProvider";

export default function SkillsSection() {
  const { language } = useLanguage();

  const skills = [
    { name: "HTML", icon: <FaHtml5 color="#e34f26" /> },
    { name: "CSS", icon: <FaCss3Alt color="#1572B6" /> },
    { name: "JavaScript", icon: <FaJs color="#f7df1e" /> },
    { name: "PHP", icon: <FaPhp color="#777bb3" /> },
    { name: "Laravel", icon: <FaLaravel color="#f55247" /> },
    { name: "React", icon: <FaReact color="#61dafb" /> },
    { name: "MySQL", icon: <SiMysql color="#00758f" /> },
    { name: "Git", icon: <FaGitAlt color="#f05033" /> },
    { name: "Figma", icon: <FaFigma color="#a259ff" /> },
  ];

  return (
    <motion.section id="skills" className="text-center py-5 position-relative overflow-hidden" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Container>
        <h2 className="fw-bold mb-5 text-primary fs-2 position-relative z-2">{language === "id" ? "Keahlian Saya" : "My Skills"}</h2>

        <Row className="g-4 justify-content-center">
          {skills.map((skill, i) => (
            <Col key={i} xs={6} sm={4} md={4} className="d-flex justify-content-center align-items-center">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  delay: i * 0.05, 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15 
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 1,
                  boxShadow: "0 0 25px rgba(37, 99, 235, 0.25)",
                }}
                className="rounded-4 p-4 w-100 text-center fw-semibold position-relative"
                style={{
                  minHeight: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid var(--color-border)",
                  background: "var(--color-card)",
                  color: "var(--color-card-foreground)",
                  cursor: "default",
                  borderRadius: "20px",
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{skill.icon}</div>
                <span style={{ fontSize: "1.05rem" }}>{skill.name}</span>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* 🔵 Decorative background gradients */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "radial-gradient(circle at 30% 20%, rgba(37,99,235,0.1), transparent 70%)",
          zIndex: 0,
        }}
      />
    </motion.section>
  );
}
