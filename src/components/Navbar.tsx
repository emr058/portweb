"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { siteConfig } from "@/data/site";
import { Globe, Download, Menu, X, Cpu } from "lucide-react";

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: t.about, href: "/#about" },
    { label: t.projects, href: "/projects" },
    { label: t.aiStack, href: "/ai-stack" },
    { label: t.services, href: "/#services" },
    { label: t.principles, href: "/#principles" },
    { label: t.career, href: "/#career" },
    { label: t.blog, href: "/blog" },
    { label: t.contact, href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#08090a]/85 border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Avatar */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-blue-500/40 group-hover:border-blue-400 transition-colors">
            <Image
              src={siteConfig.avatar}
              alt={siteConfig.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight text-white group-hover:text-blue-400 transition-colors">
              {siteConfig.name}
            </span>
            <span className="text-[10px] text-gray-400 font-mono tracking-wider">
              AI AUTOMATION
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Actions: Language Switcher & CV Download */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono font-semibold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            title="Switch Language (TR / EN)"
          >
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* CV Download Button */}
          <a
            href={siteConfig.cvPath}
            download="Emir_Aydin_Resume.pdf"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.viewCv}</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2 py-1 text-xs font-mono font-semibold text-gray-300 bg-white/5 border border-white/10 rounded-md"
          >
            {language.toUpperCase()}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-gray-400 hover:text-white rounded-lg focus:outline-none"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#08090a] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={siteConfig.cvPath}
            download="Emir_Aydin_Resume.pdf"
            className="flex items-center justify-center gap-2 w-full mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg"
          >
            <Download className="w-4 h-4" />
            <span>{t.viewCv}</span>
          </a>
        </div>
      )}
    </header>
  );
}
