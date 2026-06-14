"use client";

import { useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { FaMoon, FaSun } from "react-icons/fa";

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeLink: string;
}

export default function NavbarComponent({ darkMode, setDarkMode, activeLink }: Props) {
  const [expanded, setExpanded] = useState(false);

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
      variant={darkMode ? "dark" : "light"}
      data-bs-theme={darkMode ? "dark" : "light"}
      className={`custom-navbar ${darkMode ? "dark" : "light"}`}
    >
      <Container>
        <Navbar.Brand href="#home" onClick={closeMenu} className="fw-bold brand-text" aria-label="Ridho Akbarsyah portfolio home">
          Ridho<span className="text-primary">.</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" className="border-0 custom-toggler" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-4 gap-2">
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
              menuVariant={darkMode ? "dark" : "light"}
            >
              {infoLinks.map((id) => (
                <NavDropdown.Item key={id} href={`#${id}`} onClick={closeMenu} active={activeLink === id}>
                  {formatLabel(id)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            <Button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle d-inline-flex align-items-center justify-content-center gap-2"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              aria-pressed={darkMode}
            >
              {darkMode ? <FaSun aria-hidden="true" /> : <FaMoon aria-hidden="true" />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
