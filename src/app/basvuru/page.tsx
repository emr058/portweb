import type { Metadata } from "next";
import { ApplicationForm } from "@/components/sales/ApplicationForm";
import { ApplicationClosed, ProviderInfo, SalesHero } from "@/components/sales/parts";
import { PROJECT_TYPES } from "@/lib/applications/options";
import { storeConfig } from "@/lib/applications/store";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/basvuru",
  title: "Web sitesi başvurusu",
  description: "Projenizi anlatın; size WhatsApp, telefon veya e-posta ile dönüş yapılır.",
  image: "basvuru",
});

export default async function BasvuruPage({ searchParams }: { searchParams: Promise<{ paket?: string | string[] }> }) {
  const { paket } = await searchParams;
  const requested = Array.isArray(paket) ? paket[0] : paket;
  const initialProject = PROJECT_TYPES.some(t => t.value === requested) ? requested : undefined;
  // Başvuru kaydı için depolama ayarlı değilse form açılmaz; ziyaretçi WhatsApp ve e-postaya yönlendirilir.
  const open = Boolean(storeConfig());
  return (
    <div className="sales" style={{ maxWidth: 1120 }}>
      <SalesHero eyebrow="Başvuru" title="Web sitesi başvurusu">
        Projenizi anlatın. Size WhatsApp, telefon veya e-posta ile dönüş yapılır.
      </SalesHero>
      {open ? <ApplicationForm initialProject={initialProject} /> : <ApplicationClosed />}
      <ProviderInfo />
    </div>
  );
}
