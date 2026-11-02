import type { Metadata } from "next";
import { Actions, CtaStrip, ProviderInfo, SalesHero, SectionTitle } from "@/components/sales/parts";
import { ThemeGallery } from "@/components/sales/ThemeGallery";
import { themes } from "@/data/themes";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/temalar",
  title: "Hazır web sitesi tasarımları",
  description: "Sektöre göre farklı, canlı gezilebilir web sitesi demoları. Beğendiğiniz tasarım işletmenize uyarlanır.",
  image: "temalar",
});

export default function TemalarPage() {
  return (
    <div className="sales" style={{ maxWidth: 1180 }}>
      <SalesHero eyebrow="Demolar" title="Hazır tasarımlar" actions={<Actions apply="/basvuru" whatsapp={{}} />}>
        Her tasarım bir sektör için baştan çizildi. Demoyu açıp gerçek bir site gibi gezin, beğendiğinizi işletmenize uyarlayalım.
      </SalesHero>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="galeri">
        <SectionTitle id="galeri" title="Canlı demolar">Yeni tasarımlar zamanla eklenir. Demolardaki içerik örnektir.</SectionTitle>
        <ThemeGallery themes={themes} />
      </section>

      <CtaStrip title="Aradığınızı bulamadınız mı?" text="Sektörünüze özel tasarım da yapıyoruz. Başvuruda işletmenizi anlatın." context={{}} />
      <ProviderInfo />
    </div>
  );
}
