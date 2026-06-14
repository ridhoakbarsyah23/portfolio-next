"use client";

import { motion } from "framer-motion";
import { Container, Button, Form } from "react-bootstrap";

export default function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    window.location.href = `mailto:ridhoakbarsyah23@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <motion.section
      id="contact"
      className="text-center py-5"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-3 text-primary fs-2">Hire Me</h2>
        <p className="fs-6">Send a message below if you are interested in working together.</p>

        <Form className="text-start mt-4" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your name" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your email" required />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control name="message" as="textarea" rows={3} placeholder="Write your message..." required />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 rounded-pill fw-semibold">
            Send Message
          </Button>
        </Form>
      </Container>
    </motion.section>
  );
}
