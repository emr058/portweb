"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { projectsData } from "@/data/projects";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const project = projectsData.find(item => item.slug === slug);
  if (!project) notFound();
  return <article className="site-page">
    <Link href="/projects" className="site-action mb-8">{language === "tr" ? "Projelere dön" : "Back to projects"}</Link>
    <div className="site-card space-y-6">
      <header className="site-page-heading"><h1>{project.name[language]}</h1><p>{project.description[language]}</p></header>
      {project.technologies && <ul className="flex flex-wrap gap-2 text-xs text-slate-300">{project.technologies.map(tech => <li key={tech} className="rounded border border-[#303c50] px-3 py-1">{tech}</li>)}</ul>}
    </div>
  </article>;
}
