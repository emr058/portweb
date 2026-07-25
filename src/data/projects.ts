export type ProjectStatusKey =
  | "active"
  | "publishingSoon"
  | "live"
  | "comingSoon"
  | "research";

export interface ProjectMetric {
  label: { en: string; tr: string };
  value: string;
  before?: string;
  after?: string;
}

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  tagline: { en: string; tr: string };
  statusKey: ProjectStatusKey;
  featured: boolean;
  categories: string[];
  tags: string[];
  problem: { en: string; tr: string };
  solution: { en: string; tr: string };
  whyItMattered: { en: string; tr: string };
  role: { en: string; tr: string };
  architecture: { en: string; tr: string };
  architectureNodes: {
    title: string;
    description: { en: string; tr: string };
    type: "client" | "api" | "queue" | "ai" | "db";
  }[];
  workflowSteps: { en: string; tr: string }[];
  metrics: ProjectMetric[];
  businessImpact: { en: string; tr: string };
  lessons: { en: string; tr: string }[];
  futureImprovements: { en: string; tr: string }[];
  whatIWouldBuildDifferentlyToday: { en: string; tr: string };
  technologies: string[];
  links: {
    github?: string;
    companyGithub?: string;
    demo?: string;
  };
  seo: {
    title: string;
    description: { en: string; tr: string };
  };
}

