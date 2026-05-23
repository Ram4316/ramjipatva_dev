"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<
    Array<{ left: number; top: number; duration: number; delay: number }>
  >([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const generatedParticles = [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2,
    }));
    setParticles(generatedParticles);
    setMounted(true);

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const techStack = [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Flutter",
    "Firebase",
    "PostgreSQL",
  ];

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl"
          animate={mounted ? { x: mousePosition.x * 0.1, y: mousePosition.y * 0.1 } : {}}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ left: "10%", top: "20%" }}
        />
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 blur-3xl"
          animate={mounted ? { x: mousePosition.x * -0.05, y: mousePosition.y * -0.05 } : {}}
          transition={{ type: "spring", stiffness: 50, damping: 30 }}
          style={{ right: "10%", bottom: "20%" }}
        />
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            animate={{ y: [0, -100, 0], opacity: [0, 1, 0] }}
            transition={{ duration: particle.duration, repeat: Infinity, delay: particle.delay }}
            style={{ left: `${particle.left}%`, top: `${particle.top}%` }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* LEFT — Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex-shrink-0 flex justify-center"
          >
            {/* Floating animation wrapper */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Glassmorphism card with glow */}
              <div className="relative p-1.5 rounded-2xl bg-gradient-to-br from-primary/50 via-primary/20 to-primary/5 shadow-[0_0_60px_rgba(99,102,241,0.35),0_0_120px_rgba(99,102,241,0.15)] backdrop-blur-sm">
                {/* Outer glow ring */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent blur-xl -z-10 scale-110" />

                {/* Glass inner frame */}
                <div className="relative rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
                  <Image
                    src="/profile.jpeg"
                    alt="Ramji Patva"
                    width={400}
                    height={480}
                    className="object-cover object-[center_20%] w-[300px] h-[380px] md:w-[360px] md:h-[440px] grayscale hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20">
                <span className="text-base">👋</span> Hello, I&apos;m
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-6xl md:text-7xl lg:text-8xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent leading-tight"
            >
              Ramji Patva
            </motion.h1>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75 }}
              className="text-xl md:text-2xl font-semibold mb-5 text-primary"
            >
              Full Stack Web &amp; App Developer
            </motion.h2>

            {/* Location & Availability badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium text-muted-foreground">
                📍 Lucknow, India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-muted border border-border rounded-full text-xs font-medium text-muted-foreground">
                🎓 MCA Student
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                Open to Work
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              className="text-base md:text-lg text-muted-foreground mb-7 max-w-xl leading-relaxed"
            >
              Building modern websites, landing pages, and full-stack web &amp; mobile
              applications with clean UI, responsive design, and reliable backend functionality.
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.05 }}
              className="mb-10"
            >
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.1 + i * 0.07 }}
                    className="px-3 py-1.5 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                className="px-8 py-3.5 bg-primary text-primary-foreground rounded-full font-medium text-base hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                View Projects
              </motion.button>

              <motion.a
                href="#contact"
                className="px-8 py-3.5 border-2 border-primary text-primary rounded-full font-medium text-base hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  setTimeout(() => document.getElementById("name")?.focus(), 800);
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                Contact Me
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
