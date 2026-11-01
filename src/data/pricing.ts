// Hizmet fiyatlarının tek kaynağı. Sayfalar, karşılaştırma tablosu, WhatsApp mesajları
// ve başvuru formu buradan okur; fiyat değişince yalnız bu dosya düzenlenir.

export type PriceRange = { min: number; max?: number };

const dot = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
export const formatTL = (n: number) => `${dot(n)} TL`;
export const formatRange = (r: PriceRange) => (r.max ? `${dot(r.min)}–${dot(r.max)} TL` : formatTL(r.min));

export const campaign = {
  label: "İlk 10 müşteri",
  seats: 10,
  note: "Kampanya fiyatı, ilk 10 müşteriyle sözleşme yapılana kadar geçerlidir.",
} as const;

export type PackageId = "baslangic" | "profesyonel";

export type IconName =
  | "smartphone" | "palette" | "message-circle" | "layout-dashboard" | "search" | "package" | "newspaper" | "mail"
  | "chart" | "cog" | "gauge" | "layers" | "images" | "file-up" | "clipboard-list" | "factory" | "store"
  | "shopping-bag" | "phone-call" | "list-checks" | "globe";

// Her özellik: kısa ad + herkesin anlayacağı bir cümle + simge.
export interface Feature {
  title: string;
  hint: string;
  icon: IconName;
}

export interface WebPackage {
  id: PackageId;
  name: string;
  pages: string;
  normal: PriceRange;
  campaign: PriceRange;
  /** Hangi işletme için uygun: tek cümle. */
  forWhom: string;
  features: Feature[];
}

