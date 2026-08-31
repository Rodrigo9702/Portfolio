"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import * as THREE from "three";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState<string>("");
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Black hole gravitational absorption physics on scroll
  const textX = useTransform(scrollYProgress, [0, 0.75], [0, 240]);
  const textYMobile = useTransform(scrollYProgress, [0, 0.75], [0, 90]);
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

    // Initial position and scale based on screen width
    const isDesktop = window.innerWidth >= 1024;
    sphereGroup.position.x = isDesktop ? 2.4 : 0;
    sphereGroup.position.y = isDesktop ? 0 : -1.35;
    const initialBaseScale = isDesktop ? 1 : 0.52;
    sphereGroup.scale.set(initialBaseScale, initialBaseScale, initialBaseScale);

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

    // 2. High-Res Soft Circular Particle Texture
    const createCircleTexture = () => {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      if (!ctx) return null;
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.25, 'rgba(255, 255, 255, 0.85)');
      gradient.addColorStop(0.65, 'rgba(255, 255, 255, 0.18)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(32, 32, 32, 0, Math.PI * 2);
      ctx.fill();
      return new THREE.CanvasTexture(c);
    };
    const circleTexture = createCircleTexture();

    // Inward Gravitational Flow Particles (Layered & Refined sizes)
    // A) Background Accretion Stardust (240 particles)
    const bgDustCount = 240;
    const bgDustGeometry = new THREE.BufferGeometry();
    const bgDustPositions = new Float32Array(bgDustCount * 3);
    for (let i = 0; i < bgDustCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 4 + Math.random() * 12;
      bgDustPositions[i] = Math.cos(angle) * radius;
      bgDustPositions[i + 1] = (Math.random() - 0.5) * 16;
      bgDustPositions[i + 2] = Math.sin(angle) * radius * 0.7 - 2;
    }
    bgDustGeometry.setAttribute('position', new THREE.BufferAttribute(bgDustPositions, 3));
    const bgDustMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045, // Refined subtle size
      map: circleTexture || undefined,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const bgDust = new THREE.Points(bgDustGeometry, bgDustMaterial);
    scene.add(bgDust);

    // B) Foreground Inward Drifting Light Specks (90 particles)
    const fgDustCount = 90;
    const fgDustGeometry = new THREE.BufferGeometry();
    const fgDustPositions = new Float32Array(fgDustCount * 3);
    for (let i = 0; i < fgDustCount * 3; i += 3) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 9;
      fgDustPositions[i] = Math.cos(angle) * radius;
      fgDustPositions[i + 1] = (Math.random() - 0.5) * 12;
      fgDustPositions[i + 2] = Math.sin(angle) * radius * 0.6 + 1;
    }
    fgDustGeometry.setAttribute('position', new THREE.BufferAttribute(fgDustPositions, 3));
    const fgDustMaterial = new THREE.PointsMaterial({
      color: 0xf5eee4,
      size: 0.075, // Refined subtle size
      map: circleTexture || undefined,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const fgDust = new THREE.Points(fgDustGeometry, fgDustMaterial);
    scene.add(fgDust);

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

      // Scroll-driven absorption in 3D world space
      const isDesk = window.innerWidth >= 1024;
      const targetX = isDesk ? (2.4 - currentScroll * 2.2) : 0;
      // On mobile: sphere rises upward towards the title (+0.75) to engulf it!
      const targetY = isDesk ? 0 : (-1.35 + currentScroll * 2.1);
      const baseScale = isDesk ? 1 : 0.52;
      const targetScale = baseScale * (1 + currentScroll * 0.4);
      
      sphereGroup.position.x += (targetX - sphereGroup.position.x) * 0.1;
      sphereGroup.position.y += (targetY - sphereGroup.position.y) * 0.1;
      sphereGroup.scale.set(targetScale, targetScale, targetScale);

      // Gravitational inward suction physics (particles are pulled TOWARDS the sphere center)
      const centerTarget = sphereGroup.position;
      
      // Update background stardust inward suction
      const bgArr = bgDustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < bgDustCount * 3; i += 3) {
        const dx = centerTarget.x - bgArr[i];
        const dy = centerTarget.y - bgArr[i + 1];
        const dz = centerTarget.z - bgArr[i + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 0.6) {
          // Re-spawn far outside
          const angle = Math.random() * Math.PI * 2;
          const radius = 10 + Math.random() * 8;
          bgArr[i] = centerTarget.x + Math.cos(angle) * radius;
          bgArr[i + 1] = centerTarget.y + (Math.random() - 0.5) * 14;
          bgArr[i + 2] = centerTarget.z + Math.sin(angle) * radius * 0.7 - 2;
        } else {
          // Move towards center + subtle swirling orbit
          const speed = 0.015;
          bgArr[i] += (dx / dist) * speed - dy * 0.002;
          bgArr[i + 1] += (dy / dist) * speed;
          bgArr[i + 2] += (dz / dist) * speed;
        }
      }
      bgDustGeometry.attributes.position.needsUpdate = true;

      // Update foreground luminous particles inward suction
      const fgArr = fgDustGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < fgDustCount * 3; i += 3) {
        const dx = centerTarget.x - fgArr[i];
        const dy = centerTarget.y - fgArr[i + 1];
        const dz = centerTarget.z - fgArr[i + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 0.7) {
          // Re-spawn outside
          const angle = Math.random() * Math.PI * 2;
          const radius = 8 + Math.random() * 6;
          fgArr[i] = centerTarget.x + Math.cos(angle) * radius;
          fgArr[i + 1] = centerTarget.y + (Math.random() - 0.5) * 10;
          fgArr[i + 2] = centerTarget.z + Math.sin(angle) * radius * 0.6 + 1;
        } else {
          // Move inward towards singularity
          const speed = 0.024;
          fgArr[i] += (dx / dist) * speed - dy * 0.003;
          fgArr[i + 1] += (dy / dist) * speed;
          fgArr[i + 2] += (dz / dist) * speed;
        }
      }
      fgDustGeometry.attributes.position.needsUpdate = true;

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
      const desk = window.innerWidth >= 1024;
      sphereGroup.position.x = desk ? 2.4 : 0;
      sphereGroup.position.y = desk ? 0 : -1.35;
      const bScale = desk ? 1 : 0.52;
      sphereGroup.scale.set(bScale, bScale, bScale);
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
      bgDustGeometry.dispose();
      bgDustMaterial.dispose();
      fgDustGeometry.dispose();
      fgDustMaterial.dispose();
      circleTexture?.dispose();
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[100dvh] flex items-center overflow-hidden pt-28 pb-20 px-5 sm:px-8 md:px-20 bg-[#1f1b18]"
    >
      {/* Full-screen 3D Canvas (No HTML bounding box cut-offs) */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0" 
      />

      {/* Subtle warm ambient glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column: Text Stack (Pulled smoothly into the 3D Sphere on scroll) */}
        <motion.div 
          style={{ 
            x: isDesktop ? textX : 0, 
            y: isDesktop ? 0 : textYMobile,
            scale: textScale, 
            opacity: textOpacity,
            filter: textBlur,
            rotate: isDesktop ? textRotate : "0deg",
            transformOrigin: isDesktop ? "right center" : "center top"
          }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5 bg-white/[0.04] border border-white/10 px-3.5 sm:px-4 py-1.5 rounded-full mb-6 sm:mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-white/80 text-[11px] sm:text-xs font-mono">
              Disponible para proyectos · Buenos Aires {time ? `(${time}hs)` : ""}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[2.5rem] sm:text-6xl md:text-8xl font-bold tracking-tighter text-white uppercase leading-[0.93] mb-6 sm:mb-8"
          >
            AI AGENT <br /> DEVELOPER
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-4 text-white/80 max-w-xl text-sm sm:text-base md:text-lg font-light leading-relaxed mb-10 sm:mb-12"
          >
            <p>
              Especialista en sistemas conversacionales avanzados, orquestación de flujos agénticos (LLMs) y arquitectura de software escalable.
            </p>
            <p className="text-xs sm:text-sm font-mono text-white/60">
              Construyendo en <a href="https://github.com/Rodrigo9702" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">GitHub</a> · Trayectoria en <a href="https://www.linkedin.com/in/rodrigoncastillo/" target="_blank" rel="noopener noreferrer" className="text-white underline decoration-white/30 hover:decoration-white transition-colors">LinkedIn</a>
            </p>
          </motion.div>

          {/* Dedicated mobile space for the 3D Sphere */}
          <div className="w-full h-[200px] lg:hidden mb-8 pointer-events-none" />

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
