"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const FaqItem = ({
  question,
  answer,
  index,
  isInView,
}: {
  question: string;
  answer: string;
  index: number;
  isInView: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: 1.2 + index * 0.07 }}
      className="bg-card border border-border rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-muted/40 transition-colors"
      >
        <span className="font-medium text-sm pr-4">{question}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-primary text-xl flex-shrink-0"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("API error response:", data);
        throw new Error(data.error || "Failed");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const contactMethods = [
    {
      title: "Email",
      value: "ramjipatwa2001@gmail.com",
      description: "Send me an email anytime",
      action: "mailto:ramjipatwa2001@gmail.com"
    },
    {
      title: "LinkedIn",
      value: "linkedin.com/in/ramji-patva",
      description: "Let's connect professionally",
      action: "https://linkedin.com/in/ramji-patva"
    },
    {
      title: "GitHub",
      value: "github.com/Ram4316",
      description: "Check out my code",
      action: "https://github.com/Ram4316"
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
            Let&apos;s Build Something
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether it&apos;s a website, a mobile app, or a full-stack product — let&apos;s turn your idea into reality.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card rounded-2xl p-8 border shadow-lg"
          >
            <h3 className="text-2xl font-semibold mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    placeholder="Your full name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20"
                  placeholder="What's this about?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="transition-all duration-300 focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Tell me about your project, goals, and how I can help..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 text-lg font-medium transition-all duration-300 hover:scale-105"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  "Send Message"
                )}
              </Button>

              {/* Status Messages */}
              {submitStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200 text-sm"
                >
                  ✓ Message sent successfully! I&apos;ll get back to you soon.
                </motion.div>
              )}

              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200 text-sm"
                >
                  ✗ Something went wrong. Please try again or contact me directly.
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Have a project in mind or want to collaborate? Drop a message and I&apos;ll get back to you within 24 hours.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.action}
                  target={method.action.startsWith('http') ? '_blank' : '_self'}
                  rel={method.action.startsWith('http') ? 'noopener noreferrer' : ''}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  className="block p-6 bg-card rounded-lg border hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {method.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-1">{method.description}</p>
                      <p className="text-primary font-medium">{method.value}</p>
                    </div>
                    <div className="text-2xl group-hover:scale-110 transition-transform">
                      →
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="p-4 bg-card rounded-xl border border-border space-y-3"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-base text-primary">Current Availability</h4>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-green-500/10 border border-green-500/30 rounded-full text-xs font-medium text-green-600 dark:text-green-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  Open to Work
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: "💼", label: "Freelance", status: "Available" },
                  { icon: "🕐", label: "Response Time", status: "Within 24h" },
                  { icon: "🌍", label: "Remote Work", status: "Worldwide" },
                  { icon: "📱", label: "Project Types", status: "Web & Mobile" },
                ].map((item, i) => (
                  <div key={i} className="bg-muted rounded-lg px-3 py-2 border border-border/50 flex items-center gap-2">
                    <span className="text-base">{item.icon}</span>
                    <div>
                      <div className="text-xs text-muted-foreground leading-none mb-0.5">{item.label}</div>
                      <div className="text-xs font-medium text-foreground">{item.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-muted-foreground text-xs leading-relaxed">
                Mark your subject line <span className="text-foreground font-medium">Urgent</span> for priority response.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-semibold text-center mb-3">Frequently Asked Questions</h3>
          <p className="text-muted-foreground text-center text-sm mb-10">Things people usually ask before reaching out.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              {
                question: "Are you available for freelance projects?",
                answer: "Yes! I'm currently open to freelance work — websites, landing pages, full-stack apps, and mobile apps. Feel free to reach out with your project details and I'll get back to you within 24 hours."
              },
              {
                question: "What kind of projects do you take on?",
                answer: "I work on modern websites, landing pages, full-stack web applications, Flutter mobile apps, and Firebase-based realtime systems. If you have something in mind, just describe it and we can figure out if it's a good fit."
              },
              {
                question: "How long does a typical project take?",
                answer: "It depends on the scope. A landing page usually takes 3–5 days. A full-stack web app or mobile app can take 2–6 weeks. I always give a clear estimate before starting."
              },
              {
                question: "What technologies do you work with?",
                answer: "My main stack is React, Next.js, TypeScript, Node.js, Flutter, Firebase, and PostgreSQL. I'm comfortable picking up new tools when a project needs it."
              },
              {
                question: "Do you work with clients outside India?",
                answer: "Absolutely. I'm comfortable working remotely with clients from anywhere. Communication is usually through email, WhatsApp, or any platform you prefer."
              },
              {
                question: "Can you help with an existing project?",
                answer: "Yes — I can jump into an existing codebase to fix bugs, add features, improve performance, or refactor code. Just share the details and we'll take it from there."
              }
            ].map((faq, index) => (
              <FaqItem key={index} question={faq.question} answer={faq.answer} index={index} isInView={isInView} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactSection;
