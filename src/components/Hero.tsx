"use client";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/components/LanguageContext";
import { PathSelector } from "./PathSelector";
import { scrollToSection } from "@/utils/scroll";
import { ArrowDown } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export const Hero = () => {
    const { language } = useLanguage();
    const { hero, personal } = portfolioData[language];

    return (
        <section className="min-h-screen flex flex-col justify-center items-center pt-20 pb-10 relative overflow-hidden bg-slate-50 dark:bg-slate-950">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] bg-sky-100/50 dark:bg-sky-900/20 rounded-full blur-[100px]" />
                <div className="absolute top-[20%] -left-[10%] w-[400px] h-[400px] bg-indigo-100/50 dark:bg-indigo-900/20 rounded-full blur-[80px]" />
            </div>

            <div className="container mx-auto px-4 text-center z-10">
                {/* Profile Photo */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8 flex justify-center"
                >
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/30 dark:border-slate-700/50 shadow-xl">
                        <Image
                            src="/profile.jpg"
                            alt={personal.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-wrap justify-center gap-3 mb-8"
                >
                    {hero.badges.map((badge) => (
                        <span
                            key={badge}
                            className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-sm"
                        >
                            {badge}
                        </span>
                    ))}
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
                >
                    {personal.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {personal.tagline}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-4 justify-center"
                >
                    <button
                        onClick={() => scrollToSection("projects")}
                        className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-full font-medium hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg shadow-slate-900/10"
                    >
                        {hero.cta.projects}
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-3 rounded-full font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                        {hero.cta.contact}
                    </button>
                </motion.div>

                <PathSelector />
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 animate-bounce"
            >
                <ArrowDown size={24} />
            </motion.div>
        </section>
    );
};
