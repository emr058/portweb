# Hukuk Bürosu — üretim raporu

Durum: örnek tema; gerçek büro içeriği, yetkili içerik incelemesi ve işletme kabulü bekliyor.

## Yapılan

- Statik `index.html`, `style.css` ve `app.js` hazırlandı. Dış servis, sunucu, uzaktan font veya üçüncü taraf JS yok.
- Tek etkileşim: ilk görüşme talep metni tarayıcıda hazırlanır; form alanları sunucuya gönderilmez ve saklanmaz. JS kapalıyken formun çalışmayacağı açıkça belirtilir.
- İlk ekranda görünür tek `h1` (“Çalışma alanı. / İlk görüşme.”) ve dosya kapağı SVG’si bulunur. Başlık en fazla iki satırdır.
- Bölüm girişleri, hero çizimindeki kısa yerleşme hareketi, düğme geri bildirimi ve masaüstünde sabit kalan görüşme başlığı eklendi. `prefers-reduced-motion` hareketi azaltır.
- Çizimler: `dosya-kapagi.svg`, `calisma-alanlari.svg`, `gorusme-akisi.svg`, `ilk-gorusme-formu.svg`. Dördü de özgün, kodla çizilmiş örnek görseldir; fotoğraf sayılmaz.
- İçerikte müşteri, ekip, yorum, vaka, başarı oranı, sertifika, istatistik, fiyat veya gerçek iletişim bilgisi uydurulmadı.
- `tests/theme.test.mjs` teslim dosyalarını, video metninin istenen alanlarını ve tarayıcıdaki talep taslağı akışını denetler.

## Yön ve sınırlamalar

- Taste yönü `page-is-the-object`, seed `1573456245`; tam sheet `direction.json` dosyasında.
- Fikir: çalışma alanı ve ilk görüşme ön bilgisi, sekmeli dosya ve boş görüşme föyüne dönüşür. Bu hâliyle başka bir hukuk bürosuna da uyduğu için müşteri özgüllüğü/rakip testi geçilmiş değildir.
- Yönün kıyı fotoğraf seti ve fotoğraflı loş oda hero’su ağ kapalı olduğu ve gerçek sektör görseli bulunmadığı için alınmadı; yerine özgün SVG evrak çizimleri kullanıldı. Gerçek fotoğraf indirilemedi. Taste kalite tabanındaki dört fotoğraf şartı bu ağ kısıtı altında karşılanmıyor; sayfa/varlık bunun saklandığı iddiasında bulunmuyor.
- Yönün STIX Two Text fontu temalardaki yerel font paketlerinde bulunmadı. Ağ kapalı olduğundan mevcut yerel Imbue serif ve Figtree sans dosyaları kullanıldı; iki aile de Türkçe karakterleri destekleyen yerel dosyalardır. Font dosyaları mevcut tema paketlerinden kopyalanmıştır. Imbue Google Fonts kataloğundan, Figtree Fontshare kataloğundan edinilmiş paketlerdir; font lisansı ve lisans metni bu tema klasörüne ayrıca kopyalanmadı.
- Örnek çalışma alanları ve işleyiş metni hukuk bürosu tarafından doğrulanmadan gerçek hizmet bilgisi olarak yayımlanmamalıdır. Gerçek büro iletişim alıcısı olmadığı için taslak gerçek bir adrese gönderilmez.

## Kaynaklar

- Görsel kaynağı: dört SVG çizimi bu tema için el ile kodlandı; açık koleksiyonlar ağ olmadığı için aranmadı. Fotoğraf indirme/kredi kaydı yoktur.
- Yazı tipleri: `emlak-1/fonts/Imbue-400-latin*.woff2` ve `oto-servis-1/fonts/Figtree-400/600-latin*.woff2` paketlerinden kopyalandı. Tema yalnızca yerel font dosyalarını çağırır.
- Figtree lisans metni `fonts/Figtree-OFL.txt` içinde (SIL Open Font License 1.1; mevcut oto-servis paketinden kopyalandı). Imbue dosyaları mevcut emlak teması yerel kopyasından alındı; kaynak klasörde lisans metni bulunmadığından Imbue lisansı bu raporda teyit edilmiş olarak gösterilmiyor.
- Taste yön dosyası: `direction.json`, seed `1573456245`.

## Doğrulama

- Kullanıcının verdiği Node test-evidence komutu 3 testi çalıştırdı; 3 geçti, 0 başarısız oldu. İlk deneme sıfır test bulduğu için başarısız olmuştu; yerel test dosyası eklenip komut sonrasında başarıyla tekrarlandı.
- Taste `inspect.mjs hukuk-1/index.html --widths 1280,390` başlatıldı, ancak sandbox `127.0.0.1` yerel sunucu açma işlemini `EPERM` ile engelledi. Tarayıcı önizlemesi de bu oturumda erişilebilir olmadığından ekran görüntüsü ve mobil görünüm incelemesi yapılamadı; sonuç veya 0 FAIL iddiası verilmez.
- El ile görsel kontrol / işletme içerik onayı yapılmadı.
