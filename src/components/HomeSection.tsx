"use client";

import { Container, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaDownload, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

interface Props {
  darkMode: boolean;
}

export default function HomeSection({ darkMode }: Props) {
  return (
    <section
      id="home"
      className={`d-flex align-items-center justify-content-center text-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}
      style={{
        minHeight: "100vh",
        background: darkMode ? "linear-gradient(135deg, #0d1117 0%, #161b22 100%)" : "linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)",
        transition: "background 0.5s ease",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="profile-container p-5 rounded-4 shadow-lg mx-auto"
          style={{
            background: darkMode ? "rgba(28, 28, 30, 0.85)" : "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(12px)",
            maxWidth: "550px",
          }}
        >
          {/* Foto bulat */}
          <motion.div
            className="photo-wrapper mx-auto mb-4 position-relative"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background: darkMode ? "linear-gradient(135deg, #00bcd4 0%, #2196f3 100%)" : "linear-gradient(135deg, #007bff 0%, #00c6ff 100%)",
              padding: "5px",
              boxShadow: darkMode ? "0 0 30px rgba(0, 188, 212, 0.5)" : "0 0 30px rgba(0, 123, 255, 0.5)",
              animation: "pulseGlow 3s infinite alternate",
            }}
          >
            <Image
              src="/img-myself/Background-Merah.jpg"
              alt="My Profile"
              width={200}
              height={200}
              style={{
                objectFit: "cover",
                borderRadius: "50%",
                border: darkMode ? "3px solid #0d1117" : "3px solid #fff",
              }}
              priority
            />
          </motion.div>

          <motion.h1 className="fw-bold mb-2 display-6 text-primary" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            Ridho Akbarsyah Ramadhan
          </motion.h1>

          <motion.p className="mb-4 fs-5 text-secondary" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            Frontend Developer &nbsp;|&nbsp; Cilacap, Central Java
          </motion.p>

          <motion.div className="d-flex flex-column flex-sm-row justify-content-center gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <Button variant="primary" href="#projects" size="lg" className="px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-sm">
              🚀 See Projects
              <FaArrowRight />
            </Button>

            <a href="/CV_Ridho_Akbarsyah_Ramadhan.pdf" download className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-primary"} btn-lg px-4 py-2 rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-sm`}>
              <FaDownload /> Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="position-absolute"
          style={{
            bottom: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            opacity: 0.7,
            fontSize: "0.9rem",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            🔽 Scroll down
          </motion.span>
        </motion.div>
      </Container>

      {/* Animasi Glow */}
      <style jsx global>{`
        @keyframes pulseGlow {
          0% {
            box-shadow: 0 0 25px rgba(0, 123, 255, 0.4), 0 0 40px rgba(0, 123, 255, 0.2);
          }
          100% {
            box-shadow: 0 0 50px rgba(0, 123, 255, 0.8), 0 0 80px rgba(0, 123, 255, 0.4);
          }
        }
      `}</style>
    </section>
  );
}
