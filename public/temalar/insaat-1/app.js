(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const picker = document.querySelector('[data-layer-picker]');
  const fallback = document.querySelector('[data-layer-fallback]');
  const drawing = document.querySelector('.section-drawing');
  const detail = document.querySelector('.layer-picker__detail');
  const layers = {
    shell: 'Çatı ve dış duvar, yapıyı dış ortamdan ayıran kabuğu oluşturur.',
    frame: 'Döşemeler ve kolonlar, yükü temel sistemine aktarır.',
    base: 'Temel, üst yapıdan gelen yükleri zemine iletir.'
  };

  if (picker && fallback && drawing) {
    picker.hidden = false;
    fallback.hidden = true;
    picker.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-layer]');
      if (!button) return;
      const layer = button.dataset.layer;
      picker.querySelectorAll('button[data-layer]').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === button));
      });
      drawing.dataset.active = layer;
      detail.textContent = layers[layer];
    });
  }

  if (reduceMotion) return;
  document.documentElement.classList.add('motion-ready');
  const revealItems = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.01 });
  revealItems.forEach((item) => observer.observe(item));

  const hero = document.querySelector('.hero');
  const secondImage = document.querySelector('.hero__image--two');
  if (hero && secondImage && 'IntersectionObserver' in window) {
    const heroObserver = new IntersectionObserver(([entry]) => {
      secondImage.style.animationPlayState = entry.isIntersecting && !document.hidden ? 'running' : 'paused';
    });
    heroObserver.observe(hero);
    document.addEventListener('visibilitychange', () => {
      secondImage.style.animationPlayState = !document.hidden && hero.getBoundingClientRect().bottom > 0 ? 'running' : 'paused';
    });
  }
})();
