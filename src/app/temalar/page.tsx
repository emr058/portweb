import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
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
      <SalesHero eyebrow="Demolar" title="Beğendiğiniz site sizin olsun" actions={<Actions apply="/basvuru" whatsapp={{}} />}>
        Her tasarım bir sektör için baştan çizildi. Demoyu telefonunuzdan açıp müşteriniz gibi gezin, beğendiğinizi adınız, fotoğraflarınız ve fiyatlarınızla hazırlayalım.
      </SalesHero>

      <section className="sales-section" style={{ marginTop: 0 }} aria-labelledby="galeri">
        <SectionTitle id="galeri" title="Canlı demolar">Yeni tasarımlar zamanla eklenir. Demolardaki içerik örnektir.</SectionTitle>
        <ThemeGallery themes={themes} />
      </section>

      <CtaStrip title="Aradığınızı bulamadınız mı?" text="Sektörünüze özel tasarım da yapıyoruz. Başvuruda işletmenizi anlatın." context={{}} />
      <p className="systems-crosslink">Hazır bir iş akışı mı arıyorsunuz? <Link href="/sistemler">Hazır sistemleri inceleyin <ArrowUpRight size={14} aria-hidden /></Link></p>
      <ProviderInfo />
    </div>
  );
}
