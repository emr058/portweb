import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AddonGroups, CtaStrip, ExclusionNote, PackageCard } from "@/components/sales/parts";
import { formatTL, websitePackages } from "@/data/pricing";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/web-sitesi",
  title: "İşletmeniz için web sitesi",
  description: `Başlangıç ve Profesyonel web sitesi paketleri. İlk 10 müşteriye kampanya fiyatı: ${formatTL(websitePackages[0].campaign.min)}'den başlıyor.`,
  image: "web-sitesi",
});

export default function WebSitesiPage() {
  return (
    <div className="sales">
      <header className="sales-hero">
        <h1>İşletmeniz için web sitesi</h1>
        <p>İki paket var: Başlangıç ve Profesyonel. Kampanya fiyatı ilk 10 müşteri için geçerli.</p>
      </header>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="paketler">
        <h2 id="paketler" className="sr-only">Paketler</h2>
        <div className="sales-grid">
          {websitePackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} featured={index === 1} />
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <ExclusionNote />
        </div>
      </section>

      <section className="sales-section" aria-labelledby="ek">
        <h2 id="ek">Ek hizmetler</h2>
        <p className="lead">Aylık bakım, SEO ve sosyal medya ayrı fiyatlanır.</p>
        <AddonGroups />
        <p style={{ marginTop: 16 }}>
          <Link href="/fiyatlar" className="sales-link">
            Tüm fiyatlar <ArrowUpRight size={15} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="sales-section" aria-labelledby="sanayi">
        <h2 id="sanayi">Sanayi işletmeleri</h2>
        <p className="lead">CNC ve imalat atölyeleri için ayrı bir paket var.</p>
        <Link href="/sanayi-cozumleri" className="sales-link">
          Sanayi çözümleri <ArrowUpRight size={15} aria-hidden />
        </Link>
      </section>

      <section className="sales-section" aria-labelledby="ornek">
        <h2 id="ornek">Örnek çalışmalar</h2>
        <p className="lead">Mağaza projeleri e-ticaret kapsamındadır ve ayrı tekliflendirilir.</p>
        <div className="sales-grid sales-grid-tight">
          <Link href="/projects/telefon-magazasi" className="sales-card" style={{ display: "block" }}>
            <h3>Telefon mağazası</h3>
            <p style={{ marginTop: 6 }}>Mobilden ürün ekleme, havale ve WhatsApp siparişi.</p>
          </Link>
          <Link href="/projects/kesici-takim-magazasi" className="sales-card" style={{ display: "block" }}>
            <h3>Kesici takım mağazası</h3>
            <p style={{ marginTop: 6 }}>Uç koduyla arama, kategori ve marka listeleri.</p>
          </Link>
        </div>
      </section>

      <CtaStrip context={{ packageName: "web sitesi paketleri" }} />
    </div>
  );
}
