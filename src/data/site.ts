export const siteConfig = {
  name: "Emir Aydın",
  title: "AI Automation Engineer & Full Stack Software Engineer",
  description:
    "I build web products and automation for daily work, from CNC manufacturing to business software.",
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
  { name: "CarryHub", description: { tr: "Lojistik ve kurye operasyonlarını bir araya getiren platform.", en: "A platform for logistics and courier operations." } },
  { name: "Elem-AI", description: { tr: "İş süreçlerini yapay zeka ile otomatikleştiren platform.", en: "AI automation for business workflows." } },
  { name: "B12 Reminder", description: { tr: "Takviye ve ilaç saatlerini hatırlatan uygulama.", en: "An app for supplement and medication reminders." } },
  { name: "MyKar", description: { tr: "Araç giderlerini ve bakımını takip eden uygulama.", en: "An app for vehicle expenses and maintenance." } },
] as const;
