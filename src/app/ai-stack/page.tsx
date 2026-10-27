"use client";

import { AIStackSection } from "@/components/ai-stack-section";
import { useLanguage } from "@/context/language-context";

export default function AIStackPage() {
  const { language } = useLanguage();
  return <div className="site-page">
    <header className="site-page-heading"><h1>{language === "tr" ? "Teknolojiler" : "Tech stack"}</h1><p>{language === "tr" ? "Projelerimde kullandığım diller, araçlar ve nerede kullandığım." : "The languages and tools I use, and where I have used them."}</p></header>
    <AIStackSection />
  </div>;
}
