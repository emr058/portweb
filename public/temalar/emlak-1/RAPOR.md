# Mahalle Atlası — teslim raporu

Tema: `emlak-1`  
Durum: demo tema; gerçek ofis, hizmet bölgesi ve portföy verileri bekleniyor.

## Yön ve fikir

- Taste yönü: `uneven-photographs`; atlas paftası ve ilan föylerini farklı ölçekte sunan düzen korunmuştur.
- Fikir: “Bu sayfada ofisin doğrulanmış mahalle sınırları, atlas paftaları üzerinde satılık/kiralık ilanları bölgeye göre açar.”
- Tek etkileşim aynı kaldı: mahalle ve ilan türüne göre örnek ilanları filtreleme. Örnek harita çizimleri gerçek adres veya ilan konumu göstermez.

## Yapılan düzeltmeler

- Hero başlığı iki kısa satıra indirildi; üç satırlık başlık ve portföy başlığındaki uzun satır kırılımları giderildi.
- Fazla eyebrow etiketleri kaldırıldı; sayfa mahalle atlası ve portföy başlıklarıyla ilerliyor.
- Atlas ile örnek portföy arasına İstanbul mahalle cephelerinden beş fotoğraflı, asimetrik pafta akışı eklendi. Fotoğraflar İstanbul'daki gerçek yerleri gösterir; örnek ilan görseli olarak etiketlenmez.
- Atlas ve portföy bölümlerindeki geniş üst/alt boşluklar azaltıldı.
- Filtre paneline belirgin zemin, kalın kenar ve geniş dokunma hedefleri verildi. Gövde/ikincil metin rengi koyulaştırıldı.
- Tipografi küçük bir boyut dizisine toplandı; bölüm ve portföy başlıklarının satır ölçüsü kısaltıldı.
- Hero ve içerik bölümlerine kademeli giriş; fotoğraflara küçük hover yanıtı ve düğmelere basma/hover yanıtı eklendi. Reduced-motion tercihinde animasyonlar statik kalır.

## Görseller ve kaynaklar

- `assets/colorful-apartment-buildings-istanbul-turkey.jpg` — “Colorful apartment buildings, Istanbul, Turkey”, Maurice Flesier, CC BY-SA 4.0. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Colorful_apartment_buildings,_Istanbul,_Turkey.jpg)
- `assets/an-apartment-in-balat.jpg` — “An apartment in Balat”, Antoloji, CC BY-SA 4.0. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:An_apartment_in_Balat.jpg)
- `assets/tepebasi-istanbul-1.jpg` — “Tepebasi Istanbul 1”, Chapultepec, public domain. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tepebasi_Istanbul_1.jpg)
- `assets/bal-kesir-apartment-building-in-istanbul.jpg` — “Balıkesir apartment building in Istanbul”, Dor Shabashewitz, CC BY 4.0. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bal%C4%B1kesir_apartment_building_in_Istanbul.jpg)
- `assets/manzara-adalar-residential-block-istanbul.jpg` — “Manzara Adalar Residential Block, Istanbul”, Maurice Flesier, CC BY-SA 4.0. [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Manzara_Adalar_Residential_Block,_Istanbul.jpg)
- Görsel dosyaları ve lisans/kredi metadata’sı `assets/credits.json` içinde kayıtlıdır; footer’daki “Görsel kaynakları” alanı sayfa üstünde de kaynak verir. Örnek ilan evleri ve mahalle paftaları SVG çizimidir, gerçek ilan olarak sunulmaz.

## İçerik ve doğrulama

- Ofis adı/adresi, çalışma bölgeleri, danışman ve iletişim bilgileri ile doğrulanmış ilanlar yoktur. Fiyat, alan ve oda değerleri örnek içeriktir; gerçek ofis verisiyle değiştirilmelidir.
- İstenen inspect komutu `node …/inspect.mjs index.html --widths 1280,390` başlatıldı fakat Chrome/Edge/Chromium bulunmadığı için çalışamadı. Ekran görüntüsü veya sıfır FAIL sonucu iddia edilmiyor; CEO’nun tarayıcı inspect’i bekleniyor.
- Bu değişiklikler için ayrıca test/build çalıştırılmadı.
