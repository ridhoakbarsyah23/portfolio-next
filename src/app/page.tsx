"use client";

import { useState, useEffect } from "react";
import "@/app/globals.css";
import NavbarComponent from "@/components/NavbarComponent";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ExperienceSection from "@/components/ExperienceSection";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeLink, setActiveLink] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact", "experience", "certificate", "blog"];
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

  return (
    <div className={`min-vh-100 ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <NavbarComponent darkMode={darkMode} setDarkMode={setDarkMode} activeLink={activeLink} />
      <HomeSection darkMode={darkMode} />
      <AboutSection />
      <ExperienceSection darkMode={darkMode} />
      <SkillsSection darkMode={darkMode} />
      <ProjectsSection darkMode={darkMode} />
      <ContactSection />
      <FooterSection darkMode={darkMode} />
    </div>
  );
}
