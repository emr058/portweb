"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { aiStackData } from "@/data/ai-stack";

const categories = {
  "LLM Models": { tr: "Dil modelleri", en: "Language models" },
  "Orchestration & Frameworks": { tr: "Araç bağlantıları", en: "Tool integration" },
  "Automation & Workflows": { tr: "İş otomasyonu", en: "Workflow automation" },
  "Agent Architecture": { tr: "Yapay zeka sistemleri", en: "AI systems" },
};
const uses = {
  production: { tr: "Kullanıyorum", en: "In use" },
  current: { tr: "Üzerinde çalışıyorum", en: "Working with" },
  learning: { tr: "Öğreniyorum", en: "Learning" },
  planned: { tr: "Çalışmayı planlıyorum", en: "Plan to study" },
};
export function AIStackSection({ isPreview = false }: { isPreview?: boolean }) {
  const { language } = useLanguage();
  const items = isPreview ? aiStackData.slice(0, 6) : aiStackData;
  return <section className="space-y-8">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(item => <article key={item.name} className="site-card space-y-4">
        <p className="text-xs text-slate-400">{categories[item.category][language]}</p>
        <h2 className="text-base font-medium">{item.name}</h2>
        <p className="text-sm leading-7 text-slate-400">{item.description[language]}</p>
        <p className="text-xs text-blue-200">{uses[item.status][language]}</p>
      </article>)}
    </div>
    {isPreview && <Link href="/ai-stack" className="site-action">{language === "tr" ? "Tüm araçları gör" : "View all tools"}</Link>}
  </section>;
}
