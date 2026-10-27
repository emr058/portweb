"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { projectsData } from "@/data/projects";

export function ProjectsSection({ limit }: { limit?: number }) {
  const { language } = useLanguage();
  const groups = [
    { id: "templates", tr: "Şu an üretimde", en: "In production now" },
    { id: "ideas", tr: "Geliştirdiğim ürünler", en: "Products I am building" },
    { id: "work", tr: "Önceki çalışmalar", en: "Earlier work" },
  ];
  const projects = limit ? projectsData.slice(0, limit) : projectsData;
  return <div className="space-y-12">
    {groups.map(group => <section key={group.id} className="space-y-5">
      <h2 className="text-xl font-medium tracking-tight">{group[language]}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.filter(project => project.group === group.id).map(project => <article key={project.slug} className="site-card flex flex-col gap-4">
          <h3 className="text-base font-medium">{project.name[language]}</h3>
          <p className="text-sm leading-7 text-slate-400">{project.description[language]}</p>
          {project.group !== "ideas" && <Link className="mt-auto inline-flex min-h-11 items-center gap-2 text-xs text-blue-200" href={`/projects/${project.slug}`}>{language === "tr" ? "Projeyi incele" : "View project"}<ArrowUpRight size={16} /></Link>}
        </article>)}
      </div>
    </section>)}
    {limit && <Link href="/projects" className="site-action">{language === "tr" ? "Tüm projeleri gör" : "View all projects"}</Link>}
  </div>;
}
