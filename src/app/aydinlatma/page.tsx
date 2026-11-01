import type { Metadata } from "next";
import { legal } from "@/data/legal";
import { salesMetadata } from "@/lib/sales-metadata";

export const metadata: Metadata = {
  ...salesMetadata({
    path: "/aydinlatma",
    title: "Aydınlatma metni",
    description: "Web sitesi başvuru formunda toplanan kişisel verilerin nasıl kullanıldığı (KVKK madde 10).",
    image: "basvuru",
  }),
  robots: { index: false, follow: true },
};

export default function AydinlatmaPage() {
  return (
    <div className="sales">
      <header className="sales-hero" style={{ background: "none", border: 0, padding: 0, marginBottom: 8 }}>
        <p className="eyebrow">6698 sayılı KVKK, madde 10</p>
        <h1>Aydınlatma metni</h1>
        <p className="sales-lead">Web sitesi başvuru formunda verdiğiniz bilgiler. Son güncelleme: {legal.noticeDateLabel}.</p>
      </header>

      <div className="legal-doc">
        <h2>Veri sorumlusu</h2>
        <p>
          {legal.controller}. İletişim: <a href={`mailto:${legal.email}`}>{legal.email}</a>
          {legal.address ? `, ${legal.address}` : `, ${legal.city}`}.
        </p>

        <h2>Hangi bilgiler alınır?</h2>
        <ul>
          <li>Ad soyad, telefon, e-posta ve size nasıl ulaşılacağı.</li>
          <li>İşletme adı, sektör, şehir ve varsa mevcut web siteniz.</li>
          <li>Proje türü, istediğiniz özellikler, tasarım notlarınız, bütçe ve teslim zamanı, eklediğiniz notlar.</li>
          <li>Teknik bilgi: tarayıcı bilgisi ve IP adresinizin tek yönlü özeti. IP adresinizin kendisi saklanmaz; özet, aynı kaynaktan art arda gelen başvuruları sınırlamak için kullanılır.</li>
        </ul>

        <h2>Ne için kullanılır?</h2>
        <ul>
          <li>Başvurunuzu değerlendirmek, size dönüş yapmak ve teklif hazırlamak.</li>
          <li>Sahte ve tekrarlı başvuruları, kötüye kullanımı önlemek.</li>
        </ul>
        <p>Bilgileriniz pazarlama listesine eklenmez ve reklam amacıyla kullanılmaz.</p>

        <h2>Hukuki sebep</h2>
        <p>
          Başvurunuzun değerlendirilmesi ve teklif hazırlanması, sözleşmenin kurulması için gereklidir (KVKK madde 5/2-c). Kötüye kullanımın önlenmesi meşru menfaate dayanır (madde 5/2-f). Bu işlemler için ayrıca açık rızanız istenmez.
        </p>

        <h2>Kimlerle paylaşılır?</h2>
        <p>
          Başvuru kaydı bir veritabanı hizmetinde (Supabase), bildirim e-postası bir e-posta hizmetinde (Resend) işlenir; siteyi Vercel barındırır. Bu hizmet sağlayıcıların sunucuları yurt dışında bulunabilir. Yasal bir zorunluluk olmadıkça bilgileriniz başka kişi veya kurumlarla paylaşılmaz.
        </p>

        <h2>Ne kadar saklanır?</h2>
        <p>
          Sözleşmeyle sonuçlanmayan başvurular {legal.retentionMonths} ay sonra silinir. Sözleşme yapılırsa kayıtlar vergi ve ticaret mevzuatındaki süreler boyunca saklanır.
        </p>

        <h2>Haklarınız</h2>
        <p>KVKK madde 11 uyarınca şunları isteyebilirsiniz:</p>
        <ul>
          <li>Bilgilerinizin işlenip işlenmediğini ve nasıl kullanıldığını öğrenmek.</li>
          <li>Yurt içinde veya yurt dışında kimlere aktarıldığını öğrenmek.</li>
          <li>Eksik veya yanlış bilgilerin düzeltilmesini istemek.</li>
          <li>Bilgilerinizin silinmesini veya yok edilmesini istemek.</li>
          <li>İşlemeye itiraz etmek ve zarar oluşmuşsa giderilmesini talep etmek.</li>
        </ul>
        <p>
          Başvurunuzu <a href={`mailto:${legal.email}`}>{legal.email}</a> adresine yazabilirsiniz. Talebiniz en geç 30 gün içinde yanıtlanır.
        </p>
      </div>
    </div>
  );
}
