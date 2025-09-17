"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("frontend");

  const skillCategories = {
    frontend: {
      title: "Frontend Development",
      skills: [
        { name: "React/Next.js", level: 95, color: "#61DAFB" },
        { name: "TypeScript", level: 90, color: "#3178C6" },
        { name: "Tailwind CSS", level: 88, color: "#06B6D4" },
        { name: "JavaScript", level: 92, color: "#F7DF1E" },
        { name: "HTML/CSS", level: 95, color: "#E34F26" }
      ]
    },
    backend: {
      title: "Backend Development",
      skills: [
        { name: "Node.js", level: 85, color: "#339933" },
        { name: "Python", level: 80, color: "#3776AB" },
        { name: "PostgreSQL", level: 82, color: "#336791" },
        { name: "MongoDB", level: 78, color: "#47A248" },
        { name: "REST APIs", level: 90, color: "#FF6B35" }
      ]
    },
    tools: {
      title: "Tools & Technologies",
      skills: [
        { name: "Git/GitHub", level: 92, color: "#F05032" },
        { name: "Docker", level: 75, color: "#2496ED" },
        { name: "AWS", level: 70, color: "#FF9900" },
        { name: "Figma", level: 85, color: "#F24E1E" },
        { name: "VS Code", level: 95, color: "#007ACC" }
      ]
    }
  };

  const overallSkills = [
    { name: "Frontend", value: 92, fill: "#61DAFB" },
    { name: "Backend", value: 83, fill: "#339933" },
    { name: "DevOps", value: 75, fill: "#FF9900" },
    { name: "Design", value: 80, fill: "#F24E1E" }
  ];

  const currentSkills = skillCategories[activeCategory as keyof typeof skillCategories];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Skills & Expertise
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit built through years of hands-on experience and continuous learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Overall Skills Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">Skill Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={overallSkills}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {overallSkills.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {overallSkills.map((skill, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: skill.fill }}
                  ></div>
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground ml-auto">{skill.value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Skills */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card rounded-2xl p-8 border shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-8 text-center">Detailed Breakdown</h3>
            
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {Object.entries(skillCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setActiveCategory(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === key
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>

            {/* Skills List */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-center mb-6">{currentSkills.title}</h4>
              {currentSkills.skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Certifications & Learning */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-12">Continuous Learning</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AWS Certified",
                description: "Cloud Solutions Architecture",
                status: "Certified"
              },
              {
                title: "React Advanced",
                description: "Advanced React Patterns & Performance",
                status: "Completed"
              },
              {
                title: "System Design",
                description: "Scalable Architecture Principles",
                status: "In Progress"
              }
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.0 + index * 0.1 }}
                className="text-center p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  cert.status === 'Certified' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  cert.status === 'Completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {cert.status}
                </div>
                <h4 className="font-semibold text-lg mb-2">{cert.title}</h4>
                <p className="text-muted-foreground text-sm">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsSection;
