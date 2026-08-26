import { PROJECTS } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";

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
    <main className="min-h-screen bg-[#141210] text-white">
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

        <section className="flex flex-col gap-24">
          {project.gallery.map((item, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <div className="w-full rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl">
                {item.type === 'video' ? (
                  <video 
                    src={item.src} 
                    poster={item.poster}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <img 
                    src={item.src} 
                    alt={item.caption}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>
              <div className="flex items-start gap-4 px-4">
                <span className="text-sm font-mono text-white/30 mt-1">0{idx + 1}</span>
                <p className="text-lg text-white/70 font-light max-w-2xl">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </section>

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
