# Taşınma Fişi — üretim raporu

Durum: örnek tema; gerçek işletme girdileri, alıcı adresi ve işletme kabulü yok.

## Yapılan

- Tema yalnız `nakliyat-1` klasörüne eklendi; düz HTML/CSS/JS, harici servis veya bağımlılık yok.
- Taste yönü `page-is-the-object`, seed `1429526214`; redraw yapılmadı. Fotoğraf kartı/preview bölümü yönün aynı fiş artefaktını koruyacak şekilde, elde olmayan işletme fotoğrafı ve iletişim bilgisini uydurmamak için SVG çizim ve fiş bölümüyle karşılandı.
- Fikir: iki adres, eşya hacmi ve taşınma tarihi taşıma fişinde bir araya gelir. Tek etkileşim formu doldurup tarayıcıda gönderilmeyen bir talep taslağı oluşturur.
- Form seçilen taşıma türünü, iki adresi, yaklaşık hacmi ve tarihi alır. İstemci tarafında zorunlu alan kontrolü ve tarih biçimlendirmesi vardır; backend, fiyat hesabı, kayıt veya iletim yoktur. JavaScript kapalıyken örnek fiş ve etkileşimin çalışmayacağını belirten metin görünür.
- Bir h1, kısa iki satırlı başlık, her bölüm için başlık, eşit dış kenar çerçevesi, klavye odağı, hareket azaltma tercihi ve etiketli alanlar eklendi.
- Bölüm elemanları görünürken kademeli giriş alır; SVG rotasındaki araç hareket eder. `prefers-reduced-motion` açıkken hareketler durur.

## Görseller

- Ağ erişimi yoktu; açık görsel arşivleri aranmadı ve gerçek fotoğraf indirilmedi. İstenen özgün çizimleri sağlamak için `assets/route.svg`, `assets/volume.svg`, `assets/date.svg`, `assets/doorway.svg` eklendi. Bunlar fotoğraf değildir ve gerçek fotoğraf tabanının yerini tutmaz.
- SVG'ler ev cepheleri, rota aracı, oda planı/koliler, takvim ve kapı siluetlerini tema paletinde gösterir; gerçek firma, taşıma işi veya müşteri fotoğrafı izlenimi vermez.

## Tipografi ve kaynaklar

- Kura Libre Franklin / Source Serif 4 verdi. Çevrimdışı tema deposunda bulunan yerel `General Sans` (başlıklar) ve `Imbue` (okuma metni) kullanıldı; fontlar `insaat-1/fonts/` içindeki dosyalardan kopyalandı. `General Sans` Fontshare lisanslı olduğuna mevcut `otel-1/RAPOR.md` referans veriyor. Harici font servisi yok.
- İki font ailesi kullanıldı. Fontların lisans ve dosya atıfları için kaynak tema klasörleri referans alınmalı.

## Açık kalanlar ve ölçülemeyenler

- Gerçek işletme adı, hizmet kapsamı, hizmet bölgesi, telefon/e-posta/WhatsApp alıcısı, çalışma saatleri, fiyatlama mantığı ve işletme onayı sağlanmadı. Bunlar eklenmeden örnek sayfa gerçek teklif kanalı değildir.
- Gerçek fotoğraf yok; istenen ağsız görsel kısıtı nedeniyle tema özgü SVG çizimleri kullanıldı.
- `taste-skill inspect.mjs index.html --widths 1280,390` denendi; inspect aracı yerel 127.0.0.1 sunucusunu açarken `EPERM` aldı. Bu yüzden tarayıcı ölçümü ve ekran görüntüsü eleştirisi alınamadı.
- Kullanıcının istediği `developer-test-evidence.mjs` komutu son değişiklikten sonra çalıştırıldı: 6 test geçti, 0 başarısız. Rapor güncellemesinden sonra aynı komut son kez çalıştırılacaktır.
