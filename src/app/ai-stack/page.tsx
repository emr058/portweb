"use client";

import { AIStackSection } from "@/components/ai-stack-section";
import { useLanguage } from "@/context/language-context";

export default function AIStackPage() {
  const { language } = useLanguage();
  return <div className="site-page">
    <header className="site-page-heading"><h1>AI Stack</h1><p>{language === "tr" ? "Kullandığım ve üzerine çalıştığım yapay zeka araçları." : "AI tools I use and study."}</p></header>
    <AIStackSection />
  </div>;
}
