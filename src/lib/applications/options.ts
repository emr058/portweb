// Başvuru formu seçenekleri. Form ve sunucu şeması aynı listeleri kullanır.

type Option = { value: string; label: string };
const values = <T extends readonly Option[]>(list: T) => list.map(o => o.value) as [T[number]["value"], ...T[number]["value"][]];

export const PROJECT_TYPES = [
  { value: "baslangic", label: "Başlangıç web sitesi" },
  { value: "profesyonel", label: "Profesyonel web sitesi" },
  { value: "sanayi", label: "Sanayi web sitesi (CNC, imalat)" },
  { value: "eticaret", label: "E-ticaret sitesi (ayrı teklif)" },
  { value: "belirsiz", label: "Emin değilim, öneri isterim" },
] as const;

export const SECTORS = [
  { value: "sanayi", label: "Sanayi, imalat" },
  { value: "perakende", label: "Perakende, mağaza" },
  { value: "yeme-icme", label: "Yeme içme" },
  { value: "saglik", label: "Sağlık" },
  { value: "hizmet", label: "Hizmet, danışmanlık" },
  { value: "egitim", label: "Eğitim" },
  { value: "insaat", label: "İnşaat, emlak" },
  { value: "diger", label: "Diğer" },
] as const;

export const FEATURES = [
  { value: "urun-hizmet", label: "Ürün ve hizmet yönetimi" },
  { value: "blog", label: "Blog / haber alanı" },
  { value: "iletisim-formu", label: "İletişim formu" },
  { value: "whatsapp", label: "WhatsApp bağlantısı" },
  { value: "teklif-formu", label: "Teklif talep formu" },
  { value: "teknik-cizim", label: "Teknik çizim yükleme" },
  { value: "makine-parkuru", label: "Makine parkuru ve üretim kabiliyetleri" },
  { value: "galeri", label: "Ürün ve parça galerisi" },
  { value: "analitik", label: "Ziyaretçi analitiği" },
] as const;

// Ayrı tekliflendirilen özellikler (pakete dahil değil).
export const QUOTE_FEATURES = [
  { value: "odeme", label: "Online ödeme" },
  { value: "stok", label: "Stok takibi" },
  { value: "kargo", label: "Kargo entegrasyonu" },
  { value: "ozel-entegrasyon", label: "Özel entegrasyon" },
] as const;

export const EXTRA_SERVICES = [
  { value: "bakim", label: "Aylık bakım" },
  { value: "yerel-seo", label: "Yerel SEO" },
  { value: "standart-seo", label: "Standart SEO" },
  { value: "sosyal-medya", label: "Sosyal medya" },
] as const;

export const DESIGN_LOGO = [
  { value: "var", label: "Logom var" },
  { value: "yok", label: "Logom yok" },
  { value: "yenilenecek", label: "Logo yenilenecek" },
] as const;

export const BUDGETS = [
  { value: "5-alti", label: "5.000 TL altı" },
  { value: "5-10", label: "5.000–10.000 TL" },
  { value: "10-20", label: "10.000–20.000 TL" },
  { value: "20-30", label: "20.000–30.000 TL" },
  { value: "30-ustu", label: "30.000 TL üzeri" },
  { value: "bilmiyorum", label: "Henüz bilmiyorum" },
] as const;

export const DEADLINES = [
  { value: "acelem-yok", label: "Acelem yok" },
  { value: "1-ay", label: "1 ay içinde" },
  { value: "2-3-ay", label: "2–3 ay içinde" },
  { value: "tarih", label: "Belirli bir tarihim var" },
] as const;

export const CONTACT_METHODS = [
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telefon", label: "Telefon" },
  { value: "eposta", label: "E-posta" },
] as const;

export const ALL_FEATURES = [...FEATURES, ...QUOTE_FEATURES] as const;

export const enumValues = {
  projectType: values(PROJECT_TYPES),
  sector: values(SECTORS),
  features: values(ALL_FEATURES),
  extraServices: values(EXTRA_SERVICES),
  designLogo: values(DESIGN_LOGO),
  budget: values(BUDGETS),
  deadline: values(DEADLINES),
  contact: values(CONTACT_METHODS),
};

export const labelOf = (list: readonly Option[], value: string) => list.find(o => o.value === value)?.label ?? value;
