"use client";

import { useLanguage } from "@/context/language-context";
import { currentlyBuildingProjects } from "@/data/site";

export function CurrentlyBuilding() {
  const { language } = useLanguage();
  return <section className="max-w-7xl mx-auto px-6 py-12">
    <h2 className="text-2xl font-bold mb-6">{language === "tr" ? "Yapım aşamasında" : "Under construction"}</h2>
    <div className="grid gap-6 md:grid-cols-2">{currentlyBuildingProjects.map(project =>
      <article key={project.name} className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-2">{project.name}</h3>
        <p className="text-sm text-gray-400">{project.description[language]}</p>
      </article>
    )}</div>
  </section>;
}
