// Tema ayarları: işletmeye göre bu bölüm değiştirilir.
const SITE = {
  name: 'Eksen Talaşlı İmalat',
  whatsapp: '',                 // örn. 905xxxxxxxxx; boşsa teklif mesajı e-postayla hazırlanır
  email: 'teklif@ornek.com',
  phone: '',                    // örn. +90 5xx xxx xx xx; boşsa telefon bağlantısı gizlenir
};

document.documentElement.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Girişler
const groups = new Map();
document.querySelectorAll('[data-rise]').forEach((el) => {
  const key = el.parentElement;
  const n = groups.get(key) || 0;
  el.style.setProperty('--i', Math.min(n, 6));
  groups.set(key, n + 1);
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
document.querySelectorAll('[data-rise]').forEach((el) => io.observe(el));

// İmza hareketi: ilk ekrandaki iki fotoğraf yavaşça birbirine geçer
const imgs = [...document.querySelectorAll('.hero-img')];
if (imgs.length > 1 && !reduced) {
  let i = 0;
  setInterval(() => {
    imgs[i].classList.remove('on');
    i = (i + 1) % imgs.length;
    imgs[i].classList.add('on');
  }, 7000);
}

// Tolerans göstergesi: çubuk uzunluğu en geniş bant olan 0,40 mm'ye göre yüzde; saç teli 0,07 mm
const MAX_MM = 0.4;
const HAIR_MM = 0.07;
const range = document.getElementById('tol-range');
const out = document.querySelector('[data-tol-out]');
const band = document.querySelector('[data-band]');
const hair = document.querySelector('[data-hair]');
const comma = (n, d = 2) => n.toFixed(d).replace('.', ',');
function paintTol() {
  const t = Number(range.value);
  const total = t * 2;
  const ratio = total / HAIR_MM;
  hair.style.width = `${(HAIR_MM / MAX_MM) * 100}%`;
  band.style.width = `${Math.max((total / MAX_MM) * 100, 1.5)}%`;
  const rel = ratio >= 1 ? `saç telinden ${comma(ratio, 1)} kat geniş` : `saç telinin ${comma(ratio * 100, 0)}% kadar`;
  out.textContent = `±${comma(t)} mm: toplam bant ${comma(total)} mm, ${rel}.`;
}
if (range) { range.addEventListener('input', paintTol); paintTol(); }

// İletişim bağlantıları ayardan gelir
document.querySelectorAll('[data-mail]').forEach((a) => { a.href = `mailto:${SITE.email}`; a.textContent = SITE.email; });
document.querySelectorAll('[data-tel]').forEach((a) => {
  if (SITE.phone) { a.href = `tel:${SITE.phone.replace(/\s/g, '')}`; a.textContent = SITE.phone; } else { a.hidden = true; }
});

// Teklif isteği: hazır mesaj; gönderimi ziyaretçi kendi uygulamasından yapar
const form = document.querySelector('[data-quote]');
const hint = document.querySelector('[data-hint]');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = form.elements;
    if (!f.parca.value.trim()) { f.parca.focus(); hint.textContent = 'Parça adını yazın.'; return; }
    if (!(Number(f.adet.value) >= 1)) { f.adet.focus(); hint.textContent = 'Adet en az 1 olmalı.'; return; }
    const date = f.tarih.value ? ` İstenen tarih: ${f.tarih.value.split('-').reverse().join('.')}.` : '';
    const text = `Merhaba, ${f.adet.value} adet "${f.parca.value.trim()}" için teklif istiyorum. Malzeme: ${f.malzeme.value}.${date} Çizimi ekte gönderiyorum.`;
    const url = SITE.whatsapp
      ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
      : `mailto:${SITE.email}?subject=${encodeURIComponent('Teklif isteği')}&body=${encodeURIComponent(text)}`;
    hint.textContent = 'Mesaj hazır, açılan uygulamadan gönderin.';
    location.href = url;
  });
}
