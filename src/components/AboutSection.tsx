"use client";

import { motion } from "framer-motion";
import { Container } from "react-bootstrap";

export default function AboutSection() {
  return (
    <motion.section id="about" className="py-5" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
      <Container className="text-center">
        <h2 className="fw-bold mb-4 text-primary fs-2">About Me</h2>

        <p className="mx-auto fs-6 lh-lg text-secondary" style={{ maxWidth: "750px" }}>
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
    </motion.section>
  );
}
