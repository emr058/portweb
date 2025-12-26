"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { ProjectGrid } from "@/components/ProjectGrid";
import { Playbook } from "@/components/Playbook";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/components/LanguageContext";

export default function Home() {
  const { language } = useLanguage();
  const { projects } = portfolioData[language];

  const featuredProjects = projects.filter((p) => p.category === "featured");
  const roboticsProjects = projects.filter((p) => p.category === "robotics");
  const aiProjects = projects.filter((p) => p.category === "ai");
  const fullStackProjects = projects.filter((p) => p.category === "fullstack");

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 selection:bg-accent/20 selection:text-accent">
      <Navbar />

      <Hero />

      <Section id="projects" className="bg-white dark:bg-slate-900">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            {language === 'tr' ? "Öne Çıkan Projeler" : "Featured Projects"}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {language === 'tr' ? "Otonom sistemler ve yazılım alanındaki son çalışmalarım." : "Latest work in autonomous systems and software."}
          </p>
        </div>
        <ProjectGrid projects={featuredProjects} />
      </Section>

      <Section id="robotics">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-1 bg-accent rounded-full"></span>
            Robotics Automation
          </h2>
        </div>
        <ProjectGrid projects={roboticsProjects} />
      </Section>

      <Section id="ai" className="bg-white dark:bg-slate-900">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-1 bg-accent rounded-full"></span>
            AI Integrations
          </h2>
        </div>
        <ProjectGrid projects={aiProjects} />
      </Section>

      <Section id="fullstack">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <span className="w-8 h-1 bg-accent rounded-full"></span>
            Full-Stack & Tools
          </h2>
        </div>
        <ProjectGrid projects={fullStackProjects} />
      </Section>

      <Playbook />

      <About />

      <Contact />

      <Footer />
    </main>
  );
}
