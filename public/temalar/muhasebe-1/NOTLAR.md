# Tasarım notları

## Brief ve envanter

İstenen `studio/management/strategy/TEMA-BRIEFLERI.md` §7 ve `TEMA-HATTI.md` verilen çalışma alanında bulunamadı; `/Users/ms/Desktop/2026` altında da yok. Bu nedenle müşteri adı, hedef sektör alt grubu, gerçek dosya akışı, rakip URL'si ve briefte yazılı canlı etkileşim doğrulanamadı. Çalışma, “küçük işletmeler ve serbest çalışanlar için mali müşavirin dönem sonu belge toplama dosyası” varsayımıyla demo olarak kuruldu.

İçerik envanteri: mali müşavir; dönem sonu belge teslimi; ay seçimi; klasör ve sekme; satış faturası; alış ve gider belgeleri; banka ekstreleri; POS/tahsilat dökümleri; varsa puantaj ve ücret değişikliği; kontrol edilip iletilen dosya; ticari defter arşivleri. Bunlar demo girdileridir; gerçek bir müşterinin özel bilgileri veya takvimi değildir.

## Taste yönü

`draw.mjs --options 3` (`finance`, `technical`, arşiv defteri konusu) seçenekleri:

- `quiet-instrument` — dar okuma kolonu ve küçük teknik gösterimler.
- `type-only-statement` — tipografik giriş, fotoğrafları aşağıda kullanma.
- `one-motif` — klasör sekmesi biçimini sayfa sistemi olarak büyütüp yineleme.

Seçim: `one-motif`. Klasör sekmesi, teslim edilen dönem dosyasının somut nesnesidir; hero'daki büyük klasör tabakası, bölüm biçiminde, düğme köşelerinde ve belge satırlarının işaretinde tekrar eder. Palet, yön sayfasındaki siyah/kızıl oranını korur. Tasarım sürecinde yön yeniden çekilmedi.

## Fikir ve rakip testi

Demo fikir cümlesi: “Bu sayfada mali müşavire gidecek ay sonu kayıtları, seçilen döneme ait örnek belge dosyasına dönüşür.” Briefte belirli müşavir/ofis, adı, şehir, iş akışı veya rakip bilgisi olmadığı için fikir kategori seviyesindedir; yakın rakip testini geçmiş sayılmaz. Gerçek brief ve ofis envanteri geldiğinde bu cümle ve sayfa verisi somutlaştırılmalıdır.

## Argüman ve kopya destesi

1. Bu, mali müşavire iletilecek dönem dosyasıdır → büyük klasör yığını ve açık tanım.
2. Dönem seçilince örnek liste o dönemin dosyasını gösterir → çalışan seçici.
3. Eski muhasebe defterleri kayıt tutma fikrini taşır → dört kaynaklı arşiv fotoğrafı; hiçbirisi müşteri işi gibi sunulmaz.
4. Liste örnektir ve müşavirle uyarlanır → dört gruplu belge listesi ve açık etiket.
5. Dosya kontrol edilip müşavire iletilir → kapanış çağrısı.

## Tek canlı etkileşim

Örnek ay seçip “Dosyayı göster” düğmesine basınca dönem başlığı, kısa not ve örnek belge grupları değişir. Kontrol klavye ve başparmakla kullanılabilir. JavaScript kapalıyken varsayılan Nisan örneği ve yedek belge listesi sayfada kalır; veri saklama veya gönderme yoktur. Briefteki gerçek akış sağlanmadığından bu, demo etkileşimidir.

## Mevcut temalardan ayrışma

- `yeme-icme-1`: lokanta adını sayfa mimarisine dönüştüren tipografik anıt yerine dönem klasörü ve kayıt listesi.
- `sanayi-1`: CNC tolerans aleti/atölye anlatısı yerine ticari defter sekmeleri ve mali kayıt grupları.
- `klinik-1`: sabit oda fotoğraflı bölünmüş sahne yerine sayfa boyunca ilerleyen klasör düzeni.
- `guzellik-1`: sabitlenmiş afiş ve değişen portre yerine numaralı dönem föyü ve arşiv defterleri.
- `spor-1`: renk alanlarıyla program akışı yerine tek kızıl klasör sekmesiyle dosya düzeni.
- `oto-servis-1`: servis talep fişi ve otomotiv kabul çizimleri yerine ay sonu belgelerini sınıflandıran dönem dosyası.
- `emlak-1`: mahalle atlası/ilan paftaları yerine dönem seçimi ve belge grupları; harita ve portföy fotoğrafı kullanmaz.
