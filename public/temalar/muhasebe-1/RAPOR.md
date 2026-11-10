# Dönem Dosyası — üretim raporu

Tema: `muhasebe-1`  
Durum: müşteri bilgisi bekleyen, statik demo tema.

## Yapılan

- Tek sayfalı Türkçe HTML/CSS/JS teması ve klasör sekmesi art direction'ı oluşturuldu.
- `one-motif` yönü ve klasör sekmesi fikri korundu. Görünür tek `h1`, en çok iki satır; tanım ve ana bağlantı ilk ekranda, ilk karede görünür.
- Tek etkileşim: örnek dönem seçimi ve belge listesi güncelleme. JavaScript kapalıyken varsayılan örnek içerik kalır.
- Bölüm girişleri, klasör katmanının açılma imza hareketi ve düğme durumları eklendi; reduced-motion tercihinde öğeler statik/görünür.
- Renkler: gece zeminde kırık beyaz, kâğıt yüzeyde koyu mürekkep ve tek kızıl vurgu. Başlık ve fotoğraf alt yazıları ayrı zeminlerde; fotoğraf alt yazısı opak siyah zemin kullanır.
- Jost'un latin ve latin-ext dosyaları yerel `fonts/` klasörüne indirildi; CSS'de altı boyut rolü kullanıldı. Dış font servisi yok.
- Kök tema `README.md`, tasarım gerekçeleri ve ayrışma için `NOTLAR.md` eklendi.

## Görseller ve kaynak/lisans

Dört gerçek arşiv görseli `assets/` altında yerel kopya. Bunlar tarihî defter/hesap kayıtlarıdır; örnek bir müşterinin kayıtları olarak gösterilmez. Tam metadata `assets/credits.json` içindedir; sayfa altındaki kaynak bağlantıları da her görseli kaynaklar.

- `assets/pittsboro-merchant-business-ledger.jpg` — “Pittsboro Merchant Business Ledger” (1832–1834), Public Domain, [Wikimedia Commons kaynak sayfası](https://commons.wikimedia.org/wiki/File:Pittsboro_Merchant_Business_Ledger_-_DPLA_-_4cbfce8f8f08c14f851ab74af046c082_(page_258).jpg).
- `assets/ledger.png` — “Ledger” (1828), RaphaelQS, CC0, [Wikimedia Commons kaynak sayfası](https://commons.wikimedia.org/wiki/File:Ledger.png).
- `assets/accounts-book-holmes-mcdougall-4203789636.jpg` — “Accounts Book, Holmes McDougall”, Edinburgh City of Print, CC BY 2.0, [Wikimedia Commons kaynak sayfası](https://commons.wikimedia.org/w/index.php?curid=52151160).
- `assets/account-book-of-thomas-mister.jpg` — “Account-book of Thomas Mister”, CC BY 4.0, [Wikimedia Commons kaynak sayfası](https://commons.wikimedia.org/w/index.php?curid=36137926).
- Jost, Google Fonts indirme aracıyla `fonts/` içine yerel alındı; lisans SIL Open Font License 1.1. `fonts.css` latin ve latin-ext alt kümelerini tanımlar.

## Örnek içerik ve ölçülemeyenler

- Nisan–Haziran 2026 dönemleri ve satış/alış/banka/ücret belge başlıkları örnektir; müşavir ve müşterinin gerçek dosya sürecine göre değiştirilmeli.
- Briefte yazılı §7 ve `TEMA-HATTI.md` dosyaları çalışma alanında yoktu; müşavir adı, iletişim bilgisi, iş akışı ve hedef davranış alınamadı. Fikir cümlesi rakip testinden geçmiş değildir.
- İstenen `node /Users/ms/Desktop/2026/portweb/.claude/skills/taste-skill/scripts/inspect.mjs index.html --widths 1280,390` komutu çalıştırıldı; makinede Chrome/Edge/Chromium bulunmadığı için inspector başlatılamadı. Ekran görüntüsü ve sıfır FAIL ölçümü yok; CEO tarayıcıda ölçecek.
- Bu teslim için test/build, senkronizasyon, commit veya push yapılmadı.
