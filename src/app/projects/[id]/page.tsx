import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetailContent from "@/components/ProjectDetailContent";
import { getProjectById, getProjectContent, projects } from "@/data/projects";
import { absoluteUrl, siteConfig } from "@/lib/seo";

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return { title: "Project Not Found - Ridho Akbarsyah" };
  }

  const content = getProjectContent(project, "id");
  const images = project.image ? [{ url: project.image, alt: content.title }] : undefined;

  return {
    title: content.title,
    description: content.desc,
    alternates: { canonical: absoluteUrl(`/projects/${project.id}`) },
    keywords: [content.title, content.category, content.role, ...project.tags],
    openGraph: {
      title: content.title,
      description: content.desc,
      url: absoluteUrl(`/projects/${project.id}`),
      siteName: siteConfig.name,
      images,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.desc,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
