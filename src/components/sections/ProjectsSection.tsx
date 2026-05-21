"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  images: string[];
  image?: string;
  technologies: string[];
  features: string[];
  liveUrl: string;
  githubUrl: string;
  status: string;
}

// Reusable image carousel
const ImageCarousel = ({ images, title, height = "h-48" }: { images: string[], title: string, height?: string }) => {
  const [current, setCurrent] = useState(0);

  if (!images || images.length === 0) {
    return <div className={`w-full ${height} bg-muted flex items-center justify-center text-muted-foreground text-sm`}>No Preview</div>;
  }

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
          onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
        />
      </AnimatePresence>
      <button onClick={(e) => { e.stopPropagation(); setCurrent(p => (p === 0 ? images.length - 1 : p - 1)); }}
        className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity text-xs z-10"
        aria-label="Previous image">←</button>
      <button onClick={(e) => { e.stopPropagation(); setCurrent(p => (p === images.length - 1 ? 0 : p + 1)); }}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity text-xs z-10"
        aria-label="Next image">→</button>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
            className={`w-1.5 h-1.5 rounded-full transition-all ${i === current ? "bg-white scale-125" : "bg-white/50"}`} />
        ))}
      </div>
      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full z-10">
        {current + 1}/{images.length}
      </div>
    </div>
  );
};

const CATEGORIES = ["All", "Full Stack", "Frontend", "Data Visualization", "SaaS", "Mobile"];
const PROJECTS_PER_PAGE = 6;

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [projects, setProjects] = useState<Project[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch from GitHub raw — always up to date
  useEffect(() => {
    fetch(`https://raw.githubusercontent.com/Ram4316/ramjipatva_dev/master/public/projects.json?t=${Date.now()}`)
      .then(r => r.json())
      .then(data => { setProjects(data); setLoadingProjects(false); })
      .catch(() => {
        // Fallback to local file
        fetch("/projects.json")
          .then(r => r.json())
          .then(data => { setProjects(data); setLoadingProjects(false); })
          .catch(() => setLoadingProjects(false));
      });
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

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
          {CATEGORIES.map(category => (
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

        {/* Loading */}
        {loadingProjects && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-card rounded-2xl overflow-hidden border shadow-lg animate-pulse">
                <div className="h-48 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        {!loadingProjects && (
          <div className="relative">
            <motion.div
              key={`${activeCategory}-${currentPage}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
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
                    <div className="relative overflow-hidden">
                      <ImageCarousel images={project.images || (project.image ? [project.image] : [])} title={project.title} height="h-48" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <Badge className={`absolute top-4 left-4 z-10 ${project.status === "Completed" ? "bg-green-500" : "bg-yellow-500"}`}>
                        {project.status}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <Badge variant="secondary" className="text-xs mb-3">{project.category}</Badge>
                      <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <span key={i} className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">{tech}</span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">+{project.technologies.length - 3} more</span>
                        )}
                      </div>
                      <div className="text-sm text-primary font-medium group-hover:underline">View Details →</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center justify-center gap-4 mt-12"
              >
                <button onClick={() => setCurrentPage(p => Math.max(0, p - 1))} disabled={currentPage === 0}
                  className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg disabled:opacity-30 disabled:cursor-not-allowed">
                  <span className="text-xl">←</span>
                </button>
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${i === currentPage ? "bg-primary scale-125" : "bg-muted-foreground/30 hover:bg-muted-foreground/50"}`} />
                  ))}
                </div>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))} disabled={currentPage === totalPages - 1}
                  className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg disabled:opacity-30 disabled:cursor-not-allowed">
                  <span className="text-xl">→</span>
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* Modal */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold">{selectedProject.title}</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="rounded-lg overflow-hidden">
                    <ImageCarousel images={selectedProject.images || (selectedProject.image ? [selectedProject.image] : [])} title={selectedProject.title} height="h-64" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Description</h3>
                      <p className="text-muted-foreground leading-relaxed mb-4">{selectedProject.longDescription}</p>
                      <div className="flex gap-3">
                        {selectedProject.liveUrl && selectedProject.liveUrl !== "#" && (
                          <Button asChild>
                            <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                          </Button>
                        )}
                        {selectedProject.githubUrl && selectedProject.githubUrl !== "#" && (
                          <Button variant="outline" asChild>
                            <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">View Code</a>
                          </Button>
                        )}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                      <ul className="space-y-2 mb-6">
                        {selectedProject.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <h3 className="text-lg font-semibold mb-3">Technologies Used</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, i) => (
                          <Badge key={i} variant="secondary">{tech}</Badge>
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
