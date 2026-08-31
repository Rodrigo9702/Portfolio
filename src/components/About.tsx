"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="relative w-full py-32 px-5 sm:px-8 md:px-20 bg-[#1f1b18] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20 items-start">
        <div className="md:w-1/3" ref={ref}>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight flex flex-col gap-2">
            <span className="overflow-hidden block">
              <motion.span 
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              >
                Diseñando
              </motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span 
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              >
                el Futuro
              </motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span 
                className="block font-bold text-white"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
              >
                Conversacional
              </motion.span>
            </span>
          </h2>
        </div>

        <motion.div 
          className="md:w-2/3 space-y-8 text-white/90 text-lg md:text-xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            Soy AI Agent Developer Ssr. enfocado en crear, implementar y optimizar soluciones conversacionales basadas en Inteligencia Artificial. Combino mi experiencia en desarrollo de software con una sólida mentalidad analítica proveniente de mi formación en QA Automation para construir sistemas escalables y libres de errores.
          </p>
          <p>
            Mi especialidad radica en diseñar arquitecturas complejas de intenciones, orquestar Agentic Workflows, automatizar procesos con LangChain y n8n, y conectar LLMs a herramientas corporativas mediante MCP (Model Context Protocol).
          </p>
          <p>
            Estudiante de 3.º año de Ingeniería en Informática (UNLaM). Disfruto colaborar junto a equipos de Producto y Negocio bajo metodologías ágiles, aportando resolución rápida de problemas y aprendizaje autónomo para transformar necesidades en agentes virtuales inteligentes.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 mt-10">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <span className="block text-2xl font-mono text-white/40 mb-2">01</span>
              <h3 className="text-base font-medium text-white mb-1">AI & Agentic Workflows</h3>
              <p className="text-xs text-white/60 font-light">Orquestación de LLMs, MCP y flujos multi-agente.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <span className="block text-2xl font-mono text-white/40 mb-2">02</span>
              <h3 className="text-base font-medium text-white mb-1">Integraciones & Dev</h3>
              <p className="text-xs text-white/60 font-light">Node.js, Python, APIs y automatización en n8n.</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors">
              <span className="block text-2xl font-mono text-white/40 mb-2">03</span>
              <h3 className="text-base font-medium text-white mb-1">QA & Robustez</h3>
              <p className="text-xs text-white/60 font-light">Automatización, testing estructurado y confiabilidad.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
