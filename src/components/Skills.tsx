"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MouseEvent } from "react";

import { 
  SiN8N, SiJavascript, SiPython, SiNodedotjs, SiC, SiHtml5, SiCss, SiReact, 
  SiNextdotjs, SiGooglecloud, SiMongodb, SiGit
} from "react-icons/si";
import { FaRobot, FaNetworkWired, FaProjectDiagram, FaKeyboard, FaBrain, FaVial, FaDatabase, FaAws, FaGoogle, FaCubes, FaSearch, FaUserCheck, FaShieldAlt, FaSlidersH, FaTools } from "react-icons/fa";

const SKILL_CATEGORIES = [
  {
    title: "IA & Agentic Solutions",
    skills: [
      { name: "LangChain", icon: FaRobot, color: "#1c3c3c" },
      { name: "n8n", icon: SiN8N, color: "#ff6d5a" },
      { name: "Model Context Protocol (MCP)", icon: FaNetworkWired, color: "#4f46e5" },
      { name: "Agentic Workflows", icon: FaProjectDiagram, color: "#10b981" },
      { name: "Prompt Engineering", icon: FaKeyboard, color: "#f59e0b" },
      { name: "RAG", icon: FaSearch, color: "#3b82f6" },
      { name: "Human-in-the-Loop (HITL)", icon: FaUserCheck, color: "#8b5cf6" },
      { name: "AI Governance", icon: FaShieldAlt, color: "#ef4444" },
      { name: "Fine-Tuning", icon: FaSlidersH, color: "#06b6d4" },
      { name: "Tools & Skills", icon: FaTools, color: "#f97316" }
    ]
  },
  {
    title: "LLMs & APIs",
    skills: [
      { name: "OpenAI", icon: FaRobot, color: "#10a37f" },
      { name: "Anthropic", icon: FaBrain, color: "#d97757" },
      { name: "Gemini", icon: FaGoogle, color: "#4285f4" },
      { name: "LLaMA", icon: FaCubes, color: "#0668e1" }
    ]
  },
  {
    title: "Software & Web Dev",
    skills: [
      { name: "JavaScript", icon: SiJavascript, color: "#f7df1e" },
      { name: "Python", icon: SiPython, color: "#3776ab" },
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "C", icon: SiC, color: "#a8b9cc" },
      { name: "HTML / CSS", icon: SiHtml5, color: "#e34f26" },
      { name: "React / Next.js", icon: SiReact, color: "#61dafb" }
    ]
  },
  {
    title: "QA & Cloud",
    skills: [
      { name: "Tricentis Tosca", icon: FaVial, color: "#004b87" },
      { name: "AWS", icon: FaAws, color: "#ff9900" },
      { name: "Google Cloud", icon: SiGooglecloud, color: "#4285f4" },
      { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
      { name: "SQL", icon: FaDatabase, color: "#00758f" },
      { name: "Git", icon: SiGit, color: "#f05032" }
    ]
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
        {cat.skills.map((skill: any, j: number) => (
          <li key={j} className="group/item text-white/70 text-sm font-mono flex items-center gap-3 hover:text-white transition-colors cursor-default">
            <span 
              className="w-6 h-6 flex items-center justify-center bg-[#111] rounded-md border border-white/5 shadow-sm group-hover/item:border-white/20 transition-all duration-300"
            >
              <skill.icon 
                className="w-3.5 h-3.5 opacity-80 group-hover/item:opacity-100 transition-opacity duration-300" 
                style={{ color: skill.color || '#ffffff' }}
              />
            </span>
            {skill.name}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="w-full py-32 px-6 md:px-20 bg-[#1f1b18] text-white border-t border-white/5" style={{ perspective: "1000px" }}>
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
