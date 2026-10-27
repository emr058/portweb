import { currentlyBuildingProjects, siteConfig } from "./site";
import { careerTimeline } from "./career";

type Text = { tr: string; en: string };
export interface WorldItem { title: Text; description: Text; tags?: readonly string[] }
export interface WorldRegion {
  id: string;
  hotkey: number;
  name: Text;
  description: Text;
  color: string;
  position: { x: number; y: number; w: number; h: number; labelX: number; labelY: number };
  panel: { title: Text; items: WorldItem[]; link?: { href: string; label: Text } };
}

export const worldScene = {
  src: "/world/scene.jpg", width: 2000, height: 1493,
  alt: { tr: "Yüzen bir ada üzerinde üretim hattı, şantiye, mor laboratuvar, camgöbeği sunucu odası, ahşap bilgi kulesi ve pembe kargo binasından oluşan izometrik atölye.", en: "An isometric workshop on a floating island, with a production line, construction site, purple laboratory, cyan server room, wooden knowledge tower and pink cargo building." },
};

export const currentRoles = [...careerTimeline].filter(step => step.company === "Aydın Torna CNC" || step.company === "ADA ANT").reverse();
export const worldContactLinks = [
  { href: siteConfig.links.email, label: { tr: "E-posta yaz", en: "Send an email" }, detail: siteConfig.links.emailDisplay },
  { href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, label: { tr: "Telefon et", en: "Call" }, detail: siteConfig.phone },
  { href: siteConfig.links.linkedin, label: { tr: "LinkedIn profilini aç", en: "Open LinkedIn" }, detail: "LinkedIn" },
  { href: siteConfig.links.github, label: { tr: "GitHub profilini aç", en: "Open GitHub" }, detail: "GitHub" },
  { href: siteConfig.cvPath, label: { tr: "CV indir", en: "Download CV" }, detail: "PDF", download: true },
];

export const worldRegions: WorldRegion[] = [
  { id: "uretim", hotkey: 1, color: "#86baff", name: { tr: "Üretim hattı", en: "Production line" }, description: { tr: "Müşteri işleri için web şablonları.", en: "Web templates for client projects." }, position: { x: 51, y: 25, w: 28, h: 32, labelX: 65, labelY: 40 }, panel: { title: { tr: "Şu an üretimde", en: "In production" }, items: [
    { title: { tr: "Telefon Servis ve Satış Sayfası", en: "Phone Service & Sales Page" }, description: { tr: "Mağaza ve teknik servis takibi için şablon; mobilden 1 dakikada ürün ekleme, havale ve WhatsApp siparişi.", en: "A template for shop and repair tracking, adding products from mobile in a minute, bank transfers and WhatsApp orders." }, tags: ["Next.js", "Supabase", "Vercel"] },
    { title: { tr: "Makina Sarf Malzeme Satış Sitesi", en: "Machine Consumables Sales Site" }, description: { tr: "Sanayi tedarikçisi için katalog, teklif ve satış sitesi şablonu.", en: "A catalog, quotation and sales website template for an industrial supplier." } },
  ] } },
  { id: "santiye", hotkey: 2, color: "#ffb26b", name: { tr: "Şantiye", en: "Construction site" }, description: { tr: "Üzerinde çalıştığım ürün fikirleri.", en: "Product ideas I am working on." }, position: { x: 5, y: 10, w: 35, h: 38, labelX: 27, labelY: 30 }, panel: { title: { tr: "Yapım aşamasında", en: "Under construction" }, items: currentlyBuildingProjects.map(project => ({ title: { tr: project.name, en: project.name }, description: project.description })) } },
  { id: "laboratuvar", hotkey: 3, color: "#ce9aff", name: { tr: "Laboratuvar", en: "Laboratory" }, description: { tr: "Yapay zeka ve otomasyon işleri.", en: "AI and automation work." }, position: { x: 40, y: 5, w: 23, h: 31, labelX: 51, labelY: 17 }, panel: { title: { tr: "Yapay zeka ve otomasyon", en: "AI and automation" }, items: [
    { title: { tr: "Tekrarlayan işleri otomatikleştirmek", en: "Automating repetitive work" }, description: { tr: "Python ile altyazı otomasyonu, belge tabanlı destek botu ve Google Workspace bağlantılı QR katılımcı sistemi geliştirdim.", en: "I built subtitle automation with Python, a document-based support bot and a QR participant system connected to Google Workspace." }, tags: ["Python", "n8n", "MCP", "LangGraph", "RAG"] },
  ], link: { href: "/ai-stack", label: { tr: "AI Stack’i incele", en: "View AI Stack" } } } },
  { id: "sunucu", hotkey: 4, color: "#6ce7e4", name: { tr: "Sunucu odası", en: "Server room" }, description: { tr: "Altyapı, teknoloji ve güvenlik yaklaşımı.", en: "Infrastructure, technology and security approach." }, position: { x: 26, y: 48, w: 21, h: 24, labelX: 36, labelY: 58 }, panel: { title: { tr: "Altyapı ve güvenlik", en: "Infrastructure and security" }, items: [
    { title: { tr: "Kullandığım araçlar", en: "My tools" }, description: { tr: "Web ürünlerinde Next.js ve TypeScript; servisler ve otomasyonda Python, FastAPI ve PostgreSQL kullanıyorum.", en: "I use Next.js and TypeScript for web products, and Python, FastAPI and PostgreSQL for services and automation." }, tags: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL", "Supabase", "Vercel"] },
    { title: { tr: "Güvenlik yaklaşımım", en: "My security approach" }, description: { tr: "Yetki ve girdi kontrollerini sunucuda ele alırım. Gizli anahtarları kaynak koddan ayrı tutar, değişiklikleri inceleme ve testten geçiririm.", en: "I handle authorization and input validation on the server. I keep secrets separate from source code and review and test changes." } },
  ] } },
  { id: "bilgi", hotkey: 5, color: "#e7c08e", name: { tr: "Bilgi kulesi", en: "Knowledge tower" }, description: { tr: "Kariyerim ve öğrendiklerim.", en: "My career and learning." }, position: { x: 79, y: 13, w: 12, h: 43, labelX: 85, labelY: 31 }, panel: { title: { tr: "Kariyer ve öğrenme", en: "Career and learning" }, items: [...currentRoles, ...careerTimeline.filter(step => !currentRoles.includes(step)).reverse()].map(step => ({ title: { tr: step.company, en: step.company }, description: { tr: `${step.role.tr} · ${step.period.replace("Present", "Devam ediyor")}`, en: `${step.role.en} · ${step.period}` } })), link: { href: "/blog", label: { tr: "Blog yazılarını oku", en: "Read the blog" } } } },
  { id: "kargo", hotkey: 6, color: "#ffacd5", name: { tr: "Kargo", en: "Cargo" }, description: { tr: "Birlikte çalışmak için iletişim.", en: "Get in touch to work together." }, position: { x: 41, y: 59, w: 24, h: 25, labelX: 53, labelY: 72 }, panel: { title: { tr: "İletişim", en: "Contact" }, items: [] } },
];
