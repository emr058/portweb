import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Actions, CtaStrip, ExclusionNote, Icon, IndustrialWireframe, ProviderInfo, SalesHero, SectionTitle, Steps } from "@/components/sales/parts";
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
      <SalesHero
        eyebrow="Sanayi çözümleri"
        title="Sanayi için web sitesi"
        actions={<Actions apply="/basvuru?paket=sanayi" whatsapp={whatsapp} />}
        visual={<IndustrialWireframe />}
      >
        CNC torna, CNC freze, makine imalatı ve üretim işletmeleri için. Başlangıç fiyatı {formatRange(industrial.from)}.
      </SalesHero>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="neler">
        <SectionTitle id="neler" eyebrow="Kapsam" title="Sitede neler olur?">
          Müşterileriniz sizi, tezgâhlarınızı ve yaptığınız işleri görür; çizimini gönderip teklif ister.
        </SectionTitle>
        <div className="sales-grid sales-grid-tight">
          {industrial.features.map(item => (
            <article key={item.title} className="sales-card feature-card">
              <span className="feature-icon feature-icon-lg"><Icon name={item.icon} size={22} /></span>
              <h3>{item.title}</h3>
              <p>{item.hint}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sales-section" aria-labelledby="kimler">
        <SectionTitle id="kimler" eyebrow="Hedef kitle" title="Kimler için?" />
        <ul className="chip-row">
          {industrial.audience.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="sales-section" aria-labelledby="adimlar">
        <SectionTitle id="adimlar" eyebrow="Süreç" title="Nasıl ilerler?" />
        <Steps />
      </section>

      <section className="sales-section" aria-labelledby="fiyat">
        <SectionTitle id="fiyat" eyebrow="Fiyat" title="Ne kadar?" />
        <div className="sales-card pkg">
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
        <SectionTitle id="neden" eyebrow="Kimden alıyorsunuz?" title="Atölyeden biri yapıyor">
          Aydın Torna CNC&apos;de teknik mühendis olarak çalışıyorum. Teklif ve üretim sürecini atölyenin içinden biliyorum.
        </SectionTitle>
      </section>

      <CtaStrip context={whatsapp} title="Atölyenizi anlatın" text="Başvuruyu doldurun veya WhatsApp'tan yazın." />
      <ProviderInfo />
    </div>
  );
}
