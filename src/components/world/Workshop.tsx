"use client";

import { useCallback, useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Download, X, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { siteConfig } from "@/data/site";
import { activeProjects, currentRoles, worldContactLinks, worldRegions, worldScene, type WorldRegion } from "@/data/world";
import "./workshop.css";

function subscribe(callback: () => void) {
  window.addEventListener("hashchange", callback);
  window.addEventListener("popstate", callback);
  return () => {
    window.removeEventListener("hashchange", callback);
    window.removeEventListener("popstate", callback);
  };
}
const getHash = () => window.location.hash.slice(1);
const serverHash = () => "";

function Robot() {
  return <svg viewBox="0 0 40 48" aria-hidden="true" focusable="false">
    <path d="M20 8V3m-2 0h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <rect x="7" y="9" width="26" height="20" rx="7" fill="#e4edf8" stroke="currentColor" strokeWidth="2" />
    <rect x="11" y="14" width="18" height="9" rx="4" fill="#182938" />
    <circle cx="16" cy="18" r="2" fill="currentColor" /><circle cx="24" cy="18" r="2" fill="currentColor" />
    <rect x="12" y="30" width="16" height="10" rx="3" fill="#b9cada" stroke="currentColor" strokeWidth="2" />
    <path d="M8 32l-4 5m28-5 4 5M15 41v4m10-4v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>;
}

function Gear({ className }: { className: string }) {
  return <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
    {Array.from({ length: 8 }, (_, i) => <rect key={i} x="17" y="1" width="6" height="9" rx="1.5" transform={`rotate(${i * 45} 20 20)`} />)}
    <circle cx="20" cy="20" r="13" /><circle cx="20" cy="20" r="5" fill="#0b1525" />
  </svg>;
}

export function Workshop() {
  const { language } = useLanguage();
  const tr = language === "tr";
  const hash = useSyncExternalStore(subscribe, getHash, serverHash);
  const selected = worldRegions.find(region => region.id === hash);
  const dialog = useRef<HTMLDialogElement>(null);
  const desktopPanel = useRef<HTMLElement>(null);

  const open = useCallback((id: string) => {
    if (window.location.hash === `#${id}`) return;
    if (worldRegions.some(region => `#${region.id}` === window.location.hash)) {
      window.history.replaceState(null, "", `#${id}`);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    } else window.location.hash = id;
  }, []);

  const close = useCallback(() => {
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const target = event.target as HTMLElement;
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || target.closest("input, textarea, select, [contenteditable='true']")) return;
      const region = worldRegions.find(item => String(item.hotkey) === event.key);
      if (region) { event.preventDefault(); open(region.id); }
      if (event.key === "Escape" && !dialog.current?.open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    const sheet = dialog.current;
    const media = window.matchMedia("(max-width: 1023px)");
    const previousOverflow = document.body.style.overflow;
    function sync() {
      document.body.style.overflow = selected && media.matches ? "hidden" : previousOverflow;
      if (selected && media.matches && sheet && !sheet.open) sheet.showModal();
      else if ((!selected || !media.matches) && sheet?.open) sheet.close();
    }
    sync();
    desktopPanel.current?.scrollTo(0, 0);
    media.addEventListener("change", sync);
    return () => {
      media.removeEventListener("change", sync);
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  const contact = <div className="world-contact">{worldContactLinks.map(link => <a key={link.href} href={link.href} download={link.download || undefined}>
    <span>{link.label[language]}</span><small>{link.detail}</small>{link.download ? <Download size={16} /> : <ArrowUpRight size={16} />}
  </a>)}</div>;

  function content(region: WorldRegion, prefix = "world") {
    return <>
      <p className="world-eyebrow" style={{ color: region.color }}>{String(region.hotkey).padStart(2, "0")} / {region.name[language]}</p>
      <h2 id={`${prefix}-title-${region.id}`}>{region.panel.title[language]}</h2>
      <div className="world-items">{region.panel.items.map(item => <article key={item.title.en}>
        <h3>{item.title[language]}</h3><p>{item.description[language]}</p>
        {item.tags && <ul className="world-tags">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul>}
      </article>)}</div>
      {region.panel.link && <Link className="world-action" href={region.panel.link.href}>{region.panel.link.label[language]}<ArrowUpRight size={16} /></Link>}
      {region.id === "iletisim" && contact}
    </>;
  }

  return <div className="workshop">
    <section className="world-stage" aria-label={tr ? "Atölye haritası" : "Workshop map"}>
      <div className="world-stage-heading"><span>{tr ? "EMİR’İN ATÖLYESİ" : "EMIR’S WORKSHOP"}</span><span>{tr ? "Yazılım × üretim" : "Software × manufacturing"}</span></div>
      <div className="world-scene-space">
        <div className="world-scene" style={{ aspectRatio: `${worldScene.width} / ${worldScene.height}`, "--scene-ratio": `${worldScene.width} / ${worldScene.height}` } as CSSProperties}>
          <Image src={worldScene.src} width={worldScene.width} height={worldScene.height} alt={worldScene.alt[language]} priority sizes="(min-width: 1024px) 65vw, 100vw" className="world-image" />
          {worldRegions.map(region => <button key={region.id} type="button" className="world-hotspot" style={{ left: `${region.position.x}%`, top: `${region.position.y}%`, width: `${region.position.w}%`, height: `${region.position.h}%`, "--region-color": region.color, "--label-x": `${region.position.labelX}%`, "--label-y": `${region.position.labelY}%` } as CSSProperties}
            aria-label={`${region.hotkey} · ${region.name[language]}`} aria-keyshortcuts={String(region.hotkey)} aria-pressed={selected?.id === region.id} onClick={() => open(region.id)}>
            <span className="world-label" style={{ left: `${(region.position.labelX - region.position.x) / region.position.w * 100}%`, top: `${(region.position.labelY - region.position.y) / region.position.h * 100}%` }}>{region.id === "aktif" && <i className="world-live" />}<b>{String(region.hotkey).padStart(2, "0")}</b><span className="world-label-name"> · {region.name[language]}</span></span>
          </button>)}
          <span className="world-gears" aria-hidden="true"><Gear className="world-gear" /><Gear className="world-gear world-gear-small" /></span>
          {[worldRegions[1], worldRegions[0], worldRegions[3], worldRegions[5]].map((region, index) => <button type="button" key={region.id} className="world-bot" style={{ left: `${region.position.labelX + 5}%`, top: `${region.position.labelY + 10}%`, color: region.color, animationDelay: `${index * -3}s` }} aria-label={`${tr ? "Atölye botu" : "Workshop bot"}: ${region.name[language]}`} onClick={() => open(region.id)}><Robot /></button>)}
        </div>
      </div>
      <p className="world-hint">{tr ? "Bir bölgeye dokunun" : "Tap a region"}<span>1–6 · Esc</span></p>
    </section>

    <section className="world-panel" ref={desktopPanel} role="region" aria-labelledby={selected ? `world-title-${selected.id}` : "world-welcome"}>
      {selected ? <><button className="world-back" onClick={close}><ArrowLeft size={16} />{tr ? "Atölyeye dön" : "Back to workshop"}</button>{content(selected)}</> : <>
        <p className="world-eyebrow">{tr ? "YAZILIM VE ATÖLYE" : "CODE AND CRAFT"}</p>
        <h1 id="world-welcome">Emir Aydın<span className="world-name-dot">.</span></h1>
        <p className="world-title">{tr ? <>Yazılım mühendisi<br />Full stack ve otomasyon</> : <>Software engineer<br />Full stack and automation</>}</p>
        <div className="world-roles">{currentRoles.map(role => <p key={role.company}><strong>{role.company}</strong><span>{role.role[language]}</span></p>)}</div>
        <div className="world-now"><p className="world-now-head"><i className="world-live" />{tr ? "Şu an üretimde" : "In production now"}</p>{activeProjects.map(item => <button key={item.title.en} onClick={() => open("aktif")}><span>{item.title[language]}</span><ArrowUpRight size={14} /></button>)}</div>
        <p className="world-intro">{tr ? "Aile atölyemizde CNC tornanın teknik tarafındayım, ADA ANT'ta uzaktan yazılım geliştiriyorum. Küçük işletmelere satış siteleri ve iş takip araçları yapıyorum." : "I handle the technical side of our family CNC turning shop and work remotely as a developer at ADA ANT. I also build sales websites and job-tracking tools for small businesses."}</p>
        <div className="world-primary-actions"><a href={siteConfig.links.email}>{tr ? "E-posta yaz" : "Send an email"}<ArrowUpRight size={16} /></a><a href={siteConfig.cvPaths[language]} download>{tr ? "CV indir" : "Download CV"}<Download size={16} /></a></div>
        <nav className="world-index" aria-label={tr ? "Atölye bölgeleri" : "Workshop regions"}>{worldRegions.map(region => <button key={region.id} onClick={() => open(region.id)}><span style={{ color: region.color }}>{String(region.hotkey).padStart(2, "0")}</span><span><strong>{region.name[language]}</strong><small>{region.description[language]}</small></span><ArrowUpRight size={15} /></button>)}</nav>
      </>}
    </section>

    <section className="world-mobile-index" aria-label={tr ? "Atölye bölgeleri" : "Workshop regions"}>
      <div className="world-mobile-intro"><h1>{siteConfig.name}</h1><p>{tr ? "Yazılım mühendisi · full stack ve otomasyon" : "Software engineer · full stack and automation"}</p><p>{currentRoles.map(role => role.company).join(" · ")}</p><div className="world-now world-now-mobile"><p className="world-now-head"><i className="world-live" />{tr ? "Şu an üretimde" : "In production now"}</p>{activeProjects.map(item => <button key={item.title.en} onClick={() => open("aktif")}><span>{item.title[language]}</span><ArrowUpRight size={14} /></button>)}</div><div className="world-primary-actions"><a href={siteConfig.links.email}>{tr ? "E-posta yaz" : "Send an email"}</a><a href={siteConfig.cvPaths[language]} download>{tr ? "CV indir" : "Download CV"}</a></div></div>
      {worldRegions.map(region => <button key={region.id} onClick={() => open(region.id)}><span style={{ color: region.color }}>{String(region.hotkey).padStart(2, "0")}</span><span><strong>{region.name[language]}</strong><small>{region.description[language]}</small></span><ArrowUpRight size={18} /></button>)}
    </section>
    <dialog ref={dialog} className="world-sheet" aria-labelledby={selected ? `sheet-title-${selected.id}` : undefined} onCancel={event => { event.preventDefault(); close(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientY < bounds.top || event.clientX < bounds.left || event.clientX > bounds.right) close(); } }}>
      <div className="world-sheet-bar"><span id={selected ? `sheet-title-${selected.id}` : undefined}>{selected?.name[language]}</span><button autoFocus onClick={close} aria-label={tr ? "Paneli kapat" : "Close panel"}><X size={22} /></button></div>
      <div className="world-sheet-content" role="region" aria-labelledby={selected ? `sheet-content-title-${selected.id}` : undefined}>{selected && content(selected, "sheet-content")}</div>
    </dialog>
  </div>;
}
