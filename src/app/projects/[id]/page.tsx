import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Container } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { getProjectById, projects } from "@/data/projects";
import { absoluteUrl, siteConfig } from "@/lib/seo";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return {
      title: "Project Not Found - Ridho Akbarsyah",
    };
  }

  return {
    title: project.title,
    description: project.desc,
    alternates: {
      canonical: absoluteUrl(`/projects/${project.id}`),
    },
    keywords: [project.title, project.category, project.role, ...project.tags],
    openGraph: {
      title: project.title,
      description: project.desc,
      url: absoluteUrl(`/projects/${project.id}`),
      siteName: siteConfig.name,
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.desc,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="project-detail-page bg-dark text-light min-vh-100">
      <section className="project-detail-hero">
        <Container className="py-5">
          <Link href="/#projects" className="text-decoration-none mb-4 d-inline-flex align-items-center gap-2 text-info fw-semibold">
            <FaArrowLeft aria-hidden="true" /> Back to Portfolio
          </Link>

          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <Badge bg="primary" className="rounded-pill px-3 py-2 mb-3">
                {project.category}
              </Badge>

              <h1 className="fw-bold mb-3">{project.title}</h1>
              <p className="lead text-light opacity-75 mb-4">{project.desc}</p>

              <div className="d-flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="project-detail-tag rounded-pill px-3 py-2 small fw-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div className="project-detail-image position-relative overflow-hidden">
                <Image src={project.image} alt={project.title} fill priority sizes="(max-width: 992px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <div className="row g-4 mb-5">
            {[
              ["Role", project.role],
              ["Problem", project.problem],
              ["Impact", project.impact],
            ].map(([label, value]) => (
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
              <h2 className="h3 fw-bold mb-3">Overview</h2>
              <p className="text-light opacity-75 lh-lg mb-0">{project.overview}</p>
            </div>

            <div className="col-lg-7">
              <div className="project-detail-grid">
                <ProjectList title="Responsibilities" items={project.responsibilities} />
                <ProjectList title="Key Features" items={project.features} />
                <ProjectList title="Outcomes" items={project.outcomes} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <style>{`
        .project-detail-hero {
          padding-top: 56px;
          background:
            linear-gradient(135deg, rgba(13, 110, 253, 0.18), transparent 36%),
            #0b1220;
        }

        .project-detail-page h1 {
          font-size: clamp(2.1rem, 5vw, 4rem);
          line-height: 1.08;
          letter-spacing: 0;
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
          letter-spacing: 0;
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
