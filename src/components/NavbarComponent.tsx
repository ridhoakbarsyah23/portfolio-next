"use client";

import { useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeLink: string;
}

export default function NavbarComponent({ darkMode, setDarkMode, activeLink }: Props) {
  const [expanded, setExpanded] = useState(false);

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
            {["home", "about", "experience", "skills", "projects", "contact", "blog"].map((id) => (
              <Nav.Link
                key={id}
                href={`#${id}`}
                onClick={() => setExpanded(false)} // ⬅️ AUTO CLOSE NAVBAR
                className={`${activeLink === id ? "fw-semibold text-primary" : ""}`}
              >
                {id.charAt(0).toUpperCase() + id.slice(1)}
              </Nav.Link>
            ))}

            <Button variant={darkMode ? "light" : "dark"} size="sm" className="ms-3 rounded-circle" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
