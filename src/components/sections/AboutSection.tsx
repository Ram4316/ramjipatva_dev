"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const timelineData = [
    {
      year: "2024",
      title: "Senior Full Stack Developer",
      company: "TechCorp Solutions",
      description: "Leading development of enterprise-scale applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting scalable solutions."
    },
    {
      year: "2022",
      title: "Full Stack Developer",
      company: "InnovateLab",
      description: "Built responsive web applications and RESTful APIs. Collaborated with cross-functional teams to deliver high-quality software solutions."
    },
    {
      year: "2020",
      title: "Frontend Developer",
      company: "StartupXYZ",
      description: "Developed modern, interactive user interfaces using React and TypeScript. Focused on performance optimization and user experience."
    },
    {
      year: "2019",
      title: "Computer Science Graduate",
      company: "University of Technology",
      description: "Graduated with honors, specializing in software engineering and web technologies. Built strong foundation in algorithms and data structures."
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
            Passionate about creating digital experiences that make a difference. 
            With over 5 years of experience in full-stack development, I bring ideas to life through clean code and innovative solutions.
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
            <h3 className="text-2xl font-semibold mb-4">My Journey</h3>
            <p className="text-muted-foreground leading-relaxed">
              My journey into web development started with curiosity and evolved into a passion for creating 
              meaningful digital experiences. I believe in the power of technology to solve real-world problems 
              and improve people&apos;s lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source projects, 
              or sharing knowledge with the developer community. I&apos;m always eager to take on new challenges and 
              push the boundaries of what&apos;s possible.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-2">50+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="text-3xl font-bold text-primary mb-2">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
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
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
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
          <h3 className="text-2xl font-semibold text-center mb-12">Core Values</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovation",
                description: "Always exploring new technologies and approaches to solve complex problems."
              },
              {
                title: "Quality",
                description: "Committed to writing clean, maintainable code that stands the test of time."
              },
              {
                title: "Collaboration",
                description: "Believing in the power of teamwork and open communication to achieve great results."
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
