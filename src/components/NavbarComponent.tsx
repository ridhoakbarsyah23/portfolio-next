"use client";

import { useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeLink: string;
}

export default function NavbarComponent({
  darkMode,
  setDarkMode,
  activeLink,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  const mainLinks = ["home", "about", "blog"];
  const infoLinks = ["experience", "skills", "certificate", "projects", "contact"];

  return (
    <Navbar
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      className={`custom-navbar ${darkMode ? "dark" : "light"}`}
    >
      <Container>
        {/* BRAND */}
        <Navbar.Brand href="#home" className="fw-bold brand-text">
          Ridho<span className="text-primary">.</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto align-items-lg-center gap-lg-4 gap-2">
            {/* MAIN LINKS */}
            {mainLinks.map((id) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                onClick={() => setExpanded(false)}
                className={`nav-item-custom ${
                  activeLink === id ? "active" : ""
                }`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Nav.Link>
            ))}

            {/* DROPDOWN */}
            <NavDropdown
              title="Information"
              id="info-dropdown"
              className={`nav-item-custom ${
                infoLinks.includes(activeLink) ? "active" : ""
              }`}
            >
              {infoLinks.map((id) => (
                <NavDropdown.Item
                  key={id}
                  href={`#${id}`}
                  onClick={() => setExpanded(false)}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* DARK MODE */}
            <Button
              onClick={() => setDarkMode(!darkMode)}
              className="theme-toggle"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
