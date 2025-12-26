"use client";

import { useLanguage } from "@/components/LanguageContext";
import { portfolioData } from "@/data/portfolio";

export const Footer = () => {
    const { language } = useLanguage();
    const { personal } = portfolioData[language];
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-white py-12 border-t border-slate-800">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <div className="font-bold text-xl tracking-tight mb-2">{personal.name}</div>
                    <p className="text-slate-400 text-sm">
                        {language === 'tr' ? "AI & Robotik Mühendisliği" : "AI & Robotics Engineering"}
                    </p>
                </div>

                <div className="text-sm text-slate-500">
                    &copy; {currentYear} Emir Aydın. {language === 'tr' ? "Tüm hakları saklıdır." : "All rights reserved."}
                </div>
            </div>
        </footer>
    );
};
