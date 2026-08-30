"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useRef, useState, MouseEvent } from "react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (rect.left + rect.width / 2)) * 0.25;
    const y = (e.clientY - (rect.top + rect.height / 2)) * 0.25;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("castillorod.n@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="w-full relative bg-[#1f1b18] text-white overflow-hidden pt-32 pb-16 px-6 md:px-20 border-t border-white/5">
      
      {/* Background subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col relative z-10">
        
        {/* Main CTA */}
        <div className="flex flex-col items-center text-center mb-28 w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full flex flex-col items-center"
          >
            <span className="text-xs font-mono text-white/50 tracking-wider block mb-4">¿TIENES UN PROYECTO EN MENTE?</span>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter text-white uppercase leading-[0.95] mb-8">
              Iniciemos una <br /> conversación
            </h2>
            <p className="text-base sm:text-lg text-white/70 max-w-lg mb-10 font-light">
              Disponible para colaborar en desarrollo de agentes de IA, integraciones y soluciones a medida.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <motion.div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ x: smoothX, y: smoothY }}
                className="w-full sm:w-auto"
              >
                <a 
                  href="mailto:castillorod.n@gmail.com" 
                  className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-full text-base md:text-lg font-medium hover:bg-white/90 active:scale-[0.98] transition-all w-full sm:w-auto shadow-xl"
                >
                  <span>castillorod.n@gmail.com</span>
                  <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 -rotate-45" />
                  </div>
                </a>
              </motion.div>

              <button
                onClick={copyEmail}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-white/15 bg-white/[0.03] text-white/80 hover:text-white hover:border-white/30 active:scale-[0.98] transition-all text-sm font-mono"
                title="Copiar email al portapapeles"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Copiado al portapapeles</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-white/60" />
                    <span>Copiar correo</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Footer info grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/10 text-xs font-mono tracking-wider text-white/60">
          
          <div className="flex flex-col gap-2">
            <span className="text-white/30 uppercase">Ubicación</span>
            <span className="text-white/80">Buenos Aires, Argentina</span>
          </div>

          <div className="flex flex-col gap-2 md:items-center">
            <span className="text-white/30 uppercase">Canales</span>
            <div className="flex gap-6 text-white/80">
              <a href="https://github.com/Rodrigo9702" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub ↗</a>
              <a href="https://linkedin.com/in/rodrigoncastillo" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn ↗</a>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:items-end">
            <span className="text-white/30 uppercase">Desarrollo & Diseño</span>
            <span className="text-white/80">Rodrigo Castillo © 2026</span>
          </div>

        </div>
      </div>
    </section>
  );
}
