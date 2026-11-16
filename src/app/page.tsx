import type { Metadata } from "next";
import { Workshop } from "@/components/world/Workshop";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return <Workshop />;
}
