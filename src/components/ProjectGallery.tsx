"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type GalleryItem = {
  type: string;
  src: string;
  poster?: string;
  caption: string;
};

export default function ProjectGallery({ 
  gallery, 
  accentColor = "#ffffff" 
}: { 
  gallery: GalleryItem[]; 
  accentColor?: string;
}) {
  return (
    <section className="flex flex-col gap-28">
      {gallery.map((item, idx) => (
        <GalleryImage key={idx} item={item} idx={idx} accentColor={accentColor} />
      ))}
    </section>
  );
}

function GalleryImage({ 
  item, 
  idx, 
  accentColor 
}: { 
  item: GalleryItem; 
  idx: number;
  accentColor: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div className="flex flex-col gap-6" ref={ref}>
      
      {/* Framed Browser Mockup Window */}
      <div className="w-full rounded-2xl overflow-hidden bg-[#161311] border border-white/10 shadow-2xl relative group">
        
        {/* Browser Top Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <div className="text-[11px] font-mono text-white/40 tracking-wider">
            PREVIEW 0{idx + 1}
          </div>
          <div className="w-12" />
        </div>

        {/* Media Container */}
        <div className="relative overflow-hidden bg-[#111] min-h-[220px]">
          {item.type === 'video' ? (
            <video 
              src={item.src} 
              poster={item.poster}
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-auto object-cover relative z-10"
            />
          ) : (
            <motion.img 
              src={item.src} 
              alt={item.caption}
              className="w-full h-auto object-cover"
              style={{ y, scale: 1.08 }}
            />
          )}

          {/* Subtle colored accent glow on hover */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-overlay"
            style={{ backgroundColor: accentColor }}
          />
        </div>
      </div>

      {/* Caption description */}
      <div className="flex items-start gap-4 px-2">
        <span className="text-xs font-mono text-white/40 mt-1">0{idx + 1}</span>
        <p className="text-base sm:text-lg text-white/80 font-light max-w-3xl leading-relaxed">
          {item.caption}
        </p>
      </div>
    </div>
  );
}
