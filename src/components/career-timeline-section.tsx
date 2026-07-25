"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { careerTimeline } from "@/data/career";
import { Briefcase, CheckCircle2 } from "lucide-react";

export function CareerTimelineSection() {
  const { language } = useLanguage();
  const t = translations[language].career;

  return (
    <section id="career" className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase">
          <Briefcase className="w-3.5 h-3.5" />
          <span>{t.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          {t.subtitle}
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/10 space-y-12">
        {careerTimeline.map((step, idx) => (
          <motion.div
            key={step.company}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative group"
          >
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 ${
                step.isCurrent
                  ? "bg-emerald-500 border-emerald-400 shadow-lg shadow-emerald-500/50 animate-pulse"
                  : "bg-[#08090a] border-gray-600 group-hover:border-blue-400"
              }`}
            />

            <div className="glass-card rounded-2xl p-6 sm:p-8 border-white/10 group-hover:border-blue-500/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {step.company}
                  </h3>
                  {step.isCurrent && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      CURRENT
                    </span>
                  )}
                </div>
                <span className="text-xs font-mono text-gray-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 self-start sm:self-auto">
                  {step.period}
                </span>
              </div>

              <p className="text-sm font-semibold font-mono text-blue-400 mb-3">
                {step.role[language]}
              </p>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                {step.description[language]}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-white/5">
                {step.highlights[language].map((hl) => (
                  <div key={hl} className="flex items-center gap-2 text-xs text-gray-400">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
