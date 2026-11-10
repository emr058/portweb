(() => {
  const form = document.querySelector('#note-form');
  const output = document.querySelector('#note-text');
  const copyButton = document.querySelector('#copy-note');
  const hint = document.querySelector('#form-hint');
  const observe = [...document.querySelectorAll('.reveal')];

  const fields = [
    ['Hayvan', document.querySelector('#pet')],
    ['Gözlenen durum', document.querySelector('#observation')],
    ['Ne zamandır', document.querySelector('#since')],
    ['İlçe', document.querySelector('#district')]
  ];

  form.querySelector('[type="submit"]').disabled = false;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const lines = fields.map(([label, input]) => `${label}: ${input.value.trim() || 'belirtilmedi'}`);
    output.textContent = lines.join('\n');
    copyButton.hidden = false;
    hint.textContent = 'Not hazır. Görüşmede okuyabilir veya kopyalayabilirsiniz.';
    copyButton.focus();
  });

  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(output.textContent);
      copyButton.textContent = 'Kopyalandı';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(output);
      selection.removeAllRanges();
      selection.addRange(range);
      copyButton.textContent = 'Metni seçin ve kopyalayın';
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -12% 0px' });
    observe.forEach((item) => observer.observe(item));
  } else {
    observe.forEach((item) => item.classList.add('in-view'));
  }
})();
