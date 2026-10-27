"use client";

import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import { siteConfig } from "@/data/site";

export default function BlogPage() {
  const { language } = useLanguage();
  return <div className="site-page min-h-[65vh]">
    <header className="site-page-heading"><h1>Blog</h1></header>
    <div className="site-card max-w-xl space-y-6">
      <p className="text-sm leading-7 text-slate-400">{language === "tr" ? "Henüz yayımlanmış yazı yok." : "No articles published yet."}</p>
      <div className="flex flex-wrap gap-3"><Link href="/" className="site-action">{language === "tr" ? "Atölyeye dön" : "Back to workshop"}</Link><a href={siteConfig.links.email} className="site-action">{language === "tr" ? "E-posta yaz" : "Send an email"}</a></div>
    </div>
  </div>;
}
