"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageFlag from "@/components/LanguageFlag";
import { getProjectContent, type ProjectItem } from "@/data/projects";

export default function ProjectDetailContent({ project }: { project: ProjectItem }) {
  const { language, setLanguage } = useLanguage();
  const content = getProjectContent(project, language);

  const summary = [
    [language === "id" ? "Peran" : "Role", content.role],
    [language === "id" ? "Konteks" : "Context", content.organization],
    [language === "id" ? "Periode" : "Period", content.period],
  ];

  return (
    <main className="project-detail-page bg-dark text-light min-vh-100">
      <section className="project-detail-hero">
        <Container className="py-5">
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mb-4">
            <Link href="/#projects" className="text-decoration-none d-inline-flex align-items-center gap-2 text-info fw-semibold">
              <FaArrowLeft aria-hidden="true" /> {language === "id" ? "Kembali ke Portfolio" : "Back to Portfolio"}
            </Link>

            <button
              type="button"
              className="project-language-switch"
              onClick={() => setLanguage(language === "id" ? "en" : "id")}
              aria-label={language === "id" ? "Switch to English" : "Gunakan Bahasa Indonesia"}
              title={language === "id" ? "Switch to English" : "Gunakan Bahasa Indonesia"}
            >
              <LanguageFlag language={language === "id" ? "en" : "id"} />
            </button>
          </div>

          <div className="row g-5 align-items-center">
            <div className={project.image ? "col-lg-6" : "col-lg-8"}>
              <Badge bg="primary" className="rounded-pill px-3 py-2 mb-3">
                {content.category}
              </Badge>

              <h1 className="fw-bold mb-3">{content.title}</h1>
              <p className="lead text-light opacity-75 mb-3">{content.desc}</p>
              {content.location && <p className="small text-light opacity-50 mb-4">{content.location}</p>}

              <div className="d-flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-detail-tag rounded-pill px-3 py-2 small fw-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {project.image && (
              <div className="col-lg-6">
                <div className="project-detail-image position-relative overflow-hidden">
                  <Image src={project.image} alt={content.title} fill priority sizes="(max-width: 992px) 100vw, 50vw" style={{ objectFit: "cover" }} />
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="row g-4 mb-5">
            {summary.map(([label, value]) => (
              <div key={label} className="col-lg-4">
                <div className="project-detail-summary h-100">
                  <span>{label}</span>
                  <p className="mb-0">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="row g-5">
            <div className="col-lg-5">
              <h2 className="h3 fw-bold mb-3">{language === "id" ? "Ringkasan" : "Overview"}</h2>
              <p className="text-light opacity-75 lh-lg mb-0">{content.overview}</p>
            </div>

            <div className="col-lg-7">
              <div className="project-detail-grid">
                <ProjectList title={language === "id" ? "Kontribusi" : "Contributions"} items={content.contributions} />
                <ProjectList title={language === "id" ? "Ruang Lingkup" : "Project Scope"} items={content.scope} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style jsx global>{`
        .project-detail-hero {
          padding-top: 56px;
          background: linear-gradient(135deg, rgba(13, 110, 253, 0.18), transparent 36%), #0b1220;
        }

        .project-detail-page h1 {
          color: #ffffff;
          font-size: clamp(2.1rem, 5vw, 4rem);
          line-height: 1.08;
          letter-spacing: 0;
        }

        .project-detail-page h2 {
          color: #ffffff;
        }

        .project-detail-image {
          aspect-ratio: 16 / 10;
          border: 1px solid rgba(148, 163, 184, 0.22);
          border-radius: 24px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
        }

        .project-detail-tag {
          background: rgba(147, 197, 253, 0.14);
          border: 1px solid rgba(147, 197, 253, 0.24);
          color: #bfdbfe;
        }

        .project-language-switch {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          padding: 0;
          border: 1px solid rgba(147, 197, 253, 0.24);
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.72);
          font-size: 1.15rem;
          line-height: 1;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .project-language-switch:hover,
        .project-language-switch:focus-visible {
          border-color: #60a5fa;
          background: rgba(37, 99, 235, 0.24);
        }

        .project-language-switch .language-flag-svg {
          width: 22px;
          height: 15px;
        }

        .project-detail-summary {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(148, 163, 184, 0.18);
          border-radius: 18px;
          padding: 1.25rem;
        }

        .project-detail-summary span,
        .project-detail-list span {
          color: #60a5fa;
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }

        .project-detail-summary p,
        .project-detail-list li {
          color: rgba(255, 255, 255, 0.76);
          line-height: 1.65;
        }

        .project-detail-grid {
          display: grid;
          gap: 1.25rem;
        }

        .project-detail-list {
          border-top: 1px solid rgba(148, 163, 184, 0.2);
          padding-top: 1.25rem;
        }

        .project-detail-list ul {
          display: grid;
          gap: 0.7rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .project-detail-list li {
          padding-left: 1.1rem;
          position: relative;
        }

        .project-detail-list li::before {
          background: #60a5fa;
          border-radius: 999px;
          content: "";
          height: 6px;
          left: 0;
          position: absolute;
          top: 0.65rem;
          width: 6px;
        }

        @media (max-width: 768px) {
          .project-detail-hero {
            padding-top: 32px;
          }

          .project-detail-image {
            border-radius: 18px;
          }
        }
      `}</style>
    </main>
  );
}

function ProjectList({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="project-detail-list">
      <span>{title}</span>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
