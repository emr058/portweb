"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/language-context";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const pathname = usePathname();
  const { language } = useLanguage();
  if (pathname === "/") return null;
  return <footer className="border-t border-[#263246] bg-[#091120] px-6 py-8 text-xs text-slate-400">
    <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6">
      <div><Link href="/" className="text-sm font-medium text-slate-100">{siteConfig.name}</Link><p className="mt-2">{language === "tr" ? "Yazılım ve otomasyon geliştiriyorum." : "I build software and automation."}</p></div>
      <nav aria-label={language === "tr" ? "Alt menü" : "Footer navigation"} className="flex flex-wrap gap-6">
        <a href={siteConfig.links.github}>GitHub</a><a href={siteConfig.links.linkedin}>LinkedIn</a><a href={siteConfig.links.email}>{language === "tr" ? "E-posta yaz" : "Send an email"}</a>
      </nav>
      <span>© {new Date().getFullYear()} {siteConfig.name}</span>
    </div>
  </footer>;
}
