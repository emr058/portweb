# SIS-001 — Hazır sistemler

Telefoncu ve Takımtek için `/sistemler` galerisi ve `/sistemler/[id]` ayrıntı sayfaları eklendi. Sayfalar tema galerisiyle aynı satış bileşenlerini ve görsel düzeni kullanıyor; ayrı kategori adı **Hazır sistemler**. QR Menü kartı ve doğrudan demo bağlantısı yok. Ana menüye ve site alt menüsüne bağlantı eklendi; `/temalar` ile iki yönde çapraz bağlantı, canonical/OG metadata ve sitemap kayıtları var.

Sistem tanımları `src/data/systems.ts` içinde: beş özellik, kapsam, uygun işletme tanımı, örnek içerik notu, WhatsApp metni, medya yolları ve kaydedilecek demo rotaları. Medya dosyası yoksa galeri kapağı, ekran görüntüleri ve video bölümleri oluşturulmuyor. Yeni paket eklenmedi.

## Değişen dosyalar

- `src/data/systems.ts`
- `src/app/sistemler/page.tsx`
- `src/app/sistemler/[id]/page.tsx`
- `src/components/sales/SystemCover.tsx`
- `src/components/Navbar.tsx`, `src/components/world/SiteFooter.tsx`
- `src/app/temalar/page.tsx`, `src/app/sitemap.ts`, `src/app/globals.css`
- `scripts/sistem-kayit.mjs`
- `tests/e2e/sales.mjs` (testler eklendi, çalıştırılmadı)

## Kayıt betiği

Önce ilgili yerel demo sunucusunu açın. `systems.ts` içindeki `kayitYollari` rotalarının o sunucudaki sayfalara karşılık geldiğinden emin olun. Playwright bu ortamda kurulu olmalı ve `ffmpeg` komutu PATH üzerinde bulunmalı.

```sh
PLAYWRIGHT_FROM=/playwright-kurulum/package.json \
CHROMIUM_EXECUTABLE=/chromium/yolu \
node scripts/sistem-kayit.mjs telefoncu http://127.0.0.1:3001
```

`CHROMIUM_EXECUTABLE` isteğe bağlıdır; boş bırakılırsa Playwright'ın Chromium'u kullanılır. Betik dört adet 1280×800 JPEG (`ekran-1.jpg`–`ekran-4.jpg`) alır, ilkini `kapak.jpg` olarak kopyalar ve masaüstü/telefon akış videolarını üretir. Videolar yaklaşık 10 saniyedir; 1,5 MB sınırını aşarsa betik hata verir. Çıktı `public/sistemler/<id>/` altındadır. Demo çubuğu ve admin/yönetim bağlantıları kayıttan çıkarılır. `takimtek` için komutta id değerini değiştirin.

## Kontroller

- `npx tsc --noEmit` — geçti.
- `node node_modules/next/dist/bin/next build --webpack` — geçti; iki sistem sayfası statik üretildi.
- `tests/e2e/sales.mjs` — yeni rota, WhatsApp, sitemap ve medya yokken görünüm kontrolleri eklendi; istek doğrultusunda çalıştırılmadı.

## Açıklar

- Bu çalışma sırasında demo sunucusu URL'si verilmedi; ekran görüntüsü/video dosyaları üretilmedi. Sayfalar eksik medya ile derlendi ve medya alanlarını gizli tutuyor.
- `kayitYollari` içindeki örnek sayfa yolları gerçek demo uygulamasındaki yollarla eşleştirilmeli. Kayıt betiği her yolun HTTP yanıtını denetler ve geçersiz bir yol bulursa kaydı durdurur.
- Görsellerin içeriği ve yayın onayı kayıt tamamlandıktan sonra ayrıca gözden geçirilmeli.
