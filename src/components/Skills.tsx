"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

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

function SkillCard({ cat, index }: { cat: any; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="p-8 border border-white/10 hover:bg-white/[0.02] transition-colors relative group overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <h3 className="text-xl font-light mb-6 text-white transform-gpu" style={{ transform: "translateZ(20px)" }}>{cat.title}</h3>
      <ul className="flex flex-col gap-3 transform-gpu" style={{ transform: "translateZ(10px)" }}>
        {cat.skills.map((skill: string, j: number) => (
          <li key={j} className="text-white/50 text-sm font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
            {skill}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="w-full py-32 px-6 md:px-20 bg-[#141210] text-white border-t border-white/5" style={{ perspective: "1000px" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-sm uppercase tracking-widest text-white/50 mb-16 text-center">Habilidades Técnicas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={i} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
