import { currentlyBuildingProjects, siteConfig } from "./site";
import { careerTimeline } from "./career";

type Text = { tr: string; en: string };
export interface WorldItem { title: Text; description: Text; tags?: readonly string[]; level?: 1 | 2 | 3; active?: boolean }
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
  alt: { tr: "Yüzen bir ada üzerinde atölye: çalışan üretim binası, inşaat alanı, mor yapay zeka binası, camgöbeği sunucu odası, ahşap kule ve pembe iletişim binası.", en: "A workshop on a floating island: a running production building, a construction yard, a purple AI building, a cyan server room, a wooden tower and a pink contact building." },
};

export const currentRoles = ["Adaant Bilişim Teknolojileri", "Aydın Torna CNC"].map(company => careerTimeline.find(step => step.company === company)!);
export const worldContactLinks = [
  { href: siteConfig.links.email, label: { tr: "E-posta yaz", en: "Send an email" }, detail: siteConfig.links.emailDisplay },
  { href: `tel:${siteConfig.phone.replace(/\s/g, "")}`, label: { tr: "Telefon et", en: "Call" }, detail: siteConfig.phone },
  { href: siteConfig.links.linkedin, label: { tr: "LinkedIn profilini aç", en: "Open LinkedIn" }, detail: "LinkedIn" },
  { href: siteConfig.links.github, label: { tr: "GitHub profilini aç", en: "Open GitHub" }, detail: "GitHub" },
  { href: siteConfig.cvPaths.tr, label: { tr: "CV indir (Türkçe)", en: "Download CV (Turkish)" }, detail: "PDF", download: true },
  { href: siteConfig.cvPaths.en, label: { tr: "CV indir (İngilizce)", en: "Download CV (English)" }, detail: "PDF", download: true },
];

export const activeProjects: WorldItem[] = [
  { title: { tr: "Telefon servis ve satış sitesi", en: "Phone repair and sales website" }, description: { tr: "Bir telefon dükkânı için satış ve teknik servis sitesi. Dükkân sahibi ürünü telefonundan ekliyor, siparişler havale ve WhatsApp ile geliyor. Altyapıyı başka dükkânlara da kurulabilecek şekilde hazırladım.", en: "A sales and repair website for a phone shop. The owner adds products from their phone, and orders come in by bank transfer or WhatsApp. I built it so it can be set up for other shops too." }, tags: ["Next.js", "Supabase", "Vercel"] },
  { title: { tr: "Makine sarf malzemesi satış sitesi", en: "Industrial supplies website" }, description: { tr: "Kesici takım ve atölye sarf malzemesi satan bir tedarikçi için ürün kataloğu ve teklif sitesi. Telefon sitesinin altyapısı üzerine kuruluyor.", en: "A product catalog and quotation website for a supplier of cutting tools and workshop consumables, built on the same base as the phone shop site." }, tags: ["Next.js", "Supabase"] },
  { title: { tr: "Torna AI CAD", en: "Torna AI CAD" }, description: { tr: "Atölyemizde teknik resimleri CAD çizimine dönüştürmeyi hızlandıran araç. Geliştirmesi sürüyor.", en: "A tool for turning technical drawings into CAD models faster in our workshop. Still in development." }, tags: ["Python"] },
];

const careerItems = [...currentRoles, ...careerTimeline.filter(step => !currentRoles.includes(step) && step.company !== "Independent Product Builder").reverse()].map((step, index) => ({ level: (index < 2 ? index + 1 : 3) as 1 | 2 | 3, active: index < 2, title: { tr: step.company, en: step.company }, description: { tr: `${step.role.tr} · ${step.period.replace("Present", "Devam ediyor")}`, en: `${step.role.en} · ${step.period}` } }));

