import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Actions, CtaStrip, ProviderInfo, SalesHero, SectionTitle } from "@/components/sales/parts";
import { themes } from "@/data/themes";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/temalar",
  title: "Hazır web sitesi tasarımları",
  description: "Sektöre göre farklı, canlı demolu web sitesi temaları. Beğendiğiniz tasarım işletmenize uyarlanır.",
  image: "temalar",
});

export default function TemalarPage() {
  return (
    <div className="sales">
      <SalesHero eyebrow="Tasarımlar" title="Hazır tasarımlar" actions={<Actions apply="/basvuru" whatsapp={{}} />}>
        Her tasarım bir sektör için baştan çizildi. Demoyu açıp gezin, beğendiğinizi işletmenize uyarlayalım.
      </SalesHero>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="galeri">
        <SectionTitle id="galeri" title="Canlı demolar">Yeni tasarımlar zamanla eklenir.</SectionTitle>
        <div className="sales-grid">
          {themes.map(theme => (
            <article key={theme.id} className="sales-card theme-card" aria-labelledby={`t-${theme.id}`}>
              <a href={theme.demo} target="_blank" rel="noopener" className="theme-shot" aria-label={`${theme.name} demosunu yeni sekmede aç`}>
                <Image src={theme.preview} alt={theme.previewAlt} width={1200} height={750} sizes="(max-width: 900px) 100vw, 560px" />
              </a>
              <h3 id={`t-${theme.id}`}>{theme.name}</h3>
              <p className="theme-sector">{theme.sector}</p>
              <p>{theme.idea}</p>
              <ul className="theme-list">
                {theme.features.map(item => (
                  <li key={item}>
                    <Check size={16} aria-hidden /> <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="sales-note">{theme.note}</p>
              <a className="btn btn-primary" href={theme.demo} target="_blank" rel="noopener">
                Demoyu aç <ArrowUpRight size={16} aria-hidden />
              </a>
            </article>
          ))}
        </div>
      </section>

      <CtaStrip title="Bu tasarımı işletmeniz için isteyin" text="Başvuruda proje türü olarak sektörünüzü ve beğendiğiniz tasarımın adını yazın." context={{}} />
      <ProviderInfo />
    </div>
  );
}
