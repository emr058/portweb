# Ders Takvimi — üretim raporu

## Yapılan

- Yeni, bağımsız statik tema oluşturuldu: `index.html`, `style.css`, `app.js`, yerel fontlar ve `assets/`.
- Taste yönü `page-is-the-object`, seed `859635868`. Yeniden çekim yapılmadı.
- Fikir: “Bu sayfada kursun haftalık ders çizelgesi, bir syllabus yaprağına dönüşür.”
- Tek canlı etkileşim, gün seçerek örnek dersleri filtreleme. Başlangıç HTML'si bütün programı içerir; filtre JavaScript kapalıyken çalışmaz ama içerik erişilebilir kalır.
- Hero'da tek görünür `h1`, iki satır; ana nesne, koyu zemin üzerindeki açık program yaprağı ve büyük başlıktır. Açık/koyu metin alanları ayrıdır; metinler fotoğraf üstüne bindirilmez.
- Yerel fontlar: Gambarino 400, General Sans 400/500. Fontshare indirme betiğiyle yerel WOFF2 alındı; sayfada uzaktaki font servisi yok.
- Hareketler: hero yaprağının imza gelişi, bölüm ve fotoğraf girişleri, fotoğrafta yavaş ölçek kayması, buton/filtre hover-active-focus geri bildirimi. `prefers-reduced-motion` seyahati kapatıp içeriği görünür tutar.
- Örnek dersler, saatler, yaş grupları, dönem ve biçimler gerçek veri değildir; her ilgili bölümde örnek olduğu belirtilmiştir. Sahte müşteri, yorum veya istatistik eklenmedi.

## Kaynaklar ve lisanslar

Beş gerçek eğitim fotoğrafı `taste-skill/scripts/assets.mjs` ile Wikimedia Commons'tan indirildi; lisans/kredi metadata'sı `assets/credits.json` dosyasında. Footer'da “Görsel kaynakları” bölümünde ve görsel alt yazılarında kaynaklandı:

- `classroom-in-goma-eastern-drc-25765237378.jpg` — “Classroom in Goma, Eastern DRC (25765237378)”, USAID in Africa, public domain; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Classroom_in_Goma,_Eastern_DRC_(25765237378).jpg).
- `adult-education-beirut-unesco-photo0000004400-0001.jpg` — “Adult education, Beirut — UNESCO — PHOTO0000004400 0001”, Dominique Roger, CC BY-SA 3.0; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Adult_education,_Beirut_-_UNESCO_-_PHOTO0000004400_0001.tiff).
- `students-at-a-school-in-bangalore-india.jpg` — “Students at a school in Bangalore, India learning to code on Progate”, Nayakyashraj, CC BY-SA 4.0; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Students_at_a_school_in_Bangalore,_India_learning_to_code_on_Progate.jpg).
- `tabletunterricht-06.jpg` — “Tabletunterricht 06”, Aigner Ronja, CC0; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Tabletunterricht_06.jpg).
- `adult-education-marianao-unesco-photo0000000135-0001.jpg` — “Adult education, Marianao — UNESCO — PHOTO0000000135 0001”, Dominique Roger, CC BY-SA 3.0; [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Adult_education,_Marianao_-_UNESCO_-_PHOTO0000000135_0001.tiff).

Yerel fontlar Fontshare'den indirilmiştir; `_tools/getfontshare.py` açıklaması fontların ticari kullanımına izin verildiğini belirtiyor. Görsel/illüstrasyon için SVG çizimi kullanılmadı.

## Doğrulama ve ölçülemeyenler

- İstenen komut: `node /Users/ms/Desktop/2026/portweb/.claude/skills/taste-skill/scripts/inspect.mjs index.html --widths 1280,390`.
- Komut denendi ancak Chrome/Edge/Chromium bulunmadığından açılışta durdu; bu nedenle ekran görüntüsü, ölçüm sonucu veya 0 FAIL iddiası yok. CEO'nun tarayıcıda ölçmesi gerekiyor.
- `lint.mjs index.html style.css app.js`: yasaklı desen bulunmadı.
- İstenen `studio/management/strategy/TEMA-BRIEFLERI.md` §3 ve `TEMA-HATTI.md` dosyaları `/Users/ms/Desktop/2026` ve `/Users/ms/Desktop` içinde bulunamadığından, canlı etkileşimin özgün brief metni ve o dosyalardaki strateji maddeleri teyit edilemedi. Mevcut interaction gün filtresi kullanıcı başlığından türetildi.
- Gerçek işletme içeriği, adres, iletişim, ders envanteri ve marka yönergesi sağlanmadı; tüm ders kayıtları örnek veri.
- Tarayıcı ekran görüntüsü ve otomatik renk/kontrast ölçümü yapılamadı. Metin/zemin tokenları ayrı ve muted metin de koyu mürekkep rengindedir; nihai tarayıcı doğrulaması CEO ölçümüne bağlıdır.
