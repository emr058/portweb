# Oda Anahtarı — yön ve fikir notu

## Kaynak brief durumu

İstenen `studio/management/strategy/TEMA-BRIEFLERI.md` ve `TEMA-HATTI.md` bu çalışma alanında bulunamadı; `/Users/ms/Desktop/2026` içinde dosya adıyla aramada da görünmedi. Bu nedenle §5'in oda/pansiyon özel isteklerini ve tema hattındaki önceki kararları doğrulayamadım. Aşağıdaki fikir genel TEMA-OTEL-1 isteği ve mevcut tema deposundaki README üzerinden kurulmuş demo yorumudur.

## Envanter ve sınırlar

- Konu: küçük bir butik otel ya da pansiyon; gerçek marka ve işletme adı verilmedi.
- Verilmiş somut malzeme: oda anahtarı, oda ve konaklama talebi; adres, şehir, sokak, kapı numarası yok.
- Verilmemiş: gerçek oda sayısı, oda adları, kişi kapasitesi, ücret, kahvaltı, giriş/çıkış saati, rezervasyon e-postası ve telefon.
- Müşteri fotoğrafı veya otelin kendisine ait eşya fotoğrafı yok.
- Arşivlerde bu konuya ait gerçek nesneler bulundu: anahtar panoları, numaralı otel anahtarları ve ziyaretçi defteri.
- Bir otel anahtarı, her odaya atanmış fiziksel erişim nesnesidir; anahtar etiketi de oda numarasını taşıyan küçük basılı bir kayıt nesnesidir.
- Oda seçimi, konaklama tarihleri ve ulaşılabilir talep adresi ziyaretçinin bu tür bir sayfada beklediği temel bilgilerdir.
- Sayfada yalnızca oda seçimi/tarihleri e-posta taslağına aktaran bir etkileşim vardır.
- Üç oda adı ve ücreti tasarım yoğunluğu için örnek olarak yazıldı; gerçek işletme bilgisi değildir.
- Yerel General Sans font dosyaları mevcut emlak temasından kopyalandı; yeni font indirilmedi.

## Taste kurası ve yön

`draw.mjs --options 3` çıktısı:

- `uneven-photographs`: fotoğrafları farklı boyutlarda bir baskı duvarı gibi dizer; çok sayıda fotoğrafa bağımlı.
- `name-as-monument`: işletme adını dev tipografik anıt yapar; gerçek bir isim envanteri yok.
- `page-is-the-object`: sayfayı gerçek bir basılı/fiziksel nesnenin oran ve gruplamasına göre kurar.

**Seçim: `page-is-the-object`.** Anahtarın üstünde oda numarası ve kısa kayıt taşıması, örnek pansiyonun oda listesini tek bir fiziksel düzen fikrinde birleştiriyor. Yönün dolu kâğıt alanları, keskin köşeleri ve büyük tek panel düzeni korundu. Tam yön çıktısındaki `Card over a dim room` hero'su, arşivdeki anahtar yakın planı karartılmış zemin ve opak kayıt kartıyla uygular. `Square plate` bölümünün geometrisi farklı ölçekte arşiv fotoğrafları, isimli oda kayıtları ve talep fişine uyarlandı. Pinned story, hero kartının ilk kaydırmada küçülmesiyle imza hareketi oldu.

Yönün arşiv fotoğrafı/atmosfer tercihi korunarak otel odası olmayan, kaynaklı görüntüler kullanıldı. Arşivdeki gerçek oda fotoğrafı yalnızca kendi arşiv açıklamasıyla gösterilir ve örnek pansiyonun odası olmadığı caption'da belirtilir. Arşivde yer alan her fotoğraf kendi tarihi/işletmesiyle başlıklandırılır.

## Fikir cümlesi ve rakip testi

Fikir: “Bu sayfada oda anahtarının küçük kayıt etiketi, pansiyonun oda seçimini ve konaklama talebini taşıyan bir anahtar fişine dönüşür.”

Bu fikir başka bir pansiyon için de çalışır; elde gerçek işletme adı, numarası, adresi veya kendine ait anahtar/oda geleneği olmadığı için rakip testini geçmiyor. Demo müşteri-özel tasarım iddiası taşımaz. İşletme envanteri geldiğinde cümledeki ilk unsur gerçek bir yer, numara, nesne ya da ritüelle değiştirilmelidir.

