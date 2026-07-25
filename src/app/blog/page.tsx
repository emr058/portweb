"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { Clock, ArrowLeft, Mail } from "lucide-react";

export default function BlogPage() {
  const { language } = useLanguage();
  const t = translations[language].blog;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
      <div className="glass-card rounded-3xl p-8 sm:p-12 max-w-xl w-full text-center space-y-6 border border-white/10 relative overflow-hidden bg-gradient-to-b from-blue-950/20 to-transparent">
        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto">
          <Clock className="w-6 h-6 animate-pulse" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.comingSoonTitle}
        </h1>

        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          {t.comingSoonDesc}
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "tr" ? "Ana Sayfaya Dön" : "Back to Home"}</span>
          </Link>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <Mail className="w-4 h-4" />
            <span>{language === "tr" ? "İletişime Geç" : "Get In Touch"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
