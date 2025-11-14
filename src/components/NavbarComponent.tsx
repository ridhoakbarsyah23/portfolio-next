"use client";

import { Container, Navbar, Nav, Button } from "react-bootstrap";

interface Props {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  activeLink: string;
}

export default function NavbarComponent({ darkMode, setDarkMode, activeLink }: Props) {
  return (
    <Navbar expand="lg" fixed="top" className={darkMode ? "navbar-dark bg-dark shadow-sm" : "navbar-light bg-white shadow-sm"}>
      <Container>
        <Navbar.Brand href="#home" className="fw-bold fs-3">
          🌐 Ridho
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="ms-auto align-items-center gap-3">
            {[
              "home",
              "about",
              "experience", // <= Timeline Pengalaman
              "skills",
              "projects",
              "contact",
            ].map((id) => (
              <Nav.Link key={id} href={`#${id}`} className={`${activeLink === id ? "fw-semibold text-primary" : ""}`}>
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
