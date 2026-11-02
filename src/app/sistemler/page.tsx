import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { ArrowUpRight } from "lucide-react";
import { salesMetadata } from "@/lib/sales-metadata";
import { whatsappUrl } from "@/lib/whatsapp";
import { systems } from "@/data/systems";
import { SystemCover } from "@/components/sales/SystemCover";

export const metadata: Metadata = salesMetadata({
  path: "/sistemler",
  title: "Hazır sistemler",
  description: "Telefon mağazaları ve sanayi tedarikçileri için hazır sistemleri inceleyin. Demoyu WhatsApp'tan birlikte gezin.",
  image: "temalar",
});

const hasCover = (src: string) => existsSync(path.join(process.cwd(), "public", src));

export default function SistemlerPage() {
  return (
    <div className="sales systems-page" style={{ maxWidth: 1180 }}>
      <header className="sales-hero">
        <div className="sales-hero-copy">
          <p className="eyebrow">Hazır sistemler</p>
          <h1>Hazır sistemler</h1>
          <p className="sales-lead">Telefon mağazası ve teknik ürün kataloğu için hazırlanan sistemleri inceleyin. Ekranları birlikte gezip kapsamı konuşalım.</p>
          <div className="sales-actions">
            <a className="btn btn-primary" href={whatsappUrl("Merhaba, hazır sistemler hakkında bilgi almak ve demoyu birlikte gezmek istiyorum.")}>Demoyu birlikte gezelim <ArrowUpRight size={16} aria-hidden /></a>
          </div>
        </div>
      </header>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="sistem-galerisi">
        <div className="section-title">
          <h2 id="sistem-galerisi">Hazır sistemler</h2>
          <p className="lead">Her sistem işletmenizin adı, ürünleri ve bilgileriyle kurulur.</p>
        </div>
        <div className="theme-grid">
          {systems.map(system => (
            <article key={system.id} className="theme-tile system-tile">
              {hasCover(system.kapak) && <Link href={`/sistemler/${system.id}`} className="system-cover-link" aria-label={`${system.ad} ayrıntılarını gör`}>
                <SystemCover src={system.kapak} alt={`${system.ad} sisteminin kapak görüntüsü`} />
              </Link>}
              <div className="theme-body">
                <p className="theme-sector">{system.sektor}</p>
                <h3>{system.ad}</h3>
                <p>{system.fikir}</p>
                <ul className="system-card-features">{system.ozellikler.slice(0, 3).map(item => <li key={item}>{item}</li>)}</ul>
                <div className="theme-actions">
                  <Link href={`/sistemler/${system.id}`} className="btn btn-primary">Sistemi incele <ArrowUpRight size={16} aria-hidden /></Link>
                  <a href={whatsappUrl(system.whatsappMesaji)} className="btn" target="_blank" rel="noopener noreferrer">Demoyu birlikte gezelim</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-note systems-note"><p>Demodaki ad, ürün ve fiyatlar örnektir.</p></section>
      <p className="systems-crosslink">Hazır tasarım mı arıyorsunuz? <Link href="/temalar">Web sitesi tasarımlarına göz atın <ArrowUpRight size={14} aria-hidden /></Link></p>
    </div>
  );
}
