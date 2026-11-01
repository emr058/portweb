import type { Metadata } from "next";
import { ApplicationForm } from "@/components/sales/ApplicationForm";
import { PROJECT_TYPES } from "@/lib/applications/options";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = salesMetadata({
  path: "/basvuru",
  title: "Web sitesi başvurusu",
  description: "Projenizi anlatın; size WhatsApp, telefon veya e-posta ile dönüş yapılır. Başvuru formu birkaç dakika sürer.",
  image: "basvuru",
});

export default async function BasvuruPage({ searchParams }: { searchParams: Promise<{ paket?: string | string[] }> }) {
  const { paket } = await searchParams;
  const requested = Array.isArray(paket) ? paket[0] : paket;
  const initialProject = PROJECT_TYPES.some(t => t.value === requested) ? requested : undefined;
  return (
    <div className="sales" style={{ maxWidth: 820 }}>
      <header className="sales-hero">
        <h1>Web sitesi başvurusu</h1>
        <p>Projenizi anlatın. Size WhatsApp, telefon veya e-posta ile dönüş yapılır.</p>
      </header>
      <ApplicationForm initialProject={initialProject} />
    </div>
  );
}
