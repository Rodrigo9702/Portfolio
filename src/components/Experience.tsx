"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, MouseEvent } from "react";
import { ArrowUpRight } from "lucide-react";

const EXPERIENCE = [
  {
    role: "AI Agent Developer Ssr",
    company: "Botmaker",
    date: "Abril 2025 - Actualidad",
    desc: [
      "Lidero el diseño y despliegue de soluciones agénticas de IA escalables, integrando la lógica de negocio con LLMs.",
      "Desarrollo ecosistemas conversacionales de alta complejidad mediante la definición de intenciones y orquestación de Agentic Workflows.",
      "Implemento MCP (Model Context Protocol) para integración segura de herramientas corporativas.",
      "Automatizo procesos y construyo integraciones robustas en JavaScript, Node.js y Python.",
    ],
  },
  {
    role: "QA Tester Jr / Analista de Testing",
    company: "QActions Group",
    date: "Septiembre 2024 - Marzo 2025",
    desc: [
      "Diseñé y ejecuté casos de prueba manuales y automatizados para sistemas críticos.",
      "Automaticé procesos de testing con Tricentis Tosca (certificaciones AS1 y AS2).",
      "Identifiqué y documenté defectos en el ciclo de vida del software (SDLC).",
      "Trabajé en equipos técnicos bajo marcos Agile y Scrum.",
    ],
  },
];

const EDUCATION = [
  {
    degree: "Ingeniería en Informática",
    institution: "Universidad Nacional de La Matanza",
    date: "2022 - Actualidad (3.º año)",
  },
  {
    degree: "Técnico Electrónico",
    institution: "Escuela Secundaria Técnica N.° 6",
    date: "2015 - 2021",
  },
];

const CERTIFICATIONS = [
  {
    title: "Foundation: Introduction to Deep Agents",
    issuer: "LangChain",
    url: "https://academy.langchain.com/certificates/y9essigl5u",
    localImage: "/media/certs/LangChain.jpg"
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    url: "https://verify.skilljar.com/c/zw6u3mvun8s9"
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    url: "https://verify.skilljar.com/c/xcudfesa58at"
  },
  {
    title: "n8n Course Level 2",
    issuer: "n8n",
    url: "#",
    localImage: "/media/certs/n8n_lvl2.jpg"
  },
  {
    title: "n8n Course Level 1",
    issuer: "n8n",
    url: "#",
    localImage: "/media/certs/n8n_lvl1.jpg"
  },
  {
    title: "Gestión de Proyectos y Fundamentos Agile",
    issuer: "Santander Open Academy",
    url: "#",
    localImage: "/media/certs/scrum_santander.jpg"
  },
  {
    title: "Programación orientada a objetos con IA",
    issuer: "EducacionIT",
    url: "https://www.educacionit.com/perfil/rodrigo-castillo-1099958/certificado/81291?_gl",
    localImage: "/media/certs/educacion_it.png"
  },
  {
    title: "Tricentis Tosca Fundamentals (AS2)",
    issuer: "Tricentis",
    url: "https://academy.tricentis.com/share/v1/gamification/assigned_badge/db97fd29-0266-4c85-a6a0-568022362ec1/shared?lang=en",
    localImage: "/media/certs/Tricentis_AS2.png"
  },
  {
    title: "Tricentis Tosca Fundamentals (AS1)",
    issuer: "Tricentis",
    url: "https://academy.tricentis.com/share/v1/gamification/assigned_badge/2fd69330-f69c-4aa4-8398-3fd6eb1c33ff/shared?lang=en",
    localImage: "/media/certs/Tricentis_AS1.png"
  },
  {
    title: "Deep Learning",
    issuer: "CACIC",
    url: "#",
    localImage: "/media/certs/cacic.jpg"
  }
];

export default function Experience() {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  const handleMouseMove = (e: MouseEvent) => {
    mouseX.set(e.clientX - 160);
    mouseY.set(e.clientY - 120);
  };

  return (
    <section 
      id="experience" 
      onMouseMove={handleMouseMove}
      className="relative w-full py-32 px-6 md:px-20 bg-[#1f1b18] text-white border-t border-white/5"
    >
      
      {/* Floating Certificate Preview */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-48 pointer-events-none z-50 hidden md:flex flex-col items-center justify-center bg-[#181513] border border-white/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          opacity: hoveredCert !== null ? 1 : 0,
          scale: hoveredCert !== null ? 1 : 0.85,
        }}
        transition={{ duration: 0.2 }}
      >
        {hoveredCert !== null && (CERTIFICATIONS[hoveredCert].localImage || CERTIFICATIONS[hoveredCert].url !== "#") ? (
          <img 
            src={CERTIFICATIONS[hoveredCert].localImage || `https://api.microlink.io/?url=${encodeURIComponent(CERTIFICATIONS[hoveredCert].url)}&screenshot=true&meta=false&embed=screenshot.url`}
            alt="Certificate Preview"
            className="w-full h-full object-cover opacity-95"
          />
        ) : (
          <div className="z-10 text-center px-4 flex flex-col items-center">
            <span className="text-white/60 text-xs font-mono tracking-widest mb-2">CREDENTIAL PREVIEW</span>
            {hoveredCert !== null && (
               <span className="text-white font-medium text-sm">
                  {CERTIFICATIONS[hoveredCert].issuer}
               </span>
            )}
            <ArrowUpRight className="w-6 h-6 text-white/70 mt-3" />
          </div>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-20">
        
        {/* Experience Column */}
        <div className="flex-1">
          <div className="mb-12">
            <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">TRAYECTORIA</span>
            <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">Experiencia Laboral</h2>
          </div>

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h3 className="text-xl md:text-2xl font-medium text-white group-hover:text-white/90 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-xs text-white/60 font-mono mt-1 md:mt-0">{exp.date}</span>
                </div>
                <h4 className="text-sm font-mono text-emerald-400/90 mb-4">{exp.company}</h4>
                <ul className="space-y-2.5">
                  {exp.desc.map((item, j) => (
                    <li key={j} className="text-white/70 text-sm font-light flex items-start gap-2.5 leading-relaxed">
                      <span className="text-white/30 mt-0.5 select-none">›</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Certs Column */}
        <div className="flex-1 flex flex-col gap-16">
          <div>
            <div className="mb-8">
              <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">FORMACIÓN</span>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">Educación</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              {EDUCATION.map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                    <h3 className="text-lg md:text-xl font-medium text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-xs text-white/60 font-mono mt-1 sm:mt-0">{edu.date}</span>
                  </div>
                  <h4 className="text-sm text-white/70">{edu.institution}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-8">
              <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">LOGROS & VALIDACIONES</span>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight">Certificaciones Destacadas</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CERTIFICATIONS.map((cert, i) => (
                <a
                  key={i}
                  href={cert.url}
                  target={cert.url !== "#" ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  onMouseEnter={() => setHoveredCert(i)}
                  onMouseLeave={() => setHoveredCert(null)}
                  className="group block p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.99] transition-all"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex flex-col justify-between h-full"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-sm font-medium text-white group-hover:text-white transition-colors leading-snug">
                        {cert.title}
                      </h3>
                      <ArrowUpRight className="w-3.5 h-3.5 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
                    </div>
                    <span className="text-xs text-white/60 font-mono">{cert.issuer}</span>
                  </motion.div>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
