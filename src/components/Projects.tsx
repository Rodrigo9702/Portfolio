"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 125);
  };

  return (
    <section 
      id="projects" 
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 px-6 md:px-20 bg-[#1f1b18] text-white border-t border-white/5"
    >
      {/* Sleek Floating Image Placeholder */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-40 hidden md:flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.85,
        }}
        transition={{ duration: 0.2 }}
      >
        {hoveredIndex !== null && (
          <div className="absolute inset-0 w-full h-full bg-[#181513]">
            {PROJECTS[hoveredIndex].video ? (
              <video 
                src={PROJECTS[hoveredIndex].video} 
                poster={PROJECTS[hoveredIndex].poster}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-95"
              />
            ) : (
              <img 
                src={PROJECTS[hoveredIndex].image} 
                alt={PROJECTS[hoveredIndex].title} 
                className="w-full h-full object-cover opacity-95"
              />
            )}
            <div className="absolute inset-0 opacity-15 mix-blend-overlay" style={{ backgroundColor: PROJECTS[hoveredIndex].color }} />
          </div>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">PROYECTOS SELECCIONADOS</span>
            <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight">Trabajos Destacados</h2>
          </div>
          <p className="text-xs text-white/40 font-mono max-w-sm md:text-right">
            * Muestras y capturas de carácter ilustrativo para demostración técnica.
          </p>
        </div>
        
        <div className="border-t border-white/10 flex flex-col">
          {PROJECTS.map((project, index) => (
            <Link key={index} href={`/projects/${project.slug}`} className="block">
              <motion.div
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-10 md:py-12 border-b border-white/10 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial="initial"
                whileHover="hover"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 z-10 pointer-events-none">
                  <span className="text-white/30 text-sm font-mono">0{index + 1}</span>
                  <h3 className="text-3xl md:text-6xl font-light tracking-tighter group-hover:translate-x-3 transition-transform duration-300 text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-4 md:mt-0 flex flex-row items-center justify-between md:justify-end gap-6 z-10 pointer-events-none w-full md:w-auto">
                  <div className="flex flex-col items-start md:items-end gap-1.5">
                    <div className="flex items-center gap-3 text-xs md:text-sm text-white/80 font-mono">
                      <span className="uppercase tracking-wider">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30"></span>
                      <span>{project.year}</span>
                    </div>
                    <motion.div 
                      className="overflow-hidden hidden md:block"
                      variants={{
                        initial: { height: 0, opacity: 0 },
                        hover: { height: "auto", opacity: 1 }
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="max-w-[320px] text-right text-white/70 text-xs md:text-sm mt-2 font-light">
                        {project.description}
                      </p>
                    </motion.div>
                    <div className="mt-2 md:hidden text-white/70 text-xs font-light">
                      {project.description}
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 md:flex hidden flex-shrink-0">
                    <ArrowUpRight className="w-8 h-8 text-white/80" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
