export interface CareerStep {
  company: string;
  role: {
    en: string;
    tr: string;
  };
  period: string;
  isCurrent?: boolean;
  description: {
    en: string;
    tr: string;
  };
  highlights: {
    en: string[];
    tr: string[];
  };
}

export const careerTimeline: CareerStep[] = [
  {
    company: "Kyrenia University (Girne Üniversitesi)",
    role: {
      en: "Software Engineering (B.Sc.)",
      tr: "Yazılım Mühendisliği Lisans Eğitimi",
    },
    period: "2021 - 2025",
    description: {
      en: "Graduated with a degree in Software Engineering, building strong foundations in computer science algorithms, system design, machine learning, and face recognition graduation project (PyuzTanima).",
      tr: "Yazılım Mühendisliği bölümünü bitirdim. Bilgisayar bilimleri algoritmaları, sistem tasarımı, makine öğrenmesi ve bitirme projesi olarak yüz tanıma sistemi (PyuzTanima) geliştirdim.",
    },
    highlights: {
      en: [
        "Specialized in Python, algorithms, database systems & computer vision",
        "Graduation Project: PyuzTanima (Flask & OpenCV Face Recognition)",
      ],
      tr: [
        "Python, algoritmalar, veritabanı sistemleri ve bilgisayarlı görü uzmanlığı",
        "Bitirme Projesi: PyuzTanima (Flask & OpenCV Yüz Tanıma Sistemi)",
      ],
    },
  },
  {
    company: "Novelty AI",
    role: {
      en: "AI Engineering Intern",
      tr: "Yapay Zeka Mühendisliği Stajyeri",
    },
    period: "06/2024 - 08/2024",
    description: {
      en: "Contributed to healthcare-focused AI and web development projects, leveraging Flask, OpenCV, and Machine Learning methodologies to build RESTful APIs and process visual data.",
      tr: "Sağlık odaklı yapay zeka ve web projelerinde yer alarak Flask, OpenCV ve Makine Öğrenmesi ile RESTful API'ler geliştirdim ve görsel verileri işledim.",
    },
    highlights: {
      en: [
        "Developed Python RESTful APIs for healthcare computer vision models",
        "Processed visual medical dataset pipelines and classification tools",
      ],
      tr: [
        "Sağlık bilgisayarlı görü modelleri için Python RESTful API'ler geliştirme",
        "Tıbbi görsel veri boru hatlarını ve sınıflandırma araçlarını işleme",
      ],
    },
  },
  {
    company: "32bit Bilgisayar Hizmetleri Ltd",
    role: {
      en: "Full Stack Developer Intern",
      tr: "Full Stack Yazılım Geliştirici Stajyeri",
    },
    period: "06/2025 - 08/2025",
    description: {
      en: "Developed robust backend and frontend modules utilizing Java, Spring Boot, React, and PostgreSQL. Collaborated in agile environments, participating in technical planning and deployment.",
      tr: "Java, Spring Boot, React ve PostgreSQL kullanarak katı backend ve frontend modülleri geliştirdim. Çevik (Agile) ekiplerde teknik planlama ve yayına alma süreçlerinde yer aldım.",
    },
    highlights: {
      en: [
        "Built enterprise backend services with Java & Spring Boot",
        "Designed PostgreSQL database models and responsive React interfaces",
      ],
      tr: [
        "Java & Spring Boot ile kurumsal backend servisleri geliştirme",
        "PostgreSQL veritabanı modelleri ve esnek React arayüzleri tasarlama",
      ],
    },
  },
  {
    company: "Dentech Medikal",
    role: {
      en: "IT & Software Specialist",
      tr: "BT & Yazılım Uzmanı",
    },
    period: "03/2026 - 09/2026",
    description: {
      en: "Engineered AI-driven automation systems, knowledge base chatbots, QR participant tracking systems, and digital commerce platform migrations.",
      tr: "Yapay zeka otomasyon sistemleri, bilgi tabanı botları, QR katılımcı takip sistemleri ve e-ticaret platform taşıma süreçlerini yürüttüm.",
    },
    highlights: {
      en: [
        "Engineered Python automation pipeline processing 35,000 webinar subtitle lines in < 1 minute",
        "Built AI Customer Support Chatbot (chatbot_v1) answering 100+ business queries across 20 docs",
        "Designed QR Participant System (qrcodeapp) with Google Workspace APIs for 75 badges",
        "Led Wix to IKAS platform migration restructuring 330 products and 35 pages (dentechPro)",
      ],
      tr: [
        "35.000 altyazı satırını 1 dakikadan kısa sürede çeviren Python otomasyon boru hattı",
        "20 belgeden 100+ kurumsal soruyu yanıtlayan Yapay Zeka Destek Botu (chatbot_v1)",
        "75 yaka kartı için Google Workspace API'leri ile QR Katılımcı Yönetimi (qrcodeapp)",
        "Wix'ten IKAS'a 330 ürün ve 35 sayfalık dijital ticaret platform taşınması (dentechPro)",
      ],
    },
  },
  {
    company: "ADA ANT",
    role: {
      en: "Remote Software Developer",
      tr: "Uzaktan Yazılım Geliştirici",
    },
    period: "2026 - Present",
    isCurrent: true,
    description: {
      en: "Developing software remotely as part of the ADA ANT team.",
      tr: "ADA ANT ekibinde uzaktan yazılım geliştiriyorum.",
    },
    highlights: {
      en: ["Remote, async collaboration with the product team"],
      tr: ["Ürün ekibiyle uzaktan ve eşzamansız çalışma"],
    },
  },
  {
    company: "Aydın Torna CNC",
    role: {
      en: "Technical Engineer (Full-time)",
      tr: "Teknik Mühendis (Tam zamanlı)",
    },
    period: "2026 - Present",
    isCurrent: true,
    description: {
      en: "Full-time technical engineer at our family-run CNC turning workshop: production planning, technical drawings and process improvement, and building software for the shop floor.",
      tr: "Aile işletmemiz olan CNC torna atölyesinde tam zamanlı teknik mühendisim: üretim planlama, teknik resim ve süreç iyileştirme; atölye için yazılım geliştirme.",
    },
    highlights: {
      en: [
        "Bridging CNC production and software: digital tools for quoting, drawings and job tracking",
        "Torna AI CAD: turning drawing-to-CAD assistant in development",
      ],
      tr: [
        "CNC üretimi ile yazılımı birleştirme: teklif, teknik resim ve iş takibi için dijital araçlar",
        "Torna AI CAD: teknik resimden CAD üreten asistan (geliştiriliyor)",
      ],
    },
  },
  {
    company: "Independent Product Builder",
    role: {
      en: "AI Automation Engineer & Software Product Builder",
      tr: "Yapay Zeka Otomasyon Mühendisi & Ürün Geliştirici",
    },
    period: "2024 - Present",
    isCurrent: true,
    description: {
      en: "Designing and scaling autonomous AI agents, workflow automation pipelines, and SaaS products focused on solving real business problems.",
      tr: "Gerçek iş sorunlarını çözmeye odaklanmış otonom yapay zeka ajanları, otomasyon sistemleri ve SaaS ürünleri tasarlayıp büyütüyorum.",
    },
    highlights: {
      en: [
        "CarryHub: Textile logistics marketplace & courier route optimization platform",
        "Elem-AI: AI-powered business automation platform",
        "B12 Reminder: Patient supplement dosage retention system",
        "PyuzTanima: Flask & OpenCV Face Recognition System",
      ],
      tr: [
        "CarryHub: Tekstil lojistik pazar yeri ve kurye rota optimizasyon platformu",
        "Elem-AI: Yapay zeka destekli iş otomasyon platformu",
        "B12 Reminder: Hasta ilaç/takviye takip ve uyarı sistemi",
        "PyuzTanima: Flask & OpenCV Yüz Tanıma Sistemi",
      ],
    },
  },
];
