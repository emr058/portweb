import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { ProviderInfo } from "@/components/sales/parts";
import { ThemeViewer } from "@/components/sales/ThemeViewer";
import { demoOf, themeById, themes } from "@/data/themes";
import { salesMetadata } from "@/lib/sales-metadata";

export const dynamicParams = false;
export const generateStaticParams = () => themes.map(t => ({ id: t.id }));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const theme = themeById((await params).id);
  if (!theme) return {};
  return salesMetadata({
    path: `/temalar/${theme.id}`,
    title: `${theme.name}: ${theme.sector} için web sitesi tasarımı`,
    description: theme.idea,
    image: "temalar",
  });
}

export default async function ThemePage({ params }: { params: Promise<{ id: string }> }) {
  const theme = themeById((await params).id);
  if (!theme) notFound();
  return (
    <div className="sales" style={{ maxWidth: 1280 }}>
      <div className="viewer-head">
        <Link href="/temalar" className="viewer-back"><ArrowLeft size={16} aria-hidden /> Tüm demolar</Link>
        <div>
          <p className="theme-sector">{theme.sector}</p>
          <h1>{theme.name}</h1>
        </div>
        <div className="theme-actions">
          <a className="btn" href={demoOf(theme.id)} target="_blank" rel="noopener">Yeni sekmede aç <ArrowUpRight size={16} aria-hidden /></a>
          <Link className="btn btn-primary" href={`/basvuru?tema=${theme.id}`}>Bu tasarımı iste <ArrowUpRight size={16} aria-hidden /></Link>
        </div>
      </div>

      <ThemeViewer src={demoOf(theme.id)} name={theme.name} />

      <section className="viewer-info" aria-labelledby="neler">
        <div>
          <h2 id="neler">Bu tasarımda neler var</h2>
          <ul className="theme-list">
            {theme.features.map(item => (
              <li key={item}><Check size={16} aria-hidden /> <span>{item}</span></li>
            ))}
          </ul>
        </div>
        <div className="sales-note">
          <p>{theme.note}</p>
          <p style={{ marginTop: 12 }}>
            <Link className="btn btn-primary" href={`/basvuru?tema=${theme.id}`}>Bu tasarımı iste <ArrowUpRight size={16} aria-hidden /></Link>
          </p>
        </div>
      </section>
      <ProviderInfo />
    </div>
  );
}
