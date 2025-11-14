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
        <h2 className="fw-bold mb-3 text-primary fs-2">Hire Me</h2>
        <p className="fs-6">Send a message below if you’re interested in working together 👇</p>

        {showAlert && (
          <Alert variant="success" className="mt-3">
            ✅ Your message has been sent! Thank you 🙌
          </Alert>
        )}

        <Form className="text-start mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your name" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Write your message..." required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 rounded-pill fw-semibold">
            Send Message
          </Button>
        </Form>
      </Container>
    </motion.section>
  );
}
