// Hizmet fiyatlarının tek kaynağı. Sayfalar, karşılaştırma tablosu, WhatsApp mesajları
// ve başvuru formu buradan okur; fiyat değişince yalnız bu dosya düzenlenir.

export type PriceRange = { min: number; max?: number };

const dot = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const formatTL = (n: number) => `${dot(n)} TL`;
export const formatRange = (r: PriceRange) => (r.max ? `${dot(r.min)}–${dot(r.max)} TL` : formatTL(r.min));

export const campaign = {
  label: "İlk 10 müşteri",
  seats: 10,
  note: "Kampanya fiyatı ilk 10 müşteri için geçerlidir.",
} as const;

export type PackageId = "baslangic" | "profesyonel";

export interface WebPackage {
  id: PackageId;
  name: string;
  pages: string;
  normal: PriceRange;
  campaign: PriceRange;
  features: string[];
}

export const websitePackages: WebPackage[] = [
  {
    id: "baslangic",
    name: "Başlangıç Web Sitesi",
    pages: "4–5 sayfa",
    normal: { min: 10000 },
    campaign: { min: 5000 },
    features: [
      "Mobil uyumlu tasarım",
      "Basit logo ve görsel düzen",
      "İletişim ve WhatsApp bağlantısı",
      "Basit yönetim paneli",
      "Temel teknik SEO",
    ],
  },
  {
    id: "profesyonel",
    name: "Profesyonel Web Sitesi",
    pages: "7–12 sayfa",
    normal: { min: 15000, max: 20000 },
    campaign: { min: 7500, max: 10000 },
    features: [
      "Markaya özel tasarım",
      "Gelişmiş yönetim paneli",
      "Ürün ve hizmet yönetimi",
      "Blog / haber alanı",
      "İletişim formları",
      "Temel teknik SEO ve analitik",
    ],
  },
];

// Paket karşılaştırma satırları: yalnız iki paketin de değerinin bilindiği alanlar.
export const comparisonRows: { label: string; baslangic: string; profesyonel: string }[] = [
  { label: "Sayfa sayısı", baslangic: "4–5", profesyonel: "7–12" },
  { label: "Mobil uyumlu tasarım", baslangic: "Var", profesyonel: "Var" },
  { label: "Tasarım", baslangic: "Basit logo ve görsel düzen", profesyonel: "Markaya özel" },
  { label: "Yönetim paneli", baslangic: "Basit", profesyonel: "Gelişmiş" },
  { label: "Ürün ve hizmet yönetimi", baslangic: "Yok", profesyonel: "Var" },
  { label: "Blog / haber alanı", baslangic: "Yok", profesyonel: "Var" },
  { label: "İletişim", baslangic: "İletişim ve WhatsApp bağlantısı", profesyonel: "İletişim formları" },
  { label: "SEO", baslangic: "Temel teknik SEO", profesyonel: "Temel teknik SEO ve analitik" },
];

export const industrial = {
  id: "sanayi",
  name: "Sanayi Web Sitesi",
  from: { min: 15000, max: 25000 } as PriceRange,
  audience: ["CNC torna", "CNC freze", "Makine imalatı", "Üretim işletmeleri"],
  features: [
    { title: "Makine parkuru", text: "Tezgâhlarınızın marka, model ve işleme ölçüleri." },
    { title: "Üretim kabiliyetleri", text: "İşleyebildiğiniz malzemeler, toleranslar ve adet aralıkları." },
    { title: "Hizmet sayfaları", text: "Torna, freze gibi her hizmet için ayrı sayfa." },
    { title: "Ürün ve parça galerisi", text: "Ürettiğiniz parçaların fotoğrafları." },
    { title: "Teknik çizim yükleme", text: "Müşteri çizimini talep formuna ekler." },
    { title: "Teklif talep formu", text: "Parça, adet ve istenen teslim tarihi size ulaşır." },
    { title: "WhatsApp iletişimi", text: "Tek dokunuşla hazır mesajla yazma." },
  ],
};

export interface Plan {
  id: string;
  name: string;
  price: number;
  unit: "ay";
  // Kapsam maddeleri. Talimatta bakım katmanlarının kapsamı verilmedi; doldurulursa sayfada görünür.
  includes?: string[];
}

export const maintenancePlans: Plan[] = [
  { id: "bakim-temel", name: "Temel", price: 750, unit: "ay" },
  { id: "bakim-standart", name: "Standart", price: 1500, unit: "ay" },
  { id: "bakim-gelismis", name: "Gelişmiş", price: 2500, unit: "ay" },
];

export const seoPlans: Plan[] = [
  { id: "seo-yerel", name: "Yerel SEO", price: 2500, unit: "ay" },
  { id: "seo-standart", name: "Standart SEO", price: 4000, unit: "ay" },
];

export const socialPlans: Plan[] = [
  { id: "sosyal-8", name: "8 gönderi", price: 3000, unit: "ay" },
  { id: "sosyal-8-video", name: "8 gönderi + 4 kısa video montajı", price: 5000, unit: "ay" },
];

export const addonGroups = [
  { id: "bakim", title: "Aylık bakım", plans: maintenancePlans },
  { id: "seo", title: "SEO", plans: seoPlans },
  { id: "sosyal", title: "Sosyal medya", plans: socialPlans },
] as const;

export const notIncluded = [
  "Alan adı (domain), barındırma (hosting) ve üçüncü taraf servis ücretleri pakete dahil değildir.",
];

export const quoteSeparately = {
  intro: "Ayrı tekliflendirilir:",
  items: ["E-ticaret", "Ödeme sistemi", "Stok takibi", "Kargo", "Özel entegrasyonlar"],
};
