"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { scrollY } = useScroll();
  const { language, setLanguage, t } = useLanguage();

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
    { name: t.nav.about, href: "/#about" },
    { name: t.nav.experience, href: "/#experience" },
    { name: t.nav.skills, href: "/#skills" },
    { name: t.nav.projects, href: "/#projects" },
    { name: t.nav.contact, href: "/#contact" },
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

        <div className="flex items-center gap-3">
          {/* Language Switcher Toggle */}
          <div 
            className="flex items-center p-0.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md text-[11px] font-mono"
            role="group"
            aria-label={t.nav.langAria}
          >
            <button
              type="button"
              onClick={() => setLanguage("es")}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                language === "es"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
              title="Versión en Español"
            >
              ES
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
                language === "en"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-white/60 hover:text-white"
              }`}
              title="English version"
            >
              EN
            </button>
          </div>

          {/* Dynamic Localized CV Link */}
          <a 
            href={t.nav.cvUrl} 
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-wider px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/20 text-white bg-white/[0.02] hover:bg-white hover:text-black active:scale-[0.98] transition-all"
          >
            {t.nav.cvLabel}
          </a>
        </div>
      </div>
    </motion.header>
  );
}
