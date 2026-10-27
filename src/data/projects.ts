import { activeProjects } from "./world";
import { currentlyBuildingProjects } from "./site";

type Text = { tr: string; en: string };
export interface ProjectCaseStudy {
  slug: string;
  title: string;
  name: Text;
  description: Text;
  group: "templates" | "ideas" | "work";
  technologies?: readonly string[];
}

const templates = activeProjects.slice(0, 2);
export const projectsData: ProjectCaseStudy[] = [
  ...templates.map((item, index) => ({
    slug: index === 0 ? "phone-store" : "industrial-supplies",
    title: item.title.en, name: item.title, description: item.description,
    group: "templates" as const, technologies: item.tags,
  })),
  ...currentlyBuildingProjects.map((project, index) => ({
    slug: ["carryhub", "elem-ai", "b12-reminder", "mykar"][index],
    title: project.name, name: { tr: project.name, en: project.name },
    description: project.description, group: "ideas" as const,
  })),
  {
    slug: "dentechpro", title: "Product catalog",
    name: { tr: "Ürün kataloğu", en: "Product catalog" },
    description: { tr: "Ürün arama, katalog yönetimi ve WhatsApp üzerinden sipariş talebi için web uygulaması.", en: "A web app for product search, catalog management and order requests via WhatsApp." },
    group: "work", technologies: ["Next.js", "TypeScript", "Supabase"],
  },
  {
    slug: "ai-smart-tech-advisor", title: "Technology advisor",
    name: { tr: "Teknoloji danışmanı", en: "Technology advisor" },
    description: { tr: "İhtiyaçlara göre teknoloji önerileri sunan yapay zeka projesi.", en: "An AI project that suggests technology based on user needs." }, group: "work",
  },
  {
    slug: "ai-customer-support-agent", title: "Document support bot",
    name: { tr: "Belge tabanlı destek botu", en: "Document support bot" },
    description: { tr: "20 iş belgesinden 100’den fazla kurumsal soruyu yanıtlayan destek botu.", en: "A support bot that answers over 100 business questions using 20 company documents." },
    group: "work", technologies: ["JavaScript", "Node.js"],
  },
  {
    slug: "qr-attendance-automation", title: "QR participant tracking",
    name: { tr: "QR katılımcı takibi", en: "QR participant tracking" },
    description: { tr: "Google Workspace bağlantılı katılımcı takibi ve 75 kişilik yaka kartı üretimi.", en: "Participant tracking connected to Google Workspace, with badge generation for 75 people." },
    group: "work", technologies: ["JavaScript", "Google Workspace"],
  },
  {
    slug: "pyuztanima", title: "PyuzTanima",
    name: { tr: "PyuzTanima", en: "PyuzTanima" },
    description: { tr: "Yazılım mühendisliği bitirme projem: Flask ve OpenCV ile yüz tanıma uygulaması.", en: "My software engineering graduation project: a face recognition app built with Flask and OpenCV." },
    group: "work", technologies: ["Python", "Flask", "OpenCV"],
  },
];
