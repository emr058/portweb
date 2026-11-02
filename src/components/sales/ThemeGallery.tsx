"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Theme } from "@/data/themes";

const preview = (id: string) => `/temalar/${id}-onizleme.jpg`;
const phone = (id: string) => `/temalar/${id}-telefon.jpg`;

function ThemePreview({ id }: { id: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (reducedMotion || connection?.saveData) return;
    const video = videoRef.current;
    if (!video) return;
    setEnabled(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      data-video={enabled ? "on" : undefined}
      muted
      loop
      playsInline
      preload="none"
      poster={preview(id)}
      src={enabled ? `/temalar/${id}-onizleme.mp4` : undefined}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}

export function ThemeGallery({ themes }: { themes: Theme[] }) {
  const sectors = Array.from(new Map(themes.map(t => [t.sectorKey, t.sector.split(",")[0]])).entries());
  const [active, setActive] = useState("hepsi");
  const shown = active === "hepsi" ? themes : themes.filter(t => t.sectorKey === active);
  return (
    <>
      {sectors.length > 1 && (
        <div className="theme-filter" role="group" aria-label="Sektöre göre filtrele">
          <button type="button" aria-pressed={active === "hepsi"} onClick={() => setActive("hepsi")}>Hepsi</button>
          {sectors.map(([key, label]) => (
            <button key={key} type="button" aria-pressed={active === key} onClick={() => setActive(key)}>{label}</button>
          ))}
        </div>
      )}
      <div className="theme-grid">
        {shown.map(theme => (
          <article key={theme.id} className="theme-tile" aria-labelledby={`t-${theme.id}`}>
            <Link href={`/temalar/${theme.id}`} className="theme-stage" aria-label={`${theme.name} demosunu gez`}>
              <Image className="theme-desk" src={preview(theme.id)} alt="" width={1200} height={750} sizes="(max-width: 900px) 100vw, 640px" />
              <ThemePreview id={theme.id} />
              <Image className="theme-phone" src={phone(theme.id)} alt="" width={390} height={844} sizes="140px" />
              <span className="theme-open">Demoyu gez <ArrowUpRight size={16} aria-hidden /></span>
            </Link>
            <div className="theme-body">
              <div className="theme-swatches" aria-hidden>
                {theme.swatches.map(c => <i key={c} style={{ background: c }} />)}
              </div>
              <p className="theme-sector">{theme.sector}</p>
              <h3 id={`t-${theme.id}`}>{theme.name}</h3>
              <p>{theme.idea}</p>
              <div className="theme-actions">
                <Link href={`/temalar/${theme.id}`} className="btn btn-primary">Canlı gez <ArrowUpRight size={16} aria-hidden /></Link>
                <Link href={`/basvuru?tema=${theme.id}`} className="btn">Bu tasarımı iste</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
