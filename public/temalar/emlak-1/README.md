# Mahalle Atlası · emlak ofisi

Statik, bağımsız çoğaltılabilir demo tema. `index.html` doğrudan tarayıcıda açılır; paket, build adımı, dış font veya harita servisi yoktur.

## Dosyalar

- `index.html` — içerik, erişilebilir semt planı SVG'leri ve örnek ilanlar
- `style.css`, `fonts.css` — görünüm ve yerel font tanımları
- `app.js` — tek etkileşim: mahalle ve satılık/kiralık filtreleri
- `fonts/` — yerel General Sans ve Imbue font dosyaları
- `.taste-skill/direction.json` — üç seçenek sonrası alınan tam yön sayfası
- `NOTLAR.md` — yön seçimi ve fikir notu
- `RAPOR.md` — içerik sınırları, doğrulama ve açıklar

## İçerik değiştirme

Örnek bölge adları, ilan bedelleri, alanlar ve kayıtlar yayın öncesi gerçek ofis bilgileriyle değiştirilmelidir. Gerçek mahalle sınırları, portföy, danışman, adres, çalışma biçimi ve iletişim bilgileri olmadan bu sayfa canlı ofis sitesi sayılmaz. Filtreler `data-neighborhood` ve `data-kind` alanlarını kullanır; HTML'deki seçeneklerle bu alanlar birlikte güncellenmelidir.

Harita çizimleri SVG olarak kodla üretildi; coğrafi doğruluk iddiası taşımaz. Harita servisi veya dış görsel kaynağı kullanılmıyor.