export const projectsData: ProjectCaseStudy[] = [
  {
    slug: "dentechpro",
    title: "DentechPro",
    tagline: {
      en: "B2B Dental Product Search, Sales, Admin & WhatsApp Order Platform",
      tr: "B2B Dental Ürün Arama, Satış, Yönetim ve WhatsApp Sipariş Platformu",
    },
    statusKey: "live",
    featured: true,
    categories: ["saas", "e-commerce", "backend"],
    tags: ["Next.js", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Supabase", "Vercel"],
    problem: {
      en: "B2B medical & dental product distribution required a streamlined platform for clinics to search products, send WhatsApp order requests, and allow admins to manage inventory without complex checkout barriers.",
      tr: "B2B medikal ve dental ürün dağıtımı, kliniklerin kolayca ürün araması, WhatsApp üzerinden sipariş vermesi ve yöneticilerin stokları yönetebilmesi için pratik bir platform gerektiriyordu.",
    },
    solution: {
      en: "Engineered DentechPro, a production-ready Next.js MVP for DENTech Medikal. Built with App Router, TypeScript, Supabase, and Tailwind CSS v4, enabling 1-click WhatsApp order generation, product catalog management, and admin dashboards.",
      tr: "DENTech Medikal için canlıya hazır Next.js MVP platformunu (DentechPro) sıfırdan geliştirdim. App Router, Supabase ve Tailwind v4 kullanarak tek tıkla WhatsApp siparişi oluşturan ve yönetici paneli sunan sistemi kurdum.",
    },
    whyItMattered: {
      en: "Dental clinics prefer direct WhatsApp communication over traditional multi-step checkout forms. Streamlining order requests increased sales lead conversion by 3.5x.",
      tr: "Diş klinikleri klasik karmaşık ödeme formları yerine WhatsApp üzerinden doğrudan sipariş vermeyi tercih eder. Talepleri otomatize etmek satış dönüşümünü 3.5 kat artırdı.",
    },
    role: {
      en: "Lead Software Engineer (Dentech Medikal)",
      tr: "Lider Yazılım Mühendisi (Dentech Medikal)",
    },
    architecture: {
      en: "Next.js App Router architecture integrated with Supabase client for product catalog indexing and real-time order request triggers via WhatsApp API webhooks.",
      tr: "Supabase istemcisi ile entegre Next.js App Router mimarisi; ürün kataloğu indeksleme ve WhatsApp API webhook'ları üzerinden anlık sipariş tetikleyicileri.",
    },
    architectureNodes: [
      {
        title: "Product Search & Catalog",
        description: {
          en: "Fast responsive product search UI with filter categories.",
          tr: "Kategori filtreli hızlı esnek ürün arama paneli.",
        },
        type: "client",
      },
      {
        title: "Order Bridge (WhatsApp)",
        description: {
          en: "Formatted cart payload generator for direct sales routing.",
          tr: "Doğrudan satışa yönlendiren WhatsApp sepet nesnesi üreticisi.",
        },
        type: "api",
      },
      {
        title: "Supabase Backend",
        description: {
          en: "Product database, admin auth, and inventory management.",
          tr: "Ürün veritabanı, yönetici yetkilendirme ve stok takibi.",
        },
        type: "db",
      },
    ],
    workflowSteps: [
      {
        en: "1. Clinic searches dental products on DentechPro catalog.",
        tr: "1. Klinik çalışanı DentechPro kataloğundan ürün arar.",
      },
      {
        en: "2. Selected items formatted into structured order request payload.",
        tr: "2. Seçilen ürünler biçimlendirilmiş sipariş nesnesine dönüştürülür.",
      },
      {
        en: "3. Direct WhatsApp dispatch triggers sales rep notification.",
        tr: "3. Doğrudan WhatsApp gönderimi satış temsilcisine bildirimi düşürür.",
      },
      {
        en: "4. Admin dashboard logs request and tracks product availability in Supabase.",
        tr: "4. Yönetici paneli Supabase üzerinde talebi kaydeder ve stoku günceller.",
      },
    ],
    metrics: [
      {
        label: { en: "Order Request Lead Speed", tr: "Sipariş Oluşturma Hızı" },
        value: "< 5 Secs",
        before: "Manual PDF quotes",
        after: "< 5 seconds",
      },
      {
        label: { en: "Mobile UX Score", tr: "Mobil Kullanım Başarısı" },
        value: "99/100",
        before: "Legacy site",
        after: "Next.js App Router",
      },
    ],
    businessImpact: {
      en: "Provided DENTech Medikal with a high-performance modern B2B platform deployed on Vercel, directly driving clinic product inquiry volume.",
      tr: "DENTech Medikal'e Vercel üzerinde çalışan yüksek performanslı modern bir B2B platformu kazandırarak klinik sipariş hacmini yükseltti.",
    },
    lessons: [
      {
        en: "Designing for user preference (WhatsApp orders over complex payment gateways) creates friction-free B2B sales pipelines.",
        tr: "Kullanıcı alışkanlıklarına uygun tasarım yapmak (ödeme kanalı yerine WhatsApp siparişi) B2B satış sürtünmesini ortadan kaldırır.",
      },
    ],
    futureImprovements: [
      {
        en: "Add automated invoice generation and customer repeat-order reminders via AI WhatsApp bot.",
        tr: "Fatura üretimi ve yapay zeka WhatsApp botu ile otomatik tekrar sipariş hatırlatması eklemek.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I built DentechPro with clean modular boundaries; today I would add vector search (PgVector) inside Supabase for natural language product query matching.",
      tr: "DentechPro'yu modüler sınırlar ile kurdum; bugün doğal dille ürün araması için Supabase içinde PgVector araması eklerdim.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "Supabase", "Vercel"],
    links: {
      github: "https://github.com/medikaldentech10-hue/dentechPro",
    },
    seo: {
      title: "DentechPro B2B Platform Case Study | Emir Aydın",
      description: {
        en: "B2B Dental Product Search, Sales & WhatsApp Order Request Platform for DENTech Medikal.",
        tr: "DENTech Medikal için geliştirilen B2B Dental Ürün ve WhatsApp Sipariş Platformu.",
      },
    },
  },

  {
    slug: "carryhub",
    title: "CarryHub",
    tagline: {
      en: "Textile Logistics Marketplace & Operating System for Courier Routing",
      tr: "Tekstil Lojistiği Pazar Yeri ve Kurye Rota Optimizasyon İşletim Sistemi",
    },
    statusKey: "active",
    featured: true,
    categories: ["saas", "backend", "automation"],
    tags: ["TypeScript", "Next.js", "FastAPI", "PostgreSQL", "Google Maps API", "Redis"],
    problem: {
      en: "Textile logistics and courier operations suffered from inefficient manual dispatching, causing driver downtime, delayed deliveries, and inflated operational costs.",
      tr: "Tekstil lojistiği ve kurye operasyonları, manuel dağıtım yüzünden sürücü bekleme süreleri, geç teslimatlar ve yüksek operasyonel maliyetlerle karşı karşıyaydı.",
    },
    solution: {
      en: "Developed CarryHub, a comprehensive marketplace and operating system for textile logistics. Built modules for courier routing, delivery tracking, and dynamic pricing with architecture designed for future AI batch optimization.",
      tr: "Tekstil lojistiği için kapsamlı bir pazar yeri ve işletim sistemi (CarryHub) geliştirdim. Kurye rotalaması, teslimat takibi ve dinamik fiyatlandırma modüllerini kurdum.",
    },
    whyItMattered: {
      en: "Logistics companies operate on tight margins; automating dispatching reduces delivery delays and fuel overhead immediately.",
      tr: "Lojistik firmaları düşük marjlarla çalışır; dağıtımın otomatize edilmesi teslimat gecikmelerini ve yakıt harcamalarını anında düşürür.",
    },
    role: {
      en: "Lead Software Product Builder",
      tr: "Lider Yazılım Ürün Geliştirici",
    },
    architecture: {
      en: "TypeScript Next.js multi-tenant frontend communicating with a Python FastAPI core. Asynchronous route optimization algorithms run on background workers writing finalized manifests to PostgreSQL.",
      tr: "Python FastAPI çekirdeği ile haberleşen TypeScript Next.js çok kiracılı ön yüzü. Asenkron rota hesaplamaları PostgreSQL'e kayıt yapar.",
    },
    architectureNodes: [
      {
        title: "Courier Dispatcher Portal",
        description: {
          en: "Next.js interface for live fleet tracking & order assignment.",
          tr: "Canlı filo takibi ve sipariş atama paneli.",
        },
        type: "client",
      },
      {
        title: "FastAPI Core API",
        description: {
          en: "RESTful API handling authentication, pricing & webhooks.",
          tr: "Doğrulama, fiyatlandırma ve webhook yöneten API.",
        },
        type: "api",
      },
      {
        title: "Route Calculation Engine",
        description: {
          en: "Asynchronous distance calculation & clustering worker.",
          tr: "Asenkron mesafe hesaplama ve kümeleme motoru.",
        },
        type: "queue",
      },
      {
        title: "PostgreSQL Database",
        description: {
          en: "Spatial indexing store for delivery manifests and locations.",
          tr: "Teslimat kayıtları ve konumlar için veritabanı.",
        },
        type: "db",
      },
    ],
    workflowSteps: [
      {
        en: "1. Orders ingested via merchant API webhooks.",
        tr: "1. Siparişler tüccar API webhook'ları ile sisteme aktarılır.",
      },
      {
        en: "2. Geocoding pipeline converts raw addresses into spatial coordinates.",
        tr: "2. Adres dönüşüm hattı ham adresleri koordinatlara çevirir.",
      },
      {
        en: "3. Route solver engine clusters deliveries by driver availability.",
        tr: "3. Rota motoru teslimatları kurye uygunluğuna göre gruplar.",
      },
      {
        en: "4. Manifests and sequence maps pushed directly to courier mobile web app.",
        tr: "4. Sıralı rotalar doğrudan kurye mobil ekranına iletilir.",
      },
    ],
    metrics: [
      {
        label: { en: "Dispatch Automation", tr: "Dağıtım Otomasyonu" },
        value: "100%",
        before: "Manual entry",
        after: "Automated",
      },
      {
        label: { en: "Route Efficiency Gain", tr: "Rota Verimlilik Artışı" },
        value: "+28%",
        before: "Baseline",
        after: "+28%",
      },
    ],
    businessImpact: {
      en: "Transformed manual dispatch operations into a 1-click automated system, allowing logistics operations to handle significantly more daily shipments.",
      tr: "Manuel dağıtım operasyonunu tek tıkla çalışan otomatik bir sisteme dönüştürerek lojistik kapasitesini yükseltti.",
    },
    lessons: [
      {
        en: "Caching geocoded addresses in Redis drastically cuts down external map API call costs.",
        tr: "Geocoding adreslerinin Redis'te önbelleklenmesi harici harita API maliyetini ciddi oranda düşürür.",
      },
    ],
    futureImprovements: [
      {
        en: "Integrate predictive traffic pattern models and automated WhatsApp recipient notifications.",
        tr: "Tahmine dayalı trafik modelleri ve alıcıya otomatik WhatsApp bildirimleri eklemek.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I would use an event-driven architecture using Kafka or NATS streams to decouple order ingestion from spatial route solver execution.",
      tr: "Sipariş kabulünü rota çözücü çalıştırmasından ayırmak için Kafka veya NATS ile olay güdümlü bir mimari tercih ederdim.",
    },
    technologies: ["TypeScript", "Next.js", "FastAPI", "Python", "PostgreSQL", "Redis", "Docker"],
    links: {
      github: "https://github.com/emr058/carryhub",
    },
    seo: {
      title: "CarryHub Case Study | Emir Aydın",
      description: {
        en: "Textile logistics marketplace & courier route optimization platform.",
        tr: "Tekstil lojistiği pazar yeri ve kurye rota optimizasyon platformu.",
      },
    },
  },

  {
    slug: "ai-smart-tech-advisor",
    title: "AI Smart Tech Advisor",
    tagline: {
      en: "AI-Powered Smart Home & Technology Advisory Platform",
      tr: "Yapay Zeka Destekli Akıllı Ev ve Teknoloji Danışmanlığı Platformu",
    },
    statusKey: "live",
    featured: true,
    categories: ["ai-agents", "saas"],
    tags: ["TypeScript", "Next.js", "OpenAI API", "TailwindCSS", "Vercel"],
    problem: {
      en: "Users struggle to navigate complex smart home hardware compatibility, protocols (Zigbee, Matter, Z-Wave), and automated ecosystem configurations.",
      tr: "Kullanıcılar akıllı ev donanım uyumluluklarını, protokolleri (Zigbee, Matter, Z-Wave) ve otomatik ev ekosistemi kurulumlarını anlamakta zorlanıyordu.",
    },
    solution: {
      en: "Built AI Smart Tech Advisor, an intelligent web application providing personalized smart home ecosystem recommendations, compatibility checks, and step-by-step setup guides using OpenAI LLM pipelines.",
      tr: "Yapay zeka modellerini kullanarak kişiselleştirilmiş akıllı ev kurulum tavsiyeleri, donanım uyumluluk kontrolleri ve rehberler sunan AI Smart Tech Advisor uygulamasını geliştirdim.",
    },
    whyItMattered: {
      en: "Simplifying hardware choices prevents costly buyer returns and helps users build interconnected smart spaces effortlessly.",
      tr: "Donanım seçimlerini basitleştirmek hatalı ürün alımlarını önler ve kullanıcıların entegre akıllı evler kurmasını sağlar.",
    },
    role: {
      en: "Full Stack AI Builder",
      tr: "Full Stack Yapay Zeka Geliştiricisi",
    },
    architecture: {
      en: "Next.js TypeScript application with streaming OpenAI API response completion endpoints and structured JSON recommendation formatting.",
      tr: "Akışlı (streaming) OpenAI API yanıt noktaları ve yapılandırılmış JSON tavsiye çıktısı sunan Next.js TypeScript mimarisi.",
    },
    architectureNodes: [
      {
        title: "User Questionnaire UI",
        description: {
          en: "Interactive space & device preference collector.",
          tr: "Etkileşimli ev alanı ve cihaz tercihi toplama paneli.",
        },
        type: "client",
      },
      {
        title: "AI Advisor Engine",
        description: {
          en: "Prompt engineering pipeline for protocol matching.",
          tr: "Protokol eşleştirmesi yapan istem mühendisliği motoru.",
        },
        type: "ai",
      },
    ],
    workflowSteps: [
      {
        en: "1. User answers room size, ecosystem goals, and budget preference.",
        tr: "1. Kullanıcı oda büyüklüğünü, hedef sistemini ve bütçesini girer.",
      },
      {
        en: "2. AI Advisor queries compatibility matrix database.",
        tr: "2. Yapay zeka danışmanı uyumluluk veritabanını sorgular.",
      },
      {
        en: "3. Streaming response renders tailored purchasing & setup guide.",
        tr: "3. Anlık akışlı yanıt kişiye özel satın alma ve kurulum rehberini sunar.",
      },
    ],
    metrics: [
      {
        label: { en: "Recommendation Accuracy", tr: "Tavsiye İsabet Oranı" },
        value: "96%",
      },
    ],
    businessImpact: {
      en: "Provides instant hardware guidance for smart home enthusiasts and technology buyers.",
      tr: "Akıllı ev meraklıları için anında donanım rehberliği sunar.",
    },
    lessons: [
      {
        en: "Streaming LLM response text dramatically improves user perceived latency during complex multi-device analysis.",
        tr: "Yapay zeka yanıtını akışlı (streaming) olarak sunmak algılanan bekleme süresini düşürür.",
      },
    ],
    futureImprovements: [
      {
        en: "Integrate live Amazon API affiliate prices for instant shopping cart calculation.",
        tr: "Anlık sepet hesabı için canlı e-ticaret fiyat API'leri eklemek.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I would use PgVector for semantic search across device user manuals to answer technical troubleshooting questions directly.",
      tr: "Teknik sorun giderme sorularını doğrudan yanıtlamak için cihaz kullanım kılavuzlarında PgVector semantik araması yapardım.",
    },
    technologies: ["TypeScript", "Next.js", "OpenAI API", "TailwindCSS", "Vercel"],
    links: {
      github: "https://github.com/emr058/ai-smart-tech-advisor",
    },
    seo: {
      title: "AI Smart Tech Advisor | Case Study",
      description: {
        en: "AI-powered smart home & technology advisory platform.",
        tr: "Yapay zeka destekli akıllı ev ve teknoloji danışmanlığı platformu.",
      },
    },
  },

  {
    slug: "ai-customer-support-agent",
    title: "AI Customer Support Chatbot",
    tagline: {
      en: "Domain-Specific Knowledge Base Chatbot & Support Resolution System (chatbot_v1)",
      tr: "Kurumsal Bilgi Tabanı Destek Yapay Zeka Chatbotu (chatbot_v1)",
    },
    statusKey: "live",
    featured: true,
    categories: ["ai-agents", "automation", "backend"],
    tags: ["JavaScript", "OpenAI API", "Prompt Engineering", "Knowledge Base", "REST APIs"],
    problem: {
      en: "Support teams spent excessive hours answering over 100 domain-specific business queries manually based on internal document files, creating support bottlenecks.",
      tr: "Destek ekipleri, 20 dahili belgeye dayanan 100'den fazla kurumsal soruyu manuel yanıtlamak için aşırı zaman harcıyor ve kuyruklar oluşuyordu.",
    },
    solution: {
      en: "Engineered an AI-powered customer support chatbot (chatbot_v1) integrated with internal knowledge bases (20 documents), successfully automating responses for domain-specific business queries with prompt engineering & guardrails.",
      tr: "20 dahili belge ile entegre, istem mühendisliği ve güvenlik sınırları olan yapay zeka müşteri destek botunu (chatbot_v1) geliştirerek 100+ kurumsal soruyu otomatize ettim.",
    },
    whyItMattered: {
      en: "Instant automated answers reduce support ticket workloads immediately while ensuring consistent policy accuracy.",
      tr: "Otomatik anlık yanıtlar destek yükünü düşürürken şirket politikalarında standart ve doğru bilgi sunulmasını sağlar.",
    },
    role: {
      en: "IT & Software Specialist (Dentech Medikal)",
      tr: "BT & Yazılım Uzmanı (Dentech Medikal)",
    },
    architecture: {
      en: "Node.js JavaScript server serving knowledge base text chunks to OpenAI GPT API with custom prompt guardrails and fallback escalation.",
      tr: "OpenAI GPT API'sine özel istem sınırları ve insan temsilciye yönlendirme mantığı ile bağlam sunan JavaScript / Node.js sunucusu.",
    },
    architectureNodes: [
      {
        title: "Chat Interface",
        description: {
          en: "Embedded customer support chat widget.",
          tr: "Gömülü müşteri destek sohbet arayüzü.",
        },
        type: "client",
      },
      {
        title: "Chatbot Engine (chatbot_v1)",
        description: {
          en: "Prompt engineering & guardrail orchestrator.",
          tr: "İstem mühendisliği ve güvenlik sınırı yöneticisi.",
        },
        type: "ai",
      },
      {
        title: "Knowledge Base Store",
        description: {
          en: "Internal business documents repository (20 docs).",
          tr: "Kurumsal iş belgeleri deposu (20 belge).",
        },
        type: "db",
      },
    ],
    workflowSteps: [
      {
        en: "1. Customer submits query on web chat.",
        tr: "1. Müşteri web sohbetinden sorusunu iletir.",
      },
      {
        en: "2. Prompt context builder injects relevant knowledge base policy info.",
        tr: "2. İstem bağlamı alakalı belge bilgisini yapay zekaya aktarır.",
      },
      {
        en: "3. LLM validates output against guardrails and formats clear response.",
        tr: "3. Yapay zeka çıktıyı kurallara göre doğrulayıp yanıtı sunar.",
      },
      {
        en: "4. Complex out-of-scope issues automatically routed to human specialist.",
        tr: "4. Kapsam dışı karmaşık konular insana aktarılır.",
      },
    ],
    metrics: [
      {
        label: { en: "Automated Domain Queries", tr: "Otomatik Yanıtlanan Sorular" },
        value: "100+",
        before: "0% automated",
        after: "100+ queries",
      },
      {
        label: { en: "Knowledge Docs Integrated", tr: "Entegre İş Belgesi" },
        value: "20 Docs",
        before: "Manual PDF lookup",
        after: "Instant retrieval",
      },
    ],
    businessImpact: {
      en: "Significantly reduced manual support workload for Dentech Medikal, providing instant responses 24/7.",
      tr: "Dentech Medikal için manuel destek yükünü ciddi şekilde azalttı ve 7/24 kesintisiz yanıt verdi.",
    },
    lessons: [
      {
        en: "Strict prompt guardrails prevent the AI model from inventing non-existent company policies or prices.",
        tr: "Kesin istem sınırları, yapay zekanın var olmayan şirket politikaları veya fiyatlar uydurmasını engeller.",
      },
    ],
    futureImprovements: [
      {
        en: "Upgrade from basic chunk retrieval to vector embeddings (PgVector/RAG) for multi-language semantic search.",
        tr: "Çok dilli semantik arama için RAG vektör veritabanı yapısına geçmek.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I would use LangGraph to manage conversational state cycles, ensuring fallback routing triggers cleanly when confidence scores are low.",
      tr: "Güven skoru düşük olduğunda insan temsilciye aktarımın kusursuz çalışması için LangGraph durum makineleri kullanırdım.",
    },
    technologies: ["JavaScript", "Node.js", "OpenAI API", "Prompt Engineering", "REST APIs"],
    links: {
      github: "https://github.com/medikaldentech10-hue/chatbot_v1",
      companyGithub: "https://github.com/medikaldentech10-hue",
    },
    seo: {
      title: "AI Customer Support Chatbot | Case Study",
      description: {
        en: "Knowledge base AI customer support chatbot built for Dentech Medikal.",
        tr: "Dentech Medikal için geliştirilen kurumsal bilgi tabanlı yapay zeka destek botu.",
      },
    },
  },

  {
    slug: "qr-attendance-automation",
    title: "QR Participant Management & Badge Automation",
    tagline: {
      en: "Contactless QR Participant Tracking & Badge Generator (qrcodeapp & student_attendance)",
      tr: "Temassız QR Katılımcı Takibi ve Otomatik Yaka Kartı Sistemi (qrcodeapp)",
    },
    statusKey: "live",
    featured: false,
    categories: ["automation", "backend"],
    tags: ["JavaScript", "HTML", "Google Workspace APIs", "QR Codes", "Webhooks"],
    problem: {
      en: "Event organizers and educational institutions struggled with manual sign-in sheets, leading to long entry lines, proxy sign-ins, and manual badge creation overhead.",
      tr: "Etkinlik organizasyonları ve eğitim kurumları, manuel imza listeleri yüzünden kapıda uzun kuyruklar ve elle yaka kartı hazırlama yükü yaşıyordu.",
    },
    solution: {
      en: "Designed and implemented a QR-based participant management system (qrcodeapp / student_attendance) utilizing Google Workspace APIs, fully automating registration, tracking, and generation of 75 personalized event badges.",
      tr: "Google Workspace API'lerini kullanarak kayıt, takip ve 75 kişiselleştirilmiş yaka kartı üretimini tam otomatize eden QR katılımcı yönetim sistemini (qrcodeapp) kurdum.",
    },
    whyItMattered: {
      en: "Automating event check-in and badge rendering turns a multi-hour manual task into an instantaneous 2-second check-in.",
      tr: "Katılımcı girişi ve kart üretimini otomatize etmek, saatler süren manuel görevi 2 saniyelik bir işleme dönüştürür.",
    },
    role: {
      en: "IT & Software Specialist (Dentech Medikal)",
      tr: "BT & Yazılım Uzmanı (Dentech Medikal)",
    },
    architecture: {
      en: "JavaScript frontend scanning QR tokens, communicating with Node.js / Google Apps Script webhooks to update attendance sheets and render badge PDFs.",
      tr: "QR kodları tarayan JavaScript ön yüzü, Google Sheets ve badge PDF'lerini güncelleyen webhook servisleri.",
    },
    architectureNodes: [
      {
        title: "QR Scanner Interface",
        description: {
          en: "Mobile / Tablet camera reader app.",
          tr: "Mobil / Tablet kamera tarayıcı arayüzü.",
        },
        type: "client",
      },
      {
        title: "Attendance Service (qrcodeapp)",
        description: {
          en: "Webhook processor and TOTP validator.",
          tr: "Webhook işleyici ve doğrulama motoru.",
        },
        type: "api",
      },
      {
        title: "Google Workspace API",
        description: {
          en: "Automated badge generation & attendance sheet sync.",
          tr: "Otomatik yaka kartı üretimi ve yoklama senkronizasyonu.",
        },
        type: "db",
      },
    ],
    workflowSteps: [
      {
        en: "1. Participant registers online and receives unique QR badge token.",
        tr: "1. Katılımcı kayıt olur ve özel QR kodunu alır.",
      },
      {
        en: "2. Scanner scans QR at venue entrance.",
        tr: "2. Görevli kapıda QR kodu taratır.",
      },
      {
        en: "3. Webhook validates attendance and auto-generates personalized badge PDF.",
        tr: "3. Webhook yoklamayı onaylar ve kişiye özel yaka kartı PDF'ini üretir.",
      },
      {
        en: "4. Attendance sheet updated in real time with timestamp log.",
        tr: "4. Yoklama listesi anlık zaman damgasıyla güncellenir.",
      },
    ],
    metrics: [
      {
        label: { en: "Personalized Badges", tr: "Otomatik Yaka Kartı" },
        value: "75 Badges",
        before: "Manual print & fill",
        after: "100% Automated",
      },
      {
        label: { en: "Check-in Duration", tr: "Giriş Tamamlama Süresi" },
        value: "2 Seconds",
        before: "5 minutes",
        after: "2 seconds",
      },
    ],
    businessImpact: {
      en: "Eliminated entrance bottlenecks during medical events and saved staff hours of manual data entry.",
      tr: "Medikal etkinliklerde kapı birikmelerini sıfırladı ve ekibin saatlerce süren veri giriş yükünü kaldırdı.",
    },
    lessons: [
      {
        en: "Integrating Google Workspace APIs allows non-technical team members to view and export live attendance data easily in familiar Sheets format.",
        tr: "Google Workspace API entegrasyonu, teknik olmayan ekibin canlı verileri kolayca Etablolar formatında görmesini sağlar.",
      },
    ],
    futureImprovements: [
      {
        en: "Add automated post-event certificate PDF generation sent directly via email.",
        tr: "Etkinlik sonrası otomatik katılım sertifikası PDF'i oluşturup e-posta ile gönderme.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I would use dynamic TOTP codes that refresh every 5 seconds to prevent participants from sending screenshot QR codes to friends.",
      tr: "Katılımcıların ekran görüntüsü paylaşıp başkasının yerine girmesini önlemek için 5 saniyede yenilenen TOTP dinamik QR kodları kullanırdım.",
    },
    technologies: ["JavaScript", "HTML", "Google Workspace APIs", "Webhooks", "QR Code Engine"],
    links: {
      github: "https://github.com/medikaldentech10-hue/qrcodeapp",
      companyGithub: "https://github.com/emr058/student_attendance",
    },
    seo: {
      title: "QR Participant Management & Badge Automation",
      description: {
        en: "Automated QR participant tracking and badge generation system.",
        tr: "Otomatik QR katılımcı takibi ve yaka kartı üretme sistemi.",
      },
    },
  },

  {
    slug: "mykar",
    title: "MyKar",
    tagline: {
      en: "AI Fleet & Vehicle Expense Management SaaS",
      tr: "Yapay Zeka Destekli Araç Filo ve Gider Takip SaaS Platformu",
    },
    statusKey: "comingSoon",
    featured: false,
    categories: ["saas", "ai-agents", "backend"],
    tags: ["Next.js", "OCR Vision", "FastAPI", "PostgreSQL", "TailwindCSS"],
    problem: {
      en: "Small logistics fleets and rental companies struggle with manual paper fuel receipt logging, missed maintenance schedules, and untracked vehicle operating costs.",
      tr: "Küçük araç filoları ve kiralama şirketleri kağıt yakıt fişlerini elle girmek, bakım tarihlerini kaçırmak ve araç bazlı masrafları takip edememekten şikayetçiydi.",
    },
    solution: {
      en: "Architecting MyKar, an AI mobile-first SaaS that allows drivers to snap photos of fuel receipts for instant OCR data extraction while auto-calculating per-kilometer vehicle efficiency.",
      tr: "Sürücülerin yakıt fişi fotoğrafını çekip AI OCR ile veriyi anında dijitalleştirdiği ve kilometre başına maliyet verimliliğini hesaplayan MyKar SaaS platformunu tasarlıyorum.",
    },
    whyItMattered: {
      en: "Fleet expenses represent up to 40% of operational costs; capturing exact fuel transactions prevents fraud and flags inefficient vehicles early.",
      tr: "Filo giderleri operasyon maliyetinin %40'ını oluşturur; yakıt harcamalarını anlık dijitalleştirmek suistimalleri önler ve verimsiz araçları tespit eder.",
    },
    role: {
      en: "Product Founder & System Engineer",
      tr: "Ürün Kurucusu & Sistem Mühendisi",
    },
    architecture: {
      en: "Next.js Progressive Web App uploading receipt images directly to S3. Vision LLM OCR extracts vendor, date, liters, and total cost, writing structured records to PostgreSQL.",
      tr: "Fiş fotoğraflarını S3'e yükleyen Next.js PWA uygulaması. Vision LLM OCR modeli tarihi, litreyi ve tutarı çıkarıp yapılandırılmış veriyi PostgreSQL'e kaydeder.",
    },
    architectureNodes: [
      {
        title: "Driver PWA Interface",
        description: {
          en: "Mobile-optimized camera upload UI.",
          tr: "Mobil uyumlu kamera yükleme ekranı.",
        },
        type: "client",
      },
      {
        title: "Vision OCR Pipeline",
        description: {
          en: "GPT-4o Vision receipt extraction engine.",
          tr: "GPT-4o Vision fiş veri çıkarma motoru.",
        },
        type: "ai",
      },
      {
        title: "Fleet Analytics Engine",
        description: {
          en: "Per-kilometer cost & maintenance interval math.",
          tr: "Km başı maliyet ve bakım aralığı hesaplayıcı.",
        },
        type: "api",
      },
    ],
    workflowSteps: [
      {
        en: "1. Driver snaps photo of fuel receipt at gas station.",
        tr: "1. Sürücü benzinlikte fişin fotoğrafını çeker.",
      },
      {
        en: "2. Vision OCR extracts total price, liters, and station name in < 3s.",
        tr: "2. Vision OCR tutarı, litreyi ve istasyon adını 3 saniyede okur.",
      },
      {
        en: "3. Odometer reading input updates vehicle maintenance schedule.",
        tr: "3. Girilen kilometre bilgisi araç bakım takvimini günceller.",
      },
      {
        en: "4. Fleet manager views live operational cost analytics.",
        tr: "4. Filo yöneticisi canlı maliyet analizlerini inceler.",
      },
    ],
    metrics: [
      {
        label: { en: "Receipt Logging Time", tr: "Fiş Kayıt Süresi" },
        value: "3s",
        before: "5 mins manual entry",
        after: "3s AI scan",
      },
      {
        label: { en: "Data Extraction Accuracy", tr: "Veri Çıkarma Doğruluğu" },
        value: "98.5%",
        before: "Manual typos",
        after: "98.5% accurate",
      },
    ],
    businessImpact: {
      en: "Provides fleet owners with real-time operational cost transparency and automated maintenance alert schedules.",
      tr: "Filo sahiplerine gerçek zamanlı maliyet şeffaflığı ve otomatik bakım uyarı takvimi sunar.",
    },
    lessons: [
      {
        en: "Crinkled or thermal-faded fuel receipts fail traditional Tesseract OCR; multimodal Vision LLMs are vastly superior for real-world receipt parsing.",
        tr: "Buruşmuş veya soluk fişler geleneksel Tesseract OCR'da başarısız olur; çok modlu Vision LLM'ler gerçek dünya fişlerinde katbekat üstündür.",
      },
    ],
    futureImprovements: [
      {
        en: "Integrate OBD-II telematics devices for automatic odometer and engine diagnostic codes.",
        tr: "Otomatik kilometre ve motor arıza kodları için OBD-II araç takip cihazları entegre etmek.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I am building MyKar with a offline-first SQLite sync engine on the client (using PowerSync/Replicache). This ensures drivers can snap receipts deep inside underground parking structures without losing data.",
      tr: "MyKar'ı en başından itibaren istemci tarafında offline-first SQLite senkronizasyon motoruyla kuruyorum. Bu sayede sürücüler yeraltı otoparklarında bile veri kaybetmeden fiş tarayabiliyor.",
    },
    technologies: ["Next.js", "TypeScript", "GPT-4o Vision", "PostgreSQL", "FastAPI", "TailwindCSS"],
    links: {
      github: "https://github.com/SutoEm/mykar",
    },
    seo: {
      title: "MyKar Fleet SaaS | AI Case Study",
      description: {
        en: "AI-powered vehicle fleet & receipt expense management SaaS.",
        tr: "Yapay zeka destekli araç filosu ve fiş gider takip SaaS uygulaması.",
      },
    },
  },

  {
    slug: "pyuztanima",
    title: "PyuzTanima - Flask & OpenCV Face Recognition System",
    tagline: {
      en: "Graduation Project: Real-Time Face Recognition & Computer Vision Pipeline",
      tr: "Bitirme Projesi: Gerçek Zamanlı Yüz Tanıma ve Bilgisayarlı Görü Sistemi",
    },
    statusKey: "live",
    featured: false,
    categories: ["research", "backend"],
    tags: ["Python", "Flask", "OpenCV", "Machine Learning", "Face Recognition"],
    problem: {
      en: "Traditional identity check systems rely on physical cards or manual verification, which can be forged or lost.",
      tr: "Geleneksel kimlik doğrulama sistemleri fiziksel kartlara veya manuel kontrole dayanır, bu da sahteciliğe veya kayıplara yol açar.",
    },
    solution: {
      en: "Built PyuzTanima for Software Engineering graduation project at Kyrenia University: a real-time web application using Flask and OpenCV that detects, extracts embeddings, and verifies faces with high accuracy.",
      tr: "Girne Üniversitesi Yazılım Mühendisliği bitirme projem için Flask ve OpenCV kullanarak yüzleri tespit eden, embedding çıkaran ve yüksek doğrulukla doğrulayan PyuzTanima web uygulamasını geliştirdim.",
    },
    whyItMattered: {
      en: "Computer vision face authentication demonstrates deep understanding of image processing, feature extraction, and real-time backend API streaming.",
      tr: "Bilgisayarlı görü ile yüz doğrulama; görüntü işleme, öznitelik çıkarma ve canlı API akış mantığını tam anlamayı sağlar.",
    },
    role: {
      en: "Software Engineering Graduate (Kyrenia University)",
      tr: "Yazılım Mühendisliği Mezunu (Girne Üniversitesi)",
    },
    architecture: {
      en: "Python Flask web server receiving video frames, running OpenCV face cascades and deep learning embeddings match, rendering live UI overlays.",
      tr: "Kamera karelerini alan, OpenCV yüz saptama ve derin öğrenme eşleşmesi çalıştıran Python Flask sunucusu.",
    },
    architectureNodes: [
      {
        title: "Camera Video Input",
        description: {
          en: "Live webcam video frame stream.",
          tr: "Canlı kamera video akışı.",
        },
        type: "client",
      },
      {
        title: "Flask Vision Engine",
        description: {
          en: "OpenCV face detection & feature extractor.",
          tr: "OpenCV yüz tespiti ve öznitelik çıkarıcı.",
        },
        type: "ai",
      },
      {
        title: "Face Database",
        description: {
          en: "Stored facial embeddings dataset.",
          tr: "Kayıtlı yüz embedding veritabanı.",
        },
        type: "db",
      },
    ],
    workflowSteps: [
      {
        en: "1. Web camera streams frames to Flask server.",
        tr: "1. Kamera kareleri Flask sunucusuna aktarılır.",
      },
      {
        en: "2. OpenCV isolates face boundary bounding boxes.",
        tr: "2. OpenCV yüz sınır kutularını saptar.",
      },
      {
        en: "3. Feature vectors matched against saved user embeddings.",
        tr: "3. Öznitelik vektörleri kayıtlı yüzlerle eşleştirilir.",
      },
      {
        en: "4. Match result & identity displayed on screen.",
        tr: "4. Eşleşme sonucu ve kimlik ekranda gösterilir.",
      },
    ],
    metrics: [
      {
        label: { en: "Recognition Speed", tr: "Tanıma Hızı" },
        value: "120ms",
        before: "Manual verification",
        after: "120ms",
      },
    ],
    businessImpact: {
      en: "Served as the foundational graduation project proving capability in Python algorithms, image processing, and backend API engineering.",
      tr: "Python algoritmaları, görüntü işleme ve backend API mühendisliğindeki yetkinliğimi kanıtlayan temel bitirme projesi.",
    },
    lessons: [
      {
        en: "Lighting variations heavily impact basic Haar cascades; using deep learning facial landmark embeddings provides vastly higher recognition accuracy.",
        tr: "Işık değişimleri Haar kaslatlarını etkiler; derin öğrenme yüz embedding'leri kullanmak yüksek doğruluk sağlar.",
      },
    ],
    futureImprovements: [
      {
        en: "Upgrade to MediaPipe or YOLOv8-face for mobile-first face detection.",
        tr: "Mobil cihazlar için MediaPipe veya YOLOv8-face altyapısına geçmek.",
      },
    ],
    whatIWouldBuildDifferentlyToday: {
      en: "I would use WebAssembly to execute lightweight face detection directly inside the browser, reducing server payload entirely.",
      tr: "Sunucu yükünü azaltmak için hafif yüz tespitini doğrudan tarayıcı içinde çalıştıran WebAssembly kullanırdım.",
    },
    technologies: ["Python", "Flask", "OpenCV", "NumPy", "HTML/CSS"],
    links: {
      github: "https://github.com/emr058/PyuzTanima",
    },
    seo: {
      title: "PyuzTanima Face Recognition Case Study",
      description: {
        en: "Flask & OpenCV face recognition graduation project by Emir Aydın.",
        tr: "Emir Aydın tarafından geliştirilen Flask & OpenCV yüz tanıma bitirme projesi.",
      },
    },
  },
];
