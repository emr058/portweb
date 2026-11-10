# İz — Fotoğraf Stüdyosu

## Taste seçenekleri ve yön

`draw.mjs --options 3` (sektör `studio-portfolio`, ton `editorial`, roller `work`, `gallery`, `contact`) üç yön verdi:

- `name-as-monument` — adı tipografik anıta çevirme.
- `uneven-photographs` — farklı ölçülerde baskı paftaları.
- `pinned-poster` — sabit başlık ve kayan fotoğraf panelleri.

**Seçim: `uneven-photographs`.** Tema envanterinde doğrulanmış stüdyo adı, çekim portföyü, adres veya marka malzemesi yok. Dağınık baskı düzeni, çizilmiş örnek kompozisyonları tamamlanmış portföy işi gibi göstermeden örnek etiketleriyle sunabiliyor; sabit başlıklı diğer tema düzenlerinden ayrılıyor. Tam yön sayfası `.taste-skill/direction.json` içinde: seed `188808821`, Switzer, rose-grey/green paleti, basamaklı başlık ve farklı ölçülü baskı kompozisyonları. Tema fontlarını dış servisten çekmemek için aynı depodaki yerel Switzer 400/500 dosyaları kullanıldı. Palet ve tipografi korunmuştur.

Yön sayfası gerçek fotoğraf veya açık arşiv görüntüsü öngörüyordu. Bu çalıştırmada ağ kapalı olduğundan ve teslim isteği SVG istediğinden fotoğraf yuvaları aynı palette çizilmiş yerel SVG kompozisyonlarıyla karşılandı. Bu, taste görsel tabanına (dört gerçek fotoğraf) eşdeğer değildir ve `RAPOR.md`'de eksik olarak kaydedilmiştir.

## Fikir, envanter ve rakip testi

Demo envanteri: portre, aile/yaşam, ürün ve etkinlik çekim türleri; tarih talebi; çekim kapsamı; teklif yanıtı; kadraj oranları; ışık/fon denemeleri; basılı kontak paftası; talep fişi. Bunlar sektörün örnek içerik taslağıdır, belirli işletmeye ait doğrulanmış bilgi değildir.

Fikir cümlesi: “Bu sayfada farklı kadraj ve ışık denemelerinden oluşan örnek paftalar → çekim türü ve tarih bilgisiyle teklif talep fişine dönüşür.” Başka fotoğrafçıya da uygulanabildiği için rakip testini geçmez. Gerçek işletme girdisi ve yakın rakip kıyası olmadan bu bir demo yönüdür.

Tek canlı etkileşim: çekim türü + tercih edilen tarih + ad + iletişim bilgisi + isteğe bağlı not → tarayıcı içinde metin talep özeti. Tarih uygunluğu veya fiyat hesaplanmaz; form gönderilmez, saklanmaz. Gerçek telefon/e-posta hedefi olmadığından taslak kullanıcı tarafından stüdyonun eklenecek kanalına iletilir. JavaScript kapalıyken alanlar ve akışın açıklaması kalır.

## Sayfa savı ve kopya destesi

- İlk ekran: “Fotoğraf / Stüdyo” — fotoğrafçı stüdyosu olduğu anlaşılır. Alt metin portre, aile, ürün, etkinlik ile tarih/teklif talebini söyler.
- Çekim türleri: örnek portre, aile ve yaşam, ürün, etkinlik kapsamı; gerçek paket veya fiyat iddiası yok.
- Süreç: çekim türü ve tarih ile kapsam netleşir; uygunluk stüdyo tarafından teyit edilir.
- Talep: alanlar tarayıcıda özet metne dönüşür; herhangi bir gönderim vaadi yok.
- İletişim/konum/saat: gerçek işletme girdisi olmadığından doldurulmuş gibi gösterilmez.

## Diğer temalardan ayrışma

- `yeme-icme-1` adı ve menü düzeninden; bu tema değişken boyutlu kadraj baskıları ve çekim talebi formuyla ayrılır.
- `sanayi-1` teknik tolerans/atölye sunumundan; bu tema ışık, fon ve çekim türüyle ayrılır.
- `klinik-1` bölünmüş oda sahnesinden; bu tema 12 sütunda düzensiz baskı yerleşimi kullanır.
- `guzellik-1` sabitlenmiş afiş ve kayan fotoğraf fiyat listesinden; bu tema tek geçişli portföy paftaları ve talep fişiyle ayrılır.
- `spor-1` renk alanlı ders programından; bu tema nötr mürekkep ve görsel kadraj ritmiyle ayrılır.
- `oto-servis-1` iş emri formundan; bu tema fotoğraf çekim türleri ve teklif kapsamına yönelir.

## Örnek veri

Portre/aile/ürün/etkinlik seçenekleri, kapsam cümleleri ve SVG çizimleri örnek içeriktir. Bunlar gerçek stüdyo hizmeti, müşteri işi, model, yorum, fiyat, uygunluk veya sonuç kanıtı değildir. Müşteri adı, iletişim, adres, saat ve çekim örnekleri bekleniyor.
