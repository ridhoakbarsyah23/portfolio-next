"use client";

import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

export default function AboutSection() {
  return (
    <motion.section id="about" className="text-center py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Container>
        <h2 className="fw-bold mb-3 text-primary fs-2">About Me</h2>
        <p className="mx-auto fs-6" style={{ maxWidth: "700px" }}>
          Saya adalah lulusan S1 Rekayasa Perangkat Lunak dari Institut Teknologi Telkom Purwokerto. Berpengalaman membuat aplikasi web dengan React.js, Laravel, dan MySQL. Terlibat dalam pengembangan sistem besar seperti SISAPPRA Satpol PP
          DKI Jakarta dan SIMRS Rumah Sakit.
        </p>
      </Container>
    </motion.section>
  );
}
