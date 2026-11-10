# Oda Anahtarı — üretim raporu

Tema: `otel-1`  
Durum: butik otel/pansiyon için örnek tema; işletme verisiyle uyarlama bekliyor.

## Yapılan

- `page-is-the-object` yönü seçildi. Fikir: oda anahtarının kayıt etiketi, oda listesi ve konaklama talebini taşıyan bir anahtar fişine dönüşür.
- İlk ekranda tek görünür `h1`, iki elle belirlenmiş satır, destek metni ve oda seçimine giden bağlantı bulunuyor. H1 içerik kartının düz, opak yüzeyinde; fotoğraf üzerinde metin yok.
- Üç oda, kişi kapasitesi ve gecelik ücret örnek olarak etiketlendi. Gerçek adres, saat, telefon ve işletme alıcısı için açık alanlar bırakıldı.
- Tek canlı akış: oda ve tarih seçip `mailto:` taslağı hazırlama. JS açıkken tarih sırası kontrol edilir ve e-posta taslağı alanlarla oluşturulur. JS kapalıyken yerel HTML form yedeği kalır.
- Bölüm girişleri IntersectionObserver ile sırayla görünür olur; içerik JS olmadan da görünürdür. Hero fişi scroll sırasında küçülür. Düğme ve kart üzerinde kısa etkileşim geri bildirimi vardır. Reduced-motion tercihi tüm animasyonları kapatır.
- Beş gerçek, yerel arşiv fotoğrafı kullanıldı. Oda fotoğrafı kendi arşiv kaydıyla açıklanır ve örnek konaklamanın odası olmadığı açıkça belirtilir.
- Gövde yazısı tam mürekkep rengiyle kullanıldı. Kontrol edilen renk çiftleri: `#1f3038 / #f7f9fa` 12.93:1; `#40515a / #f7f9fa` 7.82:1; beyaz / `#0d7480` 5.49:1; beyaz / `#1f3038` 13.65:1. Hero fotoğrafında metin yalnızca opak beyaz fiş üzerinde veya koyu scrim üzerindedir.
- Tema kendi klasöründe statik HTML/CSS/JS olarak durur. Ağdan font veya resim istemez; fontlar yereldir.

## Taste akışı

- `draw.mjs --options 3` çıktısı: `uneven-photographs`, `name-as-monument`, `page-is-the-object`.
- Seçilen yön: `page-is-the-object`; yön gerekçesi ve rakip testi `NOTLAR.md` içinde. Tam çekim tohumu `1416344272` ile `.taste-skill/direction.json` içinde saklandı.
- Yönün Archivo font önerisi web font servisine dayanıyordu. Yerel font şartı nedeniyle mevcut, yerel General Sans 400/500 dosyaları aynı grotesk iskelet için kullanıldı. Renk yönü frost/slate olarak korundu.
- Açık koleksiyonlarda arama ve indirme başarılı oldu; arşiv görseli sayısı için yerel üretilmiş görsel kullanılmadı.

## Görsel kaynakları ve lisanslar

Krediler sayfanın altındaki “Arşiv görsel kaynakları” alanında; tam metadata `assets/credits.json` içinde.

- `assets/hotel-keys-a-thing-of-the-past.jpg` — “Hotel Keys - a thing of the past!”, Carol (vanhookc), CC BY-SA 2.0, [Flickr](https://www.flickr.com/photos/97651299@N00/37676412096). Hero zemininde eski bir otel anahtarlığı arşivi olarak kullanılır.
- `assets/hotel-key-board-8317946457.jpg` — “Hotel Key Board (8317946457)”, Jonathan Haeber, CC BY 2.0, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hotel_Key_Board_(8317946457).jpg). Buck Hill Inn anahtar panosu.
- `assets/jangsusan-hotel-key-pyongsong-33139932995.jpg` — “Jangsusan Hotel key, Pyongsong”, jennybento, CC BY-SA 2.0, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Jangsusan_Hotel_key,_Pyongsong_(33139932995).jpg). Arşiv anahtar nesnesi.
- `assets/wright-tavern-guest-register.jpg` — “Wright Tavern Guest Register”, kamu malı, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Wright_Tavern_Guest_Register_-_DPLA_-_fb73183d19f4f0889bcbef2ad5bf0d52_(page_126).jpg). 1897/1901 kayıt defteri.
- `assets/hamilton-hotel-typical-room-portland-oregon.jpg` — “Hamilton Hotel - typical room - Portland Oregon”, Historic American Buildings Survey, kamu malı, [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Hamilton_Hotel_-_typical_room_-_Portland_Oregon.jpg). 1993 tarihli arşiv oda belgelemesi.
- `fonts/GeneralSans-400.woff2` ve `fonts/GeneralSans-500.woff2` — mevcut `emlak-1/fonts/` yerel tema dosyalarından kopyalandı; Fontshare lisanslı General Sans ailesi.

## Örnek içerik ve yayın öncesi değişecekler

- Örnek odalar: Avlu (çift kişilik yatak, 2 kişi, avluya bakan, ₺2.400/gece); Çatı (iki tek yatak, 2 kişi, üst kat, ₺2.150/gece); Sedir (çift kişilik yatak, 2 kişi, ek oturma alanı, ₺2.800/gece).
- Üç oda, ücretler, kapasite ve oda özellikleri yalnızca görsel yoğunluk örneğidir; işletme tarafından doğrulanmalıdır.
- `konaklama@example.com` demo e-posta alıcısıdır. Gerçek rezervasyon adresiyle değiştirin.
- Ad, marka, adres, ulaşım, kahvaltı, giriş/çıkış saati ve telefon bilgisi verilmedi; sayfa bunları gerçek bilgiymiş gibi uydurmuyor.
- Bu örnek oda verileri gerçek envanter değil; müsaitlik, rezervasyon ve fiyat hesabı yapmaz.

## Doğrulama ve ölçülemeyenler

- İstenen komut çalıştırıldı: `node /Users/ms/Desktop/2026/portweb/.claude/skills/taste-skill/scripts/inspect.mjs index.html --widths 1280,390`. Tarayıcı başlatılamadı: `No Chrome/Edge/Chromium found`. Bu yüzden 1280/390 ekran görüntüleri, h1 satır ölçümü, taşma/örtüşme ve gerçek tarayıcı kontrast sonucu alınamadı; CEO'nun Chrome inspect'i bekleniyor.
- Taste lint sonucu: `0 FAIL, 0 WARN`.
- `node --check app.js` başarılı.
- CSS/HTML tarayıcı çizimi veya formun e-posta uygulamasında açılması doğrulanmadı. Chrome dışı tarayıcı envanteri de kullanılamadı.
- İstenen `TEMA-BRIEFLERI.md` §5 ile `TEMA-HATTI.md` çalışma alanında yoktu; `NOTLAR.md` bu eksik girdiyi ve kapsam varsayımını kaydeder.
- Test/build, sync, commit veya push çalıştırılmadı.
