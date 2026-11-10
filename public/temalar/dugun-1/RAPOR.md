# Tarih Kartelası — üretim raporu

Durum: statik demo tema; gerçek işletme içeriği ve kabulü bekleniyor.

## Yapılan

- `page-is-the-object` yönü seçildi. Çekim tohumu `802410441`; üç yönün dökümü ve gerekçe `NOTLAR.md` içinde.
- Davetiye nesnesi üzerine mürdüm zemin/açık kâğıt kartı kuruldu; masa, kemer ve mekân için temaya özgü kod çizimi SVG'ler eklendi.
- Tek canlı etkileşim: tarih, etkinlik türü ve yaklaşık kişi sayısından talep özeti üretme; Web Share varsa açma, yoksa panoya kopyalama. JavaScript kapalıyken formun amacı ve manuel iletişim notu görünür.
- Bölüm girişleri, kartın açılış hareketi, alan/düğme geri bildirimi ve `prefers-reduced-motion` desteği eklendi.
- Yerel Jost 400/500 fontları ve OFL lisansı eklendi; harici servis çağrısı yok.

## Görseller ve lisans

Bu çalıştırmada ağ erişimi olmadığı için açık arşivler taranamadı ve gerçek fotoğraf şartı karşılanamadı. Brief'in çevrimdışı istisnası uygulanarak dört yerel, tema için çizilmiş SVG üretildi: `flower-arch.svg`, `table-plan.svg`, `place-plan.svg`, `invitation-back.svg`. Bunlar fotoğraf değildir ve gerçek müşteri/mekân işi izlenimi vermemelidir. Diğer temalardaki lisanslı fotoğraflar kopyalanmadı. Görsellerin telif künyesi gerekmiyor; yerel kod çizimleridir.

Font dosyaları `muhasebe-1/fonts/` içindeki mevcut yerel kopyalardan alındı. Jost, SIL Open Font License 1.1; lisans metni `fonts/OFL.txt` içinde. Taste yönünde çekilen Literata ağ olmadan edinilemedi; tasarımın iki font sınırını koruyarak lisanslı Jost kullanıldı.

## İçerik değişecekler

İşletme adı ve gerçek hazırlık sırası, hizmet kapsamı, mekân/ulaşım bilgisi, telefon veya WhatsApp ve iletişim fallback'i eklenmeli. Etkinlik türü açıklamaları ve hazırlık maddeleri örnektir. Fiyat, uygunluk, müşteri yorumu, müşteri adı veya istatistik eklenmedi.

## Doğrulama ve sınırlar

- Statik dosyalar `python -m http.server` ile sunulacak şekilde hazırlandı.
- Taste kaynak lint'i `0 FAIL, 0 WARN` verdi. İstenen `inspect.mjs index.html --widths 1280,390` denendi ancak gerçek tarayıcı sunucusunu `127.0.0.1` üzerinde açarken `listen EPERM` ile durdu; ekran ölçümü ve görsel inspect kanıtı yok.
- Gerçek tarayıcıda görsel değerlendirme, klavye/ekran okuyucu turu ve paylaşım akışının olumlu/iptal/yedek yolları bu raporda kanıtlanmış değildir.
- Fikir cümlesindeki işletmeye özgü gerçek kurulum ve mekân unsurları sağlanmadığı için rakip testi geçilmiş sayılmaz.
