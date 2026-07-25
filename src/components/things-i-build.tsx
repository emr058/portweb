"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { translations } from "@/data/translations";
import { Bot, LayoutGrid, Workflow, Server, Code2, Wrench } from "lucide-react";

export function ThingsIBuild() {
  const { language } = useLanguage();
  const t = translations[language].thingsIBuild;

  const buildItems = [
    {
      key: "aiAgents",
      title: t.items.aiAgents.title,
      desc: t.items.aiAgents.desc,
      icon: Bot,
      color: "from-blue-500/20 to-indigo-500/20 border-blue-500/30",
    },
    {
      key: "saasProducts",
      title: t.items.saasProducts.title,
      desc: t.items.saasProducts.desc,
      icon: LayoutGrid,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
    },
    {
      key: "automation",
      title: t.items.automation.title,
      desc: t.items.automation.desc,
      icon: Workflow,
      color: "from-purple-500/20 to-violet-500/20 border-purple-500/30",
    },
    {
      key: "backendSystems",
      title: t.items.backendSystems.title,
      desc: t.items.backendSystems.desc,
      icon: Server,
      color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    },
    {
      key: "apis",
      title: t.items.apis.title,
      desc: t.items.apis.desc,
      icon: Code2,
      color: "from-cyan-500/20 to-blue-500/20 border-cyan-500/30",
    },
    {
      key: "internalTools",
      title: t.items.internalTools.title,
      desc: t.items.internalTools.desc,
      icon: Wrench,
      color: "from-pink-500/20 to-rose-500/20 border-pink-500/30",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          {t.sectionTitle}
        </h2>
        <p className="text-sm sm:text-base text-gray-400">
          {t.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {buildItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-card rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/40"
            >
              {/* Top Row: Green Indicator & Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                    {language === "tr" ? "ÜRETIMDE" : "PRODUCTION READY"}
                  </span>
                </div>
                <div className={`p-2.5 rounded-lg bg-gradient-to-br ${item.color} border`}>
                  <Icon className="w-5 h-5 text-gray-200 group-hover:scale-110 transition-transform" />
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
