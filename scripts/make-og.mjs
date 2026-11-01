// Satış sayfalarının paylaşım görsellerini (1200×630) üretir: public/og/<ad>.jpg
// Kullanım: PLAYWRIGHT_FROM=/yol/playwright-olan/package.json node scripts/make-og.mjs
// (playwright depoya eklenmedi; yalnız bu görselleri yenilerken gerekir.)
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "og");
mkdirSync(out, { recursive: true });

const pages = [
  { file: "web-sitesi", title: "İşletmeniz için web sitesi", sub: "Başlangıç ve Profesyonel paketler" },
  { file: "fiyatlar", title: "Web sitesi fiyatları", sub: "Paketler, ek hizmetler ve ilk 10 müşteri kampanyası" },
  { file: "sanayi", title: "Sanayi için web sitesi", sub: "CNC torna, CNC freze ve imalat işletmeleri" },
  { file: "basvuru", title: "Web sitesi başvurusu", sub: "Projenizi anlatın, size dönelim" },
];

const html = ({ title, sub }) => `<!doctype html><meta charset="utf-8"><style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;font-family:-apple-system,BlinkMacSystemFont,"Inter","Segoe UI",sans-serif;color:#edf2fa;
    background:radial-gradient(900px 500px at 80% 10%,#1d3a63 0%,transparent 60%),linear-gradient(135deg,#0a1424,#0d1b30 60%,#091120);
    padding:72px 80px;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden}
  .brand{font-size:30px;font-weight:600;letter-spacing:-.02em}.brand i{color:#8ebcff;font-style:normal}
  h1{font-size:84px;line-height:1.05;letter-spacing:-.045em;font-weight:650;max-width:980px}
  p{margin-top:24px;font-size:36px;color:#a9b8cc;letter-spacing:-.01em}
  .foot{display:flex;justify-content:space-between;align-items:center;font-size:26px;color:#8ea0b8}
  .bar{width:96px;height:6px;border-radius:3px;background:#8ebcff;margin-bottom:34px}
  body>:not(.ring){position:relative;z-index:1}
  .ring{position:absolute;z-index:0;right:-140px;bottom:-180px;width:560px;height:560px;border-radius:50%;border:2px solid #25406a;box-shadow:0 0 0 60px #0d1b3055,0 0 0 120px #0d1b3033}
</style><div class="ring"></div><div class="brand">Emir Aydın<i>.</i></div>
<div><div class="bar"></div><h1>${title}</h1><p>${sub}</p></div>
<div class="foot"><span>emirr.com.tr</span><span>Web geliştirme</span></div>`;

const browser = await chromium.launch(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {});
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
for (const item of pages) {
  // Şablon yalnız bu dosyadaki sabit metinlerle dolar; kullanıcı girdisi yoktur.
  // nosemgrep: javascript.playwright.security.audit.playwright-setcontent-injection.playwright-setcontent-injection
  await page.setContent(html(item));
  await page.screenshot({ path: path.join(out, `${item.file}.jpg`), type: "jpeg", quality: 86 });
  console.log("ok", item.file);
}
await browser.close();
