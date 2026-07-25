export interface Principle {
  id: string;
  number: string;
  title: {
    en: string;
    tr: string;
  };
  description: {
    en: string;
    tr: string;
  };
  iconName: string;
}

export const engineeringPrinciples: Principle[] = [
  {
    id: "eliminate-repetitive",
    number: "01",
    title: {
      en: "Eliminate repetitive work.",
      tr: "Tekrarlayan işleri yok et.",
    },
    description: {
      en: "If a human repeats a digital task more than three times, it should be automated with code or AI.",
      tr: "Eğer bir insan dijital bir görevi üç defadan fazla tekrarlıyorsa, kod veya AI ile otomatize edilmelidir.",
    },
    iconName: "Zap",
  },
  {
    id: "be-measurable",
    number: "02",
    title: {
      en: "Be measurable.",
      tr: "Ölçülebilir ol.",
    },
    description: {
      en: "Engineering quality is judged by real business impact, latency reduction, cost savings, and operational speed.",
      tr: "Mühendislik kalitesi gerçek iş etkisi, gecikme süresinde azalma, maliyet tasarrufu ve operasyonel hız ile ölçülür.",
    },
    iconName: "BarChart3",
  },
  {
    id: "be-maintainable",
    number: "03",
    title: {
      en: "Be maintainable.",
      tr: "Sürdürülebilir ol.",
    },
    description: {
      en: "Clean architecture, modular decoupling, and strong type safety outlive clever hacks and tech debt.",
      tr: "Temiz mimari, modüler yapı ve güçlü tip güvenliği geçici pratik çözümlerden ve teknik borçlardan uzun yaşar.",
    },
    iconName: "ShieldCheck",
  },
  {
    id: "be-simple",
    number: "04",
    title: {
      en: "Be simple.",
      tr: "Basit ol.",
    },
    description: {
      en: "Avoid over-engineering. Choose the simplest architecture that solves the problem reliably without hidden complexity.",
      tr: "Gereksiz karmaşıklıktan kaçın. Problemi gizli karmaşıklıklar yaratmadan en sağlam çözen en basit mimariyi seç.",
    },
    iconName: "Maximize2",
  },
  {
    id: "solve-business-problems-first",
    number: "05",
    title: {
      en: "Solve business problems first.",
      tr: "Önce iş problemini çöz.",
    },
    description: {
      en: "Technology is a vehicle. The ultimate destination is solving human, customer, and operational pain points.",
      tr: "Teknoloji bir araçtır. Asıl hedef insani, müşteri odaklı ve operasyonel sorunları çözmektir.",
    },
    iconName: "Target",
  },
];
