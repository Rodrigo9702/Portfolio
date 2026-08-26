"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Inicio", href: "/#home" },
    { name: "Sobre Mí", href: "/#about" },
    { name: "Experiencia", href: "/#experience" },
    { name: "Skills", href: "/#skills" },
    { name: "Proyectos", href: "/#projects" },
    { name: "Contacto", href: "/#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-[#141210]/80 backdrop-blur-md border-b border-white/10 py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-20 flex items-center justify-between">
        <Link href="/" className="text-white font-bold tracking-widest text-lg mix-blend-difference">
          RC.
        </Link>

        {isHome && (
          <nav className="hidden md:flex items-center gap-8 bg-white/5 px-8 py-3 rounded-full border border-white/10 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/60 hover:text-white text-xs uppercase tracking-widest transition-colors cursor-none"
              >
                {link.name}
              </a>
            ))}
          </nav>
        )}

        {/* The CV button will be added here later once the user provides it */}
        <a 
          href="/cv.pdf" 
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs uppercase tracking-widest px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all cursor-none"
          onClick={(e) => {
            // Si el archivo no existe aún, evitamos el 404 para el demo
            // e.preventDefault();
            // alert("El CV se habilitará cuando subas el PDF.");
          }}
        >
          Descargar CV
        </a>
      </div>
    </motion.header>
  );
}
