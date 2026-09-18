"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Alert, Container, Button, Form, Spinner } from "react-bootstrap";
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
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const alertVariant = useMemo(() => {
    if (status === "success") return "success";
    if (status === "fallback") return "warning";
    if (status === "error") return "danger";
    return "primary";
  }, [status]);

  const buildMailto = (name: string, email: string, message: string) => {
    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

    return `mailto:ridhoakbarsyah23@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
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
      e.currentTarget.reset();
      setFallbackMailto("");
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Message could not be sent.");
    }
  };

  return (
    <motion.section
      id="contact"
      className={`text-center py-5 ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Container style={{ maxWidth: "600px" }}>
        <h2 className="fw-bold mb-3 text-gradient-primary fs-2">Hire Me</h2>
        <p className={`fs-6 ${isDark ? "text-light opacity-75" : "text-muted"}`}>Send a message below if you are interested in working together.</p>

        <Form 
          className={`text-start mt-4 p-4 rounded-4 ${isDark ? "form-glass-dark" : "form-glass-light"}`} 
          onSubmit={handleSubmit}
          style={{
            background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.6)",
            backdropFilter: "blur(12px)",
            border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.05)",
            boxShadow: isDark ? "0 10px 30px rgba(0,0,0,0.5)" : "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          {feedback && (
            <Alert variant={alertVariant}>
              {feedback}
              {fallbackMailto && (
                <div className="mt-2">
                  <a href={fallbackMailto} className="btn btn-sm btn-dark rounded-pill fw-semibold">
                    Open email app to send
                  </a>
                </div>
              )}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Name</Form.Label>
            <Form.Control name="name" type="text" placeholder="Enter your name" minLength={2} disabled={isSending} required className={isDark ? "bg-dark text-light border-secondary" : ""} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Enter your email" disabled={isSending} required className={isDark ? "bg-dark text-light border-secondary" : ""} />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Message</Form.Label>
            <Form.Control name="message" as="textarea" rows={4} placeholder="Write your message..." minLength={10} maxLength={3000} disabled={isSending} required className={isDark ? "bg-dark text-light border-secondary" : ""} />
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