export const websitePackages: WebPackage[] = [
  {
    id: "baslangic",
    name: "Başlangıç Web Sitesi",
    pages: "4–5 sayfa",
    normal: { min: 10000 },
    campaign: { min: 5000 },
    forWhom: "İşletmenizi tanıtmak, adres ve telefonunuzu internette göstermek istiyorsanız.",
    features: [
      { title: "Mobil uyumlu tasarım", hint: "Telefon, tablet ve bilgisayarda düzgün görünür.", icon: "smartphone" },
      { title: "Basit logo ve görsel düzen", hint: "Sitenin logosu ve renkleri sade bir düzende hazırlanır.", icon: "palette" },
      { title: "İletişim ve WhatsApp bağlantısı", hint: "Ziyaretçi iletişim bilgilerinize ulaşır, tek dokunuşla WhatsApp'tan yazar.", icon: "message-circle" },
      { title: "Basit yönetim paneli", hint: "Sitenizi kendiniz güncelleyebileceğiniz sade bir ekran.", icon: "layout-dashboard" },
      { title: "Temel teknik SEO", hint: "Sitenin Google'da bulunabilmesi için temel ayarlar.", icon: "search" },
    ],
  },
  {
    id: "profesyonel",
    name: "Profesyonel Web Sitesi",
    pages: "7–12 sayfa",
    normal: { min: 15000, max: 20000 },
    campaign: { min: 7500, max: 10000 },
    forWhom: "Ürün ve hizmetlerinizi listelemek, duyuru yayınlamak ve markanıza özel bir görünüm istiyorsanız.",
    features: [
      { title: "Markaya özel tasarım", hint: "Sitenin görünümü işletmenizin kimliğine göre hazırlanır.", icon: "palette" },
      { title: "Gelişmiş yönetim paneli", hint: "Sitedeki içerikleri kendiniz yönetebileceğiniz kapsamlı bir ekran.", icon: "layout-dashboard" },
      { title: "Ürün ve hizmet yönetimi", hint: "Ürün ve hizmetlerinizi ekran üzerinden ekler, düzenler, kaldırırsınız.", icon: "package" },
      { title: "Blog / haber alanı", hint: "Duyuru ve yazılarınızı yayınlayabileceğiniz bölüm.", icon: "newspaper" },
      { title: "İletişim formları", hint: "Ziyaretçinin sorusu veya talebi doğrudan size ulaşır.", icon: "mail" },
      { title: "Temel teknik SEO ve analitik", hint: "Google için temel ayarlar ve siteye kaç kişinin girdiğini görme.", icon: "chart" },
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
  forWhom: "Tezgâh parkurunuzu göstermek, müşterilerden teklif ve teknik çizim almak istiyorsanız.",
  features: [
    { title: "Makine parkuru", hint: "Tezgâhlarınızın marka, model ve işleme ölçüleri.", icon: "cog" },
    { title: "Üretim kabiliyetleri", hint: "İşleyebildiğiniz malzemeler, toleranslar ve adet aralıkları.", icon: "gauge" },
    { title: "Hizmet sayfaları", hint: "Torna, freze gibi her hizmet için ayrı sayfa.", icon: "layers" },
    { title: "Ürün ve parça galerisi", hint: "Ürettiğiniz parçaların fotoğrafları.", icon: "images" },
    { title: "Teknik çizim yükleme", hint: "Müşteri çizimini talep formuna ekler.", icon: "file-up" },
    { title: "Teklif talep formu", hint: "Parça, adet ve istenen teslim tarihi size ulaşır.", icon: "clipboard-list" },
    { title: "WhatsApp iletişimi", hint: "Tek dokunuşla hazır mesajla yazma.", icon: "message-circle" },
  ] as Feature[],
};

export interface Plan {
  id: string;
  name: string;
  price: number;
  unit: "ay";
  // Kapsam maddeleri; doluysa plan kartında liste olarak görünür.
  includes?: string[];
}

export const maintenancePlans: Plan[] = [
  {
    id: "bakim-temel", name: "Teknik Koruma", price: 750, unit: "ay",
    includes: ["Temel teknik çalışma kontrolleri", "Form ve iletişim alanlarının kontrolü", "Mevcut yedekleme sisteminin kontrolü", "Teknik hata takibi", "Küçük teknik sorunlarda destek"],
  },
  {
    id: "bakim-standart", name: "Standart Bakım", price: 1500, unit: "ay",
    includes: ["Teknik Koruma'daki her şey", "Ayda 1 saat küçük içerik veya teknik güncelleme", "Görsel ve metin değişiklikleri", "Temel performans kontrolleri", "Aylık kısa bakım bilgilendirmesi"],
  },
  {
    id: "bakim-gelismis", name: "Gelişmiş Bakım", price: 2500, unit: "ay",
    includes: ["Standart Bakım'daki her şey", "Ayda toplam 3 saat küçük geliştirme ve güncelleme", "Öncelikli destek", "Daha kapsamlı teknik kontroller", "Aylık bakım ve yapılan işlemler özeti"],
  },
];

export const maintenanceNotes = [
  "Paketlerdeki süreler aylık kullanım hakkıdır. Kullanılmayan saatler sonraki aya aktarılmaz.",
  "Yeni sayfa, kapsamlı tasarım değişikliği, özel yazılım geliştirme ve yeni entegrasyonlar ayrıca fiyatlandırılır.",
  "Bakım paketlerinde SEO ve sosyal medya çalışması yoktur; bunlar ayrı hizmetlerdir.",
  "Yedekleme, barındırma firmasının sunduğu sistem üzerinden kontrol edilir. Firmanın sunmadığı bir özellik garanti edilmez.",
  "Bakım 7/24 kesintisiz destek anlamına gelmez. Talepler çalışma saatleri içinde değerlendirilir.",
];

// Kampanya desteği: sınırlı kapsam, yeni iş veya dış servis ücreti içermez.
export const freeSupport = {
  title: "İlk 10 müşteriye 1 yıl ücretsiz temel teknik destek",
  text: "Teslim edilen web sitesi için yayına alındıktan sonra 1 yıl boyunca verilir.",
  includes: [
    "Sitenin teknik olarak çalışır durumda tutulması",
    "Yazılım kaynaklı hataların giderilmesi",
    "İletişim ve başvuru formlarının kontrolü",
    "Güvenlik ve güncelleme kontrolleri",
  ],
  excludes: [
    "Yeni sayfa veya özellik geliştirme",
    "Tasarım değişiklikleri",
    "Ürün ve içerik girişleri",
    "SEO çalışmaları ve yeni entegrasyonlar",
    "Alan adı, barındırma ve üçüncü taraf servis ücretleri",
  ],
};

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
  "Alan adı (domain, örn. firmaniz.com), barındırma (hosting, sitenin yayında durduğu sunucu) ve üçüncü taraf servis ücretleri pakete dahil değildir.",
];

export const quoteSeparately = {
  intro: "Ayrı tekliflendirilir:",
  items: ["E-ticaret", "Ödeme sistemi", "Stok takibi", "Kargo", "Özel entegrasyonlar"],
};

// "Hangisi bana uygun?" rehberi.
export const chooser: { id: string; title: string; text: string; href: string; icon: IconName }[] = [
  { id: "baslangic", title: "Başlangıç", text: websitePackages[0].forWhom, href: "/basvuru?paket=baslangic", icon: "store" },
  { id: "profesyonel", title: "Profesyonel", text: websitePackages[1].forWhom, href: "/basvuru?paket=profesyonel", icon: "package" },
  { id: "sanayi", title: "Sanayi", text: industrial.forWhom, href: "/basvuru?paket=sanayi", icon: "factory" },
  { id: "eticaret", title: "E-ticaret", text: "Online satış, ödeme, stok veya kargo gerekiyorsa ayrı teklif verilir.", href: "/basvuru?paket=eticaret", icon: "shopping-bag" },
];

// Süreç: süre vaadi içermez. Onay, ödeme ve revizyon koşulu 2. ve 3. adımda belirtilir.
export const steps: { title: string; text: string; icon: IconName }[] = [
  { title: "İhtiyaç analizi", text: "İşletmenizi, hedeflerinizi ve ihtiyaçlarınızı tanırız.", icon: "clipboard-list" },
  { title: "Teklif ve planlama", text: "Kapsam, fiyat ve teslimat beklentisi netleşir. Başlamak için onayınız ve başlangıç ödemesi gerekir.", icon: "list-checks" },
  { title: "Tasarım ve geliştirme", text: "Onaylanan plana göre siteniz hazırlanır. Revizyon hakkı teklifte yazılıdır.", icon: "palette" },
  { title: "Test ve yayına alma", text: "Mobil ve masaüstü kontrolleri yapılır, düzenlemelerden sonra site teslim edilir.", icon: "globe" },
];
