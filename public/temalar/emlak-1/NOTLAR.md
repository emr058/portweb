# Mahalle Atlası — yön ve fikir notu

## Envanter

- Tema adı: Mahalle Atlası; adı bölgeyi keşfetme fikrini çağırıyor.
- İşletme adı, adresi, gerçek sokak/mahalle sınırları: verilmedi.
- Doğrulanmış portföy, danışman, çalışma biçimi, fiyat ve iletişim: verilmedi.
- Gerçek ofis veya ilan fotoğrafı: yok.
- Gerçek müşteri girdisi olmadığından içerik demo kapsamındadır.

## Taste seçimi

`draw.mjs --options 3` ile çıkan seçenekler:

- `name-as-monument`: adı dev başlık yapıyor; doğrulanmış işletme girdisi olmadan kategori fikrini özgülleştirmiyor.
- `split-stage`: sabit görsel ve kayan içerik kolonu; klinik temasının bölünmüş sahne düzenine fazla yaklaşıyor.
- `uneven-photographs`: değişen ölçekli baskı/pafta geometrisi; emlak ilan föyü ve atlas paftası ilişkisine en uygun yön.

Seçim: `uneven-photographs`. Gerekçe: pafta düzeni bölge planı ile ilan kayıtlarını aynı görsel dilde bir araya getiriyor. Müşteri fotoğrafı bulunmadığından fotoğraf blueprint'i, kodla çizilmiş temsili atlas ve ilan illüstrasyonlarına uyarlandı; sahte fotoğraf kullanılmadı. Yönün tipografisi Work Sans olarak dağıtıldı; projede dış font servisi kullanmamak için yerel General Sans dosyalarıyla eşlendi. Paletin gri/yeşil renkleri mevcut tema paletleriyle karışabileceğinden harita kâğıdı, mürekkep ve parsel vurgusu oranları korunarak renkler soğuk mavi-gri, koyu mavi-yeşil ve canlı turuncuya çekildi.

## Fikir ve rakip testi

Fikir cümlesi: “Bu sayfada ofisin doğrulanmış mahalle sınırları, atlas paftaları üzerinde satılık/kiralık ilanları bölgeye göre açar.” Bu fikir mevcut girdilerle uygulanamıyor ve aynı şehirdeki başka bir emlak ofisine de aynen uyabilir; briefteki rakip testi geçmiyor. Demo sürümünde gerçek işletmeye özgülük iddiası yoktur. Müşteriden mahalle uzmanlığı ve doğrulanmış portföy geldiğinde cümle yeniden kurulmalıdır.

## Tek etkileşim

Mahalle + satılık/kiralık seçimi ilan föylerini filtreler. Telefon ekranında doğal seçme alanları başparmakla kullanılacak boyuttadır. JavaScript olmadan filtre devre dışıdır; tüm örnek ilanlar ve bunun açık açıklaması görünür kalır. Harita SVG'leri temsili çizimdir; ilan koordinatlarına bağlanmaz.

## Inspect düzeltmesi · 3 Kasım 2026

`uneven-photographs` yönü ve atlas paftası/ilan föyü fikri korunmuştur. Üç satıra taşan hero başlığı “Mahalle / rehberi” olarak kısaldı; gereksiz eyebrow etiketleri ve portföy çevresindeki boşluk azaltıldı, filtre paneli belirginleştirildi. `assets.mjs` ile İstanbul'daki Balat, Tepebaşı ve Kartal konut dokusundan beş açık lisanslı fotoğraf indirildi; bunlar gerçek mahalle cephelerini anlatan pafta fotoğraflarıdır, örnek ilan görseli olarak sunulmaz. Kaynak/kredi bilgisi footer’da ve `assets/credits.json` içindedir. Bölüm giriş hareketleri reduced-motion tercihini izler.
