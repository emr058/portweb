# Tasarım notları — Taşınma Fişi

## Yön ve fikir

- Taste `draw.mjs --options 3` seçenekleri: `dense-tiles`, `sentence-as-layout`, `page-is-the-object`.
- Seçilen yön: `page-is-the-object` (tam yön tohumu `1429526214`). Taşıma için gereken iki adres, hacim ve gün, gerçek dünyadaki bir taşıma talep fişinin içine yerleşiyor. Fişin kesik kenarı ve baskı düzeni sayfada sürüyor.
- Kura çıktısındaki fotoğraflı kartvizit ve fotoğrafa bağlı `index-preview` imza hareketi gerçek işletme fotoğrafı, adres ve iletişim bilgisi olmadığından kullanılamazdı. Yönün artefakt kompozisyonu korunup bu parçalar rota fişi ve çizilmiş araç hareketine uyarlandı.
- Fikir cümlesi: “Bu sayfada, iki adres + eşya hacmi + taşınma tarihi, teklif mesajına dönüşen bir taşıma fişi olur.” Bu demo müşteri girdileri olmadan kategoriye özgüdür; belirli bir rakip veya gerçek işletmeye özgü olduğu iddia edilmez.
- Tek canlı etkileşim: taşıma bilgilerini doldurup sayfa içinde gönderilmeyen teklif talebi taslağı oluşturma. Fiyat hesaplanmaz, bilgi saklanmaz veya sunucuya gönderilmez.

## Sayfa argümanı

- Hero: bu bir evden eve teklif fişi; ziyaretçi ne yapabilir → rota çizimi ve forma geçiş.
- Bilgiler: başlangıç teklif talebinde iki adres, eşya hacmi ve tarih toplanır → her biri kendi SVG çizimiyle anlatılır.
- Talep kartı: form verileri taslak olarak nasıl görünür → tarayıcı içinde oluşturulan, açıkça taslak işaretli mesaj.
- Kapanış: bunun örnek tema olduğunu ve işletme/alıcı bilgisi gerektiğini açıkça belirtir.

## Envanter ve içerik sınırı

- Gerçek işletme adı, telefon, adres, e-posta, bölge, fiyat, müşteri yorumu, istatistik, sertifika veya taşıma hizmeti girdisi sağlanmadı.
- Demo alanları: taşıma türü, çıkış ilçesi/şehri, varış ilçesi/şehri, yaklaşık ev/eşya hacmi ve tarih.
- Formun örnek fiş verisi `Kadıköy, İstanbul → Beşiktaş, İstanbul`, `2+1 ev`, `15.11.2026` olarak görünür ve “Örnek veri” diye işaretlidir; bu bir gönderi değildir.

## Mevcut temalardan ayrışma

- `oto-servis-1` servis kabul formunu ve araç görünüşünü gül/patlıcan renklerinde ele alır; burada ev taşıma fişi, rota çizgisi ve slate/sage/blush alanları var.
- `emlak-1` ev arama/listing kompozisyonudur; bu sayfa mülk değil, iki adres arasındaki taşınma talebini anlatır.
- `sanayi-1` işleme hassasiyetini ölçüm ve tolerans üzerinden sunar; nakliyat teması teklif girdilerini rota + hacim + tarihe bağlar.
- `yeme-icme-1` ad ve menü görsellerine; `klinik-1` sabit oda fotoğrafı ve okuma sütununa; `guzellik-1` afiş/fotoğraf değişimine; `spor-1` renk bölümleri ve program etkileşimine dayanır. Bu temada çizilmiş bir taşıma evrakı, tek talep taslağı etkileşimi ve düz renk stationery yüzeyleri kullanılır.
