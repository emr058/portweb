# Yapı Kesiti — üretim raporu

Durum: bağımsız demo tema; işletme ve proje verisi olmadan müşteri işi iddiası taşımaz.

## Yapılan

- Taste becerisinin tam akışı uygulandı: üç yön kurası, `place-carries-it` seçimi, fikir cümlesi, argüman/kopya destesi, statik HTML/CSS/JS.
- Tam ekran fotoğraflı hero, arşiv fotoğraf galerisi, örnek yapı kesiti, katman seçimi, genel uygulama aşamaları ve kaynak footer’ı hazırlandı.
- Tek canlı etkileşim: `Kabuk`, `Taşıyıcı`, `Temel` seçenekleri çizimde ilgili bölümü vurgular. Bu seçim eksik olan §6 metninden teyit edilemedi; başlıktan çıkarılmış tema demosu kararıdır.
- Hero’da tek görünür h1 bulunur: “Yapı Kesiti”. Başlık ve temel içerik ilk HTML çiziminde hazırdır. Görsel üzerindeki bağlantı bandı düz koyu zemindir; yazı fotoğrafın üzerine bindirilmez.
- Bölüm girişleri, kontrol durum geçişleri ve hero fotoğraf çapraz geçişi eklendi. Reduced-motion ve görünmeyen sekmede animasyonu durdurma kuralları var.
- Gövde yazısı tam mürekkep renginde; palet metin ile zemin arasında yüksek kontrast sağlayacak koyu yeşil ve altın tonlarından oluşuyor. Başka renkli metin yalnızca aynı mürekkebin açık tonu.
- Örnek kesit çizimi mimari açıklama olarak kodla hazırlanmıştır; fotoğraf sayısına dahil değildir.

## Fotoğraf ve lisans kayıtları

Fotoğraflar `assets.mjs` ile Wikimedia Commons arşivinden indirildi; kaynak kayıtları `assets/credits.json` içinde. Sayfada her fotoğraf “Arşiv fotoğrafı” olarak işaretlidir.

- `food-nutrition-and-health-building-ubc-concrete.jpg` — “Food, Nutrition and Health Building, UBC - concrete facade on East Mall”, Travis Zhang, CC BY-SA 4.0.
- `a-photo-of-modern-architecture-in-amsterdam.jpg` — “A photo of modern architecture in Amsterdam…”, Fons Heijnsbroek, CC0.
- `2024-photo-of-the-interior-architecture-design.jpg` — “2024 - photo of the interior architecture design of the concrete hall of station Rotterdam Centraal…”, Fons Heijnsbroek, CC0.
- `shalom-shalome-apartment-close-up-of-facade.jpg` — “Shalom Shalome Apartment (Close Up of Facade)”, The Chroniclers, CC BY-SA 4.0.
- `timber-framed-building-under-construction-far-gosford.jpg` — “Timber-framed building under construction, Far Gosford Street…”, A J Paxton, CC BY-SA 2.0.

CC BY-SA görselleri yeniden renklendirilmedi veya birleştirilmedi; dosyalar değiştirilmeden tema içine kopyalandı. Ayrıntılı dosya sayfaları ve lisans URL’leri `assets/credits.json` içinde kayıtlı.

## Yerel yazı tipleri

- Imbue 400 (Latin ve Latin Extended) ve General Sans 400/500, mevcut tema deposundaki yerel dosyalardan kopyalandı. General Sans’ın Fontshare lisanslı olduğu depo içindeki `otel-1/RAPOR.md` kaydında belirtiliyor. Font dosyaları bu temada yerel yüklenir; dış font servisi kullanılmaz.
- `taste-skill` yönündeki Sentient yerelde bulunmadığı için mevcut yerel Imbue, başlık serif’i olarak eşlendi. Ana renk, kompozisyon ve imza hareketi kuradan korundu.

## Bilinmeyenler ve doğrulama

- İstenen `studio/management/strategy/TEMA-BRIEFLERI.md` §6 ve `TEMA-HATTI.md` dosyaları belirtilen çalışma alanında bulunmadığından brief’teki özgül tek etkileşim ve tema hattı teyit edilemedi. Bu durum `NOTLAR.md` içinde kaydedildi.
- `node /Users/ms/Desktop/2026/portweb/.claude/skills/taste-skill/scripts/inspect.mjs index.html --widths 1280,390` çalıştırıldı; Chrome/Edge/Chromium bulunmadığı için ekran görüntüsü ve tarayıcı ölçümü üretilemedi (`No Chrome/Edge/Chromium found`). CEO tarayıcıyla ölçmelidir.
- WCAG bağıl luminans hesabında metin `#f4d96c` / zemin `#133621` karşıtlığı 9.5:1, ikincil mürekkep `#ead57e` / zemin `#133621` karşıtlığı 9.08:1 çıktı. Fotoğrafların üstünde metin kullanılmıyor.
- Gerçek müşteri içeriği ve gerçek portföy fotoğrafları verilmedi. Bunlar yayın öncesi temayı kullanan ofis tarafından eklenmeli.
