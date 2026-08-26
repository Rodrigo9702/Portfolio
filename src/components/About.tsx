"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section className="relative w-full py-32 px-6 md:px-20 bg-[#141210]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-start">
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
                className="block font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40"
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
          className="md:w-2/3 space-y-8 text-white/70 text-lg md:text-2xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            Soy AI Agent Developer Ssr. enfocado en crear, implementar y optimizar soluciones conversacionales basadas en Inteligencia Artificial. Combino mi experiencia en desarrollo con JavaScript, Python y Node.js con mi mentalidad analítica de QA Automation para construir sistemas escalables y libres de errores.
          </p>
          <p>
            Mi especialidad radica en orquestar Agentic Workflows, automatizar procesos con LangChain, n8n y conectar LLMs a herramientas corporativas mediante MCP de manera segura y eficiente.
          </p>
          <div className="pt-8 flex flex-col md:flex-row gap-8 border-t border-white/10 mt-8">
            <div>
              <span className="block text-4xl text-white font-bold mb-2">01.</span>
              <span className="text-sm uppercase tracking-widest text-white/50">AI & Agentic Workflows</span>
            </div>
            <div>
              <span className="block text-4xl text-white font-bold mb-2">02.</span>
              <span className="text-sm uppercase tracking-widest text-white/50">Fullstack & Integraciones</span>
            </div>
            <div>
              <span className="block text-4xl text-white font-bold mb-2">03.</span>
              <span className="text-sm uppercase tracking-widest text-white/50">QA Automation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
