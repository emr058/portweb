"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { Quote, ArrowRight, CheckCircle2 } from "lucide-react";

export function AboutMindsetSection() {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      {/* Mindset Quote Banner */}
      <div className="glass-card rounded-2xl p-8 sm:p-12 mb-16 relative overflow-hidden bg-gradient-to-r from-blue-950/20 via-slate-900/60 to-emerald-950/20 border border-blue-500/20">
        <div className="absolute top-4 right-6 opacity-10 pointer-events-none">
          <Quote className="w-32 h-32 text-blue-400" />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase">
            <span>{t.badge}</span>
          </div>

          <blockquote className="text-xl sm:text-3xl font-semibold text-white leading-relaxed tracking-tight italic">
            &ldquo;{t.quote}&rdquo;
          </blockquote>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-gray-400">
            <span className="flex items-center gap-1.5 text-blue-400">
              <CheckCircle2 className="w-4 h-4" />
              {language === "tr" ? "İş Problemi Odaklı" : "Problem-First Mindset"}
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              {language === "tr" ? "Ölçeklenebilir Mimari" : "Scalable Architecture"}
            </span>
            <span className="flex items-center gap-1.5 text-purple-400">
              <CheckCircle2 className="w-4 h-4" />
              {language === "tr" ? "Yapay Zeka Otomasyonu" : "AI Workflow Automation"}
            </span>
          </div>
        </div>
      </div>

      {/* Engineering Journey Flowchart */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {t.journeyTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            {language === "tr"
              ? "Donanım ve görüntü işlemeden otonom yapay zeka sistemlerine uzanan gelişim çizgim."
              : "Evolution from hardware & vision systems to autonomous AI agents."}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-4">
          {t.journeySteps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              className="glass-card rounded-xl p-4 relative group flex flex-col justify-between border-white/10 hover:border-blue-500/40"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-2">
                  <span>0{idx + 1}</span>
                  {idx < t.journeySteps.length - 1 && (
                    <ArrowRight className="w-3.5 h-3.5 text-gray-400 hidden lg:block group-hover:translate-x-1 transition-transform" />
                  )}
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {step.title}
                </h3>
              </div>
              <p className="text-[11px] text-gray-400 mt-3 leading-tight">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
