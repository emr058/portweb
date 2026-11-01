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
- Depolama ayarlı değilse `/basvuru` formu göstermez ("Başvuru formu yakında açılıyor", WhatsApp ve e-posta düğmeleri) ve API 503 verir; başvuru sessizce kaybolmaz. Ortam değişkenleri girilip yeniden yayınlanınca form kendiliğinden açılır.
- E-posta anahtarı yoksa başvuru yine kaydedilir; `notify_status` = `skipped`. E-posta gitmezse `failed`.
- Başvuruları Supabase > Table Editor'de görürsünüz; `status` sütunu (`new`, `contacted`, `quoted`, `won`, `lost`, `spam`) takip içindir.

## Güvenlik katmanları

- Tablo: RLS açık ve zorunlu, `anon`/`authenticated` yetkileri geri alınmış, politika yok. Yalnız sunucudaki `service_role` anahtarı erişir; bu anahtar `NEXT_PUBLIC_` ile başlamaz ve tarayıcıya gitmez.
- İstek: Origin kontrolü, JSON türü, 20 KB gövde sınırı, şema doğrulaması (zod).
- Spam: gizli tuzak alanı, 2,5 sn altı gönderim reddi, aynı kaynaktan saatte 3 başvuru, genel taşkın sınırı, 24 saatte aynı e-posta/telefon tekrarı. IP ham saklanmaz (tuzlu özet).
- Hata: iç ayrıntı istemciye dönmez, sunucuda PII içermeden loglanır.
- Onay kutusu yok: işleme dayanağı açık rıza değil, sözleşme öncesi talep (KVKK 5/2-c) ve meşru menfaat; kullanıcı `/aydinlatma` ile bilgilendirilir. Hangi sürümün gösterildiği her kayıtta `notice_version` olarak tutulur.
- Bildirim e-postası düz metindir (HTML yok).

Captcha eklenmedi. Yoğun spam gelirse Cloudflare Turnstile en küçük eklemedir (kapsam dışı bırakıldı).

## Testler

| Komut | Ne yapar |
|---|---|
| `npm test` | Şema, fiyat, WhatsApp ve başvuru ucu (sahte Supabase ve e-posta), 26 test |
| `PLAYWRIGHT_FROM=… node --import tsx tests/e2e/sales.mjs` | `npm run build` sonrası gerçek sunucu + sahte uçlar + Chromium/WebKit, masaüstü ve iPhone, 33 test |
| `PGLITE_FROM=… node supabase/tests/rls.mjs` | Migration'ı gerçek PostgreSQL motorunda çalıştırır; RLS ve kısıtları doğrular, 19 test |
| `node scripts/check-live-rls.mjs` | Gerçek Supabase projesinde anon erişimini dener |

`PLAYWRIGHT_FROM` ve `PGLITE_FROM`, ilgili paketin kurulu olduğu bir `package.json` yoludur (bu paketler depoya eklenmedi).

## Paylaşım görselleri

`public/og/*.jpg` (1200×630). Metni değiştirmek için `scripts/make-og.mjs` içindeki listeyi düzenleyip betiği çalıştırın.

## Açık kararlar

- Fiyatların KDV durumu talimatta yok; sayfalarda belirtilmedi.
- PACKAGES.md'deki "ilk 10 müşteriye 1 yıl ücretsiz destek" sözü talimatta olmadığı için sayfalara konmadı.
- Başvuru formundaki bilgilendirme metni taslaktır; yayından önce gözden geçirilmeli.

## Hukuki notlar ve yapılacaklar (1 Kasım 2026 araştırması)

Bu bölüm hukuki danışmanlık değildir; araştırma özetidir. Kesin karar için avukat ve mali müşavir görüşü alın.

| Konu | Durum | Yapılacak |
|---|---|---|
| Aydınlatma (KVKK m.10) | `/aydinlatma` taslak olarak hazır; metin `src/app/aydinlatma/page.tsx`, sürüm ve bilgiler `src/data/legal.ts` | Yayından önce gözden geçirin; adres ve vergi bilgisi netleşince `legal.ts` içine yazın; metin değişirse `noticeVersion` güncelleyin |
| Saklama süresi | Sözleşmeyle sonuçlanmayan başvurular 12 ay (`legal.retentionMonths`) | Her ay çalıştırın: `delete from public.applications where created_at < now() - interval '12 months' and status <> 'won';` |
| Yurt dışı aktarım (KVKK m.9, 7499 sayılı Kanun) | Supabase, Resend ve Vercel sunucuları yurt dışında olabilir | Sağlayıcıların veri işleme sözleşmelerini (DPA) kabul edin; KVKK standart sözleşmesini imzalayıp 5 iş günü içinde Kurum'a bildirin (avukatla) |
| VERBİS | 50'den az çalışan ve 100 milyon TL'den az bilanço için kayıt istisnası var (Kurul kararı 2023/1154); özel nitelikli veri işlenmiyor | Durumunuzun hâlâ istisna kapsamında olduğunu doğrulayın |
| Fiyat ve kampanya ifadeleri | "Liste fiyatı" üstü çizili gösteriliyor; kampanya koşulu yazılı | Liste fiyatı gerçekten uygulanacak fiyat olmalı; ilk 10 müşteriye ulaşınca kampanya fiyatlarını `pricing.ts`'ten kaldırın ve kaç sözleşme yapıldığını kaydedin. İspat yükü reklam verendedir |
| Vergi ve fatura | Sayfalarda yok | Düzenli satıştan önce vergi mükellefiyeti (şahıs şirketi vb.) ve fatura düzeni; hizmet sağlayıcı bilgisi için `legal.ts` |
| Müşteri adı, logo, fotoğraf | Mevcut proje sayfaları ve demolar müşteri markası ve ürün fotoğrafı içeriyor | Yazılı izin alın (WhatsApp mesajı yeterli); Telefoncu demosundaki harici mağaza görselleri kaldırılana kadar risk yüksek |
| İşveren | Satış sayfalarında işveren adı kullanılmadı | Çalışma sözleşmelerinde ikinci iş veya rekabet yasağı maddesi var mı kontrol edin |
| Çerez | Yalnız dil tercihi (yerel depolama); izleme yok | Analitik eklenirse çerez bilgilendirmesi gerekir |
| Pazarlama iletisi | Bildirim e-postası yalnız size gider | Müşterilere toplu duyuru gönderilecekse önceden izin (İYS) gerekir |
