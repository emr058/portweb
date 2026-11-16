import type { Metadata } from "next";

// İstemci sayfası metadata dışa aktaramaz; standart adres bu segmentten verilir.
export const metadata: Metadata = {
  title: "Blog",
  description: "Emir Aydın'ın yazılım ve yapay zekâ notları.",
  alternates: { canonical: "/blog" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
