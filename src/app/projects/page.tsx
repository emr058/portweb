"use client";

import { ProjectsSection } from "@/components/projects-section";
import { useLanguage } from "@/context/language-context";

export default function ProjectsPage() {
  const { language } = useLanguage();
  return <div className="site-page">
    <header className="site-page-heading"><h1>{language === "tr" ? "Projeler" : "Projects"}</h1><p>{language === "tr" ? "Web şablonları, otomasyon işleri ve ürün fikirleri." : "Web templates, automation work and product ideas."}</p></header>
    <ProjectsSection />
  </div>;
}
