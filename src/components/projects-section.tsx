"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { projectsData, ProjectCaseStudy, ProjectStatusKey } from "@/data/projects";
import { ArrowUpRight, Github, ExternalLink, Activity } from "lucide-react";

export function ProjectsSection({ limit }: { limit?: number }) {
  const { language } = useLanguage();
  const t = translations[language].projects;

  const statusBadgeStyle: Record<
    ProjectStatusKey,
    { bg: string; text: string; border: string }
  > = {
    active: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30" },
    publishingSoon: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30" },
    live: { bg: "bg-teal-500/10", text: "text-teal-400", border: "border-teal-500/30" },
    comingSoon: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30" },
    research: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30" },
  };

  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
          <Activity className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayedProjects.map((proj, idx) => {
          const badge = statusBadgeStyle[proj.statusKey];
          const primaryMetric = proj.metrics[0];

          return (
            <motion.div
              key={proj.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group flex flex-col justify-between border-white/10 hover:border-blue-500/40"
            >
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
                  >
                    {t.statusBadges[proj.statusKey]}
                  </span>
                  <div className="flex items-center gap-2">
                    {proj.links.github && (
                      <a
                        href={proj.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                        title="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {proj.links.demo && (
                      <a
                        href={proj.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Title & Tagline */}
                <Link href={`/projects/${proj.slug}`} className="block group-hover:text-blue-400 transition-colors">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center justify-between">
                    <span>{proj.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 mb-4 line-clamp-2">
                    {proj.tagline[language]}
                  </p>
                </Link>

                {/* Primary Metric Highlight Box */}
                {primaryMetric && (
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 mb-5 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-mono">
                      {primaryMetric.label[language]}
                    </span>
                    <span className="text-sm font-bold font-mono text-emerald-400">
                      {primaryMetric.value}
                    </span>
                  </div>
                )}

                {/* Technologies List */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 border border-white/10 text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {proj.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-white/5 text-gray-500">
                      +{proj.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* View Case Study Button */}
              <Link
                href={`/projects/${proj.slug}`}
                className="w-full py-3 rounded-xl font-semibold text-xs text-center text-gray-200 bg-white/5 hover:bg-blue-600 hover:text-white border border-white/10 hover:border-blue-500 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-blue-500/20"
              >
                <span>{t.viewCaseStudy}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          );
        })}
      </div>

      {limit && (
        <div className="text-center mt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <span>{t.viewAll}</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </section>
  );
}
