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
  const mouseXSpotlight = useMotionValue(0);
  const mouseYSpotlight = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 18 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    mouseXSpotlight.set(mouseX);
    mouseYSpotlight.set(mouseY);
    
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
      className="p-7 rounded-2xl border border-white/10 bg-white/[0.02] hover:border-white/25 transition-all duration-300 relative group overflow-hidden"
    >
      {/* Dynamic Cursor Spotlight */}
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useTransform(
            [mouseXSpotlight, mouseYSpotlight],
            ([sx, sy]) => `radial-gradient(400px circle at ${sx}px ${sy}px, rgba(255,255,255,0.06), transparent 80%)`
          )
        }}
      />

      <h3 className="text-base font-medium mb-6 text-white transform-gpu tracking-tight" style={{ transform: "translateZ(20px)" }}>
        {cat.title}
      </h3>
      <ul className="flex flex-col gap-2.5 transform-gpu" style={{ transform: "translateZ(10px)" }}>
        {cat.skills.map((skill: any, j: number) => (
          <li key={j} className="group/item text-white/80 text-xs font-mono flex items-center gap-3 hover:text-white transition-colors cursor-default">
            <span 
              className="w-6 h-6 flex items-center justify-center bg-[#151210] rounded-lg border border-white/10 shadow-sm group-hover/item:border-white/30 group-hover/item:scale-110 transition-all duration-300"
            >
              <skill.icon 
                className="w-3.5 h-3.5 opacity-85 group-hover/item:opacity-100 transition-opacity duration-300" 
                style={{ color: skill.color || '#ffffff' }}
              />
            </span>
            <span>{skill.name}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="w-full py-32 px-6 md:px-20 bg-[#1f1b18] text-white border-t border-white/5" style={{ perspective: "1000px" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-mono text-white/50 tracking-wider block mb-2">STACK TECNOLÓGICO</span>
          <h2 className="text-3xl md:text-4xl font-light text-white tracking-tight">Habilidades & Herramientas</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCard key={i} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
