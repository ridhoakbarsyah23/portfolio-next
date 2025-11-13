"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  darkMode: boolean;
}

export default function ProjectsSection({ darkMode }: Props) {
  const projects = [
    {
      title: "SIMRS",
      desc: "Sistem Informasi Manajemen Rumah Sakit untuk mendukung operasional rumah sakit secara online.",
      image: "/projects/simrs.jpg",
    },
    {
      title: "EMR",
      desc: "Sistem Rekam Medis Elektronik untuk pencatatan dan pengelolaan data medis pasien secara digital.",
      image: "/projects/emr.jpg",
    },
    {
      title: "SISAPPRA Satpol PP DKI Jakarta",
      desc: "Platform monitoring dan pelaporan kegiatan operasional Satpol PP Provinsi DKI Jakarta.",
      image: "/projects/sisappra.png",
    },
  ];

  return (
    <motion.section
      id="projects"
      className={`text-center py-5 position-relative ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Container>
        <h2 className="fw-bold mb-5 text-primary fs-2">💼 Projects</h2>
        <Row className="justify-content-center g-4">
          {projects.map((p, i) => (
            <Col key={i} lg={4} md={6} sm={12}>
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  boxShadow: darkMode ? "0 0 25px rgba(0, 123, 255, 0.3)" : "0 0 25px rgba(13, 110, 253, 0.25)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className={`rounded-4 overflow-hidden shadow-sm h-100 border-0 ${darkMode ? "bg-secondary text-light" : "bg-white text-dark"}`}
                style={{
                  backdropFilter: "blur(12px)",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                }}
              >
                {/* 🖼️ Project Image */}
                <div className="position-relative">
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    className="w-100"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderBottom: darkMode ? "2px solid rgba(255,255,255,0.1)" : "2px solid rgba(0,0,0,0.05)",
                    }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.4 }}
                  />
                  {/* Overlay */}
                  <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                      background: "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.6))",
                      opacity: 0.2,
                    }}
                  />
                </div>

                {/* 📄 Content */}
                <div className="p-4 text-start">
                  <h5 className="fw-bold mb-2">{p.title}</h5>
                  <p className="text-muted small mb-0">{p.desc}</p>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* ✨ Decorative gradient background */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: darkMode ? "radial-gradient(circle at 20% 30%, rgba(13,110,253,0.12), transparent 70%)" : "radial-gradient(circle at 20% 30%, rgba(13,110,253,0.07), transparent 70%)",
          zIndex: 0,
        }}
      />
    </motion.section>
  );
}
