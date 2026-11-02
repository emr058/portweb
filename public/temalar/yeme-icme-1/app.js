// Tema ayarları: işletmeye göre bu bölüm değiştirilir.
const SITE = {
  name: 'Odun',
  // Gün numarası: 0 Pazar … 6 Cumartesi. null = kapalı. [açılış, kapanış] saat.dakika.
  hours: { 0: [12, 23], 1: null, 2: [12, 23], 3: [12, 23], 4: [12, 23], 5: [12, 23], 6: [12, 23] },
  timezone: 'Europe/Istanbul',
  whatsapp: '',                       // örn. 905xxxxxxxxx; boşsa mesaj e-postayla hazırlanır
  email: 'rezervasyon@ornek.com',
};

document.documentElement.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

// Girişler: bölümün parçaları sırayla yükselir
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

// İmza hareketi: kaydırdıkça anıt sözcük büyür ve ekrandan çıkar
const word = document.querySelector('[data-word]');
if (word && !reduced && innerWidth > 860) {
  let ticking = false;
  const update = () => {
    const p = Math.min(scrollY / (innerHeight * 0.9), 1);
    word.style.transform = `scale(${1 + p * 0.18}) translateY(${p * 14}%)`;
    ticking = false;
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
}

// Canlı durum: şu an açık mı, ne zamana kadar
function nowIn(tz) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
function liveText() {
  const { day, minutes } = nowIn(SITE.timezone);
  const today = SITE.hours[day];
  const fmt = (h) => String(h).padStart(2, '0') + ':00';
  if (today && minutes >= today[0] * 60 && minutes < today[1] * 60) return `Şu an açığız, ${fmt(today[1])}'e kadar.`;
  if (today && minutes < today[0] * 60) return `Şu an kapalıyız, bugün ${fmt(today[0])}'de açılıyoruz.`;
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (SITE.hours[d]) return `Şu an kapalıyız, ${i === 1 ? 'yarın' : DAYS[d]} ${fmt(SITE.hours[d][0])}'de açılıyoruz.`;
  }
  return 'Şu an kapalıyız.';
}
const live = document.querySelector('[data-live]');
if (live) { live.textContent = liveText(); }

// Rezervasyon: seçimlerle hazır mesaj; gönderimi ziyaretçi kendi uygulamasından yapar
const form = document.querySelector('[data-rez]');
const hint = document.querySelector('[data-hint]');
if (form) {
  const dateInput = form.elements.gun;
  const today = new Date().toISOString().slice(0, 10);
  dateInput.min = today;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = form.elements;
    const bad = [f.ad, f.gun].find((x) => !x.value.trim());
    if (bad) { bad.focus(); hint.textContent = bad === f.ad ? 'Adınızı yazın.' : 'Bir gün seçin.'; return; }
    const day = new Date(f.gun.value + 'T12:00:00');
    if (SITE.hours[day.getDay()] === null) { f.gun.focus(); hint.textContent = `${DAYS[day.getDay()]} günü kapalıyız. Başka bir gün seçin.`; return; }
    const text = `Merhaba, ${f.gun.value.split('-').reverse().join('.')} günü saat ${f.saat.value} için ${f.kisi.value} kişilik masa ayırtmak istiyorum. Adım: ${f.ad.value.trim()}.`;
    const url = SITE.whatsapp
      ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
      : `mailto:${SITE.email}?subject=${encodeURIComponent('Masa ayırtma')}&body=${encodeURIComponent(text)}`;
    hint.textContent = 'Mesaj hazır, açılan uygulamadan gönderin.';
    location.href = url;
  });
}
