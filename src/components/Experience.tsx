"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
    title: "LangChain Academy",
    issuer: "LangChain",
    url: "https://academy.langchain.com/certificates/y9essigl5u"
  },
  {
    title: "Anthropic Claude (Credential 1)",
    issuer: "Anthropic / Skilljar",
    url: "https://verify.skilljar.com/c/zw6u3mvun8s9"
  },
  {
    title: "Anthropic Claude (Credential 2)",
    issuer: "Anthropic / Skilljar",
    url: "https://verify.skilljar.com/c/xcudfesa58at"
  },
  {
    title: "n8n Course Level 1",
    issuer: "n8n",
    url: "#"
  },
  {
    title: "n8n Course Level 2",
    issuer: "n8n",
    url: "#"
  },
  {
    title: "Tricentis Tosca Automation Specialist (AS1)",
    issuer: "Tricentis",
    url: "https://academy.tricentis.com/share/gamification/badges/external/db97fd29-0266-4c85-a6a0-568022362ec1?lang=en"
  },
  {
    title: "Tricentis Tosca Automation Specialist (AS2)",
    issuer: "Tricentis",
    url: "https://academy.tricentis.com/share/gamification/badges/external/2fd69330-f69c-4aa4-8398-3fd6eb1c33ff?lang=en"
  },
  {
    title: "Diplomatura en Desarrollo Fullstack",
    issuer: "Educación IT",
    url: "https://www.educacionit.com/perfil/rodrigo-castillo-1099958/certificado/81291?_gl"
  }
];

export default function Experience() {
  const [hoveredCert, setHoveredCert] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return (
    <section className="relative w-full py-32 px-6 md:px-20 bg-[#141210] text-white">
      
      {/* Floating Certificate Preview */}
      <motion.div
        className="fixed top-0 left-0 w-80 h-48 pointer-events-none z-50 hidden md:flex flex-col items-center justify-center bg-[#111] border border-white/20 rounded-lg overflow-hidden shadow-2xl"
        animate={{
          x: mousePosition.x - 160,
          y: mousePosition.y - 120,
          opacity: hoveredCert !== null ? 1 : 0,
          scale: hoveredCert !== null ? 1 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-0" />
        
        {hoveredCert !== null && CERTIFICATIONS[hoveredCert].url !== "#" ? (
          <img 
            src={`https://api.microlink.io/?url=${encodeURIComponent(CERTIFICATIONS[hoveredCert].url)}&screenshot=true&meta=false&embed=screenshot.url`}
            alt="Certificate Preview"
            className="absolute inset-0 w-full h-full object-cover opacity-90 z-10"
          />
        ) : (
          <div className="z-10 text-center px-4 flex flex-col items-center">
            <span className="text-white/40 text-xs uppercase tracking-widest mb-2">Credential Preview</span>
            {hoveredCert !== null && (
               <span className="text-white font-medium text-sm">
                  {CERTIFICATIONS[hoveredCert].issuer}
               </span>
            )}
            <ArrowUpRight className="w-8 h-8 text-white/50 mt-4" />
          </div>
        )}
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
        
        {/* Experience Column */}
        <div className="flex-1">
          <h2 className="text-sm uppercase tracking-widest text-white/50 mb-12">Experiencia Laboral</h2>
          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className="group"
              >
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-4">
                  <h3 className="text-2xl md:text-3xl font-light text-white group-hover:text-white/80 transition-colors">
                    {exp.role}
                  </h3>
                  <span className="text-sm text-white/50 font-mono mt-2 md:mt-0">{exp.date}</span>
                </div>
                <h4 className="text-lg text-white/70 mb-4">{exp.company}</h4>
                <ul className="space-y-2">
                  {exp.desc.map((item, j) => (
                    <li key={j} className="text-white/40 text-sm font-light flex items-start gap-3">
                      <span className="text-white/20 mt-1">▹</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education & Certs Column */}
        <div className="flex-1 flex flex-col gap-20">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-12">Educación</h2>
            <div className="flex flex-col gap-12">
              {EDUCATION.map((edu, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                >
                  <div className="flex flex-col mb-2">
                    <h3 className="text-2xl md:text-3xl font-light text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-white/50 font-mono mt-2">{edu.date}</span>
                  </div>
                  <h4 className="text-lg text-white/70">{edu.institution}</h4>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm uppercase tracking-widest text-white/50 mb-12">Certificaciones Destacadas</h2>
            <div className="flex flex-col gap-2">
              {CERTIFICATIONS.map((cert, i) => (
                <a
                  key={i}
                  href={cert.url}
                  target={cert.url !== "#" ? "_blank" : "_self"}
                  rel="noreferrer"
                  onMouseEnter={() => setHoveredCert(i)}
                  onMouseLeave={() => setHoveredCert(null)}
                  className="group block relative z-10 border-l border-white/20 pl-6 py-4 hover:bg-white/[0.02] transition-colors cursor-none"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                  >
                    <h3 className="text-xl md:text-2xl font-light text-white mb-2 group-hover:translate-x-2 transition-transform duration-300">
                      {cert.title}
                    </h3>
                    <h4 className="text-sm text-white/50 font-mono">{cert.issuer}</h4>
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
