"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { siteConfig } from "@/data/site";
import { Mail, Copy, Check, Linkedin, Github, Download, Send } from "lucide-react";

export function ContactSection() {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.links.emailDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/5">
      <div className="glass-card rounded-3xl p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-blue-950/30 via-slate-900/60 to-emerald-950/30 border border-blue-500/30 text-center space-y-8">
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase">
            <Send className="w-3.5 h-3.5" />
            <span>{t.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            {t.title}
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Email Direct Box */}
        <div className="max-w-md mx-auto p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-2 shadow-inner">
          <div className="flex items-center gap-3 pl-2 overflow-hidden">
            <Mail className="w-4 h-4 text-blue-400 shrink-0" />
            <span className="text-sm font-mono text-white truncate">
              {siteConfig.links.emailDisplay}
            </span>
          </div>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 transition-colors shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>{t.copyEmail}</span>
              </>
            )}
          </button>
        </div>

        {/* External Links & CV Button */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all"
          >
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>{t.linkedin}</span>
          </a>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-medium text-gray-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:text-white transition-all"
          >
            <Github className="w-4 h-4 text-white" />
            <span>{t.github}</span>
          </a>

          <a
            href={siteConfig.cvPath}
            download
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <Download className="w-4 h-4" />
            <span>{t.downloadCv}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
