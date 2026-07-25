"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { aiStackData, AIStatus } from "@/data/ai-stack";
import { Cpu, ArrowRight, CheckCircle, Sparkles, Brain, Compass } from "lucide-react";

export function AIStackSection({ isPreview = false }: { isPreview?: boolean }) {
  const { language } = useLanguage();
  const t = translations[language].aiStack;

  const statusBadges: Record<
    AIStatus,
    { label: string; bg: string; text: string; border: string; icon: React.ElementType }
  > = {
    production: {
      label: t.levels.production,
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/30",
      icon: CheckCircle,
    },
    current: {
      label: t.levels.mastering,
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      border: "border-blue-500/30",
      icon: Cpu,
    },
    learning: {
      label: t.levels.learning,
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/30",
      icon: Brain,
    },
    planned: {
      label: t.levels.planned,
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/30",
      icon: Compass,
    },
  };

  const displayedItems = isPreview ? aiStackData.slice(0, 6) : aiStackData;

  return (
    <section id="ai-stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
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
        {displayedItems.map((item, idx) => {
          const config = statusBadges[item.status];
          const StatusIcon = config.icon;

          return (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className="glass-card rounded-2xl p-6 relative flex flex-col justify-between border-white/10 hover:border-blue-500/30"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-gray-400">
                    {item.category}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold border ${config.bg} ${config.text} ${config.border}`}
                  >
                    <StatusIcon className="w-3 h-3" />
                    <span>{config.label}</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  {item.description[language]}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/5 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {isPreview && (
        <div className="text-center mt-12">
          <Link
            href="/ai-stack"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
          >
            <span>{language === "tr" ? "Tüm Yapay Zeka Stack'ini Gör" : "View Full AI Capability Matrix"}</span>
            <ArrowRight className="w-4 h-4 text-blue-400" />
          </Link>
        </div>
      )}
    </section>
  );
}
