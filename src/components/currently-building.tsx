"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { currentlyBuildingProjects } from "@/data/site";
import { Activity, ArrowUpRight } from "lucide-react";

export function CurrentlyBuilding() {
  const { language } = useLanguage();
  const t = translations[language].currentlyBuilding;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-blue-500/20 bg-gradient-to-b from-blue-950/20 to-transparent">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {t.title}
              </h2>
              <p className="text-xs text-gray-400">
                {t.subtitle}
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{language === "tr" ? "CANLI RADAR" : "LIVE RADAR"}</span>
          </div>
        </div>

        {/* Progress Radar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentlyBuildingProjects.map((proj, idx) => (
            <motion.div
              key={proj.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="glass-card-static rounded-xl p-5 border border-white/10 hover:border-white/20 transition-all"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/projects/${proj.slug}`}
                    className="font-bold text-white text-base hover:text-blue-400 transition-colors flex items-center gap-1 group"
                  >
                    <span>{proj.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-300">
                  {proj.status[language]}
                </span>
              </div>

              <p className="text-xs text-gray-400 mb-4">{proj.tagline}</p>

              {/* Visual Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-gray-400">
                  <span>{t.progress}</span>
                  <span className="text-white font-bold">{proj.progress}%</span>
                </div>
                <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${proj.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${proj.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
