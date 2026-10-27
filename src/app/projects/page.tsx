"use client";

import { ProjectsSection } from "@/components/projects-section";
import { useLanguage } from "@/context/language-context";

export default function ProjectsPage() {
  const { language } = useLanguage();
  return <div className="site-page">
    <header className="site-page-heading"><h1>{language === "tr" ? "Projeler" : "Projects"}</h1><p>{language === "tr" ? "Şu an yürüyen işler, kendi ürünlerim ve önceki çalışmalarım." : "Current work, my own products and earlier projects."}</p></header>
    <ProjectsSection />
  </div>;
}