export const worldRegions: WorldRegion[] = [
  { id: "aktif", hotkey: 1, color: "#86baff", name: { tr: "Aktif üretim", en: "Active production" }, description: { tr: "Şu an yürüyen işlerim ve projelerim.", en: "My current work and projects." }, position: { x: 51, y: 25, w: 28, h: 32, labelX: 65, labelY: 40 }, panel: { title: { tr: "Şu an üzerinde çalıştıklarım", en: "What I am working on now" }, items: [
    ...activeProjects,
  ] } },
  { id: "projeler", hotkey: 2, color: "#ffb26b", name: { tr: "Projeler", en: "Projects" }, description: { tr: "Kendi ürün fikirlerim.", en: "My own product ideas." }, position: { x: 5, y: 10, w: 35, h: 38, labelX: 27, labelY: 30 }, panel: { title: { tr: "Geliştirdiğim ürünler", en: "Products I am building" }, items: currentlyBuildingProjects.map(project => ({ title: { tr: project.name, en: project.name }, description: project.description })), link: { href: "/projects", label: { tr: "Tüm projeler", en: "All projects" } } } },
  { id: "yapay-zeka", hotkey: 3, color: "#ce9aff", name: { tr: "Yapay zeka ve otomasyon", en: "AI and automation" }, description: { tr: "Elle yapılan işi azaltan araçlar.", en: "Tools that cut down manual work." }, position: { x: 40, y: 5, w: 23, h: 31, labelX: 51, labelY: 17 }, panel: { title: { tr: "Yaptığım otomasyonlar", en: "Automation I have built" }, items: [
    { title: { tr: "Altyazı çeviri otomasyonu", en: "Subtitle translation automation" }, description: { tr: "35.000 satırlık webinar altyazısını bir dakikadan kısa sürede çeviren Python aracı. Terimler metnin tamamında aynı kalıyor.", en: "A Python tool that translates 35,000 lines of webinar subtitles in under a minute, keeping terminology consistent." }, tags: ["Python"] },
    { title: { tr: "Belgeye dayalı destek botu", en: "Document-based support bot" }, description: { tr: "20 şirket belgesinden yararlanarak 100'den fazla soruyu yanıtlayan bot. Cevaplayamadığı soruyu bir çalışana yönlendiriyor.", en: "A bot that answers more than 100 questions from 20 company documents and hands anything it cannot answer to a person." }, tags: ["OpenAI API", "RAG", "Node.js"] },
    { title: { tr: "QR katılımcı sistemi", en: "QR attendee system" }, description: { tr: "75 kişilik etkinlik için kişiye özel yaka kartlarını üreten ve girişleri Google Workspace'e kaydeden sistem.", en: "A system that generated personal badges for a 75-person event and recorded check-ins in Google Workspace." }, tags: ["JavaScript", "Google Workspace API"] },
  ], link: { href: "/ai-stack", label: { tr: "Kullandığım teknolojiler", en: "Tools I use" } } } },
  { id: "altyapi", hotkey: 4, color: "#6ce7e4", name: { tr: "Altyapı ve güvenlik", en: "Infrastructure and security" }, description: { tr: "Projelerin çalıştığı zemin.", en: "What the projects run on." }, position: { x: 26, y: 48, w: 21, h: 24, labelX: 36, labelY: 58 }, panel: { title: { tr: "Altyapı ve güvenlik", en: "Infrastructure and security" }, items: [
    { title: { tr: "Altyapı", en: "Infrastructure" }, description: { tr: "Arayüzde Next.js ve React, sunucu tarafında Java/Spring Boot ve Python kullanıyorum. Veriler PostgreSQL ve Supabase'de duruyor, siteler Vercel üzerinden yayına çıkıyor.", en: "I use Next.js and React on the front end, Java/Spring Boot and Python on the server. Data lives in PostgreSQL and Supabase, and sites are deployed on Vercel." }, tags: ["Next.js", "React", "Spring Boot", "Python", "PostgreSQL", "Supabase", "Vercel", "Git"] },
    { title: { tr: "Güvenlik", en: "Security" }, description: { tr: "Yetki kontrolü hem sunucuda hem veritabanında (satır bazlı erişim kuralları) yapılıyor. Gizli anahtarlar koda girmiyor; her commit öncesinde gitleaks, kod taramasında Semgrep çalışıyor. Yayından önce test ortamında kabul testi yapılıyor.", en: "Access is checked both on the server and in the database (row-level security). Secrets stay out of the code; gitleaks runs before every commit and Semgrep scans the code. Each release goes through acceptance tests in a test environment first." }, tags: ["Supabase RLS", "gitleaks", "Semgrep", "Zod"] },
  ] } },
  { id: "kariyer", hotkey: 5, color: "#e7c08e", name: { tr: "Kariyer ve öğrenim", en: "Career and education" }, description: { tr: "Çalıştığım yerler ve eğitimim.", en: "Where I have worked and studied." }, position: { x: 79, y: 13, w: 12, h: 43, labelX: 85, labelY: 31 }, panel: { title: { tr: "Kariyer ve öğrenim", en: "Career and education" }, items: [
    ...careerItems,
    { level: 3, title: { tr: "Sertifikalar", en: "Certificates" }, description: { tr: "B2+ İngilizce, Frances King English School, Londra (2025) · CAD/CAM, Desita Yazılım (2020)", en: "B2+ English, Frances King English School, London (2025) · CAD/CAM, Desita Software (2020)" } },
  ], link: { href: "/blog", label: { tr: "Blog yazılarını oku", en: "Read the blog" } } } },
  { id: "iletisim", hotkey: 6, color: "#ffacd5", name: { tr: "İletişim", en: "Contact" }, description: { tr: "E-posta, telefon ve CV.", en: "Email, phone and CV." }, position: { x: 41, y: 59, w: 24, h: 25, labelX: 53, labelY: 72 }, panel: { title: { tr: "İletişim", en: "Contact" }, items: [] } },
];
