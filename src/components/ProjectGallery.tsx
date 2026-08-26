"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type GalleryItem = {
  type: string;
  src: string;
  poster?: string;
  caption: string;
};

export default function ProjectGallery({ gallery }: { gallery: GalleryItem[] }) {
  return (
    <section className="flex flex-col gap-24">
      {gallery.map((item, idx) => (
        <GalleryImage key={idx} item={item} idx={idx} />
      ))}
    </section>
  );
}

function GalleryImage({ item, idx }: { item: GalleryItem; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div className="flex flex-col gap-6" ref={ref}>
      <div className="w-full rounded-2xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl relative" style={{ minHeight: "200px" }}>
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
            style={{ y, scale: 1.15 }}
          />
        )}
      </div>
      <div className="flex items-start gap-4 px-4">
        <span className="text-sm font-mono text-white/30 mt-1">0{idx + 1}</span>
        <p className="text-lg text-white/90 font-light max-w-2xl">
          {item.caption}
        </p>
      </div>
    </div>
  );
}
