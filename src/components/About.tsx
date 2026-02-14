"use client";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/components/LanguageContext";
import { Section } from "./Section";

export const About = () => {
    const { language } = useLanguage();
    const { about } = portfolioData[language];

    return (
        <Section id="about" className="bg-slate-50 dark:bg-slate-950">
            <div className="max-w-4xl mx-auto">
                <div
                    className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 animate-fade-in-up"
                >
                    <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">{about.title}</h2>
                    <div className="prose prose-slate dark:prose-invert prose-lg text-slate-600 dark:text-slate-300">
                        <p className="mb-8 leading-relaxed">
                            {about.description}
                        </p>

                        {/* Skills Section */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                                {language === "tr" ? "Yetenekler" : "Skills"}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {about.skills.map((skill) => (
                                    <span key={skill} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-sm font-medium">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                                {language === "tr" ? "Deneyim" : "Experience"}
                            </h3>
                            <div className="space-y-8">
                                {portfolioData[language].experience.map((exp) => (
                                    <div key={exp.id} className="relative pl-6 border-l-2 border-slate-200 dark:border-slate-800">
                                        <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-accent" />
                                        <div className="mb-1">
                                            <h4 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h4>
                                            <div className="flex flex-wrap items-center gap-x-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                                                <span className="font-medium text-slate-700 dark:text-slate-300">{exp.company}</span>
                                                <span>•</span>
                                                <span>{exp.period}</span>
                                            </div>
                                        </div>
                                        <p className="text-base text-slate-600 dark:text-slate-400 mb-3">
                                            {exp.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.tech.map((t) => (
                                                <span key={t} className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <div className="font-bold text-slate-900 dark:text-white text-2xl">3+</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{about.stats.ai}</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <div className="font-bold text-slate-900 dark:text-white text-2xl">4+</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{about.stats.robotics}</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <div className="font-bold text-slate-900 dark:text-white text-2xl">2+</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{about.stats.vehicle}</div>
                            </div>
                            <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                                <div className="font-bold text-slate-900 dark:text-white text-2xl">5+</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide mt-1">{about.stats.fullstack}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
};
