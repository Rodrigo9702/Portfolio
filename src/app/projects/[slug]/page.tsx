import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Cpu, Globe, Layers } from "lucide-react";
import { Metadata } from "next";
import ProjectGallery from "@/components/ProjectGallery";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  
  if (!project) return { title: "Not Found" };
  
  return {
    title: `${project.title} — Caso de Estudio | Rodrigo Castillo`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const currentIndex = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[currentIndex];

  if (!project) {
    notFound();
  }

  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <main className="min-h-screen bg-[#1f1b18] text-white">
      
      {/* Background ambient lighting */}
      <div 
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full blur-[140px] opacity-10 pointer-events-none"
        style={{ backgroundColor: project.color || '#ffffff' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-20 pt-32 pb-24 relative z-10">
        
        {/* Navigation back */}
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2.5 text-white/60 hover:text-white transition-colors mb-16 font-mono tracking-wider text-xs group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>VOLVER A PROYECTOS</span>
        </Link>

        {/* Hero Header */}
        <header className="mb-20">
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
            <span className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-white/90">
              {project.category}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">{project.year}</span>
            {/* @ts-ignore */}
            {project.liveUrl && (
              <>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live en producción
                </span>
              </>
            )}
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-8 text-white">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl font-light leading-relaxed mb-12">
            {project.fullDescription}
          </p>

          {/* Project Metadata Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-10">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">Rol / Responsabilidad</span>
              <span className="text-sm text-white font-medium">Arquitectura & Desarrollo</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">Categoría</span>
              <span className="text-sm text-white font-medium">{project.category}</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">Año</span>
              <span className="text-sm text-white font-medium">{project.year}</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">Acceso</span>
              {/* @ts-ignore */}
              {project.liveUrl ? (
                <a 
                  // @ts-ignore
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white hover:underline decoration-white/40 font-medium"
                >
                  <span>Sitio público</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-sm text-white/70">Demo / Privado</span>
              )}
            </div>
          </div>

          {/* Tech Stack Pills */}
          {project.techStack && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-white/40 mr-2">TECNOLOGÍAS:</span>
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.02] text-xs font-mono text-white/80">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent mb-24" />

        {/* Gallery Section with Enhanced Framing */}
        <div className="mb-32">
          <div className="mb-12">
            <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">RECORRIDO VISUAL & CAPTURAS</span>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">Galería de Módulos</h2>
          </div>
          <ProjectGallery gallery={project.gallery} accentColor={project.color} />
        </div>

        {/* Next Project Teaser Footer */}
        <footer className="mt-32 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-white/50 tracking-wider">SIGUIENTE PROYECTO</span>
              <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
                {nextProject.title}
              </h3>
              <p className="text-sm text-white/60 font-mono mt-1">
                {nextProject.category} · {nextProject.year}
              </p>
            </div>
            
            <Link 
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 active:scale-[0.98] transition-all shrink-0"
            >
              <span>Ver Caso de Estudio</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>

      </div>
    </main>
  );
}
