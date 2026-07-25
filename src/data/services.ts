export interface Service {
  id: string;
  title: {
    en: string;
    tr: string;
  };
  shortDesc: {
    en: string;
    tr: string;
  };
  fullDesc: {
    en: string;
    tr: string;
  };
  features: {
    en: string[];
    tr: string[];
  };
  techTags: string[];
  iconName: string;
}

export const servicesData: Service[] = [
  {
    id: "ai-agents",
    title: {
      en: "AI Agents Development",
      tr: "Yapay Zeka Ajanları Geliştirme",
    },
    shortDesc: {
      en: "Autonomous LLM agents with function calling, vector memory, and custom business integrations.",
      tr: "Fonksiyon çağırma, vektör hafıza ve iş sistemleri entegrasyonuna sahip otonom LLM ajanları.",
    },
    fullDesc: {
      en: "I build self-governing AI agents that handle customer support tickets, search internal knowledge bases, format structured data, and execute complex multi-step workflows without human intervention.",
      tr: "Müşteri destek taleplerini çözen, dahili bilgi tabanlarını sorgulayan, verileri yapılandıran ve insan müdahalesi olmadan çok adımlı iş süreçlerini çalıştıran otonom yapay zeka ajanları kuruyorum.",
    },
    features: {
      en: [
        "Function Calling & Webhook Triggers",
        "RAG (Retrieval-Augmented Generation)",
        "Multi-Agent Swarm Orchestration",
        "Redis Session State & Memory",
      ],
      tr: [
        "Fonksiyon Çağırma & Webhook Tetikleyicileri",
        "RAG (Vektör Tabanlı Belge Arama)",
        "Çoklu Ajan Orkestrasyonu",
        "Redis Oturum Durumu & Hafıza",
      ],
    },
    techTags: ["OpenAI", "Claude", "LangChain", "n8n", "PgVector", "Python"],
    iconName: "Bot",
  },
  {
    id: "business-automation",
    title: {
      en: "Business Automation Systems",
      tr: "İş Süreçleri Otomasyonu",
    },
    shortDesc: {
      en: "Connecting disparate APIs, CRM/ERP platforms, and databases into event-driven automated pipelines.",
      tr: "Farklı API'leri, CRM/ERP platformlarını ve veritabanlarını olay güdümlü otomatik akışlara bağlama.",
    },
    fullDesc: {
      en: "Eliminate manual data entry and repetitive operations. I design resilient background pipelines using n8n, Python microservices, and message queues that synchronize inventory, invoice processing, and user notifications.",
      tr: "Manuel veri girişini ve tekrarlayan operasyonları ortadan kaldırın. Stok senkronizasyonu, fatura işleme ve bildirimleri otomatize eden Python mikroservisleri ve n8n akışları geliştiriyorum.",
    },
    features: {
      en: [
        "Event-Driven Webhook Pipelines",
        "Custom n8n Workflow Nodes",
        "Document Processing & OCR Pipelines",
        "Automated Notification & SMS Queues",
      ],
      tr: [
        "Olay Güdümlü Webhook Akışları",
        "Özel n8n İş Akışı Modülleri",
        "Belge İşleme & OCR Boru Hatları",
        "Otomatik Bildirim & SMS Kuyrukları",
      ],
    },
    techTags: ["n8n", "Python", "FastAPI", "Docker", "PostgreSQL", "Redis"],
    iconName: "Workflow",
  },
  {
    id: "backend-systems",
    title: {
      en: "Backend Systems Engineering",
      tr: "Backend & API Sistem Mühendisliği",
    },
    shortDesc: {
      en: "Scalable REST/GraphQL APIs, relational database schemas, caching layers, and high-concurrency microservices.",
      tr: "Ölçeklenebilir REST/GraphQL API'ler, veritabanı şemaları, önbellekleme katmanları ve yüksek performanslı servisler.",
    },
    fullDesc: {
      en: "Clean backend engineering is the backbone of any software product. I design battle-tested database schemas, rate-limited APIs, authentication systems, and asynchronous workers that remain reliable under heavy load.",
      tr: "Temiz backend mühendisliği her yazılımın omurgasıdır. Yüksek yük altında bile güvenle çalışan veritabanı şemaları, API yetkilendirmeleri, önbellekleme katmanları ve asenkron kuyruk servisleri kuruyorum.",
    },
    features: {
      en: [
        "High-Concurrency Microservices",
        "Relational & Document DB Schema Design",
        "JWT & OAuth Security Implementation",
        "Redis Caching & Rate Limiting",
      ],
      tr: [
        "Yüksek Eşzamanlıklı Mikroservisler",
        "İlişkisel Veritabanı Şema Tasarımı",
        "JWT & OAuth2 Güvenlik Mimarisi",
        "Redis Önbellekleme & Hız Sınırlama",
      ],
    },
    techTags: ["Node.js", "TypeScript", "Python", "PostgreSQL", "Prisma", "Docker"],
    iconName: "Server",
  },
  {
    id: "saas-development",
    title: {
      en: "SaaS Product Development",
      tr: "SaaS Ürün Geliştirme",
    },
    shortDesc: {
      en: "End-to-end multi-tenant web applications from database architecture to production deployment.",
      tr: "Veritabanı mimarisinden canlıya almaya kadar uçtan uca çok kiracılı web uygulamaları.",
    },
    fullDesc: {
      en: "Transforming product visions into production-ready SaaS platforms. I handle full-stack execution: subscriptions, multi-tenant data isolation, responsive dark-mode UIs, fast API routing, and automated deployment.",
      tr: "Ürün fikirlerini canlıya hazır SaaS platformlarına dönüştürüyorum. Çok kiracılı veri izolasyonu, abonelik entegrasyonları, hızlı API yönlendirmeleri ve otomatik canlıya alma süreçlerini yönetiyorum.",
    },
    features: {
      en: [
        "Multi-Tenant Database Architecture",
        "Stripe Billing & Subscription Queues",
        "Fast Next.js App Router UI",
        "Automated CI/CD Deployment",
      ],
      tr: [
        "Çok Kiracılı Veritabanı Mimarisi",
        "Ödeme & Abonelik Entegrasyonu",
        "Hızlı Next.js App Router Arayüzü",
        "Otomatik CI/CD Canlıya Alma",
      ],
    },
    techTags: ["Next.js", "React", "TailwindCSS", "PostgreSQL", "Stripe", "Vercel"],
    iconName: "LayoutGrid",
  },
];
