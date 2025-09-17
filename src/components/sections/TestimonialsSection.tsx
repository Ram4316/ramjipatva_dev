"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp Solutions",
      content: "Alex delivered exceptional work on our e-commerce platform. His attention to detail and ability to translate complex requirements into elegant solutions is remarkable. The project was completed ahead of schedule and exceeded our expectations.",
      avatar: "https://placehold.co/80x80?text=SC",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "CTO",
      company: "StartupXYZ",
      content: "Working with Alex was a game-changer for our startup. He not only built our MVP but also provided valuable insights on scalability and user experience. His code quality is top-notch and well-documented.",
      avatar: "https://placehold.co/80x80?text=MR",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Johnson",
      role: "Design Director",
      company: "Creative Agency",
      content: "Alex has an incredible ability to bring designs to life with pixel-perfect precision. His collaboration skills and proactive communication made our project seamless. Highly recommend for any web development needs.",
      avatar: "https://placehold.co/80x80?text=EJ",
      rating: 5
    },
    {
      id: 4,
      name: "David Kim",
      role: "Founder",
      company: "InnovateLab",
      content: "The analytics dashboard Alex built for us has transformed how we make business decisions. His expertise in data visualization and user interface design is outstanding. Professional, reliable, and innovative.",
      avatar: "https://placehold.co/80x80?text=DK",
      rating: 5
    },
    {
      id: 5,
      name: "Lisa Thompson",
      role: "Marketing Director",
      company: "Digital Solutions Inc",
      content: "Alex developed our social media management platform with incredible efficiency. The user experience is intuitive, and the performance is excellent. His technical skills combined with business understanding make him invaluable.",
      avatar: "https://placehold.co/80x80?text=LT",
      rating: 5
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-muted-foreground'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Client Testimonials
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            What clients say about working with me and the impact of our collaborations.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="bg-card rounded-3xl p-8 md:p-12 border shadow-2xl min-h-[400px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                {/* Quote */}
                <div className="mb-8">
                  <div className="text-6xl text-primary/20 mb-4">&quot;</div>
                  <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                    {testimonials[currentIndex].content}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {renderStars(testimonials[currentIndex].rating)}
                </div>

                {/* Client Info */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    className="w-16 h-16 rounded-full border-2 border-primary/20"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const initials = testimonials[currentIndex].name.split(' ').map(n => n[0]).join('');
                        parent.innerHTML = `<div class="w-16 h-16 rounded-full border-2 border-primary/20 bg-primary/10 flex items-center justify-center font-semibold text-primary">${initials}</div>`;
                      }
                    }}
                  />
                  <div className="text-center md:text-left">
                    <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                    <p className="text-muted-foreground">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
            aria-label="Previous testimonial"
          >
            <span className="text-xl">←</span>
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-card border rounded-full flex items-center justify-center hover:bg-muted transition-colors shadow-lg"
            aria-label="Next testimonial"
          >
            <span className="text-xl">→</span>
          </button>
        </motion.div>

        {/* Testimonial Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center gap-3 mt-8"
        >
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary scale-125'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50+", label: "Happy Clients" },
              { number: "100%", label: "Project Success Rate" },
              { number: "24/7", label: "Support Available" },
              { number: "5★", label: "Average Rating" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="p-6 bg-card rounded-lg border hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
