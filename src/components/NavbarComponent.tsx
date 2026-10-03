"use client";

import { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageFlag from "@/components/LanguageFlag";

export default function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  // Scroll progress for the progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);

      const sections = ["home", "about", "experience", "skills", "projects", "certificates", "blog", "contact"];
      const scrollY = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && scrollY >= section.offsetTop) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDarkMode = mounted ? resolvedTheme === "dark" : true;

  const mainLinks = ["about", "experience", "projects", "blog", "contact"];
  const labels: Record<string, Record<typeof language, string>> = {
    home: { id: "Beranda", en: "Home" },
    about: { id: "Tentang", en: "About" },
    experience: { id: "Pengalaman", en: "Experience" },
    projects: { id: "Proyek", en: "Projects" },
    blog: { id: "Blog", en: "Blog" },
    contact: { id: "Kontak", en: "Contact" },
  };
  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(nextExpanded) => setExpanded(nextExpanded)}
      className={`custom-navbar border-0 ${isScrolled || expanded ? "py-2 shadow-sm" : "py-3"}`}
      style={{
        background: isScrolled || expanded ? "var(--color-card)" : "transparent",
        backdropFilter: isScrolled || expanded ? "blur(15px)" : "none",
        transition: "all 0.3s ease-in-out"
      }}
    >
      <Container>
        <Navbar.Brand href="#home" onClick={closeMenu} className="fw-bold" aria-label={language === "id" ? "Beranda portfolio Ridho Akbarsyah" : "Ridho Akbarsyah portfolio home"}>
          <span className="navbar-brand-name">Ridho<span className="text-primary">.</span></span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" aria-label={language === "id" ? "Buka menu navigasi" : "Open navigation menu"} className="border-0 shadow-none" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-2 mt-3 mt-lg-0">
            {mainLinks.map((id) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className={`nav-item-custom ${activeLink === id ? "active-link fw-bold" : ""}`}
                style={{ 
                  fontWeight: 500, 
                  fontSize: "0.95rem",
                  color: activeLink === id ? "var(--color-primary)" : "var(--color-secondary)"
                }}
              >
                {labels[id][language]}
              </Nav.Link>
            ))}

            <div className="nav-actions d-flex align-items-center gap-2 ms-lg-2 mt-3 mt-lg-0 pt-3 pt-lg-0">
              <button
                type="button"
                onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                className="nav-control"
                aria-label={isDarkMode
                  ? (language === "id" ? "Gunakan tema terang" : "Switch to light mode")
                  : (language === "id" ? "Gunakan tema gelap" : "Switch to dark mode")}
              >
                {isDarkMode ? <FaSun size={17} /> : <FaMoon size={17} />}
              </button>

              <button
                type="button"
                className="nav-control nav-language-control"
                onClick={() => setLanguage(language === "id" ? "en" : "id")}
                aria-label={language === "id" ? "Switch to English" : "Gunakan Bahasa Indonesia"}
                title={language === "id" ? "Switch to English" : "Gunakan Bahasa Indonesia"}
              >
                <LanguageFlag language={language === "id" ? "en" : "id"} />
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Scroll Progress Bar */}
      <motion.div
        className="position-absolute bottom-0 start-0 w-100 bg-primary"
        style={{ 
          height: "2px",
          scaleX, 
          transformOrigin: "0%",
          zIndex: 10
        }}
      />
    </Navbar>
  );
}
