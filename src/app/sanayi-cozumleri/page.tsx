import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Actions, CtaStrip, ExclusionNote } from "@/components/sales/parts";
import { formatRange, industrial } from "@/data/pricing";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/sanayi-cozumleri",
  title: "Sanayi için web sitesi",
  description: `CNC torna, CNC freze ve imalat işletmeleri için web sitesi: makine parkuru, teklif formu, teknik çizim yükleme. ${formatRange(industrial.from)}.`,
  image: "sanayi",
});

export default function SanayiPage() {
  const whatsapp = { packageName: industrial.name, priceText: `${formatRange(industrial.from)} başlangıç aralığı`, projectType: "Sanayi web sitesi (CNC, imalat)" };
  return (
    <div className="sales">
      <header className="sales-hero">
        <h1>Sanayi için web sitesi</h1>
        <p>CNC torna, CNC freze, makine imalatı ve üretim işletmeleri için. Başlangıç fiyatı {formatRange(industrial.from)}.</p>
        <Actions apply="/basvuru?paket=sanayi" whatsapp={whatsapp} />
      </header>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="neler">
        <h2 id="neler">Sitede neler olur?</h2>
        <div className="sales-grid sales-grid-tight">
          {industrial.features.map(item => (
            <article key={item.title} className="sales-card">
              <h3>{item.title}</h3>
              <p style={{ marginTop: 6 }}>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-section" aria-labelledby="kimler">
        <h2 id="kimler">Kimler için?</h2>
        <ul className="chip-row" style={{ marginTop: 18 }}>
          {industrial.audience.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="sales-section" aria-labelledby="fiyat">
        <h2 id="fiyat">Fiyat</h2>
        <div className="sales-card pkg" style={{ marginTop: 22 }}>
          <div>
            <p style={{ fontSize: 13, color: "#8ea0b8" }}>Başlangıç fiyat aralığı</p>
            <p className="price-main">{formatRange(industrial.from)}</p>
          </div>
          <p>Tutar, seçilen özelliklere göre bu aralıkta netleşir.</p>
          <ExclusionNote />
          <Link href="/fiyatlar" className="sales-link" style={{ width: "fit-content" }}>
            Diğer paketler ve ek hizmetler <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="sales-section" aria-labelledby="neden">
        <h2 id="neden">Atölyeden biri yapıyor</h2>
        <p className="lead" style={{ maxWidth: 680 }}>
          Aydın Torna CNC&apos;de teknik mühendis olarak çalışıyorum. Teklif ve üretim sürecini atölyenin içinden biliyorum.
        </p>
      </section>

      <CtaStrip context={whatsapp} title="Atölyenizi anlatın" text="Başvuruyu doldurun veya WhatsApp'tan yazın." />
    </div>
  );
}
