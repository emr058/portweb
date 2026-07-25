"use client";

import React from "react";
import { ProjectsSection } from "@/components/projects-section";
import { useLanguage } from "@/context/language-context";

export default function ProjectsPage() {
  const { language } = useLanguage();

  return (
    <div className="pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === "tr" ? "Tüm Mühendislik Projeleri" : "All Engineering Case Studies"}
        </h1>
        <p className="text-base text-gray-400 max-w-2xl mx-auto">
          {language === "tr"
            ? "Gerçek iş sorunlarını çözmek için geliştirilen 8 yazılım projesinin kapsamlı mimari incelemeleri."
            : "In-depth case studies for 8 software products engineered to eliminate business friction."}
        </p>
      </div>
      <ProjectsSection />
    </div>
  );
}
