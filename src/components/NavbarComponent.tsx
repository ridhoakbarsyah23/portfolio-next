"use client";

import { useState, useEffect } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "next-themes";

export default function NavbarComponent() {
  const [expanded, setExpanded] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled for shrink effect
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Scroll spy logic
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

  const mainLinks = ["home", "about"];
  const infoLinks = ["experience", "skills", "projects", "blog", "contact"];

  const formatLabel = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);
  const closeMenu = () => setExpanded(false);

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={(nextExpanded) => setExpanded(nextExpanded)}
      variant={isDarkMode ? "dark" : "light"}
      data-bs-theme={isDarkMode ? "dark" : "light"}
      className={`custom-navbar ${isDarkMode ? "dark" : "light"} ${isScrolled || expanded ? "py-2 scrolled" : "py-4 top"}`}
    >
      <Container>
        <Navbar.Brand href="#home" onClick={closeMenu} className="fw-bold brand-text" aria-label="Ridho Akbarsyah portfolio home">
          Ridho<span className="text-primary">.</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="border-0 custom-toggler" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-4 gap-2 mt-3 mt-lg-0">
            {mainLinks.map((id) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                onClick={closeMenu}
                className={`nav-item-custom ${activeLink === id ? "active" : ""}`}
              >
                {formatLabel(id)}
              </Nav.Link>
            ))}

            <NavDropdown
              title="More"
              id="info-dropdown"
              className={`nav-item-custom ${infoLinks.includes(activeLink) ? "active" : ""}`}
              menuVariant={isDarkMode ? "dark" : "light"}
            >
              {infoLinks.map((id) => (
                <NavDropdown.Item key={id} href={`#${id}`} onClick={closeMenu} active={activeLink === id}>
                  {formatLabel(id)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Button
              onClick={() => setTheme(isDarkMode ? "light" : "dark")}
              className="theme-toggle d-inline-flex align-items-center justify-content-center gap-2 mt-2 mt-lg-0 ms-lg-2"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={isDarkMode}
            >
              {isDarkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
              <span className="d-none d-lg-inline">{isDarkMode ? "Light" : "Dark"}</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
