"use client";

import { motion } from "framer-motion";
import { Container, Row, Col } from "react-bootstrap";
import { FaExternalLinkAlt, FaAward } from "react-icons/fa";
import { certificates } from "@/data/certificates";
import { useLanguage } from "@/components/LanguageProvider";

export default function CertificatesSection() {
  const { language } = useLanguage();

  return (
    <motion.section
      id="certificates"
      className="py-5 position-relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <Container className="position-relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="d-inline-flex align-items-center justify-content-center px-3 py-2 rounded-pill mb-3"
            style={{ 
              background: "rgba(13, 110, 253, 0.1)", 
              color: "#0d6efd",
              border: "1px solid rgba(13, 110, 253, 0.2)"
            }}
          >
            <FaAward className="me-2" />
            <span className="fw-semibold small text-uppercase tracking-wider">{language === "id" ? "Pencapaian" : "Achievements"}</span>
          </motion.div>
          <h2 className="fw-bold text-primary fs-1 mb-3">{language === "id" ? "Sertifikasi" : "Certifications"}</h2>
          <p
            className="mx-auto"
            style={{ maxWidth: "600px", color: "var(--color-secondary)" }}
          >
            {language === "id"
              ? "Pembelajaran berkelanjutan dan validasi keahlian melalui sertifikasi serta spesialisasi yang diakui industri."
              : "Continuous learning and skill validation through industry-recognized certifications and specializations."}
          </p>
        </div>

        <Row className="g-4 justify-content-center">
          {certificates.map((cert, i) => (
            <Col key={cert.id} lg={4} md={6} sm={12} className="d-flex">
              <motion.div
                className="certificate-card w-100 rounded-4 overflow-hidden position-relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {/* Image Section */}
                <div className="cert-img-wrapper position-relative overflow-hidden">
                  <motion.img
                    src={cert.image}
                    alt={cert.title}
                    className="w-100 h-100 object-fit-cover cert-img"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div className="cert-overlay position-absolute top-0 start-0 w-100 h-100" />
                  <div className="position-absolute top-0 end-0 m-3">
                    <span className="badge rounded-pill cert-category-badge px-3 py-2">
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="cert-content p-4 d-flex flex-column glassmorphism-bg">
                  <h4 className="fw-bold mb-2 cert-title">{cert.title}</h4>
                  
                  <div className="d-flex align-items-center mb-3 mt-1 text-muted small fw-medium">
                    <span className="text-primary me-2 fw-bold">{cert.issuer}</span>
                    <span className="mx-2 opacity-50">•</span>
                    <span>{cert.date}</span>
                  </div>

                  <div className="mt-auto pt-4">
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn cert-btn w-100 d-flex align-items-center justify-content-center gap-2 fw-semibold rounded-3 py-2"
                    >
                      {language === "id" ? "Lihat Sertifikat" : "View Credential"} <FaExternalLinkAlt size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Decorative Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100 pointer-events-none" style={{ zIndex: 0, opacity: 0.4 }}>
        <div className="position-absolute rounded-circle" style={{ width: "400px", height: "400px", background: "radial-gradient(circle, rgba(13,110,253,0.15) 0%, rgba(255,255,255,0) 70%)", top: "-10%", left: "-10%" }} />
        <div className="position-absolute rounded-circle" style={{ width: "600px", height: "600px", background: "radial-gradient(circle, rgba(102,16,242,0.1) 0%, rgba(255,255,255,0) 70%)", bottom: "-20%", right: "-10%" }} />
      </div>

      <style jsx>{`
        .certificate-card {
          background-color: var(--color-card);
          border: 1px solid var(--color-border);
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .certificate-card:hover {
          box-shadow: 0 25px 50px rgba(13, 110, 253, 0.15);
          border-color: rgba(13, 110, 253, 0.3);
        }

        [data-bs-theme="dark"] .certificate-card:hover {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          border-color: rgba(96, 165, 250, 0.3);
        }

        .cert-img-wrapper {
          height: 200px;
        }

        .cert-img {
          transition: transform 0.6s ease;
        }

        .cert-overlay {
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .certificate-card:hover .cert-overlay {
          opacity: 1;
        }

        .cert-category-badge {
          background: rgba(255, 255, 255, 0.9);
          color: #000;
          font-weight: 600;
          letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        [data-bs-theme="dark"] .cert-category-badge {
          background: rgba(0, 0, 0, 0.7);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .cert-content {
          flex: 1;
          z-index: 2;
        }

        .glassmorphism-bg {
          background: var(--color-card);
        }

        .cert-title {
          font-size: 1.25rem;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cert-btn {
          background: rgba(13, 110, 253, 0.08);
          color: #0d6efd;
          border: 1px solid rgba(13, 110, 253, 0.2);
          transition: all 0.3s ease;
        }

        .cert-btn:hover {
          background: #0d6efd;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(13, 110, 253, 0.3);
        }

        [data-bs-theme="dark"] .cert-btn {
          background: rgba(96, 165, 250, 0.1);
          color: #93c5fd;
          border-color: rgba(96, 165, 250, 0.2);
        }

        [data-bs-theme="dark"] .cert-btn:hover {
          background: #3b82f6;
          color: white;
          box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </motion.section>
  );
}
