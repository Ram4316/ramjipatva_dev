"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineData = [
    {
      year: "2026",
      title: "Full Stack & Flutter Projects",
      company: "Personal Projects",
      description: "Built modern web and mobile applications including a Task Manager App, Realtime Chat App, E-Commerce Platform, and Responsive Landing Pages.",
      tags: ["React", "Next.js", "Flutter", "Firebase", "PostgreSQL", "Prisma ORM"]
    },
    {
      year: "2025",
      title: "Flutter Trainee",
      company: "Hindtech Solutions",
      description: "Completed industrial training focused on Flutter development, Firebase integration, realtime databases, payment gateway integration, debugging, and application optimization.",
      tags: ["Firebase Auth & Firestore", "Razorpay & PhonePe", "Flutter UI", "Realtime Features"]
    },
    {
      year: "2024",
      title: "Started MCA & PGDCA",
      company: "Advanced Studies",
      description: "Began advanced studies in computer applications while actively learning modern frontend, backend, and mobile development technologies.",
      tags: ["React & Next.js", "Flutter & Firebase", "REST APIs", "Auth Systems"]
    },
    {
      year: "2022",
      title: "Bachelor of Science (Mathematics)",
      company: "Graduation",
      description: "Completed graduation with a strong analytical and problem-solving foundation that later supported software development and programming learning.",
      tags: []
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/20 to-background py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Full Stack Developer from Lucknow, building modern web and mobile apps with clean code and a focus on real-world results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Personal Story */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold mb-4">About Me</h3>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m a Full Stack Web &amp; App Developer focused on building modern websites,
              landing pages, and scalable web &amp; mobile applications.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Currently pursuing MCA and PGDCA while improving my skills through real-world
              projects, practical development, and continuous learning.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I enjoy creating responsive user interfaces, realtime applications, backend systems,
              and clean digital experiences using modern technologies like React, Next.js, Flutter,
              Firebase, and PostgreSQL.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not coding, I spend time exploring new technologies, improving UI/UX
              skills, and building personal projects to sharpen my development workflow.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-2">3+</div>
                <div className="text-sm text-muted-foreground">Major Projects</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-2">1+</div>
                <div className="text-sm text-muted-foreground">Years of Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <h3 className="text-2xl font-semibold mb-8">Experience Timeline</h3>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/30"></div>
              
              {timelineData.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="relative flex items-start mb-8 last:mb-0"
                >
                  {/* Timeline Dot */}
                  <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm z-10">
                    {item.year}
                  </div>
                  
                  {/* Content */}
                  <div className="ml-6 bg-card p-6 rounded-lg border shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
                    <p className="text-primary font-medium mb-3">{item.company}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3">{item.description}</p>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full border border-primary/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-12">What I Build</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Applications",
                description: "Full-stack web apps with React, Next.js, Node.js, and PostgreSQL — responsive, fast, and production-ready."
              },
              {
                title: "Mobile Apps",
                description: "Cross-platform mobile applications using Flutter and Firebase with realtime features and clean UI."
              },
              {
                title: "Landing Pages",
                description: "Modern, conversion-focused landing pages with smooth animations, responsive layouts, and great UX."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow"
              >
                <h4 className="font-semibold text-lg mb-3 text-primary">{value.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
