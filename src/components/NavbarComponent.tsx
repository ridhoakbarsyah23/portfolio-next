"use client";

import { useState } from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeLink: string;
}

export default function NavbarComponent({ darkMode, setDarkMode, activeLink }: Props) {
  const [expanded, setExpanded] = useState(false);

  const mainLinks = ["home", "about", "blog"];
  const infoLinks = ["experience", "skills", "certificate", "projects", "contact"];

  return (
    <Navbar expand="lg" expanded={expanded} onToggle={(val) => setExpanded(val)} fixed="top" className={darkMode ? "navbar-dark bg-dark shadow-sm" : "navbar-light bg-white shadow-sm"}>
      <Container>
        <Navbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <span style={{ fontSize: "1.7rem" }}>🌐</span>
          <span
            style={{
              fontWeight: "800",
              fontSize: "1.5rem",
              letterSpacing: "1px",
            }}
          >
            Ridho
          </span>
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-3">
            {/* === MAIN LINKS (Home, About, Blog) === */}
            {mainLinks.map((id) => (
              <Nav.Link key={id} href={`#${id}`} onClick={() => setExpanded(false)} className={`${activeLink === id ? "fw-semibold text-primary" : ""}`}>
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Nav.Link>
            ))}

            {/* === INFORMATION DROPDOWN === */}
            <NavDropdown title="Information" id="information-dropdown" className={activeLink && infoLinks.includes(activeLink) ? "fw-semibold text-primary" : ""}>
              {infoLinks.map((id) => (
                <NavDropdown.Item key={id} href={`#${id}`} onClick={() => setExpanded(false)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </NavDropdown.Item>
              ))}
            </NavDropdown>

            {/* === DARK MODE BUTTON === */}
            <Button variant={darkMode ? "light" : "dark"} size="sm" className="ms-2 rounded-circle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
