# Tasarım notları

## Taste seçenekleri

`draw.mjs --options 3` çıktısı (sektör `other`, ton `technical`, görsel envanteri: yalnızca kodla çizilebilecek araç/kabul formu):

- `quiet-instrument` — dar, sessiz okuma sütunu ve küçük teknik gösterimler.
- `one-motif` — tek bir otomotiv biçimini düğme, görsel maskesi ve bölüm işaretlerine taşıma.
- `type-only-statement` — fotoğraf gerektirmeyen, tipografiyi ilk ekranda ana görsel yapan yön.

**Seçim: `type-only-statement`.** Gerçek müşteri, atölye, araç fotoğrafı, saat veya adres envanteri yok. Bu yön sahte bir işletme görüntüsü veya stok araç fotoğrafı üretmeden; talep fişi başlığı, araç kabul çizimi ve örnek hizmet metinleriyle bir demo sayfa kurmaya elverişli. İki renk alanının kesiştiği başlık, diğer beş tema içindeki fotoğraflı bölünmüş sahne, sabit afiş, renkli ders/fitness bölümleri, lokanta kelime anıtı ve CNC tolerans anlatımından ayrışıyor.

## Fikir ve kapsam

Demo fikir cümlesi: “Bu sayfada servis kabulünde gereken araç, belirti ve gün bilgileri, işletmeye gönderilmeye hazır bir talep fişine dönüşür.” Bu cümle başka bir oto servise de uygulanabilir. Briefte müşteri girdisi ve rakip URL'si yok; fikir rakip testini geçmiş sayılmıyor. Gerçek işletme envanteri ve yakın rakip testi gelmeden müşteri işi olarak özgülleştirilmeli.

Tek canlı akış: araç marka/modeli, konu, belirti ve tercih edilen günü gir → paylaşılabilir mesaj taslağını oluştur. Web Share API varsa telefonun paylaşım menüsü açılır; yoksa metin seçilip kopyalanabilir. Sayfa veriyi sunucuya göndermez ve saklamaz. Fiyat veya arıza teşhisi üretmez.

## Tam yön sayfası

Seçilen yönün tam sayfası `.taste-skill/direction.json` dosyasında tutuluyor. Yön `type-only-statement`, tam sayfa çekim tohumu `794412986`. Kura `Schibsted Grotesk` seçmişti; çevrimdışı tema ve yerel yazı tipi gereği görünüm için tema paketinde bulunan yerel `Figtree` ve `League Spartan` kullanıldı. Bu tipografi ikamesi, yön ve renk değişimi değildir.

Palet, tam sayfa çıktısındaki ilk `three-stones` seçiminin sanayi/klinikteki yeşil-gri tonlara yaklaşması nedeniyle iki kez çekildi. İlk yeniden çekim `rose-grey-green` oldu ve yeşil vurguyu korudu. İkinci yeniden çekim `blush-aubergine` paletini verdi: açık gül kâğıdı ve patlıcan mürekkebi, güzellik temasındaki lacivert zemin ve parlak pembe vurgudan ayrılıyor. Son palette kodlanmış otomotiv çizimleri aynı iki tonda tutuldu.

Görsel planı müşteri fotoğrafı veya lisanslı arşiv kullanmak yerine iki özel SVG çizimiyle karşılandı: üstten araç görünüşü ve örnek servis kontrol/fiş çizimi. Dış görsel servisi veya uzaktaki font yüklemesi yok.

## Inspect düzeltmesi · 3 Kasım 2026

İlk yön ve fikir cümlesi korunmuştur. İlk ekranın büyük, iki satırlı “SERVİS / TALEBİ” başlığı artık tek görünür `h1`; destek cümlesi servis fişi fikrini açıklar. Fotoğraf şartını karşılamak için `assets.mjs` üzerinden dört açık lisanslı atölye/otomotiv fotoğrafı bulundu, indirildi ve footer’da kaynaklandı. Bunlar servis kabul akışının dünyasını gösterir; iki özgün SVG çizimi teknik açıklama olarak kalır. Hareket katmanı bölüm girişlerini ve hero başlık/fotoğraf gelişini ekler, reduced-motion tercihi statik görünümü korur.
