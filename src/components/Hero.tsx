"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const formatter = new Intl.DateTimeFormat('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setTime(formatter.format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create a sphere
    const geometry = new THREE.IcosahedronGeometry(2, 20); // High detail
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xf9f6ee, // Color hueso
      wireframe: true,
      emissive: 0x221f1a, // Slight warm glow
      roughness: 0.1,
      metalness: 0.8,
    });

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 8;

    // Save original positions for animation
    const positionAttribute = geometry.attributes.position;
    const vertex = new THREE.Vector3();
    const originalPositions: THREE.Vector3[] = [];
    for (let i = 0; i < positionAttribute.count; i++) {
      vertex.fromBufferAttribute(positionAttribute, i);
      originalPositions.push(vertex.clone());
    }

    let mouseX = 0;
    let mouseY = 0;
    const clock = new THREE.Clock();

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      
      const time = clock.getElapsedTime();

      // Animate sphere vertices to breathe/morph
      for (let i = 0; i < positionAttribute.count; i++) {
        const v = originalPositions[i];
        
        // Simplex noise-like displacement using sine waves
        const offset = 
          Math.sin(v.x * 2 + time) * 0.1 + 
          Math.sin(v.y * 2 + time * 1.2) * 0.1 + 
          Math.sin(v.z * 2 + time * 0.8) * 0.1;
          
        const ratio = 1 + offset;
        positionAttribute.setXYZ(i, v.x * ratio, v.y * ratio, v.z * ratio);
      }
      geometry.attributes.position.needsUpdate = true;

      // Rotate sphere continuously
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;

      // Parallax effect based on mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
      camera.position.y += (-mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden pt-24 pb-20">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />
      
      {/* Subtle warm ambient glow behind sphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="z-10 text-center px-4 flex flex-col items-center max-w-4xl mx-auto">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-white/80 text-xs font-mono">
            Disponible para proyectos · Buenos Aires {time ? `(${time}hs)` : ""}
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.95]"
        >
          AI AGENT <br /> DEVELOPER
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-8 flex flex-col gap-3 text-white/80 max-w-xl mx-auto text-base md:text-lg font-light leading-relaxed"
        >
          <p>
            Especialista en sistemas conversacionales avanzados, orquestación de flujos agénticos (LLMs) y arquitectura de software escalable.
          </p>
          <p className="text-sm font-mono text-white/60">
            Construyendo en <a href="https://github.com/Rodrigo9702" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">GitHub</a> · Trayectoria en <a href="https://www.linkedin.com/in/rodrigoncastillo/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">LinkedIn</a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-14 flex flex-col items-center gap-3 cursor-pointer group"
          onClick={() => {
            const aboutSection = document.getElementById("about");
            aboutSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-mono group-hover:text-white/90 transition-colors">
            Desliza para explorar
          </span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
              animate={{ y: [-16, 48], opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
