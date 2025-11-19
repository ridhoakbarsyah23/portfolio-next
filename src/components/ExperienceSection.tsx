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
    <section id="experience" className={`py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} style={{ overflow: "hidden" }}>
      {" "}
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
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={index}
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
                    background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.75)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.15), inset 0 0 12px rgba(255,255,255,0.04)",
                    padding: "22px",
                  }}
                >
                  <h5 className="fw-bold mb-1">{item.title}</h5>
                  <p className="text-primary fw-semibold mb-0">{item.company}</p>
                  <small className="opacity-75">{item.year}</small>

                  <ul className="mt-3 mb-0" style={{ paddingLeft: "18px" }}>
                    {item.desc.map((d, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: "6px",
                          listStyle: "disc",
                        }}
                      >
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
      {/* MOBILE FIX (1 kolom rapi) */}
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
