"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { useLanguage } from "@/context/language-context";
import { Github, Linkedin, Mail, Cpu } from "lucide-react";

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="w-full border-t border-white/10 bg-[#060708] py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="font-bold text-sm text-white">{siteConfig.name}</span>
          </Link>
          <p className="text-xs text-gray-400 max-w-md text-center md:text-left">
            {language === "tr"
              ? "Yapay Zeka Otomasyon Mühendisi & Yazılım Ürün Geliştirici. Gerçek iş problemlerini çözen sistemler kuruyorum."
              : "AI Automation Engineer & Software Product Builder. Engineering software systems that solve real business problems."}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={siteConfig.links.email}
            className="p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all"
            title="Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-4">
        <span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span>
        <span className="font-mono text-[11px]">Next.js 16 • TailwindCSS • Framer Motion</span>
      </div>
    </footer>
  );
}
