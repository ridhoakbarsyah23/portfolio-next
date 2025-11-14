"use client";

import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

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
        "Fixing bugs in the Hospital Information System (SIMRS).",
        "Developing new features based on user requirements.",
        "Coordinating with implementation teams to identify needs.",
        "Performing testing and debugging to ensure functionality.",
      ],
    },
    {
      year: "2023",
      title: "Frontend Developer",
      company: "PT. Tristar Surya Gemilang",
      desc: ["Developed SISAPPRA 2.0 Website for Satpol PP DKI Jakarta.", "Enhanced features for Satpol PP Website.", "Developed NEW LMS Website for Bank BJB UMKM Segment."],
    },
    {
      year: "2021",
      title: "Frontend Developer Intern",
      company: "CV. Bahira Studio",
      desc: ["Redesigned UI for the financial system website “Laraduit”."],
    },
  ];

  return (
    <section id="experience" className={`py-5 position-relative ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      {/* Background Soft Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at center, rgba(0, 123, 255, 0.12), transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <Container>
        <motion.h2
          className="text-center fw-bold mb-5"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            color: "#0d6efd",
            letterSpacing: "1px",
            fontSize: "2.4rem",
          }}
        >
          Experience
        </motion.h2>

        <div className="timeline-container position-relative mx-auto" style={{ maxWidth: "900px" }}>
          {/* Vertical Neon Line */}
          <motion.div
            className="timeline-line"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "3px",
              background: "linear-gradient(to bottom, #0d6efd, #6610f2, #d63384)",
              transform: "translateX(-50%)",
              borderRadius: "10px",
              boxShadow: "0 0 18px rgba(13,110,253,0.6)",
            }}
          />

          {timeline.map((item, index) => {
            const side = index % 2 === 0 ? "start" : "end";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: side === "start" ? -90 : 90 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className={`d-flex justify-content-${side} mb-5 position-relative`}
              >
                {/* Dot Glow */}
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "-22px",
                    width: "18px",
                    height: "18px",
                    background: "linear-gradient(45deg, #0d6efd, #6610f2)",
                    borderRadius: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 10,
                    boxShadow: "0 0 15px rgba(13,110,253,0.8), 0 0 25px rgba(102,16,242,0.5)",
                  }}
                />

                {/* Premium Card */}
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="timeline-card rounded-4 shadow-lg p-4"
                  style={{
                    width: "45%",
                    backdropFilter: "blur(16px)",
                    background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.45)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.15), inset 0 0 15px rgba(255,255,255,0.08)",
                    transition: "0.3s",
                  }}
                >
                  <h5 className="fw-bold mb-1">{item.title}</h5>
                  <p className="text-primary fw-semibold mb-0">{item.company}</p>
                  <small className="opacity-75">{item.year}</small>

                  <ul className="mt-3 mb-0">
                    {item.desc.map((d, i) => (
                      <li key={i} style={{ marginBottom: "6px" }}>
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
    </section>
  );
}
