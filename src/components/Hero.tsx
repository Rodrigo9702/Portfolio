"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<string>("");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Black hole gravitational absorption physics on scroll
  const textX = useTransform(scrollYProgress, [0, 0.7], [0, 220]);
  const textScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.25]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.6], ["blur(0px)", "blur(14px)"]);
  const textRotate = useTransform(scrollYProgress, [0, 0.7], ["0deg", "6deg"]);

  const sphereScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.25]);
  const sphereX = useTransform(scrollYProgress, [0, 0.7], [0, -60]);

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

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    const updateRendererSize = () => {
      if (!canvas) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    updateRendererSize();

    // Unified Particle Entity (Clean single-body morphing constellation)
    const particleGeometry = new THREE.IcosahedronGeometry(2.35, 26);
    const particleCount = particleGeometry.attributes.position.count;
    
    const origParticlePos: THREE.Vector3[] = [];
    const particlePositions = particleGeometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
      vertex.fromBufferAttribute(particlePositions, i);
      origParticlePos.push(vertex.clone());
    }

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf3efe6,
      size: 0.042,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Subtle ambient dust specks
    const dustCount = 140;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 10;
      dustPositions[i + 1] = (Math.random() - 0.5) * 10;
      dustPositions[i + 2] = (Math.random() - 0.5) * 8;
    }
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.35,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dust);

    camera.position.z = 7.5;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 0.8;

      // Harmonic undulating wave displacement
      for (let i = 0; i < particleCount; i++) {
        const v = origParticlePos[i];
        const offset = 
          Math.sin(v.x * 1.6 + time) * 0.09 + 
          Math.cos(v.y * 1.6 + time * 1.1) * 0.09 + 
          Math.sin(v.z * 1.6 + time * 0.9) * 0.09;
        const ratio = 1 + offset;
        particlePositions.setXYZ(i, v.x * ratio, v.y * ratio, v.z * ratio);
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Continuous rotational orbit
      targetRotationY += 0.002;
      targetRotationX += 0.001;

      particles.rotation.y += (targetRotationY + mouseX * 0.4 - particles.rotation.y) * 0.05;
      particles.rotation.x += (targetRotationX - mouseY * 0.4 - particles.rotation.x) * 0.05;

      dust.rotation.y = time * 0.04;
      dust.rotation.x = time * 0.02;

      // Camera parallax
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', updateRendererSize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateRendererSize);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-16 px-6 md:px-20 bg-[#1f1b18]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        
        {/* Left Column: Text & Value Prop (Pulled into black hole on scroll) */}
        <motion.div 
          style={{ 
            x: textX, 
            scale: textScale, 
            opacity: textOpacity,
            filter: textBlur,
            rotate: textRotate,
            transformOrigin: "right center"
          }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
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
            className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.92] mb-8"
          >
            AI AGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/50">
              DEVELOPER
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 text-white/80 max-w-xl text-base md:text-lg font-light leading-relaxed mb-10"
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
            className="flex items-center gap-3 cursor-pointer group pt-2"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              aboutSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-white/50 text-[11px] tracking-[0.2em] uppercase font-mono group-hover:text-white transition-colors">
              Desliza para explorar
            </span>
            <div className="w-10 h-[1px] bg-white/20 relative overflow-hidden group-hover:w-16 transition-all duration-300">
              <motion.div 
                className="absolute top-0 left-0 h-full w-1/2 bg-white"
                animate={{ x: [-20, 40] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: 3D Black Hole Singularity Particle Sphere */}
        <motion.div 
          style={{ scale: sphereScale, x: sphereX }}
          className="lg:col-span-5 relative w-full h-[380px] sm:h-[480px] lg:h-[580px] flex items-center justify-center pointer-events-auto"
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
        </motion.div>

      </div>
    </section>
  );
}
