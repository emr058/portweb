import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

// İstemci sayfası metadata dışa aktaramaz; standart adres bu segmentten verilir.
export const metadata: Metadata = {
  title: { default: "Projeler", template: `%s | ${siteConfig.name}` },
  description: "Şu an yürüyen işler, kendi ürünlerim ve önceki çalışmalarım.",
  alternates: { canonical: "/projects" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
