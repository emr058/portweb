# Tasarım notları

## Brief, envanter ve fikir

Sektör araştırmasındaki 10. satır: tarım / gıda üretimi ve toptan. Alıcının temel sorusu hangi ürünün hangi dönemde ve hangi miktar/ambalajla temin edilebileceğidir. Tek dönüşüm eylemi toptan talep taslağı hazırlamaktır.

Müşteriye ait bilgi verilmedi. Çalışma alanı bu nedenle örnek üretici adı, ürün listesi, dönem, ambalaj, kapasite, iletişim, adres, fiyat, sertifika, müşteri, yorum ve istatistik iddiası içermez. Ürün ve ambalaj örnekleri her yerde “örnek” diye işaretlenmiştir. Rakip testi işletmeye özgü unsurlar olmadığı için geçilmiş sayılmaz; bu çıktı sektör örneğidir.

Envanterde sektöre ait nesneler: hasat kasası, tohum ve yaprak biçimleri, ürün partisi etiketi, çuval, kraft torba, palet, sezon kaydı, teslim noktası, toptan talep metni. Bunlar sektör dünyasının görsel envanteridir; belirli bir üreticiye ait oldukları ileri sürülmez.

Fikir cümlesi: “Ürün dönemi ve ambalaj bilgisi, alıcının toptan talep taslağına dönüşür.” Rakip testi: aynı ifade başka üreticiye de uyabilir; müşteri adı, gerçek ürün dönemi veya özgün ambalaj gibi doğrulanmış girdi gelene kadar geneldir.

## Taste yönü ve kopya destesi

`taste-skill` ile `physical-product` sektöründe üç yön çekildi. `sentence-as-layout` seçildi (tam yön: `.taste-skill/tarim/direction.json`, seed `1518850608`). Büyük cümledeki görsel yuvası, mahsul kasası SVG’siyle kuruldu. “Tobacco and olive” paleti toprak ve zeytin tonlarını kullandığı için korundu. Çekilen hero fotoğraf istediğinden ve ağ kapalı / gerçek ürün fotoğrafı bulunmadığından hero slotu SVG çizimine uyarlandı. Font paketindeki Sentient/Zodiak/Hanken dosyaları çevrimdışı bulunmadığı için yerel lisans dosyasıyla birlikte Jost kullanıldı.

Kopya destesi:

- Okur: ürün dönemi ve ambalaj bilgisi arayan toptan alıcı.
- İlk ekran: örnek üretici teması; sezon ürünü, toptan talep eylemi.
- Sezon: örnek buğday, nohut ve zeytin kayıtları; üretici kendi dönemini doğrulayıp değiştirir.
- Ambalaj: çuval, kraft torba ve dökme örnekleri; ağırlık ve ölçü örnek içeriktir.
- Talep akışı: ürün, ambalaj, yaklaşık miktar; teslim ve iletişim bilgileri.
- Tek canlı etkileşim: alanları doldurup cihazda talep metni hazırlamak. Gönderim, saklama veya harici kanal yoktur. JavaScript kapalıyken taslak alanı düzenlenebilir ve kopyalanabilir.
- Yanıt bölümü, örnek alanların üretici tarafından hangi gerçek içeriklerle değiştirilmesi gerektiğini açıklar.

## Yedi temadan ayrışma

- `yeme-icme-1`: restoran adı ve menü akışı; bu temada sezon kaydı, ambalaj seçimi ve toptan alıcı metni öne çıkar.
- `sanayi-1`: makine/imalat estetiği; burada hasat kasası, ürün etiketi ve ambalaj SVG’leri kullanılır.
- `klinik-1`: sakin klinik oda düzeni; bu tema koyu zeytin zemin, iri cümle ve hasat nesnesiyle kurulur.
- `guzellik-1`: afiş ve salon portfolyosu; burada ürün dönemiyle ambalaj kaydı tek talep akışına bağlanır.
- `spor-1`: ders ve program içeriği; tarımsal sezon örnek satırları ile toptan miktar alanı bulunur.
- `oto-servis-1`: servis talep fişi; bu tema aynı form dilini kopyalamaz, ambalaj ve mahsulü görsel nesne ve ürün listesi olarak taşır.
- `emlak-1`: bölge ve ilan seçimi; burada hasat dönemi ile toptan teslim talebi yer alır.
