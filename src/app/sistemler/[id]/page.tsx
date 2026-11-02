import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { whatsappUrl } from "@/lib/whatsapp";
import { salesMetadata } from "@/lib/sales-metadata";
import { systemById, systems } from "@/data/systems";

export const dynamicParams = false;
export const generateStaticParams = () => systems.map(system => ({ id: system.id }));

const exists = (asset: string) => existsSync(path.join(process.cwd(), "public", asset));

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const system = systemById((await params).id);
  if (!system) return {};
  return salesMetadata({
    path: `/sistemler/${system.id}`,
    title: `${system.ad} hazır sistemi`,
    description: system.fikir,
    image: "temalar",
  });
}

export default async function SistemPage({ params }: { params: Promise<{ id: string }> }) {
  const system = systemById((await params).id);
  if (!system) notFound();
  const screenshots = system.ekranlar.filter(exists);
  const desktopVideo = exists(system.masaustuVideo);
  const phoneVideo = exists(system.telefonVideo);

  return (
    <div className="sales systems-page" style={{ maxWidth: 1180 }}>
      <div className="viewer-head system-viewer-head">
        <Link href="/sistemler" className="viewer-back"><ArrowLeft size={16} aria-hidden /> Hazır sistemler</Link>
        <div><p className="theme-sector">{system.sektor}</p><h1>{system.ad}</h1><p className="system-idea">{system.fikir}</p></div>
        <a className="btn btn-primary" href={whatsappUrl(system.whatsappMesaji)} target="_blank" rel="noopener noreferrer">Demoyu birlikte gezelim <ArrowUpRight size={16} aria-hidden /></a>
      </div>

      {screenshots.length > 0 && <section className="system-screens" aria-label={`${system.ad} ekran görüntüleri`}>
        {screenshots.map((src, index) => <figure key={src} className="system-screen"><Image src={src} alt={`${system.ad} ekranı ${index + 1}`} width={1280} height={800} sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>{["Ana sayfa", "Ürün listesi", "Ürün detayı", "Teklif akışı"][index]}</figcaption></figure>)}
      </section>}

      {(desktopVideo || phoneVideo) && <section className="system-videos" aria-label="Masaüstü ve telefon kayıtları">
        {desktopVideo && <figure><video controls playsInline preload="metadata" src={system.masaustuVideo} /><figcaption>Masaüstü görünümü</figcaption></figure>}
        {phoneVideo && <figure><div className="system-phone-frame"><video controls playsInline preload="metadata" src={system.telefonVideo} /></div><figcaption>Telefon görünümü</figcaption></figure>}
      </section>}

      <section className="viewer-info system-info" aria-labelledby="system-features">
        <div><h2 id="system-features">Sistemin kapsamı</h2><ul className="theme-list">{system.ozellikler.map(item => <li key={item}><Check size={16} aria-hidden /><span>{item}</span></li>)}</ul></div>
        <div className="sales-note"><h2>Kime uygun?</h2><p>{system.kimeUygun}</p><h2 className="system-note-title">Örnek içerik</h2><p>{system.not}</p></div>
      </section>

      <section className="sales-section system-scope" aria-labelledby="kurulum-kapsami">
        <h2 id="kurulum-kapsami">Kurulumda konuşacağımız başlıklar</h2>
        <ul>{system.kapsam.map(item => <li key={item}>{item}</li>)}</ul>
      </section>
      <section className="system-bottom-cta"><div><h2>Demoyu birlikte gezelim</h2><p>Ekranları açıp iş akışınıza göre nelerin gerektiğini konuşalım.</p></div><a className="btn btn-primary" href={whatsappUrl(system.whatsappMesaji)} target="_blank" rel="noopener noreferrer">WhatsApp'tan yaz <ArrowUpRight size={16} aria-hidden /></a></section>
      <p className="systems-crosslink">Hazır tasarım mı arıyorsunuz? <Link href="/temalar">Web sitesi tasarımlarına göz atın <ArrowUpRight size={14} aria-hidden /></Link></p>
    </div>
  );
}
