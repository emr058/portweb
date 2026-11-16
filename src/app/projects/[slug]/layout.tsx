import type { Metadata } from "next";
import { projectsData } from "@/data/projects";

// Her proje sayfası kendi adresini standart adres olarak bildirir.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find(item => item.slug === slug);
  if (!project) return {};
  return {
    title: project.name.tr,
    description: project.description.tr,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
