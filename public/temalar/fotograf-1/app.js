document.documentElement.classList.add('js-ready');

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
    revealObserver.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const form = document.querySelector('#request-form');
const result = document.querySelector('#request-result');
const output = document.querySelector('#request-output');
const status = document.querySelector('#form-status');
const dateField = document.querySelector('#shoot-date');

if (dateField) {
  const today = new Date();
  dateField.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  status.textContent = '';
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const date = new Date(`${fields.get('Tercih edilen tarih')}T12:00:00`);
  const formattedDate = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  const note = String(fields.get('Çekim notu') || '').trim();
  const lines = [
    'FOTOĞRAF ÇEKİMİ · TEKLİF TALEBİ',
    `Çekim türü: ${fields.get('Çekim türü')}`,
    `Tercih edilen tarih: ${formattedDate}`,
    `Ad: ${fields.get('Ad')}`,
    `İletişim: ${fields.get('İletişim bilgisi')}`,
    ...(note ? [`Çekim notu: ${note}`] : []),
    '',
    'Tarih uygunluğu ve teklif stüdyo tarafından teyit edilecektir.'
  ];
  output.textContent = lines.join('\n');
  result.hidden = false;
  status.textContent = 'Talep taslağı hazır. Bu sayfa metni göndermedi veya saklamadı.';
  result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
});
