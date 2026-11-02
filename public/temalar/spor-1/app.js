// Tema ayarları: işletmeye göre bu bölüm değiştirilir.
const SITE = {
  name: 'Tempo',
  // Gün numarası: 0 Pazar … 6 Cumartesi. null = kapalı. [açılış, kapanış] saat.
  hours: { 0: null, 1: [7, 22], 2: [7, 22], 3: [7, 22], 4: [7, 22], 5: [7, 22], 6: [7, 22] },
  // Bugünkü dersler: [saat, ders, süre dk]. Gün numarasına göre; boş gün ders yok demektir.
  classes: {
    1: [['09:00', 'Yoga', 60], ['12:30', 'Pilates', 50], ['18:00', 'HIIT', 45], ['19:30', 'Güç', 60]],
    2: [['09:00', 'Pilates', 50], ['12:30', 'Yoga', 60], ['18:00', 'Boks kondisyon', 50], ['19:30', 'HIIT', 45]],
    3: [['09:00', 'Yoga', 60], ['12:30', 'Güç', 60], ['18:00', 'HIIT', 45], ['19:30', 'Pilates', 50]],
    4: [['09:00', 'Pilates', 50], ['12:30', 'HIIT', 45], ['18:00', 'Güç', 60], ['19:30', 'Boks kondisyon', 50]],
    5: [['09:00', 'Yoga', 60], ['12:30', 'Pilates', 50], ['18:00', 'HIIT', 45], ['19:30', 'Yoga', 60]],
    6: [['10:00', 'HIIT', 45], ['11:00', 'Güç', 60], ['12:15', 'Yoga', 60]],
  },
  timezone: 'Europe/Istanbul',
  whatsapp: '',                   // örn. 905xxxxxxxxx; boşsa mesaj e-postayla hazırlanır
  email: 'merhaba@ornek.com',
};

document.documentElement.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const DAYS = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

// Girişler
const groups = new Map();
document.querySelectorAll('[data-rise]').forEach((el) => {
  const n = groups.get(el.parentElement) || 0;
  el.style.setProperty('--i', Math.min(n, 6));
  groups.set(el.parentElement, n + 1);
});
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
document.querySelectorAll('[data-rise]').forEach((el) => io.observe(el));

function nowIn(tz) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
const mins = (hhmm) => { const [h, m] = hhmm.split(':').map(Number); return h * 60 + m; };

// Canlı parça: bugünün dersleri, saate göre geçmiş ve sıradaki ders
function paintToday() {
  const { day, minutes } = nowIn(SITE.timezone);
  const list = document.querySelector('[data-today-list]');
  const next = document.querySelector('[data-next]');
  const today = SITE.classes[day] || [];
  if (!today.length) { list.innerHTML = ''; next.textContent = 'Bugün ders yok.'; return; }
  const upcoming = today.findIndex(([t]) => mins(t) + 5 > minutes);
  list.innerHTML = '';
  today.forEach(([t, name, dur], i) => {
    const li = document.createElement('li');
    const time = document.createElement('time'); time.textContent = t;
    const span = document.createElement('span'); span.textContent = name;
    const em = document.createElement('em'); em.textContent = `${dur} dk`;
    li.append(time, span, em);
    if (upcoming === -1 || i < upcoming) li.classList.add('done');
    if (i === upcoming) li.classList.add('next');
    list.append(li);
  });
  if (upcoming === -1) {
    next.textContent = 'Bugünkü dersler bitti. Yarın görüşürüz.';
    list.querySelectorAll('li').forEach((li) => li.classList.remove('done'));
  } else {
    const [t, name] = today[upcoming];
    const left = mins(t) - minutes;
    next.textContent = left > 0 ? `Sıradaki ders: ${name}, ${t}'de, ${left >= 60 ? `${Math.floor(left / 60)} sa ${left % 60} dk` : `${left} dk`} sonra.` : `${name} şu an başlıyor.`;
  }
}
paintToday();
setInterval(paintToday, 60000);

// Saat bilgisi
const live = document.querySelector('[data-live]');
if (live) {
  const { day, minutes } = nowIn(SITE.timezone);
  const t = SITE.hours[day];
  const hh = (h) => `${h}:00`.padStart(5, '0');
  live.textContent = t && minutes >= t[0] * 60 && minutes < t[1] * 60 ? `Şu an açığız, ${hh(t[1])}'a kadar.` : 'Pazartesi–Cumartesi 07:00–22:00';
}
document.querySelectorAll('[data-mail]').forEach((a) => { a.href = `mailto:${SITE.email}`; a.textContent = SITE.email; });

// Bir derse dokununca form o dersle açılır
const select = document.querySelector('[data-class-select]');
document.querySelectorAll('[data-class]').forEach((b) => b.addEventListener('click', () => {
  select.value = b.dataset.class;
  document.getElementById('deneme').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  setTimeout(() => document.querySelector('[name=ad]').focus({ preventScroll: true }), reduced ? 0 : 600);
}));

// Deneme isteği
const form = document.querySelector('[data-rez]');
const hint = document.querySelector('[data-hint]');
if (form) {
  form.querySelector('[name=gun]').min = new Date().toISOString().slice(0, 10);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = form.elements;
    if (!f.ad.value.trim()) { f.ad.focus(); hint.textContent = 'Adınızı yazın.'; return; }
    if (f.tel.value.replace(/\D/g, '').length < 10) { f.tel.focus(); hint.textContent = 'Telefon numaranızı yazın, size buradan dönelim.'; return; }
    let day = '';
    if (f.gun.value) {
      const d = new Date(f.gun.value + 'T12:00:00');
      if (SITE.hours[d.getDay()] === null) { f.gun.focus(); hint.textContent = `${DAYS[d.getDay()]} günü kapalıyız. Başka bir gün seçin.`; return; }
      day = ` Tercih ettiğim gün: ${f.gun.value.split('-').reverse().join('.')}.`;
    }
    const text = `Merhaba, ${f.ders.value} dersi için ücretsiz deneme istiyorum.${day} Adım: ${f.ad.value.trim()}, telefonum: ${f.tel.value.trim()}.`;
    const url = SITE.whatsapp
      ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
      : `mailto:${SITE.email}?subject=${encodeURIComponent('Deneme dersi isteği')}&body=${encodeURIComponent(text)}`;
    hint.textContent = 'Mesaj hazır, açılan uygulamadan gönderin.';
    location.href = url;
  });
}
