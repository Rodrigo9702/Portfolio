import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    title: `${project.title} | Rodrigo Castillo`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#1f1b18] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-20 py-32">
        
        <Link href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-16 uppercase tracking-widest text-sm">
          <ArrowLeft className="w-4 h-4" />
          Volver al Inicio
        </Link>

        <header className="mb-20">
          <div className="flex items-center gap-4 text-sm text-white/60 mb-6 font-mono">
            <span className="uppercase tracking-widest">{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/30"></span>
            <span>{project.year}</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-light tracking-tighter mb-8 text-white">
            {project.title}
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 max-w-3xl font-light leading-relaxed">
            {project.fullDescription}
          </p>

          {/* @ts-ignore */}
          {project.liveUrl && (
            <div className="mt-8">
              <a 
                // @ts-ignore
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:bg-transparent hover:text-white border border-white transition-colors "
              >
                Visitar Sitio Web
                <ArrowLeft className="w-4 h-4 rotate-135" style={{ transform: 'rotate(135deg)' }} />
              </a>
            </div>
          )}

          {project.techStack && (
            <div className="mt-12 flex flex-wrap gap-3">
              {project.techStack.map((tech, i) => (
                <span key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-white/70">
                  {tech}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="w-full h-[1px] bg-white/10 mb-20" />

        <ProjectGallery gallery={project.gallery} />

        <footer className="mt-32 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-white/50 text-sm uppercase tracking-widest">
            Proyecto / {project.title}
          </div>
          <Link href="/" className="px-8 py-4 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
            Volver al Portafolio
          </Link>
        </footer>

      </div>
    </main>
  );
}
