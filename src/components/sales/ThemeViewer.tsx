"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";

export function ThemeViewer({ src, name }: { src: string; name: string }) {
  const [device, setDevice] = useState<"desktop" | "phone">("desktop");
  return (
    <div className="viewer">
      <div className="viewer-tools" role="group" aria-label="Görünüm">
        <button type="button" aria-pressed={device === "desktop"} onClick={() => setDevice("desktop")}><Monitor size={16} aria-hidden /> Masaüstü</button>
        <button type="button" aria-pressed={device === "phone"} onClick={() => setDevice("phone")}><Smartphone size={16} aria-hidden /> Telefon</button>
      </div>
      <div className={`viewer-frame viewer-${device}`}>
        <div className="mac-bar" aria-hidden><i /><i /><i /><span>siteniz.com.tr</span></div>
        <iframe title={`${name} demosu`} src={src} loading="lazy" />
      </div>
    </div>
  );
}
