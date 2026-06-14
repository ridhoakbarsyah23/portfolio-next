"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";

interface Props {
  darkMode: boolean;
}

export default function ProjectsSection({ darkMode }: Props) {
  const projects = [
    {
      title: "Online Data System (ODS) Mandiri Kementerian Koperasi RI",
      category: "Government",
      tags: ["Next.js", "API", "Government"],
      desc: "Online Data System (ODS) Koperasi adalah sistem berbasis digital yang dirancang untuk mempermudah pencatatan, pelaporan, serta pembaruan data koperasi secara mandiri oleh koperasi dan dinas koperasi sebagai instansi pembina.",
      image: "/projects/ods.png",
    },
    {
      title: "SIMRS",
      category: "Healthcare",
      tags: ["Laravel", "API", "Hospital"],
      desc: "A Hospital Management Information System designed to support hospital operations online.",
      image: "/projects/simrs.jpg",
    },
    {
      title: "EMR",
      category: "Medical Records",
      tags: ["Laravel", "UI/UX", "Data"],
      desc: "An Electronic Medical Record system for digital recording and management of patient medical data.",
      image: "/projects/emr.jpg",
    },
    {
      title: "SISAPPRA Satpol PP DKI Jakarta",
      category: "Government",
      tags: ["Dashboard", "Reporting", "Monitoring"],
      desc: "A monitoring and reporting platform for the operational activities of Satpol PP of DKI Jakarta Province.",
      image: "/projects/sisappra.png",
    },
  ];

  return (
    <motion.section
      id="projects"
      className={`text-center py-5 position-relative overflow-hidden ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <div className="d-flex flex-column align-items-center mb-4">
          <h2 className="fw-bold text-primary fs-2">Projects</h2>

          <p
            className={`mt-3 mb-0 mx-auto ${
              darkMode ? "text-light opacity-75" : "text-muted"
            }`}
            style={{ maxWidth: 700 }}
          >
            Built systems for health, operations, and government reporting with
            clean interfaces, better navigation, and fast feedback loops.
          </p>
        </div>

        <Row className="justify-content-center g-4 align-items-stretch">
          {projects.map((p, i) => (
            <Col key={i} lg={4} md={6} sm={12} className="d-flex">
              <motion.article
                className={`project-card-custom rounded-4 overflow-hidden border-0 d-flex flex-column w-100 ${
                  darkMode ? "project-card-dark text-light" : "project-card-light text-dark"
                }`}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: darkMode
                    ? "0 20px 50px rgba(0, 123, 255, 0.25)"
                    : "0 20px 55px rgba(13, 110, 253, 0.18)",
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 180,
                  damping: 18,
                }}
              >
                <div className="position-relative overflow-hidden project-image-wrapper">
                  <motion.img
                    src={p.image}
                    alt={p.title}
                    className="w-100 project-card-image"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.45 }}
                  />

                  <div className="project-card-category d-inline-flex align-items-center justify-content-center position-absolute top-0 end-0 m-3 rounded-pill px-3 py-1 text-white fw-semibold">
                    {p.category}
                  </div>
                </div>

                <div className="p-4 d-flex flex-column flex-grow-1">
                  <div>
                    <h5 className="fw-bold mb-2 project-title">{p.title}</h5>

                    <p
                      className={`small mb-3 project-desc ${
                        darkMode ? "text-light opacity-75" : "text-muted"
                      }`}
                    >
                      {p.desc}
                    </p>

                    <div className="project-tags-wrapper d-flex flex-wrap gap-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`project-tag px-3 py-1 rounded-pill small ${
                            darkMode ? "project-tag-dark" : "project-tag-light"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-auto d-flex justify-content-between align-items-center pt-4 project-footer">
                    <span className="small text-primary fw-semibold">
                      User centered
                    </span>

                    <span
                      className={`project-badge rounded-pill px-3 py-1 small ${
                        darkMode ? "project-badge-dark" : "project-badge-light"
                      }`}
                    >
                      Designed for clarity
                    </span>
                  </div>
                </div>
              </motion.article>
            </Col>
          ))}
        </Row>
      </Container>

      <div className="project-bg-deco position-absolute top-0 start-0 w-100 h-100" />

      <style jsx>{`
        .project-card-custom {
          min-height: 540px;
          transition: all 0.3s ease;
        }

        .project-card-light {
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
        }

        .project-card-dark {
          background: #111827;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .project-image-wrapper {
          height: 220px;
          flex-shrink: 0;
        }

        .project-card-image {
          height: 220px;
          object-fit: cover;
          display: block;
        }

        .project-card-category {
          background: linear-gradient(135deg, #0d6efd, #6610f2);
          font-size: 0.75rem;
          box-shadow: 0 8px 20px rgba(13, 110, 253, 0.35);
        }

        .project-title {
          min-height: 56px;
          line-height: 1.35;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-desc {
          min-height: 72px;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .project-tags-wrapper {
          min-height: 34px;
        }

        .project-tag {
          font-weight: 500;
          font-size: 0.75rem;
        }

        .project-tag-light {
          background: rgba(13, 110, 253, 0.08);
          color: #0d6efd;
        }

        .project-tag-dark {
          background: rgba(13, 110, 253, 0.18);
          color: #93c5fd;
        }

        .project-footer {
          min-height: 58px;
        }

        .project-badge-light {
          background: #f1f5f9;
          color: #475569;
        }

        .project-badge-dark {
          background: rgba(255, 255, 255, 0.08);
          color: #d1d5db;
        }

        .project-bg-deco {
          pointer-events: none;
          opacity: 0.35;
          background: radial-gradient(
            circle at top right,
            rgba(13, 110, 253, 0.18),
            transparent 35%
          );
          z-index: 1;
        }

        @media (max-width: 768px) {
          .project-card-custom {
            min-height: auto;
          }

          .project-title {
            min-height: auto;
          }

          .project-desc {
            min-height: auto;
          }
        }
      `}</style>
    </motion.section>
  );
}
