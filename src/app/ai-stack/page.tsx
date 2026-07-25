"use client";

import React from "react";
import { AIStackSection } from "@/components/ai-stack-section";
import { useLanguage } from "@/context/language-context";

export default function AIStackPage() {
  const { language } = useLanguage();

  return (
    <div className="pt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          {language === "tr" ? "Yapay Zeka Yetkinlik Matrisi" : "Honest AI Stack Matrix"}
        </h1>
        <p className="text-base text-gray-400 max-w-2xl mx-auto">
          {language === "tr"
            ? "Canlı sistemlerde kullandığım, aktif ustalaştığım ve keşfettiğim yapay zeka mimarilerinin şeffaf dökümü."
            : "A transparent breakdown of AI models, frameworks, and agent architectures used in production."}
        </p>
      </div>
      <AIStackSection isPreview={false} />
    </div>
  );
}
