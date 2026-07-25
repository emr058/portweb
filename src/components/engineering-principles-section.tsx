"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { engineeringPrinciples } from "@/data/principles";
import { Zap, BarChart3, ShieldCheck, Maximize2, Target } from "lucide-react";

export function EngineeringPrinciplesSection() {
  const { language } = useLanguage();
  const t = translations[language].principles;

  const iconMap: Record<string, React.ElementType> = {
    Zap,
    BarChart3,
    ShieldCheck,
    Maximize2,
    Target,
  };

  return (
    <section id="principles" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-widest uppercase">
          <span>{t.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {engineeringPrinciples.map((item, idx) => {
          const IconComponent = iconMap[item.iconName] || Target;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/40"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-black font-mono text-emerald-400/40 group-hover:text-emerald-400 transition-colors">
                  {item.number}
                </span>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:border-emerald-500/30 group-hover:bg-emerald-500/10 transition-colors">
                  <IconComponent className="w-5 h-5 text-gray-300 group-hover:text-emerald-400 transition-colors" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {item.title[language]}
              </h3>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {item.description[language]}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
