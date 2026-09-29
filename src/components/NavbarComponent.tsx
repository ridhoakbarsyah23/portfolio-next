"use client";

import { useState, useEffect } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { FaMoon, FaSun, FaGithub, FaLinkedin } from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Scroll progress for the progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setIsScrolled(true);
      else setIsScrolled(false);

      const sections = ["home", "about", "experience", "skills", "projects", "blog", "contact"];
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

  const mainLinks = ["home", "about", "experience", "skills", "projects", "blog"];

  const formatLabel = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);
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
        <Navbar.Brand href="#home" onClick={closeMenu} className="fw-bold d-flex align-items-baseline gap-2" aria-label="Ridho Akbarsyah portfolio home">
          <span style={{ color: "var(--color-foreground)", fontSize: "1.5rem" }}>Ridho<span className="text-primary">.</span></span>
          <span className="d-none d-sm-inline-block" style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--color-secondary)" }}>Frontend Dev</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="border-0 shadow-none" style={{ color: "var(--color-foreground)" }} />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-3 gap-2 mt-3 mt-lg-0">
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
                {formatLabel(id)}
              </Nav.Link>
            ))}

            <div className="d-flex align-items-center gap-3 ms-lg-3 mt-3 mt-lg-0 pt-3 pt-lg-0 nav-social-divider">
              <a href="https://github.com/ridhoakbarsyah23" target="_blank" rel="noopener noreferrer" className="nav-icon-link" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="https://linkedin.com/in/ridhoakbarsyah" target="_blank" rel="noopener noreferrer" className="nav-icon-link" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>

              <Button
                variant="link"
                onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                className="nav-icon-link p-0 text-decoration-none border-0"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
              </Button>
            </div>

            <Button
              as="a"
              href="#contact"
              onClick={closeMenu}
              variant="primary"
              className="rounded-pill px-4 py-2 ms-lg-3 mt-3 mt-lg-0 fw-semibold shadow-sm d-inline-flex align-items-center justify-content-center gap-2"
            >
              <span className="position-relative d-flex align-items-center justify-content-center" style={{ width: "10px", height: "10px" }}>
                <span className="position-absolute w-100 h-100 rounded-circle bg-success opacity-75 animate-ping"></span>
                <span className="position-relative rounded-circle bg-success" style={{ width: "8px", height: "8px" }}></span>
              </span>
              Hire Me
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Scroll Progress Bar */}
      <motion.div
        className="position-absolute bottom-0 start-0 w-100 bg-primary"
        style={{ 
          height: "3px", 
          scaleX, 
          transformOrigin: "0%",
          zIndex: 10
        }}
      />
    </Navbar>
  );
}
