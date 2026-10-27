type Text = { tr: string; en: string };

export interface StackItem {
  name: string;
  note: Text;
  learning?: boolean;
}

export interface StackGroup {
  title: Text;
  items: StackItem[];
}

export const stackGroups: StackGroup[] = [
  {
    title: { tr: "Web ve arayüz", en: "Web and front end" },
    items: [
      { name: "Next.js · React", note: { tr: "Telefon servis ve satış sitesi, bu portfolyo.", en: "The phone shop website and this portfolio." } },
      { name: "TypeScript · JavaScript", note: { tr: "Web projeleri, QR katılımcı sistemi.", en: "Web projects and the QR attendee system." } },
      { name: "Vue · HTML · CSS", note: { tr: "Üniversite ve staj projeleri.", en: "University and internship projects." } },
    ],
  },
  {
    title: { tr: "Sunucu ve veri", en: "Back end and data" },
    items: [
      { name: "Java · Spring Boot", note: { tr: "32bit stajında e-ticaret projesinin sunucu tarafı.", en: "Back end of an e-commerce project during my 32bit internship." } },
      { name: "Python · Flask", note: { tr: "Altyazı otomasyonu, yüz tanıma bitirme projesi, Novelty AI stajı.", en: "Subtitle automation, my face recognition graduation project and the Novelty AI internship." } },
      { name: "Node.js · REST API", note: { tr: "Destek botu ve servis bağlantıları.", en: "The support bot and service integrations." } },
      { name: "PostgreSQL · Supabase · MySQL", note: { tr: "Ürün, sipariş ve servis kayıtları; satır bazlı erişim kuralları.", en: "Product, order and repair records, with row-level access rules." } },
    ],
  },
  {
    title: { tr: "Yapay zeka ve otomasyon", en: "AI and automation" },
    items: [
      { name: "OpenAI API · Google Gemini API", note: { tr: "Destek botu ve metin işleme otomasyonları.", en: "The support bot and text processing automation." } },
      { name: "RAG", note: { tr: "20 şirket belgesinden yanıt veren destek botu.", en: "A support bot answering from 20 company documents." } },
      { name: "OpenCV", note: { tr: "Yüz tanıma ile yoklama sistemi.", en: "Attendance tracking with face recognition." } },
      { name: "Google Workspace API", note: { tr: "QR yaka kartı ve katılımcı kayıtları.", en: "QR badges and attendee records." } },
    ],
  },
  {
    title: { tr: "Geliştirme araçları", en: "Development tools" },
    items: [
      { name: "Claude Code · Codex", note: { tr: "Planlama, kod inceleme ve test yazımında yardımcı olarak kullanıyorum; her değişikliği kendim okuyup test ediyorum.", en: "I use them as assistants for planning, code review and writing tests; I read and test every change myself." } },
      { name: "Hermes Agent", note: { tr: "Kendi bilgisayarımda çalışan ajan denemeleri.", en: "Experiments with agents running on my own machine." }, learning: true },
      { name: "Git · GitHub · Postman", note: { tr: "Sürüm takibi ve API testleri.", en: "Version control and API testing." } },
      { name: "Vercel", note: { tr: "Sitelerin yayına alınması.", en: "Deploying websites." } },
      { name: "Docker · GitHub Actions", note: { tr: "Kurulum ve otomatik testleri öğreniyorum.", en: "Learning containers and automated testing." }, learning: true },
    ],
  },
  {
    title: { tr: "Güvenlik", en: "Security" },
    items: [
      { name: "gitleaks · Semgrep", note: { tr: "Her commit öncesi gizli anahtar ve kod taraması.", en: "Secret and code scanning before every commit." } },
      { name: "Zod", note: { tr: "Formlardan ve API'den gelen verinin sunucuda doğrulanması.", en: "Server-side validation of form and API input." } },
    ],
  },
];
