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

    // Group to hold all 3D sphere components
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // 1. Organic Outer Particle Cloud (High Detail)
    const particleGeometry = new THREE.IcosahedronGeometry(2.3, 24);
    const particleCount = particleGeometry.attributes.position.count;
    
    const origParticlePos: THREE.Vector3[] = [];
    const particlePositions = particleGeometry.attributes.position;
    const vertex = new THREE.Vector3();

    for (let i = 0; i < particleCount; i++) {
      vertex.fromBufferAttribute(particlePositions, i);
      origParticlePos.push(vertex.clone());
    }

    const particleMaterial = new THREE.PointsMaterial({
      color: 0xf5f2eb, // Elegant bone white
      size: 0.035,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    sphereGroup.add(particles);

    // 2. Delicate Inner Wireframe Cage
    const innerGeometry = new THREE.IcosahedronGeometry(2.15, 8);
    const innerPositions = innerGeometry.attributes.position;
    const origInnerPos: THREE.Vector3[] = [];
    for (let i = 0; i < innerPositions.count; i++) {
      vertex.fromBufferAttribute(innerPositions, i);
      origInnerPos.push(vertex.clone());
    }

    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4cdc5,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    sphereGroup.add(innerMesh);

    // 3. Ambient floating constellation dust
    const dustCount = 180;
    const dustGeometry = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i += 3) {
      dustPositions[i] = (Math.random() - 0.5) * 12;
      dustPositions[i + 1] = (Math.random() - 0.5) * 12;
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

    camera.position.z = 8.5;

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    const clock = new THREE.Clock();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime() * 0.7;

      // Morph outer particles using complex harmonic waves
      for (let i = 0; i < particleCount; i++) {
        const v = origParticlePos[i];
        const offset = 
          Math.sin(v.x * 1.8 + time) * 0.08 + 
          Math.cos(v.y * 1.8 + time * 1.1) * 0.08 + 
          Math.sin(v.z * 1.8 + time * 0.9) * 0.08;
        const ratio = 1 + offset;
        particlePositions.setXYZ(i, v.x * ratio, v.y * ratio, v.z * ratio);
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Morph inner wireframe subtly
      for (let i = 0; i < innerPositions.count; i++) {
        const v = origInnerPos[i];
        const offset = 
          Math.sin(v.x * 1.4 + time) * 0.06 + 
          Math.cos(v.y * 1.4 + time * 1.1) * 0.06;
        const ratio = 1 + offset;
        innerPositions.setXYZ(i, v.x * ratio, v.y * ratio, v.z * ratio);
      }
      innerGeometry.attributes.position.needsUpdate = true;

      // Smooth organic rotation
      targetRotationY += 0.0015;
      targetRotationX += 0.0008;

      sphereGroup.rotation.y += (targetRotationY + mouseX * 0.3 - sphereGroup.rotation.y) * 0.05;
      sphereGroup.rotation.x += (targetRotationX - mouseY * 0.3 - sphereGroup.rotation.x) * 0.05;
      innerMesh.rotation.y -= 0.001;

      // Floating dust gentle oscillation
      dust.rotation.y = time * 0.03;
      dust.rotation.x = time * 0.02;

      // Parallax camera easing
      camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
      camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;
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

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
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
