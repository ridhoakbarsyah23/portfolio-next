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
    <motion.section id="projects" className="text-center py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Container>
        <h2 className="fw-bold mb-5 text-primary fs-2">Project Saya</h2>
        <Row className="justify-content-center g-4">
          {projects.map((p, i) => (
            <Col key={i} lg={4} md={6} sm={12}>
              <motion.div className={`p-4 rounded-4 shadow-sm h-100 ${darkMode ? "bg-secondary text-light" : "bg-white"}`} whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 200 }}>
                <h5 className="fw-semibold mb-3 fs-5">{p.title}</h5>
                <p className="text-muted fs-6 mb-0">{p.desc}</p>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </motion.section>
  );
}
