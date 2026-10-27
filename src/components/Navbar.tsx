"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Download } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { siteConfig } from "@/data/site";

export function Navbar() {
  const { language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const tr = language === "tr";
  const items = [
    { href: "/", label: tr ? "Atölye" : "Workshop" },
    { href: "/projects", label: tr ? "Projeler" : "Projects" },
    { href: "/ai-stack", label: "AI Stack" },
    { href: "/blog", label: "Blog" },
    { href: "/#kargo", label: tr ? "İletişim" : "Contact" },
  ];
  return <header className="h-16 shrink-0 sticky top-0 z-40 border-b border-white/10 bg-[#091120]/95 backdrop-blur-md">
    <div className="h-full px-5 lg:px-8 flex items-center justify-between gap-4">
      <Link href="/" className="text-sm font-semibold tracking-tight">Emir Aydın<span className="text-blue-300">.</span></Link>
      <nav aria-label={tr ? "Ana menü" : "Main navigation"} className="hidden lg:flex items-center gap-6 text-xs text-slate-300">
        {items.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} className="hover:text-white aria-[current=page]:text-blue-200">{item.label}</Link>)}
      </nav>
      <div className="flex items-center gap-3 text-xs">
        <button onClick={toggleLanguage} aria-label={tr ? "Switch to English" : "Türkçeye geç"} className="min-h-11 min-w-11 rounded-md border border-white/15 hover:bg-white/5">{language.toUpperCase()}</button>
        <a href={siteConfig.cvPath} download className="hidden sm:flex items-center gap-2 min-h-11 px-3 rounded-md border border-white/15 hover:bg-white/5"><Download size={14} />{tr ? "CV indir" : "Download CV"}</a>
        <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={tr ? "Menüyü aç/kapat" : "Toggle menu"} aria-expanded={mobileOpen} aria-controls="mobile-navigation" className="lg:hidden min-h-11 min-w-11 grid place-items-center">{mobileOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </div>
    {mobileOpen && <nav id="mobile-navigation" aria-label={tr ? "Mobil menü" : "Mobile navigation"} className="lg:hidden absolute w-full border-b border-white/15 bg-[#091120] px-5 pb-4 shadow-xl">
      {items.map(item => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="flex items-center min-h-11 text-sm">{item.label}</Link>)}
      <a href={siteConfig.cvPath} download className="flex items-center min-h-11 text-sm">{tr ? "CV indir" : "Download CV"}</a>
    </nav>}
  </header>;
}
