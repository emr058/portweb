# Servis Defteri — üretim raporu

Tema: `oto-servis-1`  
Durum: demo tema; gerçek işletme içeriği ve işletme kabulü bekleniyor.

## Yön ve fikir

- Taste yönü: `type-only-statement`, tam sayfa çekim tohumu `794412986`; yön ve palet korunmuştur.
- Fikir: “Bu sayfada servis kabulünde gereken araç, belirti ve gün bilgileri, işletmeye gönderilmeye hazır bir talep fişine dönüşür.”
- Tek canlı akış aynı kaldı: araç, talep, belirti ve günü girip mesaj taslağı oluşturma; paylaşım desteklenmezse metni seçip kopyalama.

## Yapılan düzeltmeler

- Hero başlığı görünür, tek `h1` ve iki kısa satır oldu. Başlık artık aynı renk zeminde değil; metin başlık alanının önünde kalıyor.
- İlk ekranın ana öğesi büyük “SERVİS / TALEBİ” başlığı; destek cümlesi kısaltıldı ve eylem düğmesiyle birlikte gösteriliyor.
- Servis talep fişinin altındaki uzun boşluklar azaltıldı; fotoğraflı “Kontrolün izleri” bölümü eklendi.
- Başlık satırları, görseller, süreç maddeleri ve kontrol listesi için bölüm giriş hareketi; hero için kısa başlık ve fotoğraf girişleri eklendi. Hareketler transform/opacity ile sınırlı, reduced-motion tercihinde statik.
- Metin boyutları body, lead, bölüm başlığı, madde başlığı ve hero için tutarlı bir ölçü dizisine toplandı.
- Dört gerçek fotoğraf indirildi ve sayfada açıklayıcı alt metin/caption ile kullanıldı. Kaynak künyeleri footer’daki “Görsel kaynakları” açılır alanında.

## Görseller ve kaynaklar

- `assets/pc-kinyanjui-automotive-workshop.jpg` — “PC kinyanjui Automotive Workshop”, Thagana peters, CC BY-SA 4.0. [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=65768020)
- `assets/tools-and-parts-are-collected-in-a.jpg` — “Tools and parts are collected in a metal bowl at an automotive workshop”, Shixart1985, CC BY 2.0. [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=186889615)
- `assets/close-up-view-of-engine-components-showcasing.jpg` — “Close-up view of engine components…”, Shixart1985, CC BY 2.0. [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=196497950)
- `assets/close-up-view-of-a-worn-clutch.jpg` — “Close-up view of a worn clutch disc…”, Shixart1985, CC BY 2.0. [Wikimedia Commons](https://commons.wikimedia.org/w/index.php?curid=196497948)
- Görsel dosyaları ve lisans/kredi metadata’sı `assets/credits.json` içinde kayıtlıdır. SVG araç ve kabul çizimleri tema için kodla hazırlanmıştır; fotoğraf sayısına dahil değildir.

## İçerik ve doğrulama

- Örnek hizmetler, bakım maddeleri ve talep alanları gerçek işletme tarafından doğrulanmalıdır. Adres, bölge, saat ve telefon/mesaj alıcısı hâlâ eklenmemiştir.
- İstenen inspect komutu `node …/inspect.mjs index.html --widths 1280,390` iki klasörde de başlatıldı fakat Chrome/Edge/Chromium bulunmadığı için çalışamadı. Ekran görüntüsü veya sıfır FAIL sonucu iddia edilmiyor; CEO’nun tarayıcı inspect’i bekleniyor.
- Bu değişiklikler için ayrıca test/build çalıştırılmadı.
