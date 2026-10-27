"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";

export function SiteFooter() {
  return usePathname() === "/" ? null : <Footer />;
}
