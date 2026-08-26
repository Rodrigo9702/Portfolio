"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PROJECTS } from "@/data/projects";

export default function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section className="relative w-full py-32 px-6 md:px-20 bg-[#1f1b18] text-white">
      {/* Sleek Floating Image Placeholder */}
      <motion.div
        className="fixed top-0 left-0 w-[400px] h-[250px] pointer-events-none z-40 hidden md:flex items-center justify-center border border-white/20 bg-black/40 backdrop-blur-md rounded-xl overflow-hidden shadow-2xl"
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 125,
          opacity: hoveredIndex !== null ? 1 : 0,
          scale: hoveredIndex !== null ? 1 : 0.8,
          rotate: hoveredIndex !== null ? (mousePosition.x % 10) - 5 : 0,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        {hoveredIndex !== null && (
          <div className="absolute inset-0 w-full h-full bg-[#111]">
            {PROJECTS[hoveredIndex].video ? (
              <video 
                src={PROJECTS[hoveredIndex].video} 
                poster={PROJECTS[hoveredIndex].poster}
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover opacity-90"
              />
            ) : (
              <img 
                src={PROJECTS[hoveredIndex].image} 
                alt={PROJECTS[hoveredIndex].title} 
                className="w-full h-full object-cover opacity-90"
              />
            )}
            <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundColor: PROJECTS[hoveredIndex].color }} />
          </div>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <h2 className="text-sm uppercase tracking-widest text-white/70">Selected Works</h2>
          <p className="text-xs text-white/30 font-mono max-w-sm md:text-right">
            * Disclaimer: Las muestras y capturas exhibidas en los proyectos son de carácter ilustrativo y no contienen datos reales.
          </p>
        </div>
        
        <div className="border-t border-white/10 flex flex-col">
          {PROJECTS.map((project, index) => (
            <Link key={index} href={`/projects/${project.slug}`} className="block">
              <motion.div
                className="group relative flex flex-col md:flex-row md:items-center justify-between py-12 border-b border-white/10 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                initial="initial"
                whileHover="hover"
              >
                <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12 z-10 mix-blend-difference pointer-events-none">
                  <span className="text-white/30 text-sm font-mono">0{index + 1}</span>
                  <h3 className="text-4xl md:text-7xl font-light tracking-tighter group-hover:translate-x-4 transition-transform duration-500">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-6 md:mt-0 flex flex-row items-center justify-between md:justify-end gap-8 z-10 pointer-events-none w-full md:w-auto">
                  <div className="flex flex-col items-start md:items-end gap-2 mix-blend-difference">
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span className="uppercase tracking-widest">{project.category}</span>
                      <span className="w-1 h-1 rounded-full bg-white/30"></span>
                      <span>{project.year}</span>
                    </div>
                    <motion.div 
                      className="overflow-hidden hidden md:block"
                      variants={{
                        initial: { height: 0, opacity: 0 },
                        hover: { height: "auto", opacity: 1 }
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className="max-w-[280px] text-right text-white/70 text-sm mt-4">
                        {project.description}
                      </p>
                    </motion.div>
                    <div className="mt-4 md:hidden text-white/70 text-sm">
                      {project.description}
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:flex hidden flex-shrink-0 mix-blend-difference">
                    <ArrowUpRight className="w-12 h-12 text-white" />
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
