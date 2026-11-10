# Tasarım notları

## Envanter ve kapsam

Mevcut müşteri girdisi yalnızca sektör özeti: hukuk bürosu, çalışma alanları ve ilk görüşme talebi. Gerçek büro adı, konum, ekip, çalışma saatleri, fotoğraf, yayınlanabilir vaka/yorum, iletişim alıcısı ve onaylı hizmet metni verilmedi. Bu nedenle sayfadaki çalışma başlıkları, örnek akış ve ad/iletişim girdileri açıkça örnek olarak işaretlendi; gerçek müşteri kanıtı veya hukuki sonuç vaadi eklenmedi.

Bu sektör için aitlik envanteri: çalışma alanı dökümü; başvuru konusu; görüşme öncesi bilgi; dosya kapağı; sekmeli dosya ayıracı; boş görüşme föyü; konu ve iletişim bilgisi; ilk temas akışı; doğrulanacak hizmet metni; büronun eklenecek iletişim kanalı. Bunlardan ilk yedi unsur görsel ve içerik kararlarına yön verdi.

## Taste yönü

`draw.mjs --options 3` çıktısından `page-is-the-object` seçildi. Tam yön tohumu `1573456245`.

Fikir cümlesi: “Büronun çalışma alanı ve ilk görüşme ön bilgisi, sekmeli bir çalışma dosyası ve boş bir görüşme föyüne dönüşür.” Aynı cümle birçok hukuk bürosuna uygulanabildiği için bu hipotez müşteri özgüllüğü/rakip sınamasını geçmiyor. Müşteri envanteri gelmeden daha özgül iddia üretilemez; tema bu yüzden dürüst bir sektör demosu olarak kaldı.

`page-is-the-object` seçimi, ziyaretçinin hukuk bürosuyla ilişkilendirebildiği dosya ve görüşme föyü nesnelerini kullanıyor. Yönün gri kâğıt ve oxblood paleti korundu. Tam sayfada yönün verdiği hero “loş oda fotoğrafı” ve kıyı fotoğrafları, gerçek görsel yokluğu ve ağ yasağıyla çeliştiğinden SVG dosya çizimiyle değiştirildi. “Pinned story” imza hareketi için görüşme talebi başlığının masaüstünde form yanında sabit kaldığı bölüm kullanıldı. Çizimler fotoğraf değildir ve gerçek büro/evrak izlenimi vermemeleri için kişisel bilgi içermez.

## Tek etkileşim

İlk görüşme talep formu çalışma alanı, konu, ad-soyad ve iletişim bilgisi alır; tarayıcı içinde düzenlenebilir bir metin taslağı oluşturur. Form gönderimi, mailto, ağ isteği, kayıt veya kopyalama yapmaz. Ziyaretçi taslağı kendisi gözden geçirip seçerek kopyalar ve gerçek büro kanalına taşır. JavaScript kapalıysa gönderim yapılmadığını açıklayan bir yedek metin görünür.

## Diğer temalardan farkı

Bu tema restoranın ad/menü ağırlıklı görünümünü, sanayinin tolerans göstergesini, kliniğin bölünmüş fotoğraf sahnesini, güzelliğin afişini, sporun ders çizelgesini, oto-servisin kabul fişini ve emlağın mahalle haritasını tekrarlamıyor. Hukuk bürosuna özgü dosya kapağı ve ilk görüşme bilgi föyünü ana görsel nesne yapıyor. Renk kodu koyu kırmızı ve gri evrak yüzeyleri; gerçek büro adresi/ekibi/fotoğrafı gibi kanıtlar uydurulmadı.
