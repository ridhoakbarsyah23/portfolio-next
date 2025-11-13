"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Button, Form, Alert } from "react-bootstrap";

export default function ContactSection() {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <motion.section id="contact" className="text-center py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-3 text-primary fs-2">Hubungi Saya</h2>
        <p className="fs-6">Kirim pesan di bawah jika ingin bekerja sama 👇</p>

        {showAlert && (
          <Alert variant="success" className="mt-3">
            ✅ Pesan berhasil dikirim! Terima kasih 🙌
          </Alert>
        )}

        <Form className="text-start mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nama</Form.Label>
            <Form.Control type="text" placeholder="Masukkan nama" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Masukkan email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pesan</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Tulis pesan kamu..." required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 rounded-pill fw-semibold">
            Kirim Pesan
          </Button>
        </Form>
      </Container>
    </motion.section>
  );
}
