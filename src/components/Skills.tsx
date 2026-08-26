"use client";

import { motion } from "framer-motion";

const SKILL_CATEGORIES = [
  {
    title: "IA & Agentic Solutions",
    skills: ["LangChain", "n8n", "Model Context Protocol (MCP)", "Agentic Workflows", "Prompt Engineering"]
  },
  {
    title: "LLMs & APIs",
    skills: ["OpenAI", "Anthropic", "Gemini", "LLaMA"]
  },
  {
    title: "Software & Web Dev",
    skills: ["JavaScript", "Python", "Node.js", "C", "HTML", "CSS", "React/Next.js"]
  },
  {
    title: "QA & Cloud",
    skills: ["Tricentis Tosca (AS1, AS2)", "AWS", "Google Cloud", "MongoDB", "SQL", "Git"]
  }
];

export default function Skills() {
  return (
    <section className="w-full py-32 px-6 md:px-20 bg-[#141210] text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-16 text-center">Habilidades Técnicas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-8 border border-white/10 hover:bg-white/[0.02] transition-colors relative group overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <h3 className="text-xl font-light mb-6 text-white">{cat.title}</h3>
              <ul className="flex flex-col gap-3">
                {cat.skills.map((skill, j) => (
                  <li key={j} className="text-white/50 text-sm font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
