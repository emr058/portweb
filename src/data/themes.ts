// Hazır tasarımlar galerisi. Yeni tema eklemek için bu listeye bir kayıt eklenir,
// demo dosyaları public/temalar/<id>/ altına konur.
export interface Theme {
  id: string;
  name: string;
  sector: string;
  idea: string;
  demo: string;
  preview: string;
  previewAlt: string;
  features: string[];
  note: string;
}

export const themes: Theme[] = [
  {
    id: "yeme-icme-1",
    name: "Odun",
    sector: "Restoran, lokanta, kafe",
    idea: "İşletmenin adı sayfanın kendisi olur: dev harfler ilk ekranı doldurur, menü siyah çubuklar halinde açılır.",
    demo: "/temalar/yeme-icme-1/index.html",
    preview: "/temalar/yeme-icme-1-onizleme.jpg",
    previewAlt: "Odun temasının ilk ekranı: dev, alttan kırpılmış ODUN yazısı",
    features: [
      "Fiyatlı menü, tıklayınca açıklama açılır",
      "Şu an açık mı, ne zaman açılıyor: saatlere göre kendiliğinden yazar",
      "Gün, saat ve kişi seçerek hazır rezervasyon mesajı (WhatsApp veya e-posta)",
      "Telefon ve masaüstü için ayrı düzen",
      "Yazı tipleri sayfayla birlikte gelir, dış servise bağlanmaz",
    ],
    note: "Demodaki ad, menü, fiyat, adres ve fotoğraflar örnektir. Sizin işletmenizin bilgileri ve fotoğraflarıyla değiştirilir.",
  },
];
