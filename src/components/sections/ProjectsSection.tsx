"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Reusable image carousel for cards and modal
const ImageCarousel = ({ images, title, height = "h-48" }: { images: string[], title: string, height?: string }) => {
  const [current, setCurrent] = useState(0);

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={title}
        className={`w-full ${height} object-cover`}
        onError={(e) => {
          const t = e.target as HTMLImageElement;
          t.style.display = "none";
          const p = t.parentElement;
          if (p) p.innerHTML = `<div class="w-full ${height} bg-muted flex items-center justify-center text-muted-foreground text-sm">Project Preview</div>`;
        }}
      />
    );
  }

  return (
    <div className="relative overflow-hidden group/carousel">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt={`${title} screenshot ${current + 1}`}
          className={`w-full ${height} object-cover`}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            const t = e.target as HTMLImageElement;
            t.style.display = "none";
          }}
        />
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent(p => (p === 0 ? images.length - 1 : p - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity text-xs z-10"
        aria-label="Previous image"
      >←</button>
      <button
        onClick={(e) => { e.stopPropagation(); setCurrent(p => (p === images.length - 1 ? 0 : p + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity text-xs z-10"
        aria-label="Next image"
      >→</button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
        {current + 1}/{images.length}
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const projects = [
    {
      id: 7,
      title: "AI SaaS Landing Page",
      category: "Frontend",
      description: "Modern AI startup landing page with interactive 3D visuals, smooth animations, and premium futuristic UI.",
      longDescription: "A premium AI SaaS landing page built with Next.js and React Three Fiber. Features an interactive 3D orb, smooth scroll animations powered by Framer Motion, glassmorphism UI components, and a fully responsive layout designed for modern AI startups.",
      image: "/landinggggggggg.png",
      images: ["/landinggggggggg.png", "/features.png", "/testimonials.png", "/pricing.png", "/contact.png"],
      technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "R3F"],
      features: [
        "Interactive 3D Orb",
        "Smooth Scroll Animations",
        "Responsive SaaS Layout",
        "Glassmorphism UI",
        "Premium Motion Design"
      ],
      liveUrl: "https://responsive-landingpage-eight.vercel.app/",
      githubUrl: "https://github.com/Ram4316/ResponsiveLandingpage",
      status: "Completed"
    },
    {
      id: 1,
      title: "E-Commerce Platform",
      category: "Full Stack",
      description: "A modern e-commerce platform built with Next.js, featuring real-time inventory management, secure payments, and advanced analytics.",
      longDescription: "This comprehensive e-commerce solution includes user authentication, product catalog management, shopping cart functionality, secure payment processing with Stripe, order tracking, and an admin dashboard with real-time analytics. The platform is built with performance and scalability in mind, utilizing server-side rendering and optimized database queries.",
      image: "https://placehold.co/600x400?text=Modern+E-Commerce+Platform+Dashboard+Interface",
      technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Tailwind CSS", "Prisma"],
      features: [
        "Real-time inventory management",
        "Secure payment processing",
        "Advanced analytics dashboard",
        "Mobile-responsive design",
        "SEO optimized",
        "Admin panel with role-based access"
      ],
      liveUrl: "#",
      githubUrl: "#",
      status: "Completed"
    },
    {
      id: 2,
      title: "Task Management App",
      category: "Frontend",
      description: "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      longDescription: "This project management tool enables teams to organize tasks efficiently with features like drag-and-drop kanban boards, real-time collaboration, file attachments, time tracking, and detailed project analytics. Built with React and Socket.io for seamless real-time updates.",
      image: "https://placehold.co/600x400?text=Task+Management+Kanban+Board+Interface",
      images: ["https://placehold.co/600x400?text=Task+Management+Kanban+Board+Interface"],
      technologies: ["React", "Socket.io", "Node.js", "MongoDB", "Material-UI"],
      features: [
        "Drag-and-drop kanban boards",
        "Real-time collaboration",
        "File attachments",
        "Time tracking",
        "Project analytics",
        "Team management"
      ],
      liveUrl: "#",
      githubUrl: "#",
      status: "Completed"
    },
    {
      id: 3,
      title: "AI-Powered Analytics Dashboard",
      category: "Data Visualization",
      description: "An intelligent analytics dashboard that uses machine learning to provide insights and predictions for business metrics.",
      longDescription: "This advanced analytics platform integrates multiple data sources and uses AI algorithms to generate actionable insights. Features include predictive analytics, automated report generation, custom dashboard creation, and real-time data visualization with interactive charts and graphs.",
      image: "https://placehold.co/600x400?text=AI+Analytics+Dashboard+with+Charts+and+Graphs",
      images: ["https://placehold.co/600x400?text=AI+Analytics+Dashboard+with+Charts+and+Graphs"],
      technologies: ["React", "D3.js", "Python", "TensorFlow", "FastAPI", "PostgreSQL"],
      features: [
        "Predictive analytics",
        "Automated reporting",
        "Custom dashboards",
        "Real-time data visualization",
        "Machine learning insights",
        "Multi-source data integration"
      ],
      liveUrl: "#",
      githubUrl: "#",
      status: "In Progress"
    },
    {
      id: 4,
      title: "Social Media Scheduler",
      category: "SaaS",
      description: "A comprehensive social media management tool for scheduling posts, analyzing engagement, and managing multiple accounts.",
      longDescription: "This SaaS platform allows users to manage multiple social media accounts from a single dashboard. Features include post scheduling, content calendar, engagement analytics, hashtag suggestions, and team collaboration tools. Built with a microservices architecture for scalability.",
      image: "https://placehold.co/600x400?text=Social+Media+Scheduler+Calendar+Interface",
      images: ["https://placehold.co/600x400?text=Social+Media+Scheduler+Calendar+Interface"],
      technologies: ["Vue.js", "Laravel", "Redis", "MySQL", "Docker", "AWS"],
      features: [
        "Multi-platform posting",
        "Content calendar",
        "Engagement analytics",
        "Hashtag suggestions",
        "Team collaboration",
        "Automated scheduling"
      ],
      liveUrl: "#",
      githubUrl: "#",
      status: "Completed"
    },
    {
      id: 5,
      title: "Real Estate Platform",
      category: "Full Stack",
      description: "A modern real estate platform with property listings, virtual tours, mortgage calculator, and agent management system.",
      longDescription: "This comprehensive real estate solution includes property search with advanced filters, virtual tour integration, mortgage calculator, agent profiles, lead management system, and property comparison tools. Features responsive design and SEO optimization for maximum visibility.",
      image: "https://placehold.co/600x400?text=Real+Estate+Property+Listing+Platform",
      images: ["https://placehold.co/600x400?text=Real+Estate+Property+Listing+Platform"],
      technologies: ["Next.js", "Prisma", "PostgreSQL", "Mapbox", "Cloudinary", "Stripe"],
      features: [
        "Advanced property search",
        "Virtual tour integration",
        "Mortgage calculator",
        "Agent management system",
        "Lead tracking",
        "Property comparison"
      ],
      liveUrl: "#",
      githubUrl: "#",
      status: "Completed"
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      category: "Mobile",
      description: "A comprehensive fitness tracking application with workout plans, nutrition tracking, and progress analytics.",
      longDescription: "This mobile-first fitness application helps users track their workouts, monitor nutrition, set fitness goals, and analyze progress over time. Includes social features for sharing achievements and competing with friends, plus integration with wearable devices.",
      image: "https://placehold.co/600x400?text=Fitness+Tracking+Mobile+App+Interface",
      images: ["https://placehold.co/600x400?text=Fitness+Tracking+Mobile+App+Interface"],
      technologies: ["React Native", "Firebase", "Node.js", "MongoDB", "Chart.js"],
      features: [
        "Workout tracking",
        "Nutrition monitoring",
        "Progress analytics",
        "Social features",
        "Wearable integration",
        "Custom workout plans"
      ],
      liveUrl: "#",
      githubUrl: "#",
      status: "In Progress"
    }
  ];

  const categories = ["All", "Full Stack", "Frontend", "Data Visualization", "SaaS", "Mobile"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);
  const PROJECTS_PER_PAGE = 6;

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = filteredProjects.slice(
    currentPage * PROJECTS_PER_PAGE,
    currentPage * PROJECTS_PER_PAGE + PROJECTS_PER_PAGE
  );

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/20 to-background py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Handpicked projects across web, mobile, and full-stack development — from idea to working product.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-card text-muted-foreground hover:bg-muted border border-border"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="relative">
          <motion.div
            key={`${activeCategory}-${currentPage}`}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {paginatedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="bg-card rounded-2xl overflow-hidden border shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  {/* Project Image */}
                  <div className="relative overflow-hidden">
                    <ImageCarousel images={project.images || [project.image]} title={project.title} height="h-48" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    <Badge
                      className={`absolute top-4 right-4 z-10 ${
                        project.status === 'Completed' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    >
                      {project.status}
                    </Badge>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="text-xs">
                        {project.category}
                      </Badge>
                    </div>

                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="text-sm text-primary font-medium group-hover:underline">
                      View Details →
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={currentPage === 0}
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <span className="text-xl">←</span>
              </button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'bg-primary scale-125'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                disabled={currentPage === totalPages - 1}
                className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <span className="text-xl">→</span>
              </button>
            </motion.div>
          )}
        </div>

        {/* Project Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">
                    {selectedProject.title}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Project Images */}
                  <div className="rounded-lg overflow-hidden">
                    <ImageCarousel images={selectedProject.images || [selectedProject.image]} title={selectedProject.title} height="h-64" />
                  </div>

                  {/* Project Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {selectedProject.longDescription}
                      </p>
                      
                      <div className="flex gap-3">
                        <Button asChild>
                          <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">
                            Live Demo
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                            View Code
                          </a>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedProject.features.map((feature: string, index: number) => (
                          <li key={index} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech: string, index: number) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProjectsSection;
