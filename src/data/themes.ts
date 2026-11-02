// Hazır tasarımlar galerisi. Yeni tema: kaynağı ~/Desktop/2026/temalar/<id> altında hazırla,
// `node scripts/sync-temalar.mjs <id>` ile kopyala ve önizlemeleri üret, sonra bu listeye kayıt ekle.
export interface Theme {
  id: string;
  name: string;
  sector: string;
  sectorKey: string;
  idea: string;
  features: string[];
  note: string;
  swatches: [string, string, string];
}

export const THEME_NOTE = "Demodaki ad, metin, fiyat, adres ve fotoğraflar örnektir. Sizin işletmenizin bilgileri ve fotoğraflarıyla değiştirilir.";

export const themes: Theme[] = [
  {
    id: "yeme-icme-1",
    name: "Odun",
    sector: "Restoran, lokanta, kafe",
    sectorKey: "yeme-icme",
    idea: "Lokantanızın adı ilk ekranı doldurur. Müşteri menüyü, saatleri ve masa ayırtmayı tek yerde bulur, rezervasyon mesajı size hazır gelir.",
    features: [
      "Fiyatlı menü, tıklayınca açıklama açılır",
      "Şu an açık mı, ne zaman açılıyor: saatlere göre kendiliğinden yazar",
      "Gün, saat ve kişi seçerek hazır rezervasyon mesajı (WhatsApp veya e-posta)",
      "Telefon ve masaüstü için ayrı düzen",
      "Yazı tipleri sayfayla birlikte gelir, dış servise bağlanmaz",
    ],
    note: THEME_NOTE,
    swatches: ["#dedad3", "#0a0a0a", "#256f82"],
  },
  {
    id: "sanayi-1",
    name: "Eksen",
    sector: "Sanayi, CNC, imalat",
    sectorKey: "sanayi",
    idea: "Atölyenizin hassasiyeti rakamla görünür. Müşteri parça adını, adedini ve malzemeyi yazar, hazır teklif mesajı size ulaşır.",
    features: [
      "Toleransı saç teliyle karşılaştıran canlı gösterge",
      "Yetenekler ve makine ölçüleri satır satır, tek bakışta",
      "Süreç adımları fiş gibi, rakamlar düz mint alanda",
      "Parça adı, adet ve malzemeyle hazır teklif mesajı",
      "Telefonda ve masaüstünde ayrı düzen",
    ],
    note: THEME_NOTE + " Arşiv fotoğrafları kamu malıdır.",
    swatches: ["#ffffff", "#232323", "#a1ffcb"],
  },
  {
    id: "klinik-1",
    name: "Nefes",
    sector: "Klinik, diş hekimi, sağlık",
    sectorKey: "saglik",
    idea: "Hasta siteye girince önce sakinlik görür, sonra randevusunu alır. Tedaviyi seçince form o tedaviyle açılır.",
    features: [
      "Tedavi listesinde birine dokununca randevu formu o tedaviyle açılır",
      "Randevunun nasıl işlediği kesik kenarlı bir fiş olarak anlatılır",
      "Hekimden yazılı not, sık sorulan sorular",
      "Şu an açık mı bilgisi çalışma saatlerinden kendiliğinden yazılır",
      "Telefonda önce fotoğraf, sonra kart",
    ],
    note: THEME_NOTE,
    swatches: ["#ecebe7", "#38450f", "#e1dfd9"],
  },
  {
    id: "guzellik-1",
    name: "Ela",
    sector: "Kuaför, güzellik salonu",
    sectorKey: "guzellik",
    idea: "Salonunuz dergi afişi gibi açılır. Hizmeti seçen müşteri randevu formunu o hizmetle doldurmaya başlar.",
    features: [
      "Kaydırmayla değişen sabit afiş, ilk üç ekran boyunca",
      "Hizmet ve fiyat listesi, satıra gelince fotoğraf değişir",
      "Bir hizmete dokununca randevu formu o hizmetle açılır",
      "E-posta adresi dev yazı olarak sayfanın kapanışında",
      "Çalışma saatlerine göre canlı açık/kapalı bilgisi",
    ],
    note: THEME_NOTE + " Ekip bölümü fotoğrafsızdır, gerçek ekip fotoğraflarıyla doldurulur.",
    swatches: ["#1a2039", "#f9a3c0", "#212846"],
  },
  {
    id: "spor-1",
    name: "Tempo",
    sector: "Spor salonu, stüdyo",
    sectorKey: "spor",
    idea: "Bugünün dersleri ilk ekranda canlı görünür. Üye adayı dersi seçer, ücretsiz deneme formu o dersle açılır.",
    features: [
      "Bugünkü dersler saate göre canlı: geçenler soluklaşır, sıradaki ders vurgulanır",
      "Dersler dev satırlar halinde, birine dokununca ücretsiz deneme formu o dersle açılır",
      "Üyelik planları basamak basamak yükselir",
      "Açılışta panjur gibi açılan fotoğraf",
      "Telefonda ve masaüstünde ayrı düzen",
    ],
    note: THEME_NOTE + " Ders programı ve fiyatlar örnektir.",
    swatches: ["#ffd249", "#f53fd6", "#a4f6f8"],
  },
];

export const themeById = (id: string | undefined) => themes.find(t => t.id === id);
export const previewOf = (id: string) => `/temalar/${id}-onizleme.jpg`;
export const phoneOf = (id: string) => `/temalar/${id}-telefon.jpg`;
export const demoOf = (id: string) => `/temalar/${id}/index.html`;
