"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { siteConfig } from "@/data/site";
import { ArrowRight, Download, ChevronDown, Sparkles, MapPin } from "lucide-react";

export function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden bg-grid-pattern">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow-top opacity-70 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] radial-glow-emerald opacity-50 pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        {/* Profile Headshot Avatar */}
        <div className="relative inline-block mb-2 group">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 shadow-2xl shadow-blue-500/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#08090a]">
              <Image
                src={siteConfig.avatar}
                alt={siteConfig.name}
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
          {/* Active Status Badge */}
          <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#08090a] shadow-lg animate-pulse" />
        </div>

        {/* Location & Status Tag */}
        <div className="flex items-center justify-center gap-3 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>{siteConfig.location}</span>
          </span>
          <span>•</span>
          <span className="text-emerald-400 font-semibold">
            {language === "tr" ? "Girne Üniversitesi Mezunu (2025)" : "Kyrenia University Graduate (2025)"}
          </span>
        </div>

        {/* Top Role Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>{t.badge}</span>
        </div>

        {/* Hero Main Heading */}
        <div className="space-y-3">
          <h2 className="text-sm sm:text-base font-semibold font-mono tracking-widest text-emerald-400 uppercase">
            {t.titleRole}
          </h2>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            {t.titleHeadline}
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
          {t.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 shadow-xl shadow-blue-600/25 transition-all transform hover:-translate-y-0.5 group"
          >
            <span>{t.viewProjects}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <a
            href={siteConfig.cvPath}
            download="Emir_Aydin_Resume.pdf"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-gray-200 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all transform hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>{t.downloadCv}</span>
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-400 text-xs font-mono">
        <span>{t.scrollDown}</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-blue-400" />
      </div>
    </section>
  );
}
