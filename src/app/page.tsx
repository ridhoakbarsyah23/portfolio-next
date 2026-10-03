import "@/app/globals.css";
import NavbarComponent from "@/components/NavbarComponent";
import HomeSection from "@/components/HomeSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import FooterSection from "@/components/FooterSection";
import ExperienceSection from "@/components/ExperienceSection";
import BlogSection from "@/components/BlogSection";

export default function Home() {
  return (
    <div className="min-vh-100">
      <NavbarComponent />
      <HomeSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ProjectsSection />
      <CertificatesSection />
      <BlogSection />
      <ContactSection />
      <FooterSection />
    </div>
  );
}
