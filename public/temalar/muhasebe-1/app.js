const periodForm = document.querySelector('#period-form');
const periodSelect = document.querySelector('#period-select');
const periodHeading = document.querySelector('#documents-period');
const documentList = document.querySelector('#document-list');
const periodNote = document.querySelector('#period-note');

const periodExamples = {
  '2026-04': {
    title: 'Nisan 2026 · örnek dönem',
    note: 'Nisan 2026 için örnek dosya görünümü. Liste müşavirinizin çalışma biçimine göre uyarlanır.',
    rows: [
      ['Satış', 'Satış faturaları ve iade belgeleri'],
      ['Alış', 'Gider faturaları ve masraf belgeleri'],
      ['Banka', 'Hesap ekstreleri ve tahsilat dökümleri'],
      ['Ücret', 'Varsa puantaj ve ücret değişikliği bilgileri']
    ]
  },
  '2026-05': {
    title: 'Mayıs 2026 · örnek dönem',
    note: 'Mayıs 2026 için örnek dosya görünümü. Liste müşavirinizin çalışma biçimine göre uyarlanır.',
    rows: [
      ['Satış', 'Satış faturaları ve iptal / iade kayıtları'],
      ['Gider', 'Alış faturaları, fişler ve masraf belgeleri'],
      ['Tahsilat', 'Banka ve varsa POS hareketleri'],
      ['Çalışan', 'Varsa işe giriş, çıkış ve ücret değişikliği bilgileri']
    ]
  },
  '2026-06': {
    title: 'Haziran 2026 · örnek dönem',
    note: 'Haziran 2026 için örnek dosya görünümü. Liste müşavirinizin çalışma biçimine göre uyarlanır.',
    rows: [
      ['Satış', 'Satış faturaları ve iade belgeleri'],
      ['Alış', 'Alış ve gider faturaları'],
      ['Banka', 'Hesap ekstreleri ve tahsilat dökümleri'],
      ['Ücret', 'Varsa puantaj ve ücret değişikliği bilgileri']
    ]
  }
};

periodForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const example = periodExamples[periodSelect.value];
  if (!example) return;

  periodHeading.textContent = example.title;
  periodNote.textContent = example.note;
  documentList.replaceChildren(...example.rows.map(([category, description]) => {
    const item = document.createElement('li');
    const categoryText = document.createElement('span');
    const descriptionText = document.createElement('span');
    const tab = document.createElement('span');
    categoryText.textContent = category;
    descriptionText.textContent = description;
    tab.className = 'file-tab';
    tab.setAttribute('aria-hidden', 'true');
    item.append(categoryText, descriptionText, tab);
    return item;
  }));
  periodHeading.setAttribute('tabindex', '-1');
  periodHeading.focus({ preventScroll: true });
});

const revealItems = document.querySelectorAll('[data-reveal]');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}
