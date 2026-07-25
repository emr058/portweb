"use client";

import React from "react";
import { useLanguage } from "@/context/language-context";
import { Monitor, Server, Cpu, Database, Layers, ArrowRight } from "lucide-react";

interface ArchitectureNode {
  title: string;
  description: { en: string; tr: string };
  type: "client" | "api" | "queue" | "ai" | "db";
}

export function ArchitectureDiagram({ nodes }: { nodes: ArchitectureNode[] }) {
  const { language } = useLanguage();

  const typeConfig: Record<
    ArchitectureNode["type"],
    { icon: React.ElementType; bg: string; border: string; text: string }
  > = {
    client: { icon: Monitor, bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400" },
    api: { icon: Server, bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400" },
    queue: { icon: Layers, bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400" },
    ai: { icon: Cpu, bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400" },
    db: { icon: Database, bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400" },
  };

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 border border-white/10 bg-[#0c0e12]/90 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <h4 className="text-sm font-mono font-semibold text-gray-300 uppercase tracking-wider flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          <span>{language === "tr" ? "Sistem Mimari Şeması" : "System Architecture Flow"}</span>
        </h4>
        <span className="text-[11px] font-mono text-gray-400">
          {nodes.length} Components
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
        {nodes.map((node, idx) => {
          const config = typeConfig[node.type];
          const NodeIcon = config.icon;

          return (
            <div
              key={node.title}
              className={`rounded-xl p-4 border ${config.bg} ${config.border} flex flex-col justify-between relative group`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`p-2 rounded-lg ${config.bg} ${config.text} border ${config.border}`}>
                    <NodeIcon className="w-4 h-4" />
                  </span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase font-bold">
                    STEP 0{idx + 1}
                  </span>
                </div>

                <h5 className="font-bold text-sm text-white mb-1">
                  {node.title}
                </h5>

                <p className="text-xs text-gray-300 leading-tight">
                  {node.description[language]}
                </p>
              </div>

              {idx < nodes.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 p-1 rounded-full bg-[#08090a] border border-white/10 text-gray-400">
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
