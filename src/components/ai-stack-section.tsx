"use client";

import { useLanguage } from "@/context/language-context";
import { stackGroups } from "@/data/ai-stack";

export function AIStackSection() {
  const { language } = useLanguage();
  return <div className="space-y-10">
    {stackGroups.map(group => <section key={group.title.en} className="space-y-4">
      <h2 className="text-lg font-medium">{group.title[language]}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {group.items.map(item => <article key={item.name} className="site-card space-y-3">
          <h3 className="text-base font-medium">{item.name}</h3>
          <p className="text-sm leading-7 text-slate-400">{item.note[language]}</p>
          {item.learning && <p className="text-xs text-blue-200">{language === "tr" ? "Öğreniyorum" : "Learning"}</p>}
        </article>)}
      </div>
    </section>)}
  </div>;
}
