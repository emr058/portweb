(() => {
  const form = document.querySelector('#move-form');
  const result = document.querySelector('#result-text');
  const state = document.querySelector('#result-state');
  const dateInput = document.querySelector('#move-date');

  if (form && result && state) {
    const localToday = new Date();
    localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset());
    dateInput.min = localToday.toISOString().slice(0, 10);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const date = new Date(`${String(data.get('Taşınma tarihi'))}T12:00:00`);
      const formattedDate = new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit', month: '2-digit', year: 'numeric'
      }).format(date);
      result.textContent = [
        `Taşıma türü: ${data.get('Taşıma türü')}`,
        `Nereden: ${data.get('Nereden')}`,
        `Nereye: ${data.get('Nereye')}`,
        `Eşya hacmi: ${data.get('Eşya hacmi')}`,
        `Taşınma tarihi: ${formattedDate}`
      ].join('\n');
      state.textContent = 'Taslak · gönderilmedi';
      document.querySelector('#result-title').textContent = 'Teklif talebi taslağı';
    });
  }

  const revealItems = [...document.querySelectorAll('.reveal')];
  if (revealItems.length && 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('js-motion');
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 4, 3) * 75}ms`;
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
