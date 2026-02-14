"use client";

import { useState, useSyncExternalStore } from "react";
import { cn } from "@/utils/cn";
import { scrollToSection } from "@/utils/scroll";
import { useLanguage } from "@/components/LanguageContext";
import { portfolioData } from "@/data/portfolio";
import { useTheme } from "next-themes";
import { Menu, X, Github, Linkedin, Mail, Globe, Moon, Sun } from "lucide-react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";

const navLinks = [
    { name: { en: "Projects", tr: "Projeler" }, id: "projects" },
    { name: { en: "Playbook", tr: "Metodoloji" }, id: "playbook" },
    { name: { en: "About", tr: "Hakkımda" }, id: "about" },
    { name: { en: "Contact", tr: "İletişim" }, id: "contact" },
];

// Hydration-safe scroll state via useSyncExternalStore
function subscribeToScroll(callback: () => void) {
    window.addEventListener("scroll", callback, { passive: true });
    return () => window.removeEventListener("scroll", callback);
}
function getScrollState() {
    return window.scrollY > 50;
}
function getServerScrollState() {
    return false;
}

// Hydration-safe mounted check
const emptySubscribe = () => () => { };
function getClientMounted() { return true; }
function getServerMounted() { return false; }

export const Navbar = () => {
    const { language, toggleLanguage } = useLanguage();
    const { personal } = portfolioData[language];
    const { setTheme, resolvedTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const scrolled = useSyncExternalStore(subscribeToScroll, getScrollState, getServerScrollState);
    const mounted = useSyncExternalStore(emptySubscribe, getClientMounted, getServerMounted);

    const handleNavClick = (id: string) => {
        scrollToSection(id);
        setIsOpen(false);
    };

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "glass h-16" : "h-20 bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-full flex items-center justify-between">
                {/* Logo */}
                <div
                    className="font-bold text-xl tracking-tight cursor-pointer hover:opacity-80 transition-opacity text-foreground"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    {personal.name}
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <button
                            key={link.id}
                            onClick={() => handleNavClick(link.id)}
                            className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
                        >
                            {link.name[language]}
                        </button>
                    ))}

                    <div className="flex items-center gap-2 pl-4 border-l border-slate-200 dark:border-slate-800">
                        <button
                            onClick={toggleLanguage}
                            className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent transition-colors px-2 py-1"
                            aria-label="Switch Language"
                        >
                            <Globe size={16} />
                            {language === "tr" ? "EN" : "TR"}
                        </button>

                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-accent transition-colors px-2 py-1"
                            aria-label="Toggle Theme"
                        >
                            {mounted ? (resolvedTheme === "dark" ? <Sun size={16} /> : <Moon size={16} />) : <span className="w-4 h-4" />}
                        </button>
                    </div>
                </nav>

                {/* Desktop Socials */}
                <div className="hidden md:flex items-center gap-4 border-l border-slate-200 dark:border-slate-800 pl-6">
                    <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="GitHub"><Github size={18} /></a>
                    <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="text-slate-600 dark:text-slate-300"
                        aria-label="Toggle Theme"
                    >
                        {mounted ? (resolvedTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />) : <span className="w-5 h-5" />}
                    </button>
                    <button
                        onClick={toggleLanguage}
                        className="text-slate-600 dark:text-slate-300 font-medium text-sm flex items-center gap-1"
                        aria-label="Switch Language"
                    >
                        {language === "tr" ? "EN" : "TR"}
                    </button>
                    <button
                        className="p-2 text-slate-600 dark:text-slate-300"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <LazyMotion features={domAnimation} strict>
                <AnimatePresence>
                    {isOpen && (
                        <m.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 p-4 shadow-lg text-foreground"
                        >
                            <nav className="flex flex-col gap-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => handleNavClick(link.id)}
                                        className="text-left py-2 font-medium text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                                    >
                                        {link.name[language]}
                                    </button>
                                ))}
                                <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <a href={personal.socials.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900" aria-label="GitHub"><Github size={20} /></a>
                                    <a href={personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 dark:text-slate-400 hover:text-slate-900" aria-label="LinkedIn"><Linkedin size={20} /></a>
                                    <a href={personal.socials.email} className="text-slate-500 dark:text-slate-400 hover:text-slate-900" aria-label="Email"><Mail size={20} /></a>
                                </div>
                            </nav>
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </header>
    );
};
