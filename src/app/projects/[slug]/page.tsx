import { PROJECTS, getLocalizedText } from "@/data/projects";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ProjectDetailClient from "@/components/ProjectDetailClient";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
  if (!project) return { title: "Not Found" };
  
  const description = getLocalizedText(project.description, "es");

  return {
    title: `${project.title} — Caso de Estudio | Rodrigo Castillo`,
    description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[currentIndex];

  if (!project) {
    notFound();
  }

  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return <ProjectDetailClient project={project} nextProject={nextProject} />;
}
