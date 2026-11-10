# Yapı Kesiti — yön ve fikir notu

## Girdi ve envanter

İstenen `studio/management/strategy/TEMA-BRIEFLERI.md` §6 ve `TEMA-HATTI.md` bu çalışma alanında bulunamadı. Klasör adıyla `/Users/ms/Desktop/2026` içinde arama da sonuç vermedi. Bu nedenle §6 metnindeki kesin kapsam ve tek etkileşim teyit edilemedi. Kapsamı görünen başlığa göre “mimarlık / inşaat” olarak yorumladım; müşteri veya proje bilgisi verilmedi.

Bilinen tema girdileri:

- Tema başlığı: Yapı Kesiti.
- Sektör: inşaat ve mimarlık.
- Müşteri/ofis adı, konum, yapı türü, hizmet kapsamı, portföy, ekip ve iletişim: verilmedi.
- İşletmenin kendi yapı fotoğrafları veya çizimleri: verilmedi.
- Bu sebeple müşteri, teklif, proje sonucu, performans ölçüsü veya yorum yok.
- Temaya özgü fiziksel nesne: yapının düşey kesiti ve katman ilişkisi.
- Kullanılabilir görsel envanteri: açık lisanslı mimarlık ve yapım fotoğrafları.
- Fotoğraflar: Amsterdam, Vancouver, Rotterdam, Addis Ababa ve Coventry’den arşiv kayıtları.
- Tema içinde örnek çizim: kabuk, taşıyıcı çerçeve ve temel ilişkisini gösteren CSS kesit şeması.
- Etkileşim için doğrulanmış brief talimatı: mevcut değil.

## Taste seçenekleri ve seçim

Üç seçenek `draw.mjs --sector architecture ... --sections showcase how-it-works proof cta --tone technical --options 3` ile üretildi:

- `place-carries-it` — mekân fotoğrafı ilk ekranı taşır.
- `dark-room` — karanlık alan içinde aydınlatılmış nesneler.
- `uneven-photographs` — değişen ölçekte, galeri gibi yerleştirilmiş fotoğraflar.

`place-carries-it` seçildi. Başlıktaki yapı kesiti fikrini mekân ve malzemeye ait gerçek fotoğraflarla anlatıyor. Tam yön çıktısı `.taste-skill/direction.json` dosyasında. Doğrulanmış müşteri fotoğrafı olmadığı için açık koleksiyon fotoğrafları yalnızca “arşiv fotoğrafı” diye işaretlendi. Tek canlı etkileşim, eksik §6 brief’i nedeniyle başlıktan hareketle seçilen katman vurgulayıcı kesit şemasıdır.

## Fikir ve kopya destesi

Fikir cümlesi: “Bu sayfada, bir yapının kabuk, taşıyıcı ve temel katmanları; okurun seçip inceleyebildiği bir kesit şemasına dönüşür.” Bu ifade genel bir yapı temasına da uygulanır. Müşteri envanteri ve yakın rakip olmadan özgün marka fikri olduğu ileri sürülmüyor.

Sayfa argümanı:

1. Yapı mekânı ve malzemesiyle okunur → ilk ekranda tam boy arşiv yapı fotoğrafı.
2. Cephe, iç mekân ve yapım farklı ölçeklerde incelenir → dört arşiv fotoğrafı, her birinde yer ve kaynak niteliği.
3. Katmanların yük ve çevre ilişkisi vardır → örnek kesit çizimi ve kullanıcı seçimi.
4. İş bir tasarım ve uygulama akışından geçer → üç aşamalı genel süreç açıklaması.

Örnek hizmet, müşteri, ofis, adres, istatistik, referans veya proje başarısı kurgulanmadı. Tüm metin demo ve genel açıklama niteliğinde.

## Diğer temalardan somut ayrışma

- `yeme-icme-1`, işletme adını tipografik anıt ve menü etrafında kuruyor; bu sayfa adı değil, yapı kesiti ve katman diyagramını ana konu yapıyor.
- `sanayi-1`, CNC toleransı ve hassas üretim göstergeleriyle çalışıyor; burada tolerans verisi veya makine görseli yok, fotoğraflar yapı ve mekân arşivinden.
- `klinik-1`, sabit oda fotoğrafı ile okuma sütununu bölünmüş sahnede kullanıyor; burada tam ekran yapı fotoğrafı, ayrı ölçekte fotoğraf dizisi ve teknik kesit açıklaması var.
- `guzellik-1`, sabitlenmiş afiş ve değişen fotoğrafın portre odaklı kompozisyonu; bu tema insan/portre görseli yerine cephe, taşıyıcı ve yapım izlerini kullanıyor.
- `spor-1`, renk alanlarında ders programı ve hareketli program bilgisini öne çıkarıyor; bu tema tek koyu yeşil alan, fotoğraf ve seçilebilir kesit katmanlarıyla çalışıyor.
- `oto-servis-1`, blush/patlıcan paletinde araç kabul fişi ve belirti/gün bilgisini mesaja dönüştürüyor; burada sıcak yeşil-altın palet, yapı kesiti ve katman seçimi var.
- `emlak-1`, semt atlası ve ilan filtrelemesi; burada coğrafi parsel ve ilanlar yok, yapı elemanlarının düşey ilişkisi var.

## Hareket ve erişim

Yönün imza hareketi hero fotoğraflarının yavaş çapraz geçişidir; sekme gizliyken durur. Bölüm içeriği görünür alana girince bir kez belirir. Katman seçimi düğmeleri en az 48px yüksekliğinde dokunma alanına, klavye odağına ve `aria-pressed` durumuna sahiptir. `prefers-reduced-motion` altında fotoğraf değişimi, geçiş ve kaydırma yumuşatması kapalıdır. JavaScript yoksa kesit açıklamalarının tamamı görünür kalır.
