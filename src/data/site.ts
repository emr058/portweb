export const siteConfig = {
  name: "Emir Aydın",
  title: "AI Automation Engineer & Full Stack Software Engineer",
  description:
    "Specializing in AI-driven automation systems, scalable backend architecture, and digital transformation. Building software that eliminates manual work and creates measurable business value.",
  url: "https://www.emirr.com.tr",
  ogImage: "/profile.jpg",
  avatar: "/profile.jpg",
  author: "Emir Aydın",
  location: "Gebze, Kocaeli, Turkey",
  education: "Kyrenia University - Software Engineering (2021 - 2025)",
  phone: "+90 535 375 33 58",
  links: {
    github: "https://github.com/emr058",
    linkedin: "https://linkedin.com/in/emir-aydn",
    email: "mailto:emraydin058@gmail.com",
    emailDisplay: "emraydin058@gmail.com",
    companyGithub: "https://github.com/medikaldentech10-hue",
  },
  cvPath: "/cv.pdf",
} as const;

export const currentlyBuildingProjects = [
  {
    name: "CarryHub",
    tagline: "Logistics Marketplace & Operations Platform",
    progress: 70,
    status: { en: "Active Development", tr: "Aktif Geliştirme" },
    slug: "carryhub",
    color: "from-emerald-500 to-teal-400",
  },
  {
    name: "Elem-AI",
    tagline: "AI Business Automation Platform",
    progress: 40,
    status: { en: "In Progress", tr: "Geliştirme Aşamasında" },
    slug: "elem-ai",
    color: "from-purple-500 to-violet-400",
  },
  {
    name: "B12 Reminder",
    tagline: "Patient Supplement & Dosage Retention System",
    progress: 95,
    status: { en: "Publishing Soon", tr: "Yayınlanmak Üzere" },
    slug: "b12-reminder",
    color: "from-blue-500 to-indigo-400",
  },
  {
    name: "MyKar",
    tagline: "AI Fleet & Vehicle Expense SaaS",
    progress: 15,
    status: { en: "Coming Soon", tr: "Yakında" },
    slug: "mykar",
    color: "from-amber-500 to-orange-400",
  },
] as const;
