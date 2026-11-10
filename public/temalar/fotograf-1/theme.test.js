const test = require('node:test');
const assert = require('node:assert/strict');
const { existsSync, readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = __dirname;
const read = (name) => readFileSync(join(root, name), 'utf8');

test('tema teslim dosyaları ve yerel fontlar mevcut', () => {
  for (const file of ['index.html', 'style.css', 'app.js', 'fonts.css', 'NOTLAR.md', 'RAPOR.md', 'README.md', 'VIDEO-METIN.json', 'fonts/Switzer-400.woff2', 'fonts/Switzer-500.woff2']) {
    assert.ok(existsSync(join(root, file)), `${file} bulunamadı`);
  }
});

test('HTML yerel varlıklara bağlanıyor ve tek başlık/tek form içeriyor', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="tr">/);
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<form\b/g) || []).length, 1);
  assert.match(html, /ÖRNEK TEMA/);
  assert.match(html, /tarih uygunluğu/i);

  const refs = [
    ...[...html.matchAll(/<(?:img|script)\b[^>]*?\b(?:src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/<link\b[^>]*?\bhref="([^"]+)"/g)].map((m) => m[1]),
  ];
  for (const ref of refs) {
    assert.ok(!/^(?:https?:)?\/\//i.test(ref), `uzak varlık bulundu: ${ref}`);
    const localPath = ref.split(/[?#]/, 1)[0];
    const resolvedPath = localPath.startsWith('/temalar/')
      ? join(root, '..', localPath.slice('/temalar/'.length))
      : join(root, localPath);
    assert.ok(existsSync(resolvedPath), `yerel varlık bulunamadı: ${ref}`);
  }
});

test('SVG çizimleri ve fontlar yalnızca yerel olarak referanslanıyor', () => {
  const html = read('index.html');
  const fontCss = read('fonts.css');
  const imageRefs = [...html.matchAll(/<img\b[^>]*?\bsrc="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(imageRefs.length >= 4);
  assert.ok(imageRefs.every((ref) => ref.endsWith('.svg')));
  assert.match(fontCss, /fonts\/Switzer-400\.woff2/);
  assert.match(fontCss, /fonts\/Switzer-500\.woff2/);
  assert.doesNotMatch(`${html}\n${fontCss}`, /fonts\.googleapis\.com|fontshare\.com|picsum\.photos|unsplash\.com/i);
});

test('video metni alanları gerçek form etiketleriyle eşleşiyor', () => {
  const metadata = JSON.parse(read('VIDEO-METIN.json'));
  const html = read('index.html');
  const required = ['sektor', 'ad', 'slogan', 'kapanis', 'instagram', 'kanal', 'alanlar'];
  assert.deepEqual(Object.keys(metadata).sort(), required.sort());
  assert.match(metadata.sektor, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(metadata.slogan.length <= 60);
  assert.equal((metadata.instagram.match(/#[\p{L}\p{N}_]+/gu) || []).length, 5);
  assert.match(metadata.instagram, /İlk 10 müşteriye 1 yıl ücretsiz temel teknik destek var\./);

  const actualLabels = [...html.matchAll(/<label\b[^>]*\bfor="[^"]+"[^>]*>([\s\S]*?)<\/label>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().replace(/\s*isteğe bağlı$/, ''));
  assert.deepEqual(Object.keys(metadata.alanlar).sort(), actualLabels.sort());
});

test('talep etkileşimi tarayıcıda taslak üretir ve gönderim yapmaz', () => {
  const html = read('index.html');
  const js = read('app.js');
  assert.match(html, /Bilgiler bu örnek sayfada saklanmaz veya gönderilmez/);
  assert.match(html, /<noscript>/);
  assert.match(js, /addEventListener\('submit'/);
  assert.match(js, /output\.textContent = lines\.join/);
  assert.doesNotMatch(js, /fetch\s*\(|XMLHttpRequest|localStorage|sessionStorage|navigator\.sendBeacon/i);
});
