"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface GitHubRepo {
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

const DevelopmentActivity = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [languages, setLanguages] = useState<{ name: string; count: number; color: string }[]>([]);
  const [totalStars, setTotalStars] = useState(0);

  const languageColors: Record<string, string> = {
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Dart: "#00B4AB",
    Python: "#3776AB",
    HTML: "#E34F26",
    CSS: "#563D7C",
    "C++": "#f34b7d",
    Java: "#b07219",
    Shell: "#89e051",
    Other: "#8b8b8b",
  };

  useEffect(() => {
    // Fetch user stats
    fetch("https://api.github.com/users/Ram4316")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(() => {});

    // Fetch repos to calculate languages + stars
    fetch("https://api.github.com/users/Ram4316/repos?per_page=100")
      .then((r) => r.json())
      .then((repos: GitHubRepo[]) => {
        if (!Array.isArray(repos)) return;

        // Count stars
        const stars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
        setTotalStars(stars);

        // Count languages
        const langMap: Record<string, number> = {};
        repos.forEach((repo) => {
          if (repo.language && !repo.fork) {
            langMap[repo.language] = (langMap[repo.language] || 0) + 1;
          }
        });

        const sorted = Object.entries(langMap)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 6)
          .map(([name, count]) => ({
            name,
            count,
            color: languageColors[name] || languageColors["Other"],
          }));

        setLanguages(sorted);
      })
      .catch(() => {});
  }, []);

  const recentWork = [
    "Chatbot with Gemini API",
    "Firebase Authentication Systems",
    "SaaS Dashboard Interfaces",
    "Landing Pages & Full Stack Apps",
  ];

  const totalRepos = stats?.public_repos ?? 0;
  const maxLangCount = languages[0]?.count || 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Development Activity
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A live look at what I&apos;ve been building and experimenting with.
          </p>
        </motion.div>

        {/* GitHub Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: "Public Repos", value: stats ? totalRepos : "—" },
            { label: "Total Stars", value: stats ? totalStars : "—" },
            { label: "Followers", value: stats ? stats.followers : "—" },
            { label: "Following", value: stats ? stats.following : "—" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-5 text-center"
            >
              <div className="text-3xl font-bold text-primary mb-1">{item.value}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left — Currently Building + Recent Work + GitHub Button */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                Currently Building
              </p>
              <p className="text-foreground leading-relaxed mb-6 text-sm">
                Building modern web applications, experimenting with AI integrations,
                and improving full-stack development workflows using React, Next.js,
                Firebase, and TypeScript.
              </p>

              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3 font-medium">
                Recent Work
              </p>
              <ul className="space-y-2.5 mb-8">
                {recentWork.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>

            <motion.a
              href="https://github.com/Ram4316"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:bg-primary/90 transition-colors w-full"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View GitHub Profile
            </motion.a>
          </motion.div>

          {/* Right — Top Languages */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-6 font-medium">
              Top Languages
            </p>

            {languages.length === 0 ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="space-y-1.5">
                    <div className="h-3 bg-muted rounded animate-pulse w-24" />
                    <div className="h-2 bg-muted rounded animate-pulse" style={{ width: `${80 - i * 12}%` }} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-5">
                {languages.map((lang, i) => (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm font-medium">{lang.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.round((lang.count / totalRepos) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(lang.count / maxLangCount) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.6 + i * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DevelopmentActivity;