## Kopya destesi

- Okur: küçük bir otel/pansiyonda oda ve müsaitlik soran misafir adayı.
- İlk ekranın iddiası: bu sayfa oda bilgilerini verir ve talep e-postasını hazırlatır.
- İspat: doğrudan oda listesi, örnek kişi/ücret bilgisi ve talep formu.
- Tekrarlanan içerik boşluğu: gerçek adres ve işletme koşulları olmadığı için her örnek ve yer tutucu açıkça işaretlendi.
- Ana eylem: “Oda seç”. Talep formu düğmesi: “Talep e-postası oluştur”.

Argüman sırası:

1. **Oda seçin** → sayfanın ne işe yaradığını söyleyen tek, iki satırdan kısa başlık ve örnek talep bilgisi.
2. **Anahtarın izi** → oda anahtarı nesnesinin arşiv örnekleri.
3. **Üç farklı konaklama** → üç örnek oda, kapasite ve gecelik ücret.
4. **Konaklama defteri** → arşivdeki gerçek ziyaretçi defteri ve geçmiş oda görüntüsü.
5. **Konaklama talebi** → seçili oda ve tarihleri e-posta taslağına hazırlayan tek canlı etkileşim.
6. **Geliş bilgileri burada yer alır** → müşteriden beklenen gerçek adres/saat/telefon alanları.

## Tek canlı etkileşim ve yedek

Oda seçimi, giriş/çıkış tarihleri ve isteğe bağlı yanıt e-postası tek konaklama talep akışıdır. Düğme, tarayıcının e-posta uygulamasında alanları doldurulmuş `mailto:` taslağı açar. JS kapalıyken form `mailto:` action ile alan değerlerini tarayıcıya bırakır. Bilgiler sunucuya gönderilmez veya saklanmaz. `konaklama@example.com` açıkça örnek alıcıdır ve yayından önce değiştirilmelidir.

## Mevcut yedi temadan somut ayrışma

- **yeme-icme-1 / Odun:** ad tipografik anıt ve menü/yiyecek bağlamı; bu tema oda anahtarı fişi ve konaklama talebi etrafında kurulur.
- **sanayi-1 / Eksen:** tolerans, atölye ve üretim nesneleri; bu tema misafir odası/anahtarıyla fiziksel erişim ve konaklama seçimi anlatır.
- **klinik-1 / Nefes:** sabit oda fotoğrafı yanında sakin okuma sütunu; burada hero bir fotoğraf sunumu değil, küçülen opak anahtar fişidir.
- **guzellik-1 / Ela:** sabitlenmiş afiş, köşelere yayılan ad ve değişen portre/güzellik fotoğrafı; burada tipografik poster yerine kayıt nesnesinin bölümlendirmesi ve arşiv nesneleri kullanılır.
- **spor-1 / Tempo:** düz, parlak renk alanları ve canlı ders programı; burada frost/slate paleti ve oda/tarih talep formu vardır.
- **oto-servis-1 / Servis Defteri:** tipografik servis talep fişi ve araç kabul akışı; bu sayfada benzer bir işlem fişi mekanizması konaklama bağlamında oda, tarih ve kişi kapasitesine bağlanır, araç/arıza alanı yoktur.
- **emlak-1 / Mahalle Atlası:** fotoğraflı atlas paftaları, bölge/ilan kayıtları ve ilan filtresi; burada mahalle/portföy filtrelemesi yerine anahtar fişi biçimli konaklama talebi ve arşivdeki fiziksel anahtar nesneleri bulunur.

## Tasarım kısıtları

- Başlık tek görünür `h1`; yaklaşık 20 karakter ve 1280/390'da en fazla iki satır hedefiyle yazıldı.
- Opaque beyaz kart, koyu hero fotoğrafından ayrılır; hero metni fotoğraf üstünde değildir.
- En fazla beş görünür yazı ölçeği; minimum metin 13px, gövde 17px ve tam mürekkep rengindedir.
- CSS, renkleri değişkenlerden alır; yatay kaydırma üretmemesi hedeflenmiştir.
- Bölüm girişleri, tuş/bağlantı geri bildirimi ve küçülen kart imza hareketi eklendi. Reduced-motion altında animasyonlar kapatılır; içerik ilk HTML halinde görünürdür.
- Bütün görseller yereldir; dış servis ve uzak font yoktur.
