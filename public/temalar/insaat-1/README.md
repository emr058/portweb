# Yapı Kesiti

Bağımsız, statik mimarlık ve inşaat tema demosu. `index.html` tarayıcıda doğrudan açılır; paket yöneticisi, sunucu, harici font servisi ve üçüncü taraf JavaScript bağımlılığı yoktur.

## Dosyalar

- `index.html` — içerik, örnek kesit ve açık arşiv görselleri
- `style.css`, `fonts.css` — tema stili ve yerel font tanımları
- `app.js` — tek etkileşim: örnek yapı kesitinde katman seçimi
- `assets/` — indirilen fotoğraflar ve `assets/credits.json` lisans/kredi kaydı
- `fonts/` — yerel Imbue ve General Sans fontları
- `.taste-skill/direction.json` — seçenek kurasından sonra seçilen tam yön
- `NOTLAR.md` — yön kararı, fikir ve diğer temalardan ayrışma
- `RAPOR.md` — teslim özeti, kaynaklar ve doğrulama durumu

## Gerçek işletmeye uyarlama

İşletme adı, ekip, adres, hizmet kapsamı, proje portföyü ve iletişim bilgisi verilmedi; tema bunlar için sahte kayıt üretmez. Arşiv fotoğrafları ofisin işi gibi kullanılmamalıdır. Yayın öncesi işletmenin gerçek iş fotoğraflarıyla, doğrulanmış hizmetleriyle ve iletişim kanalıyla değiştirin. Kesit şeması yalnızca tema örneğidir, uygulama projesi değildir.

Tek etkileşim kesitte `Kabuk`, `Taşıyıcı` ve `Temel` katmanlarından birini vurgular. JavaScript kapalıysa tüm katman açıklamaları listelenir.
