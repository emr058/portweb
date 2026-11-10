import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const read = (name) => readFileSync(join(root, name), 'utf8');

test('page is a self-contained static Turkish theme with one title', () => {
  const html = read('index.html');
  assert.match(html, /<html lang="tr">/);
  assert.equal((html.match(/<h1\b/g) ?? []).length, 1);
  assert.match(html, /Taşınma<br>fişi/);
  assert.doesNotMatch(html, /https?:\/\//);
});

test('quote request fields cover route, volume, move type and date', () => {
  const html = read('index.html');
  for (const label of ['Taşıma türü', 'Nereden', 'Nereye', 'Eşya hacmi', 'Taşınma tarihi']) {
    assert.ok(html.includes(`>${label}</label>`), `Missing visible label: ${label}`);
  }
  assert.match(html, /type="date" required/);
  assert.match(html, /id="result-text"/);
});

test('form creates a local draft and does not transmit or store data', () => {
  const js = read('app.js');
  assert.match(js, /addEventListener\('submit'/);
  assert.match(js, /Taslak · gönderilmedi/);
  assert.doesNotMatch(js, /\bfetch\s*\(|XMLHttpRequest|localStorage|sessionStorage/);
});

test('video metadata has the requested shape, true features and five hashtags', () => {
  const video = JSON.parse(read('VIDEO-METIN.json'));
  assert.equal(video.sektor, 'nakliyat');
  assert.ok(video.slogan.length <= 60);
  assert.ok(video.instagram.includes('İlk 10 müşteriye 1 yıl ücretsiz temel teknik destek var.'));
  assert.equal((video.instagram.match(/#[\p{L}\p{N}_]+/gu) ?? []).length, 5);
  assert.equal(video.kanal.split(/[.!?]+/).filter(Boolean).length, 2);
  for (const label of ['Taşıma türü', 'Nereden', 'Nereye', 'Eşya hacmi', 'Taşınma tarihi']) {
    assert.ok(Object.hasOwn(video.alanlar, label));
  }
});

test('four illustrated SVG assets and local font binaries exist', () => {
  for (const asset of ['assets/route.svg', 'assets/volume.svg', 'assets/date.svg', 'assets/doorway.svg']) {
    assert.match(read(asset), /<svg\b/);
  }
  for (const font of ['fonts/GeneralSans-400.woff2', 'fonts/GeneralSans-500.woff2', 'fonts/Imbue-400-latin.woff2', 'fonts/Imbue-400-latin-ext.woff2']) {
    assert.ok(statSync(join(root, font)).size > 1000, `Missing or empty local font: ${font}`);
  }
});

test('page and metadata identify this honestly as an example theme', () => {
  const html = read('index.html');
  assert.match(html, /Örnek tema/);
  assert.match(html, /fiyat teklifi değildir/);
  assert.match(read('RAPOR.md'), /Ağ erişimi yoktu/);
});
