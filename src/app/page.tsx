"use client";

import { useEffect } from "react";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingNav from "@/components/FloatingNav";
import DarkModeToggle from "@/components/DarkModeToggle";
import HireMeButton from "@/components/HireMeButton";

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleSmoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.hash) {
        e.preventDefault();
        const element = document.querySelector(target.hash);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.addEventListener("click", handleSmoothScroll);
    return () => document.removeEventListener("click", handleSmoothScroll);
  }, []);

  return (
    <main className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Fixed UI Elements */}
      <FloatingNav />
      <DarkModeToggle />
      <HireMeButton />
      
      {/* Main Content Sections */}
      <section id="hero" className="min-h-screen">
        <HeroSection />
      </section>
      
      <section id="about" className="min-h-screen">
        <AboutSection />
      </section>
      
      <section id="skills" className="min-h-screen">
        <SkillsSection />
      </section>
      
      <section id="projects" className="min-h-screen">
        <ProjectsSection />
      </section>
      
      <section id="testimonials" className="min-h-screen">
        <TestimonialsSection />
      </section>
      
      <section id="contact" className="min-h-screen">
        <ContactSection />
      </section>
    </main>
  );
}
