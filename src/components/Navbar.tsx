"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 40);
    if (latest > previous && latest > 180) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const navLinks = [
    { name: "Sobre mí", href: "/#about" },
    { name: "Experiencia", href: "/#experience" },
    { name: "Skills", href: "/#skills" },
    { name: "Proyectos", href: "/#projects" },
    { name: "Contacto", href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1f1b18]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-white font-medium tracking-tight text-base flex items-center gap-2 group"
        >
          <span className="w-2 h-2 rounded-full bg-white group-hover:scale-125 transition-transform" />
          <span className="font-mono text-sm tracking-wider">RODRIGO CASTILLO</span>
        </Link>

        {isHome && (
          <nav className="hidden md:flex items-center gap-7 bg-white/[0.04] px-7 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/70 hover:text-white text-xs font-mono tracking-wider transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        <a 
          href="/cv.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono tracking-wider px-5 py-2.5 rounded-full border border-white/20 text-white bg-white/[0.02] hover:bg-white hover:text-black active:scale-[0.98] transition-all"
        >
          CV ↗
        </a>
      </div>
    </motion.header>
  );
}
