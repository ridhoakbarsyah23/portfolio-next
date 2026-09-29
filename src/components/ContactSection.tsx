"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container, Button, Form, Spinner } from "react-bootstrap";
import { readJsonResponse } from "@/lib/readJsonResponse";
import { useTheme } from "next-themes";

export default function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "fallback" | "error">("idle");
  const [feedback, setFeedback] = useState("");
  const [fallbackMailto, setFallbackMailto] = useState("");
  const isSending = status === "sending";

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const buildMailto = (name: string, email: string, message: string) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    return `mailto:ridhoakbarsyah23@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const name = String(formData.get("name") || "");
    const email = String(formData.get("email") || "");
    const message = String(formData.get("message") || "");
    const mailto = buildMailto(name, email, message);

    setStatus("sending");
    setFeedback("");
    setFallbackMailto(mailto);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const payload = await readJsonResponse<{ code?: string; message?: string }>(response);

      if (payload?.code === "CONTACT_NOT_CONFIGURED") {
        setStatus("fallback");
        setFeedback("Direct sending is not active yet. You can continue by opening your email app.");
        return;
      }

      if (!response.ok) {
        throw new Error(payload?.message || "Message could not be sent.");
      }

      setStatus("success");
      setFeedback("Message sent. Thank you for reaching out.");
      form.reset();
      setFallbackMailto("");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Message could not be sent.");
    }
  };

  return (
    <motion.section
      id="contact"
      className={`text-center py-5 `}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-3 text-gradient-primary fs-2">Hire Me</h2>
        <p className={`fs-6 `}>Send a message below if you are interested in working together.</p>

        <Form 
          className={`text-start mt-4 p-4 rounded-4 `} 
          onSubmit={handleSubmit}
          style={{
            background: "var(--color-card)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          {feedback && (
            <div 
              className="p-3 mb-4 rounded-3 text-start"
              style={{
                background: status === "success" ? "rgba(34, 197, 94, 0.1)" : status === "fallback" ? "rgba(234, 179, 8, 0.1)" : "rgba(239, 68, 68, 0.1)",
                color: status === "success" ? (resolvedTheme === "dark" ? "#4ade80" : "#15803d") : status === "fallback" ? (resolvedTheme === "dark" ? "#facc15" : "#a16207") : (resolvedTheme === "dark" ? "#f87171" : "#b91c1c"),
                border: `1px solid ${status === "success" ? "rgba(34, 197, 94, 0.2)" : status === "fallback" ? "rgba(234, 179, 8, 0.2)" : "rgba(239, 68, 68, 0.2)"}`
              }}
            >
              <div className="fw-medium">{feedback}</div>
              {fallbackMailto && (
                <div className="mt-3">
                  <a href={fallbackMailto} className="btn btn-sm btn-primary rounded-pill fw-semibold px-3">
                    Open email app to send
                  </a>
                </div>
              )}
            </div>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your name" minLength={2} disabled={isSending} required className="custom-input" />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your email" disabled={isSending} required className="custom-input" />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Message</Form.Label>
            <Form.Control name="message" as="textarea" rows={4} placeholder="Write your message..." minLength={10} maxLength={3000} disabled={isSending} required className="custom-input" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 rounded-pill fw-semibold d-inline-flex align-items-center justify-content-center gap-2 py-2" disabled={isSending}>
            {isSending && <Spinner size="sm" animation="border" role="status" />}
            {isSending ? "Sending..." : "Send Message"}
          </Button>
        </Form>
      </Container>
    </motion.section>
  );
}
