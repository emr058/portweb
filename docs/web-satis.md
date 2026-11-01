# Web sitesi satış bölümü

Sayfalar: `/web-sitesi`, `/fiyatlar`, `/sanayi-cozumleri`, `/basvuru`. Yalnız Türkçe; menü etiketleri TR/EN dil düğmesine uyar.

## Fiyatları değiştirmek

Tek kaynak: `src/data/pricing.ts`. Paket fiyatları, kampanya, ek hizmetler, hariç tutulanlar ve karşılaştırma satırları buradadır. Sayfalar, WhatsApp mesajları ve sayfa açıklamaları buradan okunur; başka yerde tutar yazılı değildir. Bakım katmanlarının kapsam maddeleri henüz yok: `maintenancePlans[].includes` doldurulunca sayfaya eklenecek şekilde bırakıldı.

## Başvuru sistemi

Akış: form → `POST /api/basvuru` (sunucuda şema doğrulaması) → Supabase `applications` tablosu → yönetici e-postası.

Kurulum (bir kez):
1. Supabase'de proje açın. SQL Editor'de `supabase/migrations/001_applications.sql` dosyasını çalıştırın.
2. Vercel > Settings > Environment Variables (Production) alanlarına `.env.example` içindeki değişkenleri girin: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `IP_HASH_SECRET`, `RESEND_API_KEY`, `NOTIFY_EMAIL_TO`, `NOTIFY_EMAIL_FROM`, isteğe bağlı `NEXT_PUBLIC_WHATSAPP_NUMBER`. Anahtarlar sohbete, e-postaya veya depoya yazılmaz.
3. Yeniden yayınlayın. Sonra: `SUPABASE_URL=… SUPABASE_ANON_KEY=… node scripts/check-live-rls.mjs` (anon anahtarın tabloya erişemediğini doğrular).
4. Siteden bir deneme başvurusu gönderin; Supabase'de `applications` tablosunda ve e-postada görün. Deneme satırını silin.

Davranış:
- Depolama ayarlı değilse form 503 verir ve ziyaretçiyi WhatsApp'a yönlendirir; başvuru sessizce kaybolmaz.
- E-posta anahtarı yoksa başvuru yine kaydedilir; `notify_status` = `skipped`. E-posta gitmezse `failed`.
- Başvuruları Supabase > Table Editor'de görürsünüz; `status` sütunu (`new`, `contacted`, `quoted`, `won`, `lost`, `spam`) takip içindir.

## Güvenlik katmanları

- Tablo: RLS açık ve zorunlu, `anon`/`authenticated` yetkileri geri alınmış, politika yok. Yalnız sunucudaki `service_role` anahtarı erişir; bu anahtar `NEXT_PUBLIC_` ile başlamaz ve tarayıcıya gitmez.
- İstek: Origin kontrolü, JSON türü, 20 KB gövde sınırı, şema doğrulaması (zod), onay kutusu zorunlu.
- Spam: gizli tuzak alanı, 2,5 sn altı gönderim reddi, aynı kaynaktan saatte 3 başvuru, genel taşkın sınırı, 24 saatte aynı e-posta/telefon tekrarı. IP ham saklanmaz (tuzlu özet).
- Hata: iç ayrıntı istemciye dönmez, sunucuda PII içermeden loglanır.
- Bildirim e-postası düz metindir (HTML yok).

Captcha eklenmedi. Yoğun spam gelirse Cloudflare Turnstile en küçük eklemedir (kapsam dışı bırakıldı).

## Testler

| Komut | Ne yapar |
|---|---|
| `npm test` | Şema, fiyat, WhatsApp ve başvuru ucu (sahte Supabase ve e-posta), 25 test |
| `PLAYWRIGHT_FROM=… node --import tsx tests/e2e/sales.mjs` | `npm run build` sonrası gerçek sunucu + sahte uçlar + Chromium/WebKit, masaüstü ve iPhone, 31 test |
| `PGLITE_FROM=… node supabase/tests/rls.mjs` | Migration'ı gerçek PostgreSQL motorunda çalıştırır; RLS ve kısıtları doğrular, 19 test |
| `node scripts/check-live-rls.mjs` | Gerçek Supabase projesinde anon erişimini dener |

`PLAYWRIGHT_FROM` ve `PGLITE_FROM`, ilgili paketin kurulu olduğu bir `package.json` yoludur (bu paketler depoya eklenmedi).

## Paylaşım görselleri

`public/og/*.jpg` (1200×630). Metni değiştirmek için `scripts/make-og.mjs` içindeki listeyi düzenleyip betiği çalıştırın.

## Açık kararlar

- Fiyatların KDV durumu talimatta yok; sayfalarda belirtilmedi.
- PACKAGES.md'deki "ilk 10 müşteriye 1 yıl ücretsiz destek" sözü talimatta olmadığı için sayfalara konmadı.
- Başvuru formundaki bilgilendirme metni taslaktır; yayından önce gözden geçirilmeli.
