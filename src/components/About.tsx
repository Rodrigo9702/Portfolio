"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const { t } = useLanguage();

  return (
    <section id="about" className="relative w-full py-32 px-5 sm:px-8 md:px-20 bg-[#1f1b18] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
        {/* Left Side: 38.2% Minor Golden Section */}
        <div className="w-full md:w-[38.2%]" ref={ref}>
          <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight flex flex-col gap-2">
            <span className="overflow-hidden block">
              <motion.span 
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
              >
                {t.about.headingPart1}
              </motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span 
                className="block"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.2 }}
              >
                {t.about.headingPart2}
              </motion.span>
            </span>
            <span className="overflow-hidden block">
              <motion.span 
                className="block font-bold text-white"
                initial={{ y: "100%", opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.3 }}
              >
                {t.about.headingPart3}
              </motion.span>
            </span>
          </h2>
        </div>

        {/* Right Side: 61.8% Major Golden Section */}
        <motion.div 
          className="w-full md:w-[61.8%] space-y-8 text-white/90 text-lg md:text-xl font-light leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/10 mt-10">
            {t.about.cards.map((card, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-colors"
              >
                <span className="block text-2xl font-mono text-white/40 mb-2">0{i + 1}</span>
                <h3 className="text-base font-medium text-white mb-1">{card.title}</h3>
                <p className="text-xs text-white/60 font-light">{card.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
