import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL(".", import.meta.url);
const read = (name) => readFileSync(new URL(name, root), "utf8");
const html = read("index.html");
const js = read("app.js");
const css = read("style.css");

test("gerekli statik dosyalar ve yerel fontlar bulunuyor", () => {
  for (const name of ["index.html", "style.css", "app.js", "fonts.css", "NOTLAR.md", "RAPOR.md", "VIDEO-METIN.json"]) {
    assert.equal(statSync(new URL(name, root)).isFile(), true, `${name} bulunmalı`);
  }
  assert.ok(readdirSync(new URL("fonts/", root)).some((name) => name.endsWith(".woff2")));
  assert.equal(/<script[^>]+src=["']https?:/i.test(html), false);
  assert.equal(/@import\s+url\(["']https?:/i.test(css), false);
});

test("sayfa tek h1 ve tek talep formu sunuyor", () => {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.equal((html.match(/<form\b/g) || []).length, 1);
  assert.match(html, /id="wholesale-form"/);
  assert.match(html, /id="request-message"/);
  assert.match(html, /Bu demo formu göndermez/);
  assert.match(js, /addEventListener\("submit"/);
  assert.match(js, /output\.value\s*=/);
  assert.doesNotMatch(js, /\b(fetch|localStorage|sessionStorage)\b/);
});

test("video metni istenen biçim ve içerik alanlarını taşıyor", () => {
  const video = JSON.parse(read("VIDEO-METIN.json"));
  assert.match(video.sektor, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(video.slogan.length <= 60);
  assert.match(video.kapanis, / için de hazırız\. emirr\.com\.tr$/);
  assert.ok(video.instagram.includes("İlk 10 müşteriye 1 yıl ücretsiz temel teknik destek var."));
  assert.equal((video.instagram.match(/#[\p{L}\p{N}_]+/gu) || []).length, 5);
  for (const key of ["Ürün", "Ambalaj tercihi", "Yaklaşık miktar", "Firma", "Yetkili kişi", "Telefon", "E-posta", "Teslim ili", "Not"]) {
    assert.equal(typeof video.alanlar[key], "string", `${key} örneği olmalı`);
    assert.match(video.alanlar[key], /örnek/i);
  }
  assert.equal(video.kanal.split(/[.!?](?:\s|$)/).filter(Boolean).length, 2);
});

test("tema görselleri yerel ve SVG çizimi olarak tutuluyor", () => {
  const drawings = readdirSync(new URL("assets/", root)).filter((name) => name.endsWith(".svg"));
  assert.ok(drawings.length >= 4);
  for (const name of drawings) assert.match(readFileSync(join(new URL("assets/", root).pathname, name), "utf8"), /<svg\b/);
});
