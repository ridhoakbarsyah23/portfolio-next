"use client";

import { Container } from "react-bootstrap";
import { motion } from "framer-motion";

interface Props {
  darkMode: boolean;
}

export default function ExperienceSection({ darkMode }: Props) {
  const timeline = [
    {
      year: "Desember 2025 - Saat ini",
      title: "Programmer",
      company: "Freelance",
      desc: [
        "Mengembangkan aplikasi POS untuk UMKM.",
        "Mengembangkan aplikasi AI Agent untuk customer service.",
      ],
    },
    {
      year: "Agustus 2025 - November 2025",
      title: "Programmer",
      company: "PT Data Kreatif",
      desc: [
        "Mengembangkan dan memelihara fitur pada sistem SIMRS dan EMR untuk mendukung operasional rumah sakit.",
        "Mengidentifikasi dan memperbaiki bug aplikasi untuk meningkatkan stabilitas dan keandalan sistem.",
        "Berkoordinasi dengan tim implementor dan pengguna rumah sakit untuk memahami kebutuhan serta menerjemahkannya menjadi solusi teknis.",
        "Melakukan testing dan debugging untuk memastikan fitur berjalan sesuai kebutuhan dan fungsi yang ditentukan.",
        "Melakukan peningkatan dan penyesuaian fitur berdasarkan feedback pengguna dan kebutuhan operasional.",
      ],
    },
    {
      year: "Januari 2025 - Juli 2025",
      title: "Programmer",
      company: "Freelance",
      desc: [
        "Mengembangkan dan merancang aplikasi Dieng Run Event.",
      ],
    },
    {
      year: "Januari 2023 - Januari 2024",
      title: "Frontend Developer",
      company: "PT Tristar Surya Gemilang",
      desc: [
        "Mengembangkan fitur pada SISAPPRA versi 2.0 Satpol PP DKI Jakarta.",
        "Mengembangkan fitur pada NEW LMS Bank BJB untuk segmen UMKM.",
      ],
    },
    {
      year: "Juli 2021 - September 2021",
      title: "Frontend Developer Intern",
      company: "CV Bahira Studio",
      desc: [
        'Merancang ulang antarmuka pengguna (UI) untuk website sistem keuangan "Laraduit".',
        "Mengembangkan tampilan antarmuka yang lebih terstruktur dan sesuai dengan kebutuhan sistem.",
      ],
    },
  ];

  return (
    <section id="experience" className={`py-5 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`} style={{ overflow: "hidden" }}>
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
                    background: darkMode ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.75)",
                    border: darkMode ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
                    boxShadow: "0 8px 22px rgba(0,0,0,0.15), inset 0 0 12px rgba(255,255,255,0.04)",
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
