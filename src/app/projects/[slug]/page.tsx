"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { projectsData, ProjectCaseStudy, ProjectStatusKey } from "@/data/projects";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Lightbulb,
  Sparkles,
  RefreshCw,
  Code2,
  ChevronRight,
} from "lucide-react";

export default function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const t = translations[language].caseStudy;

  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

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

  const badge = statusBadgeStyle[project.statusKey];

  return (
    <article className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      {/* Back Button */}
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>{t.backToProjects}</span>
      </Link>

      {/* Case Study Header Banner */}
      <div className="glass-card rounded-3xl p-8 sm:p-12 space-y-6 relative overflow-hidden bg-gradient-to-b from-blue-950/30 via-slate-900/60 to-transparent border border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-mono font-semibold border ${badge.bg} ${badge.text} ${badge.border}`}
          >
            {translations[language].projects.statusBadges[project.statusKey]}
          </span>
          <span className="text-xs font-mono text-gray-400">
            {project.role[language]}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {project.title}
        </h1>

        <p className="text-base sm:text-lg text-gray-300 max-w-3xl leading-relaxed">
          {project.tagline[language]}
        </p>

        {/* Links & Quick Tech Badges */}
        <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>{t.github}</span>
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.liveDemo}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Grid with Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Table of Contents Sticky Sidebar */}
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="sticky top-24 glass-card-static rounded-2xl p-5 border border-white/10 space-y-3">
            <h4 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-wider">
              {language === "tr" ? "İÇİNDEKİLER" : "CONTENTS"}
            </h4>
            <nav className="space-y-2 text-xs font-medium text-gray-400">
              <a href="#problem" className="block hover:text-blue-400 transition-colors">
                1. {t.problem}
              </a>
              <a href="#solution" className="block hover:text-blue-400 transition-colors">
                2. {t.solution}
              </a>
              <a href="#architecture" className="block hover:text-blue-400 transition-colors">
                3. {t.architecture}
              </a>
              <a href="#impact" className="block hover:text-blue-400 transition-colors">
                4. {t.businessImpact}
              </a>
              <a href="#lessons" className="block hover:text-blue-400 transition-colors">
                5. {t.lessons}
              </a>
              <a href="#different" className="block hover:text-emerald-400 font-semibold transition-colors">
                6. {t.whatIBuildDifferently}
              </a>
            </nav>
          </div>
        </aside>

        {/* Case Study Details */}
        <div className="lg:col-span-3 space-y-12">
          {/* Section 1: Problem */}
          <section id="problem" className="space-y-4">
            <div className="flex items-center gap-2 text-rose-400">
              <AlertCircle className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {t.problem}
              </h2>
            </div>
            <div className="glass-card-static rounded-2xl p-6 border border-rose-500/20 bg-rose-950/10 text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.problem[language]}
            </div>
          </section>

          {/* Section 2: Solution */}
          <section id="solution" className="space-y-4">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {t.solution}
              </h2>
            </div>
            <div className="glass-card-static rounded-2xl p-6 border border-emerald-500/20 bg-emerald-950/10 text-gray-300 text-sm sm:text-base leading-relaxed">
              {project.solution[language]}
            </div>
          </section>

          {/* Section 3: Architecture Diagram & Workflow */}
          <section id="architecture" className="space-y-6">
            <div className="flex items-center gap-2 text-blue-400">
              <Code2 className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {t.architecture}
              </h2>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {project.architecture[language]}
            </p>

            {/* Architecture Visual Diagram */}
            <ArchitectureDiagram nodes={project.architectureNodes} />

            {/* Execution Workflow Steps */}
            <div className="glass-card-static rounded-2xl p-6 border border-white/10 space-y-3">
              <h4 className="text-sm font-mono font-bold text-gray-300 uppercase tracking-wider">
                {t.workflow}
              </h4>
              <div className="space-y-2">
                {project.workflowSteps.map((step, i) => (
                  <div key={i} className="p-3 rounded-lg bg-white/5 text-xs sm:text-sm text-gray-200">
                    {step[language]}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 4: Business Impact & Metrics */}
          <section id="impact" className="space-y-6">
            <div className="flex items-center gap-2 text-teal-400">
              <TrendingUp className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {t.businessImpact}
              </h2>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed">
              {project.businessImpact[language]}
            </p>

            {/* Metrics Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label.en}
                  className="glass-card-static rounded-2xl p-6 border border-teal-500/20 bg-teal-950/10 space-y-2"
                >
                  <span className="text-xs font-mono text-gray-400 block">
                    {m.label[language]}
                  </span>
                  <span className="text-3xl font-extrabold font-mono text-teal-400 block">
                    {m.value}
                  </span>
                  {m.before && (
                    <div className="text-[11px] font-mono text-gray-400 pt-2 border-t border-white/10 flex justify-between">
                      <span>Before: <span className="line-through text-rose-400">{m.before}</span></span>
                      <span>After: <span className="text-emerald-400">{m.after}</span></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Lessons Learned */}
          <section id="lessons" className="space-y-4">
            <div className="flex items-center gap-2 text-purple-400">
              <Lightbulb className="w-5 h-5" />
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {t.lessons}
              </h2>
            </div>
            <div className="space-y-3">
              {project.lessons.map((lesson, i) => (
                <div
                  key={i}
                  className="glass-card-static rounded-xl p-4 border border-purple-500/20 bg-purple-950/10 text-xs sm:text-sm text-gray-300 leading-relaxed flex items-start gap-3"
                >
                  <ChevronRight className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                  <span>{lesson[language]}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 6: WHAT I WOULD BUILD DIFFERENTLY TODAY (RECRUITER SIGNAL) */}
          <section id="different" className="space-y-4">
            <div className="glass-card rounded-2xl p-8 border border-emerald-500/40 bg-gradient-to-r from-emerald-950/30 via-slate-900/60 to-transparent space-y-4 shadow-xl shadow-emerald-500/10">
              <div className="flex items-center gap-2 text-emerald-400">
                <RefreshCw className="w-5 h-5 animate-spin-slow" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  {t.whatIBuildDifferently}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-200 leading-relaxed italic">
                &ldquo;{project.whatIWouldBuildDifferentlyToday[language]}&rdquo;
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
