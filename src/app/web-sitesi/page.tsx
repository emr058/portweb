import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Actions, AddonGroups, Chooser, CtaStrip, ExclusionNote, PackageCard, ProviderInfo, SalesHero, SectionTitle, SiteWireframe, Steps, TrustCard } from "@/components/sales/parts";
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
      <SalesHero
        eyebrow="Web sitesi hizmeti"
        title="İşletmeniz için web sitesi"
        actions={<Actions apply="/basvuru" whatsapp={{}} />}
        visual={<SiteWireframe />}
      >
        İki paket var: Başlangıç ve Profesyonel. Kampanya fiyatı ilk 10 müşteri için geçerli.
      </SalesHero>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="secim">
        <SectionTitle id="secim" eyebrow="Seçim" title="Size uygun olan hangisi?">
          Ne istediğinize göre bir paket seçin. Emin değilseniz başvuruda &quot;Emin değilim&quot; seçeneğini işaretleyin.
        </SectionTitle>
        <Chooser />
      </section>

      <section className="sales-section" aria-labelledby="paketler">
        <SectionTitle id="paketler" eyebrow="Paketler" title="Neler dahil?">
          Her maddenin altında ne işe yaradığı yazıyor.
        </SectionTitle>
        <div className="sales-grid">
          {websitePackages.map((pkg, index) => (
            <PackageCard key={pkg.id} pkg={pkg} featured={index === 1} />
          ))}
        </div>
        <div style={{ marginTop: 18 }}>
          <ExclusionNote />
        </div>
      </section>

      <section className="sales-section" aria-labelledby="adimlar">
        <SectionTitle id="adimlar" eyebrow="Süreç" title="Nasıl ilerler?" />
        <Steps />
      </section>

      <section className="sales-section" aria-labelledby="ek">
        <SectionTitle id="ek" eyebrow="İsteğe bağlı" title="Ek hizmetler">
          Site yayına çıktıktan sonra isterseniz bakım, SEO ve sosyal medya hizmeti alabilirsiniz. Paketlerden ayrı fiyatlanır.
        </SectionTitle>
        <AddonGroups />
        <p style={{ marginTop: 16 }}>
          <Link href="/fiyatlar" className="sales-link">
            Tüm fiyatlar <ArrowUpRight size={15} aria-hidden />
          </Link>
        </p>
      </section>

      <section className="sales-section" aria-labelledby="sanayi">
        <SectionTitle id="sanayi" eyebrow="Atölye ve fabrikalar" title="Sanayi işletmeleri">
          CNC ve imalat atölyeleri için ayrı bir paket var: makine parkuru, teklif formu, teknik çizim yükleme.
        </SectionTitle>
        <Link href="/sanayi-cozumleri" className="sales-link">
          Sanayi çözümleri <ArrowUpRight size={15} aria-hidden />
        </Link>
      </section>

      <section className="sales-section" aria-labelledby="ornek">
        <SectionTitle id="ornek" eyebrow="Örnekler" title="Yaptığım işler">
          Mağaza projeleri e-ticaret kapsamındadır ve ayrı tekliflendirilir.
        </SectionTitle>
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

      <div style={{ marginTop: 56 }}>
        <TrustCard />
      </div>

      <CtaStrip context={{}} />
      <ProviderInfo />
    </div>
  );
}
