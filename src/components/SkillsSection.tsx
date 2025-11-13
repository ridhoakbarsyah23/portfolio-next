"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaPhp, FaLaravel, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiMysql } from "react-icons/si";

interface Props {
  darkMode: boolean;
}

export default function SkillsSection({ darkMode }: Props) {
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
    <motion.section id="skills" className={`text-center py-5 position-relative overflow-hidden ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Container>
        <h2 className="fw-bold mb-5 text-primary fs-2 position-relative z-2">💡 My Skills</h2>

        <Row className="g-4 justify-content-center">
          {skills.map((skill, i) => (
            <Col key={i} xs={6} sm={4} md={4} className="d-flex justify-content-center align-items-center">
              <motion.div
                whileHover={{
                  scale: 1.08,
                  rotate: 1,
                  boxShadow: darkMode ? "0 0 25px rgba(0, 123, 255, 0.35)" : "0 0 25px rgba(13, 110, 253, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 220, damping: 12 }}
                className={`rounded-4 p-4 w-100 text-center fw-semibold position-relative ${darkMode ? "bg-dark-subtle text-light" : "bg-white text-dark"}`}
                style={{
                  minHeight: "140px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  border: darkMode ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.08)",
                  backdropFilter: "blur(15px)",
                  background: darkMode ? "linear-gradient(145deg, rgba(40,40,40,0.8), rgba(20,20,20,0.9))" : "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,245,245,0.95))",
                  transition: "all 0.3s ease",
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
          background: darkMode
            ? "radial-gradient(circle at 30% 20%, rgba(13,110,253,0.12), transparent 70%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 70%)"
            : "radial-gradient(circle at 30% 20%, rgba(13,110,253,0.08), transparent 70%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.04), transparent 70%)",
          zIndex: 0,
        }}
      />
    </motion.section>
  );
}
