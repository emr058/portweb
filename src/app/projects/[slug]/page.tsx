"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { projectsData } from "@/data/projects";

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const { language } = useLanguage();
  const tr = language === "tr";
  const project = projectsData.find(item => item.slug === slug);
  if (!project) notFound();
  return <article className="site-page">
    <Link href="/projects" className="site-action mb-8">{tr ? "Projelere dön" : "Back to projects"}</Link>
    <div className="site-card space-y-6">
      <header className="site-page-heading"><h1>{project.name[language]}</h1><p>{project.description[language]}</p></header>
      {project.technologies && <ul className="flex flex-wrap gap-2 text-xs text-slate-300">{project.technologies.map(tech => <li key={tech} className="rounded border border-[#303c50] px-3 py-1">{tech}</li>)}</ul>}
      {project.demo && <div className="flex flex-wrap items-center gap-4"><a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#c2d8ff] px-4 py-3 text-sm font-medium text-[#10213c]">{tr ? "Demoyu aç" : "Open the demo"}<ArrowUpRight size={16} /></a><span className="text-xs text-slate-400">{tr ? "Ürünler ve fiyatlar örnektir; sipariş oluşturulmaz." : "Products and prices are samples; no orders are placed."}</span></div>}
    </div>
    {project.screens && <div className="mt-8 grid gap-6 md:grid-cols-[3fr_1fr] items-start">
      <figure className="site-card !p-3"><img src={project.screens.desktop} alt={tr ? `${project.name.tr}, bilgisayar görünümü` : `${project.name.en}, desktop view`} className="w-full rounded-lg" /><figcaption className="mt-2 text-xs text-slate-400">{tr ? "Bilgisayar" : "Desktop"}</figcaption></figure>
      <figure className="site-card !p-3 max-w-[280px] mx-auto md:max-w-none"><img src={project.screens.mobile} alt={tr ? `${project.name.tr}, telefon görünümü` : `${project.name.en}, phone view`} className="w-full rounded-lg" /><figcaption className="mt-2 text-xs text-slate-400">{tr ? "Telefon" : "Phone"}</figcaption></figure>
    </div>}
    {project.features && <div className="site-card mt-8"><h2 className="text-lg font-medium mb-4">{tr ? "Neler var?" : "What it does"}</h2><ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">{project.features[language].map(item => <li key={item}>{item}</li>)}</ul></div>}
  </article>;
}
