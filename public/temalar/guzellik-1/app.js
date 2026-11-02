// Tema ayarları: işletmeye göre bu bölüm değiştirilir.
const SITE = {
  name: 'Ela Stüdyo',
  // Gün numarası: 0 Pazar … 6 Cumartesi. null = kapalı. [açılış, kapanış] saat.
  hours: { 0: null, 1: [10, 20], 2: [10, 20], 3: [10, 20], 4: [10, 20], 5: [10, 20], 6: [10, 20] },
  timezone: 'Europe/Istanbul',
  whatsapp: '',                   // örn. 905xxxxxxxxx; boşsa mesaj e-postayla hazırlanır
  email: 'randevu@ornek.com',
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

// İmza hareketi: kaydırdıkça sabit afişin ortasındaki fotoğraf ve cümle değişir
const story = document.querySelector('[data-story]');
const shots = [...story.querySelectorAll('.photo img')];
const sayEl = story.querySelector('[data-say]');
const SAYS = [
  'Önce sizi dinleriz: ne istediğinizi, neyi sevmediğinizi.',
  'Kesim ve renk, yüzünüze ve yaşam tarzınıza göre seçilir.',
  'Çıkmadan önce, saçınızı evde nasıl yapacağınızı gösteririz.',
];
let idx = 0;
function paintStory() {
  const r = story.getBoundingClientRect();
  const p = Math.min(Math.max(-r.top / (r.height - innerHeight), 0), 0.999);
  const i = Math.floor(p * shots.length);
  if (i === idx) return;
  shots[idx].classList.remove('on');
  idx = i;
  shots[idx].classList.add('on');
  sayEl.classList.add('swap');
  setTimeout(() => { sayEl.textContent = SAYS[idx]; sayEl.classList.remove('swap'); }, reduced ? 0 : 280);
}
let tick = false;
addEventListener('scroll', () => { if (!tick) { tick = true; requestAnimationFrame(() => { paintStory(); tick = false; }); } }, { passive: true });
paintStory();

// Hizmet listesi: etkin satıra göre sağdaki fotoğraf değişir; dokununca form o hizmetle açılır
const pics = [...document.querySelectorAll('.svc-pic img')];
const rows = [...document.querySelectorAll('[data-svc]')];
function pick(btn) {
  rows.forEach((b) => b.classList.toggle('active', b === btn));
  pics.forEach((p, i) => p.classList.toggle('on', i === Number(btn.dataset.pic)));
}
rows.forEach((b) => {
  ['mouseenter', 'focus'].forEach((ev) => b.addEventListener(ev, () => pick(b)));
});
const select = document.querySelector('[data-svc-select]');
rows.forEach((b) => b.addEventListener('click', () => {
  select.value = b.dataset.svc;
  document.getElementById('randevu').scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  setTimeout(() => document.querySelector('[name=ad]').focus({ preventScroll: true }), reduced ? 0 : 600);
}));

// Canlı durum
function nowIn(tz) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const get = (t) => parts.find((p) => p.type === t).value;
  return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}
function liveText() {
  const { day, minutes } = nowIn(SITE.timezone);
  const t = SITE.hours[day];
  const hh = (h) => `${h}:00`.padStart(5, '0');
  if (t && minutes >= t[0] * 60 && minutes < t[1] * 60) return `Şu an açığız, ${hh(t[1])}'a kadar.`;
  if (t && minutes < t[0] * 60) return `Şu an kapalıyız, bugün ${hh(t[0])}'da açılıyoruz.`;
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    if (SITE.hours[d]) return `Şu an kapalıyız, ${i === 1 ? 'yarın' : DAYS[d]} ${hh(SITE.hours[d][0])}'da açılıyoruz.`;
  }
  return 'Şu an kapalıyız.';
}
const live = document.querySelector('[data-live]');
if (live) live.textContent = liveText();

document.querySelectorAll('[data-mail]').forEach((a) => { a.href = `mailto:${SITE.email}`; a.textContent = SITE.email; });

// Randevu isteği
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
    const text = `Merhaba, ${f.hizmet.value} için randevu istiyorum.${day} Saat aralığı: ${f.saat.value}. Adım: ${f.ad.value.trim()}, telefonum: ${f.tel.value.trim()}.`;
    const url = SITE.whatsapp
      ? `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
      : `mailto:${SITE.email}?subject=${encodeURIComponent('Randevu isteği')}&body=${encodeURIComponent(text)}`;
    hint.textContent = 'Mesaj hazır, açılan uygulamadan gönderin.';
    location.href = url;
  });
}
