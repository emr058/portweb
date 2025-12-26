"use client";

import { portfolioData } from "@/data/portfolio";
import { useLanguage } from "@/components/LanguageContext";
import { Section } from "./Section";
import { Mail, Linkedin, Github, Send } from "lucide-react";
import { motion } from "framer-motion";

export const Contact = () => {
    const { language } = useLanguage();
    const { contact, personal } = portfolioData[language];

    return (
        <Section id="contact" className="bg-white dark:bg-slate-900">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                    {contact.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                    {contact.subtitle}
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-center gap-8 max-w-3xl mx-auto">
                <motion.a
                    href={personal.socials.email}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex-1 flex flex-col items-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-accent hover:shadow-md transition-all group"
                >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Mail size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">Email</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{language === 'tr' ? "Doğrudan mail gönder" : "Send me an email"}</p>
                </motion.a>

                <motion.a
                    href={personal.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 flex flex-col items-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-accent hover:shadow-md transition-all group"
                >
                    <div className="w-12 h-12 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Linkedin size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">LinkedIn</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{language === 'tr' ? "Profesyonel ağım" : "Professional network"}</p>
                </motion.a>

                <motion.a
                    href={personal.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 flex flex-col items-center p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 hover:border-accent hover:shadow-md transition-all group"
                >
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Github size={24} />
                    </div>
                    <h3 className="font-bold text-slate-900 dark:text-white mb-1">GitHub</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{language === 'tr' ? "Kod incele" : "Review my code"}</p>
                </motion.a>
            </div>

            <div className="mt-16 text-center">
                <a
                    href={personal.socials.email}
                    className="inline-flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-4 rounded-full font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl"
                >
                    <span>{contact.cta}</span>
                    <Send size={18} />
                </a>
            </div>
        </Section>
    );
};
