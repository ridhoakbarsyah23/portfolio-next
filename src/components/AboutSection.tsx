"use client";

import { motion } from "framer-motion";
import { Container } from "react-bootstrap";
import { useLanguage } from "@/components/LanguageProvider";

export default function AboutSection() {
  const { language } = useLanguage();

  return (
    <motion.section 
      id="about" 
      className="py-5 position-relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }} 
      viewport={{ once: true }}
    >
      <Container className="text-center position-relative" style={{ zIndex: 2 }}>
        <h2 className="fw-bold mb-4 text-gradient-primary fs-2">{language === "id" ? "Tentang Saya" : "About Me"}</h2>

        <p className="mx-auto fs-6 lh-lg" style={{ maxWidth: "750px", color: "var(--color-secondary)" }}>
          {language === "id" ? (
            <>
              Saya adalah individu dengan motivasi tinggi yang senang mempelajari hal baru dan menghadapi tantangan. Saya lulus sebagai Sarjana Ilmu Komputer dengan peminatan Rekayasa Perangkat Lunak dari Institut Teknologi Telkom Purwokerto dengan catatan akademik yang baik.
              <br /><br />
              Saya memiliki pengetahuan yang kuat dalam pengembangan web, pengembangan aplikasi mobile, dan desain UI/UX. Saya juga aktif dalam Himpunan Mahasiswa Rekayasa Perangkat Lunak serta mengikuti berbagai kompetisi di tingkat institusi dan nasional.
              <br /><br />
              Pengalaman tersebut membentuk kemampuan kepemimpinan, kerja sama tim, dan komunikasi yang mendukung perkembangan saya sebagai pegiat teknologi dan pemecah masalah.
            </>
          ) : (
            <>
              I am a highly motivated individual who enjoys learning new things and taking on new challenges. I graduated with a Bachelor&apos;s degree in Computer Science, majoring in Software Engineering at Telkom Institute of Technology Purwokerto with a strong academic record.
              <br /><br />
              I have solid knowledge in web development, mobile development, and UI/UX design. I was actively involved in the Software Engineering Student Association and participated in various competitions at institutional and national levels.
              <br /><br />
              Through these experiences, I have developed strong leadership, teamwork, and communication skills that support my growth as a technology enthusiast and problem solver.
            </>
          )}
        </p>
      </Container>
      
      {/* Decorative Glow */}
      <div 
        className="position-absolute top-50 start-50 translate-middle rounded-circle"
        style={{
          width: "40vw",
          height: "40vw",
          background: "rgba(37, 99, 235, 0.05)",
          filter: "blur(80px)",
          zIndex: 0,
          pointerEvents: "none"
        }}
      />
    </motion.section>
  );
}
