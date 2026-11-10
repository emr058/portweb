const revealItems = document.querySelectorAll('.section-reveal');

if ('IntersectionObserver' in window) {
  revealItems.forEach((item) => item.classList.add('is-pending'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('is-pending');
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const bookingForm = document.querySelector('#booking-form');
const formStatus = document.querySelector('#form-status');
const arrival = document.querySelector('#arrival');
const departure = document.querySelector('#departure');

arrival.addEventListener('change', () => {
  departure.min = arrival.value;
  if (departure.value && departure.value <= arrival.value) departure.value = '';
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!bookingForm.reportValidity()) return;

  const values = new FormData(bookingForm);
  const subject = `Konaklama talebi: ${values.get('Oda')}`;
  const body = [
    `Oda: ${values.get('Oda')}`,
    `Giriş: ${values.get('Giriş') || 'Belirtilmedi'}`,
    `Çıkış: ${values.get('Çıkış') || 'Belirtilmedi'}`,
    `Yanıt e-postası: ${values.get('Yanıt e-postası') || 'Belirtilmedi'}`
  ].join('\n');
  const mailto = `mailto:konaklama@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  formStatus.textContent = 'E-posta uygulamanızda örnek konaklama talebi hazırlandı. Alıcı adresi yayından önce değiştirilmeli.';
  window.location.href = mailto;
});
