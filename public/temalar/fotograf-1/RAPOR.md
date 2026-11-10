# Fotoğraf Stüdyosu — üretim raporu

Durum: bağımsız demo tema; gerçek fotoğrafçı/stüdyo girdisi, görsel portföyü ve müşteri kabulü yok.

## Üretilenler

- Tek sayfalı statik HTML/CSS/JS tema; uzak font, görsel servisi veya bağımlılık yok.
- Çekim türleri, işleyiş, tarih/teklif talebi alanları ve gerçek işletme bilgisi için açık yer tutucular.
- Tek canlı etkileşim: form girdilerini tarayıcıda talep metnine dönüştürme. Sunucuya iletim ve veri saklama yok; tarih/fiyat/uygunluk garantisi yok.
- Bölüm girişleri, basamaklı başlık, hafif görsel ölçek hareketi, kontrol geri bildirimi ve reduced-motion kuralı.
- Yerel Switzer 400/500 yazı tipi dosyaları ve `fonts.css`.

## Yön ve varlıklar

- Taste `draw.mjs --options 3`: `name-as-monument`, `uneven-photographs`, `pinned-poster`.
- Seçilen yön: `uneven-photographs`; tam yön sayfası `.taste-skill/direction.json`, seed `188808821`.
- Fikir: “Bu sayfada farklı kadraj ve ışık denemelerinden oluşan örnek paftalar → çekim türü ve tarih bilgisiyle teklif talep fişine dönüşür.” Gerçek işletme envanteri olmadığından rakip testinden geçmiş sayılmaz.
- Kaynakta tasarlanmış yedi SVG var: `hero-frame.svg`, `portrait-study.svg`, `family-study.svg`, `product-study.svg`, `event-study.svg`, `contact-sheet.svg`, `date-card.svg`. Çizimler örnek tema içindir ve gerçek müşteri/çekim/ürün fotoğrafı değildir.
- Ağ erişimi yoktu; gerçek resim indirilemedi. Bu nedenle yönün beklediği en az dört gerçek fotoğraf temada **eksik**. Yedi SVG bu kalite ölçütünü karşılamaz; fotoğraf yuvaları müşteri tarafından izinli gerçek çekimlerle değiştirilmelidir.
- Font dosyaları çalışma alanındaki `guzellik-1/fonts/Switzer-400.woff2` ve `Switzer-500.woff2` dosyalarının yerel kopyalarıdır. Ağdan font alınmadı. Font dosyalarının özgün dağıtım lisans metni bu görev kapsamında ayrıca incelenmedi.

## İçerik / kapsam sınırları

Çekim türleri ve hizmet cümleleri örnektir. Gerçek işletme adı, portföy, iletişim kanalı, telefon/e-posta, adres, çalışma saatleri, kapsam ve çekim teslim koşulları doğrulanmamıştır. Yorum, müşteri, fiyat, istatistik veya uygunluk iddiası kullanılmadı. Form metni gönderilmez ve sayfada tutulmaz; stüdyo iletişim hedefi sağlanmadığından kullanıcı taslağı kendisi iletir.

## Doğrulama

- Taste `lint.mjs fotograf-1`: **0 FAIL, 0 WARN**.
- Taste `inspect.mjs fotograf-1/index.html --widths 1280,390`: başlamadı; yerel test sunucusu `127.0.0.1` üzerinde `listen EPERM` ile engellendi. Tarayıcı ekran görüntüsü ve ölçümleri alınmadı.
- Tema içerikleri için `theme.test.js` altında Node çekirdek testleri bulunur. Kullanıcının kanıt komutunun son çalıştırma sonucu bu teslim mesajında verilecektir.
- 360/390/1280 görünüm ve gerçek tarayıcı etkileşimi doğrulanmış değildir.
