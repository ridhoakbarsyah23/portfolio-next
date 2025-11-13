"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  darkMode: boolean;
}

export default function SkillsSection({ darkMode }: Props) {
  const skills = ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "PHP", "Laravel", "MySQL", "Tailwind CSS", "Bootstrap", "Git", "Figma", "Node.js", "Express.js", "REST API"];

  return (
    <motion.section id="skills" className={`text-center py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
      <Container>
        <h2 className="fw-bold mb-4 text-primary fs-2">Keahlian Saya</h2>
        <Row className="g-3 justify-content-center">
          {skills.map((skill, i) => (
            <Col
              key={i}
              xs={6} // 2 kolom di layar kecil
              sm={4} // 3 kolom di layar sedang
              md={3} // 4 kolom di layar besar
              className="d-flex justify-content-center"
            >
              <motion.div
                className={`py-3 px-4 rounded-4 text-center shadow-sm w-100 fw-medium ${darkMode ? "bg-secondary text-light" : "bg-white text-dark border"}`}
                whileHover={{ scale: 1.06 }}
                transition={{ type: "spring", stiffness: 200 }}
                style={{
                  minHeight: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1rem",
                }}
              >
                {skill}
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
}
