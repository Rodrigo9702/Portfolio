"use client";

import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import { Project, getLocalizedText } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

export default function ProjectDetailClient({
  project,
  nextProject
}: {
  project: Project;
  nextProject: Project;
}) {
  const { language, t } = useLanguage();

  const category = getLocalizedText(project.category, language);
  const fullDescription = getLocalizedText(project.fullDescription, language);
  const nextCategory = getLocalizedText(nextProject.category, language);

  return (
    <article className="min-h-screen bg-[#1f1b18] text-white pt-28 sm:pt-32 pb-24 px-5 sm:px-8 md:px-20 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div 
        className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none opacity-20"
        style={{ backgroundColor: project.color }} 
      />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Navigation back */}
        <Link 
          href="/#projects" 
          className="inline-flex items-center gap-2.5 text-white/60 hover:text-white transition-colors mb-12 sm:mb-16 font-mono tracking-wider text-xs group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>{t.projectDetail.back}</span>
        </Link>

        {/* Hero Header */}
        <header className="mb-16 sm:mb-20">
          <div className="flex flex-wrap items-center gap-3 mb-6 font-mono text-xs">
            <span className="px-3 py-1 rounded-full border border-white/15 bg-white/[0.04] text-white/90">
              {category}
            </span>
            <span className="text-white/40">·</span>
            <span className="text-white/60">{project.year}</span>
            {project.liveUrl && (
              <>
                <span className="text-white/40">·</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.projectDetail.live}
                </span>
              </>
            )}
          </div>
          
          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tighter mb-6 sm:mb-8 text-white">
            {project.title}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-4xl font-light leading-relaxed mb-10 sm:mb-12">
            {fullDescription}
          </p>

          {/* Project Metadata Specs Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md mb-10">
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                {t.projectDetail.roleLabel}
              </span>
              <span className="text-sm text-white font-medium">
                {t.projectDetail.roleValue}
              </span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                {t.projectDetail.categoryLabel}
              </span>
              <span className="text-sm text-white font-medium">{category}</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                {t.projectDetail.yearLabel}
              </span>
              <span className="text-sm text-white font-medium">{project.year}</span>
            </div>
            <div>
              <span className="block text-[11px] font-mono uppercase tracking-wider text-white/40 mb-1.5">
                {t.projectDetail.accessLabel}
              </span>
              {project.liveUrl ? (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-white hover:underline decoration-white/40 font-medium"
                >
                  <span>{t.projectDetail.accessLive}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ) : (
                <span className="text-sm text-white/70">
                  {t.projectDetail.accessPrivate}
                </span>
              )}
            </div>
          </div>

          {/* Tech Stack Pills */}
          {project.techStack && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-white/40 mr-2">
                {t.projectDetail.techStackLabel}
              </span>
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
            <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">
              {t.projectDetail.galleryLabel}
            </span>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">
              {t.projectDetail.galleryTitle}
            </h2>
          </div>
          <ProjectGallery gallery={project.gallery} accentColor={project.color} />
        </div>

        {/* Next Project Teaser Footer */}
        <footer className="mt-32 pt-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 p-8 md:p-12 rounded-3xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-mono text-white/50 tracking-wider">
                {t.projectDetail.nextLabel}
              </span>
              <h3 className="text-4xl md:text-6xl font-light tracking-tighter text-white">
                {nextProject.title}
              </h3>
              <p className="text-sm text-white/60 font-mono mt-1">
                {nextCategory} · {nextProject.year}
              </p>
            </div>
            
            <Link 
              href={`/projects/${nextProject.slug}`}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-medium text-sm hover:bg-white/90 active:scale-[0.98] transition-all shrink-0"
            >
              <span>{t.projectDetail.viewCaseStudy}</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </footer>

      </div>
    </article>
  );
}
