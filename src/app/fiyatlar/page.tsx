import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Actions, AddonGroups, CtaStrip, ExclusionNote, ProviderInfo, SalesHero, SectionTitle } from "@/components/sales/parts";
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
      <SalesHero eyebrow="Fiyat listesi" title="Fiyatlar" actions={<Actions apply="/basvuru" whatsapp={{}} />}>
        {campaign.note} Tüm tutarlar TL cinsindendir.
      </SalesHero>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="bakis">
        <SectionTitle id="bakis" eyebrow="Bir bakışta" title="Web sitesi paketleri" />
        <div className="overview">
          {websitePackages.map(pkg => (
            <Link key={pkg.id} href={`/basvuru?paket=${pkg.id}`} className="overview-tile">
              <small>{pkg.pages}</small>
              <strong>{pkg.name}</strong>
              <span className="price-big">{formatRange(pkg.campaign)}</span>
              <em>{campaign.label} fiyatı</em>
              <small>
                Liste fiyatı: <s>{formatRange(pkg.normal)}</s>
              </small>
              <span className="go">
                Başvuru yap <ArrowUpRight size={14} aria-hidden />
              </span>
            </Link>
          ))}
          <Link href="/basvuru?paket=sanayi" className="overview-tile">
            <small>CNC ve imalat</small>
            <strong>{industrial.name}</strong>
            <span className="price-big">{formatRange(industrial.from)}</span>
            <em>Başlangıç fiyat aralığı</em>
            <span className="go">
              Başvuru yap <ArrowUpRight size={14} aria-hidden />
            </span>
          </Link>
          <Link href="/basvuru?paket=eticaret" className="overview-tile">
            <small>Online satış</small>
            <strong>E-ticaret</strong>
            <span className="price-big">Ayrı teklif</span>
            <em>Ödeme, stok, kargo</em>
            <span className="go">
              Teklif iste <ArrowUpRight size={14} aria-hidden />
            </span>
          </Link>
        </div>
        <p style={{ marginTop: 16 }}>
          <Link href="/web-sitesi" className="sales-link">
            Paketlerde neler var? <ArrowUpRight size={15} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="sales-section" aria-labelledby="karsilastirma">
        <SectionTitle id="karsilastirma" eyebrow="Karşılaştırma" title="İki paket yan yana" />
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
                <th scope="row">Liste fiyatı</th>
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
      </section>

      <section className="sales-section" aria-labelledby="dahil-degil">
        <SectionTitle id="dahil-degil" eyebrow="Önemli" title="Fiyata dahil olmayanlar" />
        <ExclusionNote />
      </section>

      <section className="sales-section" aria-labelledby="ek-hizmetler-baslik" id="ek-hizmetler">
        <SectionTitle id="ek-hizmetler-baslik" eyebrow="Aylık" title="Ek hizmetler">
          Aylık bakım, SEO ve sosyal medya paketlerden ayrı fiyatlanır.
        </SectionTitle>
        <AddonGroups />
      </section>

      <CtaStrip context={{}} />
      <ProviderInfo />
    </div>
  );
}
