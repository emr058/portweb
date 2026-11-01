import { siteConfig } from "./site";

// Hizmeti veren bilgileri ve aydınlatma metni sürümü. Vergi mükellefiyeti ve adres bilgisi
// netleşince boş alanlar doldurulur; dolu alanlar sayfalarda ve aydınlatma metninde görünür.
export const legal = {
  controller: "Emir Aydın",
  email: siteConfig.links.emailDisplay,
  city: "Gebze, Kocaeli",
  address: "",
  taxOffice: "",
  taxNo: "",
  /** Aydınlatma metni değişince güncellenir; her başvuruyla birlikte hangi sürümün gösterildiği kaydedilir. */
  noticeVersion: "2026-11-01",
  noticeDateLabel: "1 Kasım 2026",
  /** Sözleşmeyle sonuçlanmayan başvuruların saklama süresi (ay). */
  retentionMonths: 12,
};
