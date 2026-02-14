"use client";

import { scrollToSection } from "@/utils/scroll";
import { useLanguage } from "@/components/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { Bot, Cpu, Layers } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const icons = {
    robotics: Bot,
    ai: Cpu,
    fullstack: Layers,
};

export const PathSelector = () => {
    const { language } = useLanguage();
    const { hero } = portfolioData[language];

    return (
        <LazyMotion features={domAnimation} strict>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-4xl mx-auto">
                {hero.pathSelector.map((card, index) => {
                    const Icon = icons[card.id as keyof typeof icons] || Bot;
                    return (
                        <m.button
                            key={card.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            onClick={() => scrollToSection(card.id)}
                            className="group flex flex-col items-center text-center p-8 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl hover:border-accent dark:hover:border-accent hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/10 group-hover:text-accent transition-colors text-slate-600 dark:text-slate-300">
                                <Icon size={24} />
                            </div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white mb-2">{card.title}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{card.desc}</p>
                        </m.button>
                    );
                })}
            </div>
        </LazyMotion>
    );
};
