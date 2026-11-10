import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const read = (name) => readFileSync(new URL(name, root), "utf8");

test("theme deliverables and local assets exist", () => {
  for (const path of [
    "index.html", "style.css", "app.js", "fonts.css", "fonts/Figtree-OFL.txt",
    "fonts/Imbue-400-latin.woff2", "fonts/Imbue-400-latin-ext.woff2",
    "fonts/Figtree-400-latin.woff2", "fonts/Figtree-400-latin-ext.woff2",
    "fonts/Figtree-600-latin.woff2", "fonts/Figtree-600-latin-ext.woff2",
    "NOTLAR.md", "RAPOR.md", "VIDEO-METIN.json",
    "assets/dosya-kapagi.svg", "assets/calisma-alanlari.svg",
    "assets/gorusme-akisi.svg", "assets/ilk-gorusme-formu.svg"
  ]) assert.ok(existsSync(new URL(path, root)), `${path} exists`);
});

test("video copy contains the requested fields and five hashtags", () => {
  const video = JSON.parse(read("VIDEO-METIN.json"));
  assert.equal(video.sektor, "hukuk-burosu");
  assert.equal(video.kapanis, "Hukuk büroları için de hazırız. emirr.com.tr");
  assert.ok(video.slogan.length <= 60);
  assert.match(video.instagram, /İlk 10 müşteriye 1 yıl ücretsiz temel teknik destek var\./);
  assert.equal((video.instagram.match(/#[\p{L}\p{N}_]+/gu) ?? []).length, 5);
  for (const label of ["Çalışma alanı", "Konu başlığı", "Ad soyad", "İletişim bilgisi"])
    assert.ok(label in video.alanlar, `${label} is represented`);
});

test("the meeting form creates a local editable request draft", () => {
  let submitHandler;
  const form = {
    addEventListener(_type, callback) { submitHandler = callback; },
    reportValidity() { return true; }
  };
  const draft = { hidden: true, scrollIntoView() {} };
  const draftText = { value: "", focus() {} };
  const document = {
    querySelector(selector) {
      return { "#request-form": form, "#draft": draft, "#draft-text": draftText }[selector];
    },
    querySelectorAll() { return []; }
  };
  class FormDataMock {
    get(key) {
      return {
        area: "Sözleşmeler (örnek)",
        subject: "Sözleşme inceleme talebi",
        name: "Deniz Yılmaz",
        contact: "deniz.yilmaz@example.com"
      }[key];
    }
  }
  class IntersectionObserverMock {}
  const sandbox = {
    document,
    FormData: FormDataMock,
    IntersectionObserver: IntersectionObserverMock,
    window: { matchMedia: () => ({ matches: true }) },
    console
  };
  vm.runInNewContext(read("app.js"), sandbox);
  assert.equal(typeof submitHandler, "function");
  let prevented = false;
  submitHandler({ preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(draft.hidden, false);
  assert.match(draftText.value, /Çalışma alanı: Sözleşmeler \(örnek\)/);
  assert.match(draftText.value, /Ad soyad: Deniz Yılmaz/);
  assert.match(draftText.value, /deniz\.yilmaz@example\.com/);
  assert.match(read("app.js"), /draftText\.value\s*=/);
  assert.doesNotMatch(read("app.js"), /\bfetch\s*\(|XMLHttpRequest/);
});
