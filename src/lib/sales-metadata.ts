import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

// Satış sayfalarının ortak SEO ve paylaşım ayarları. Görseller public/og/<image>.jpg (1200×630).
export function salesMetadata(opts: { path: string; title: string; description: string; image: string }): Metadata {
  const url = `${siteConfig.url}${opts.path}`;
  const image = { url: `${siteConfig.url}/og/${opts.image}.jpg`, width: 1200, height: 630, alt: opts.title };
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "tr_TR", url, title: opts.title, description: opts.description, siteName: siteConfig.name, images: [image] },
    twitter: { card: "summary_large_image", title: opts.title, description: opts.description, images: [image.url] },
  };
}
