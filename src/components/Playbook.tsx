"use client";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/components/LanguageContext";
import { Section } from "./Section";
import { CheckCircle2 } from "lucide-react";

export const Playbook = () => {
    const { language } = useLanguage();
    const { playbook } = portfolioData[language];

    return (
        <Section id="playbook" className="bg-white dark:bg-slate-900">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    {language === 'tr' ? "Metodoloji" : "Integration Playbook"}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                    {language === 'tr'
                        ? "Karmaşık sistemleri kaostan düzenli akışlara dönüştüren metodolojim."
                        : "My methodology for turning complex systems into organized workflows."}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {playbook.map((item) => (
                    <div
                        key={item.id}
                        className="p-8 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group hover:border-accent dark:hover:border-accent hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 dark:bg-accent/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                        <CheckCircle2 className="text-accent mb-6 relative z-10" size={32} />

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 relative z-10">
                            {item.title}
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed relative z-10">
                            {item.description}
                        </p>
                    </div>
                ))}
            </div>
        </Section>
    );
};
