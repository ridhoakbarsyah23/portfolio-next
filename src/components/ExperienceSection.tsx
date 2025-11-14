"use client";

import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  darkMode: boolean;
}

export default function ExperienceSection({ darkMode }: Props) {
  const timeline = [
    {
      year: "2025",
      title: "Programmer",
      company: "PT Data Kreatif",
      desc: [
        "Fixing bugs in the Hospital Information System (SIMRS) to ensure system stability.",
        "Developing new features based on user requirements.",
        "Coordinating with the implementation team and users to identify needs.",
        "Conducting testing and debugging to ensure features work properly.",
      ],
    },
    {
      year: "2023",
      title: "Frontend Developer",
      company: "PT. Tristar Surya Gemilang",
      desc: ["Developed the SISAPPRA 2.0 Website for Satpol PP DKI Jakarta.", "Enhanced and developed features for the Satpol PP DKI Jakarta Website.", "Developed the NEW LMS Website for Bank BJB UMKM Segment."],
    },
    {
      year: "2021",
      title: "Frontend Developer Intern",
      company: "CV. Bahira Studio",
      desc: ["Redesigned the UI for the financial system website “Laraduit”."],
    },
  ];

  return (
    <section id="experience" className={`py-5 position-relative ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Background Gradient Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(0, 123, 255, 0.15), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <h2 className="text-center fw-bold mb-5 text-primary">Experience</h2>

        <div className="position-relative mx-auto" style={{ maxWidth: "900px" }}>
          {/* Neon Vertical Line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "4px",
              background: "linear-gradient(to bottom, #0d6efd, #6610f2, #d63384)",
              transform: "translateX(-50%)",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(13,110,253,0.6)",
            }}
          />

          {timeline.map((item, index) => {
            const side = index % 2 === 0 ? "left" : "right";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: side === "left" ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className={`d-flex justify-content-${side === "left" ? "start" : "end"} mb-5 position-relative`}
              >
                {/* Glowing Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "25px",
                    width: "20px",
                    height: "20px",
                    background: "linear-gradient(45deg, #0d6efd, #6610f2)",
                    borderRadius: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    boxShadow: "0 0 20px rgba(13,110,253,0.8), 0 0 30px rgba(102,16,242,0.6)",
                  }}
                ></div>

                {/* GLASSMORPHISM CARD */}
                <motion.div
                  whileHover={{ scale: 1.03, rotateX: 3, rotateY: -3 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="rounded-4 shadow-lg p-4"
                  style={{
                    width: "45%",
                    backdropFilter: "blur(18px)",
                    background: darkMode ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.15), inset 0 0 20px rgba(255,255,255,0.05)",
                  }}
                >
                  <h5 className="fw-bold">{item.title}</h5>
                  <p className="mb-1 text-primary fw-semibold">{item.company}</p>
                  <small className="opacity-75">{item.year}</small>

                  {Array.isArray(item.desc) ? (
                    <ul className="mt-3">
                      {item.desc.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2">{item.desc}</p>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
