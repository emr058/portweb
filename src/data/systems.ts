export interface System {
  id: string;
  ad: string;
  sektor: string;
  fikir: string;
  ozellikler: [string, string, string, string, string];
  not: string;
  kapak: string;
  ekranlar: [string, string, string, string];
  masaustuVideo: string;
  telefonVideo: string;
  whatsappMesaji: string;
  kayitYollari: { anaSayfa: string; liste: string; urun: string; teklif: string };
  kimeUygun: string;
  kapsam: string[];
}

const media = (id: string) => `/sistemler/${id}`;
const note = "Demodaki ad, ürün ve fiyatlar örnektir.";

export const systems: System[] = [
  {
    id: "telefoncu",
    ad: "Telefoncu",
    sektor: "Telefon mağazası ve teknik servis",
    fikir: "Mağaza kataloğunu, servis bilgilerini ve müşteri sorularını tek bir sitede toplar.",
    ozellikler: [
      "Telefon ve aksesuarları kategorilere göre listeleme",
      "Ürün sayfasında fotoğraf, özellik ve fiyat alanları",
      "Stok ve ürün bilgilerini yönetmek için yönetim ekranı",
      "Servis bilgileri ve sık sorulan sorular için ayrı sayfalar",
      "Müşterinin ürün veya servis hakkında WhatsApp'tan yazması",
    ],
    not: `${note} Ürün, servis ve yönetim kapsamı kurulum öncesi birlikte netleştirilir.`,
    kapak: `${media("telefoncu")}/kapak.jpg`,
    ekranlar: [1, 2, 3, 4].map(n => `${media("telefoncu")}/ekran-${n}.jpg`) as [string, string, string, string],
    masaustuVideo: `${media("telefoncu")}/masaustu.mp4`,
    telefonVideo: `${media("telefoncu")}/telefon.mp4`,
    whatsappMesaji: "Merhaba, Telefoncu hazır sistemi hakkında bilgi almak ve demoyu birlikte gezmek istiyorum.\nAdım: \nProje türü: Telefon mağazası ve teknik servis",
    kayitYollari: { anaSayfa: "/servis", liste: "/randevu", urun: "/iletisim", teklif: "/takip" },
    kimeUygun: "Telefon, aksesuar veya teknik servis hizmeti sunan; ürünlerini ve servis bilgisini müşterilerine çevrim içi göstermek isteyen mağazalara uygundur.",
    kapsam: ["Mağaza ana sayfası ve ürün kategorileri", "Ürün detay sayfası ve ürün bilgileri", "Servis ve iletişim içeriği", "Yönetim ekranı ve içerik girişi kurulum görüşmesinde netleştirilir"],
  },
  {
    id: "takimtek",
    ad: "Takımtek",
    sektor: "Kesici takım ve sanayi ürünleri",
    fikir: "Ürünlerin teknik bilgilerini düzenler, müşterinin ihtiyacını teklif talebine dönüştürür.",
    ozellikler: [
      "Ürünleri kategori ve kullanım alanına göre listeleme",
      "Ürün sayfasında teknik özellikleri anlaşılır biçimde gösterme",
      "Ürün için teklif talebini seçilen kalemlerle hazırlama",
      "Gelen teklif taleplerini yönetim ekranında görüntüleme",
      "Telefon ve masaüstünde kullanılabilen katalog düzeni",
    ],
    not: `${note} Teknik ürün içeriği ve teklif akışının ayrıntıları kurulum öncesi belirlenir.`,
    kapak: `${media("takimtek")}/kapak.jpg`,
    ekranlar: [1, 2, 3, 4].map(n => `${media("takimtek")}/ekran-${n}.jpg`) as [string, string, string, string],
    masaustuVideo: `${media("takimtek")}/masaustu.mp4`,
    telefonVideo: `${media("takimtek")}/telefon.mp4`,
    whatsappMesaji: "Merhaba, Takımtek hazır sistemi hakkında bilgi almak ve demoyu birlikte gezmek istiyorum.\nAdım: \nProje türü: Kesici takım ve sanayi ürünleri",
    kayitYollari: { anaSayfa: "/", liste: "/magaza", urun: "/urun/telm-1024-0a3d24af", teklif: "/iletisim" },
    kimeUygun: "Kesici takım veya teknik ürün kataloğunu çevrim içi sunmak ve müşterilerden ürün bazında teklif talebi almak isteyen tedarikçilere uygundur.",
    kapsam: ["Ürün kataloğu ve kategori sayfaları", "Teknik özellikleri gösteren ürün detayları", "Ürün seçimiyle hazırlanan teklif talebi", "Tekliflerin yönetim ekranında takibi kurulum görüşmesinde netleştirilir"],
  },
];

export const systemById = (id: string | undefined) => systems.find(system => system.id === id);
