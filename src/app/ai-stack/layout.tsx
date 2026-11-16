import type { Metadata } from "next";

// İstemci sayfası metadata dışa aktaramaz; standart adres bu segmentten verilir.
export const metadata: Metadata = {
  title: "Teknolojiler",
  description: "Projelerimde kullandığım diller, araçlar ve nerede kullandığım.",
  alternates: { canonical: "/ai-stack" },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
