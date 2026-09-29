"use client";

import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { experienceTimeline } from "@/data/experience";

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-5" style={{ overflow: "hidden" }}>
      <Container>
        <motion.h2
          className="text-center fw-bold mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: "linear-gradient(90deg, #0d6efd, #6610f2, #d63384)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontSize: "2.5rem",
            letterSpacing: "1px",
          }}
        >
          Experience
        </motion.h2>

        <div
          className="mx-auto"
          style={{
            maxWidth: "950px",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          {experienceTimeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const marker = index === 0 ? "OK" : "-";

            return (
              <motion.div
                key={`${item.year}-${item.company}-${item.title}`}
                initial={{ opacity: 0, x: isLeft ? -70 : 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-start" : "flex-end",
                  width: "100%",
                }}
                className="timeline-item"
              >
                <motion.div
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: "spring", stiffness: 140 }}
                  style={{
                    width: "100%",
                    maxWidth: "450px",
                    borderRadius: "18px",
                    backdropFilter: "blur(14px)",
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.05)",
                    padding: "22px",
                  }}
                >
                  <h5 className="fw-bold mb-1">{item.title}</h5>
                  <p className="text-primary fw-semibold mb-0">{item.company}</p>
                  <small className="opacity-75">{item.year}</small>

                  <ul className="list-unstyled mt-3 mb-0">
                    {item.desc.map((d) => (
                      <li key={d} className="d-flex" style={{ marginBottom: "6px" }}>
                        <span className={`me-2 fw-bold ${marker === "OK" ? "text-success" : "text-primary"}`} style={{ fontSize: "1rem" }}>
                          {marker}
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <style>
        {`
          @media (max-width: 768px) {
            .timeline-item {
              justify-content: center !important;
            }
          }
        `}
      </style>
    </section>
  );
}
