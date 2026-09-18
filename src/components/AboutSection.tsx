"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { useTheme } from "next-themes";

export default function AboutSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <motion.section 
      id="about" 
      className={`py-5 position-relative overflow-hidden ${isDark ? "bg-dark text-light" : "bg-light text-dark"}`} 
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      viewport={{ once: true }}
    >
      <Container className="text-center position-relative" style={{ zIndex: 2 }}>
        <h2 className="fw-bold mb-4 text-gradient-primary fs-2">About Me</h2>

        <p className={`mx-auto fs-6 lh-lg ${isDark ? "text-light opacity-75" : "text-secondary"}`} style={{ maxWidth: "750px" }}>
          I am a highly motivated individual who enjoys learning new things and taking on new challenges. I graduated with a Bachelor&apos;s degree in Computer Science, majoring in Software Engineering at Telkom Institute of Technology
          Purwokerto with a strong academic record.
          <br />
          <br />
          I have solid knowledge in web development, mobile development, and UI/UX design. I was actively involved in the Software Engineering Student Association and participated in various competitions at institutional and national
          levels.
          <br />
          <br />
          Through these experiences, I have developed strong leadership, teamwork, and communication skills that support my growth as a technology enthusiast and problem solver.
        </p>
      </Container>
      
      {/* Decorative Glow */}
      <div 
        className="position-absolute top-50 start-50 translate-middle rounded-circle"
        style={{
          width: "40vw",
          height: "40vw",
          background: isDark ? "rgba(13, 110, 253, 0.08)" : "rgba(13, 110, 253, 0.05)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
    </motion.section>
  );
}
