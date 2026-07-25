"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { servicesData } from "@/data/services";
import { Bot, Workflow, Server, LayoutGrid, Check } from "lucide-react";

export function ServicesSection() {
  const { language } = useLanguage();
  const t = translations[language].services;

  const iconMap: Record<string, React.ElementType> = {
    Bot,
    Workflow,
    Server,
    LayoutGrid,
  };

  return (
    <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono tracking-widest uppercase">
          <span>{t.badge}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          {t.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesData.map((svc, idx) => {
          const IconComponent = iconMap[svc.iconName] || Bot;

          return (
            <motion.div
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group border-white/10 hover:border-blue-500/40 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 border border-blue-500/30 text-blue-400">
                    <IconComponent className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-xs font-mono text-gray-400">
                    0{idx + 1} / 04
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {svc.title[language]}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {svc.fullDesc[language]}
                </p>

                <div className="space-y-2 pt-2">
                  {svc.features[language].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-gray-400">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-6 mt-6 border-t border-white/5">
                {svc.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/5 border border-white/10 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
