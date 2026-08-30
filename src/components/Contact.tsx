"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";

export default function Contact() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2; // Adjust magnet strength
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className="w-full relative bg-[#1f1b18] text-white overflow-hidden pt-32 pb-12 px-6 md:px-20 border-t border-white/10">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        
        {/* Main CTA */}
        <div className="flex flex-col items-center text-center mb-32 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-sm uppercase tracking-[0.3em] text-white/70 mb-12 max-w-2xl mx-auto">
              Si buscas a alguien para escalar tus proyectos o resolver problemas complejos...
            </h2>
            
            <a 
              href="mailto:castillorod.n@gmail.com" 
              className="group relative block w-full text-center"
            >
              <h1 className="text-[7vw] sm:text-[8vw] md:text-[9vw] lg:text-[7.5vw] font-bold tracking-tighter leading-none mb-8 text-white transition-all duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-white/50 group-hover:to-white">
                castillorod.n@gmail.com
              </h1>
              
              <motion.div 
                ref={buttonRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
                className="mx-auto flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-full text-lg md:text-xl font-medium hover:scale-105 transition-transform duration-300 w-max"
              >
                <span>Enviar un mensaje</span>
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 -rotate-45" />
                </div>
              </motion.div>
            </a>
          </motion.div>
        </div>

        {/* Footer info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 pt-12 border-t border-white/10 text-sm uppercase tracking-widest text-white/70">
          
          <div className="flex flex-col gap-4">
            <span className="text-white/30">Ubicación</span>
            <span className="text-white">Buenos Aires, Argentina</span>
          </div>

          <div className="flex flex-col gap-4 md:items-center">
            <span className="text-white/30">Socials</span>
            <div className="flex gap-6">
              <a href="https://github.com/Rodrigo9702" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
              <a href="https://linkedin.com/in/rodrigoncastillo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:items-end">
            <span className="text-white/30">Diseño & Desarrollo</span>
            <div className="flex items-center gap-3 text-white">
              <span>Rodrigo Castillo</span>
              <svg viewBox="0 0 9 8" className="w-4 h-4 fill-blue-500 animate-pulse" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 0 h2 v1 h-2 z M6 0 h2 v1 h-2 z M0 1 h4 v1 h-4 z M5 1 h4 v1 h-4 z M0 2 h9 v1 h-9 z M0 3 h9 v1 h-9 z M1 4 h7 v1 h-7 z M2 5 h5 v1 h-5 z M3 6 h3 v1 h-3 z M4 7 h1 v1 h-1 z" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
