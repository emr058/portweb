import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AddonGroups, Actions, CtaStrip, ExclusionNote, PackageCard } from "@/components/sales/parts";
import { campaign, comparisonRows, formatRange, formatTL, industrial, websitePackages } from "@/data/pricing";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/fiyatlar",
  title: "Web sitesi fiyatları",
  description: `Başlangıç ${formatTL(websitePackages[0].campaign.min)}, Profesyonel ${formatRange(websitePackages[1].campaign)} (ilk 10 müşteri). Bakım, SEO ve sosyal medya fiyatları.`,
  image: "fiyatlar",
});

export default function FiyatlarPage() {
  const [baslangic, profesyonel] = websitePackages;
  return (
    <div className="sales">
      <header className="sales-hero">
        <h1>Fiyatlar</h1>
        <p>{campaign.note} Tüm tutarlar TL cinsindendir.</p>
      </header>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="paketler">
        <h2 id="paketler">Web sitesi paketleri</h2>
        <div className="sales-grid">
          {websitePackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} featured={index === 1} />
          ))}
        </div>
      </section>

      <section className="sales-section" aria-labelledby="karsilastirma">
        <h2 id="karsilastirma">Karşılaştırma</h2>
        <div className="sales-table-wrap">
          <table className="sales-table">
            <thead>
              <tr>
                <th scope="col"><span className="sr-only">Özellik</span></th>
                <th scope="col">{baslangic.name}</th>
                <th scope="col">{profesyonel.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="price-row">
                <th scope="row">{campaign.label} fiyatı</th>
                <td data-label="Başlangıç">{formatRange(baslangic.campaign)}</td>
                <td data-label="Profesyonel">{formatRange(profesyonel.campaign)}</td>
              </tr>
              <tr>
                <th scope="row">Normal fiyat</th>
                <td data-label="Başlangıç">{formatRange(baslangic.normal)}</td>
                <td data-label="Profesyonel">{formatRange(profesyonel.normal)}</td>
              </tr>
              {comparisonRows.map(row => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td data-label="Başlangıç">{row.baslangic}</td>
                  <td data-label="Profesyonel">{row.profesyonel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: 18 }}>
          <ExclusionNote />
        </div>
      </section>

      <section className="sales-section" aria-labelledby="sanayi">
        <h2 id="sanayi">Sanayi web sitesi</h2>
        <div className="sales-card pkg" style={{ marginTop: 22 }}>
          <div>
            <p style={{ fontSize: 13, color: "#8ea0b8" }}>Başlangıç fiyat aralığı</p>
            <p className="price-main">{formatRange(industrial.from)}</p>
          </div>
          <p>CNC torna, CNC freze, makine imalatı ve üretim işletmeleri için. Makine parkuru, teklif formu ve teknik çizim yükleme dahil.</p>
          <Actions apply="/basvuru?paket=sanayi" applyLabel="Başvuru yap" whatsapp={{ packageName: industrial.name, priceText: `${formatRange(industrial.from)} başlangıç aralığı`, projectType: "Sanayi web sitesi (CNC, imalat)" }} />
          <Link href="/sanayi-cozumleri" className="sales-link" style={{ width: "fit-content" }}>
            Sanayi çözümleri <ArrowUpRight size={15} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="sales-section" aria-labelledby="ek-hizmetler-baslik" id="ek-hizmetler">
        <h2 id="ek-hizmetler-baslik">Ek hizmetler</h2>
        <p className="lead">Aylık bakım, SEO ve sosyal medya paketlerden ayrı fiyatlanır.</p>
        <AddonGroups />
      </section>

      <CtaStrip context={{}} />
    </div>
  );
}
