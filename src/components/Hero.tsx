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
  const textX = useTransform(scrollYProgress, [0, 0.75], [0, 240]);
  const textScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const textBlur = useTransform(scrollYProgress, [0, 0.65], ["blur(0px)", "blur(12px)"]);
  const textRotate = useTransform(scrollYProgress, [0, 0.75], ["0deg", "8deg"]);

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
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Master group for the entire system
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Initial position based on screen width
    const isDesktop = window.innerWidth >= 1024;
    sphereGroup.position.x = isDesktop ? 2.4 : 0;
    sphereGroup.position.y = isDesktop ? 0 : -0.5;

    // 1. Outer Morphing Geometric Wireframe Sphere (Reduced density & softened tone)
    const wireGeometry = new THREE.IcosahedronGeometry(2.0, 12);
    const wirePositions = wireGeometry.attributes.position;
    const wireCount = wirePositions.count;
    const origWirePos: THREE.Vector3[] = [];
    const vertex = new THREE.Vector3();

    for (let i = 0; i < wireCount; i++) {
      vertex.fromBufferAttribute(wirePositions, i);
      origWirePos.push(vertex.clone());
    }

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xd6cebf, // Soft warm platinum/silver (not blindingly white)
      wireframe: true,
      transparent: true,
      opacity: 0.28, // Softened opacity
    });
    const wireMesh = new THREE.Mesh(wireGeometry, wireMaterial);
    sphereGroup.add(wireMesh);

    // 2. Ambient Stardust (+10% particles: 160)
    const dustCount = 160;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 14;
      dustPositions[i + 1] = (Math.random() - 0.5) * 14;
      dustPositions[i + 2] = (Math.random() - 0.5) * 10;
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

    camera.position.z = 8.2;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentScroll = 0;
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 0.75;

      // Outer wireframe morphing with harmonic waves
      for (let i = 0; i < wireCount; i++) {
        const v = origWirePos[i];
        const offset = 
          Math.sin(v.x * 1.6 + time) * 0.09 + 
          Math.cos(v.y * 1.6 + time * 1.1) * 0.09 + 
          Math.sin(v.z * 1.6 + time * 0.9) * 0.09;
        const ratio = 1 + offset;
        wirePositions.setXYZ(i, v.x * ratio, v.y * ratio, v.z * ratio);
      }
      wireGeometry.attributes.position.needsUpdate = true;

      // Continuous rotation
      targetRotationY += 0.002;
      targetRotationX += 0.0008;

      sphereGroup.rotation.y += (targetRotationY + mouseX * 0.35 - sphereGroup.rotation.y) * 0.05;
      sphereGroup.rotation.x += (targetRotationX - mouseY * 0.35 - sphereGroup.rotation.x) * 0.05;

      // Scroll-driven Black Hole absorption in 3D world space
      const targetX = (window.innerWidth >= 1024) ? (2.4 - currentScroll * 2.2) : 0;
      const targetScale = 1 + currentScroll * 0.35;
      sphereGroup.position.x += (targetX - sphereGroup.position.x) * 0.1;
      sphereGroup.scale.set(targetScale, targetScale, targetScale);

      // Dust motion
      dust.rotation.y = time * 0.03;
      dust.rotation.x = time * 0.015;

      // Camera parallax
      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

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
      const desktop = window.innerWidth >= 1024;
      sphereGroup.position.x = desktop ? 2.4 : 0;
      sphereGroup.position.y = desktop ? 0 : -0.5;
    };

    const handleScroll = () => {
      const scrollMax = window.innerHeight;
      currentScroll = Math.min(Math.max(window.scrollY / scrollMax, 0), 1);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      renderer.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-20 px-6 md:px-20 bg-[#1f1b18]"
    >
      {/* Full-screen 3D Canvas (No HTML bounding box cut-offs) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Subtle warm ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        
        {/* Left Column: Text Stack (Pulled smoothly into the 3D Sphere on scroll) */}
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
            AI AGENT <br /> DEVELOPER
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 text-white/80 max-w-xl text-base md:text-lg font-light leading-relaxed mb-12"
          >
            <p>
              Especialista en sistemas conversacionales avanzados, orquestación de flujos agénticos (LLMs) y arquitectura de software escalable.
            </p>
            <p className="text-sm font-mono text-white/60">
              Construyendo en <a href="https://github.com/Rodrigo9702" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">GitHub</a> · Trayectoria en <a href="https://www.linkedin.com/in/rodrigoncastillo/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">LinkedIn</a>
            </p>
          </motion.div>

          {/* Vertical Downward Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-start gap-3 cursor-pointer group"
            onClick={() => {
              const aboutSection = document.getElementById("about");
              aboutSection?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-mono group-hover:text-white transition-colors">
              Desliza para explorar ↓
            </span>
            <div className="w-[1px] h-10 bg-white/20 relative overflow-hidden ml-4">
              <motion.div 
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
                animate={{ y: [-12, 32], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column Spacer (Leaves space for the 3D Sphere rendered in full-screen Canvas) */}
        <div className="lg:col-span-5 hidden lg:block h-[500px] pointer-events-none" />

      </div>
    </section>
  );
}
