// Uçtan uca test: gerçek `next start` + sahte Supabase/Resend HTTP uçları + tarayıcı.
// Önce `npm run build`. Çalıştırma:
//   PLAYWRIGHT_FROM=/yol/playwright-kurulu/package.json [CHROMIUM_EXECUTABLE=...] [SHOTS=/klasor] \
//   node --import tsx tests/e2e/sales.mjs
// (playwright depoya eklenmedi; yalnız bu test için gerekir.)
import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import http from "node:http";
import path from "node:path";
import { createFakeBackend } from "../helpers/fake-backend.ts";

const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium, webkit, devices } = require("playwright");
const root = path.resolve(import.meta.dirname, "../..");
const FAKE_PORT = 4011;
const APP_PORT = 3131;
const base = `http://127.0.0.1:${APP_PORT}`;
const shots = process.env.SHOTS;

const backend = createFakeBackend();
const fake = http.createServer((req, res) => {
  let body = "";
  req.on("data", c => (body += c));
  req.on("end", () => {
    const r = backend.handle(req.method, `http://fake${req.url}`, body);
    res.writeHead(r.status, r.headers);
    res.end(r.body);
  });
});
await new Promise(r => fake.listen(FAKE_PORT, "127.0.0.1", r));

const app = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(APP_PORT), "-H", "127.0.0.1"], {
  cwd: root,
  env: {
    ...process.env,
    SUPABASE_URL: `http://127.0.0.1:${FAKE_PORT}`,
    SUPABASE_SERVICE_ROLE_KEY: "e2e-key",
    RESEND_API_KEY: "e2e",
    RESEND_API_URL: `http://127.0.0.1:${FAKE_PORT}/emails`,
    NOTIFY_EMAIL_TO: "ben@example.test",
    NOTIFY_EMAIL_FROM: "basvuru@example.test",
    IP_HASH_SECRET: "e2e-salt",
  },
  stdio: ["ignore", "pipe", "pipe"],
});
let appLog = "";
app.stdout.on("data", d => (appLog += d));
app.stderr.on("data", d => (appLog += d));

let ipCounter = 0;
const results = [];
const check = async (name, fn) => {
  try { await fn(); results.push(["ok", name]); console.log("ok  ", name); }
  catch (error) { results.push(["FAIL", name, error]); console.log("FAIL", name, "\n    ", error.message.split("\n")[0]); }
};

try {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(base)).ok) break; } catch { /* sunucu henüz açılmadı */ }
    await new Promise(r => setTimeout(r, 500));
  }
  const launch = process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {};
  const engines = [["chromium", chromium, launch], ...(process.env.WEBKIT === "0" ? [] : [["webkit", webkit, {}]])];

  // Sayfa kontrolleri: durum, h1, taşma, yazı boyutu, WhatsApp bağlantıları, konsol hatası
  for (const [engineName, engine, opts] of engines) {
    const browser = await engine.launch(opts);
    for (const [label, ctxOpts] of [["masaüstü", { viewport: { width: 1280, height: 800 } }], ["iPhone", { ...devices["iPhone 13"] }]]) {
      const context = await browser.newContext(ctxOpts);
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", e => errors.push(e.message));
      page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
      for (const [route, h1] of [["/web-sitesi", "İşletmeniz için web sitesi"], ["/fiyatlar", "Fiyatlar"], ["/sanayi-cozumleri", "Sanayi için web sitesi"], ["/basvuru", "Web sitesi başvurusu"]]) {
        await check(`${engineName}/${label} ${route}: sayfa, taşma yok, yazı ≥12px, WhatsApp bağlantıları`, async () => {
          const res = await page.goto(base + route, { waitUntil: "networkidle" });
          assert.equal(res.status(), 200);
          assert.equal((await page.locator("h1").first().innerText()).trim(), h1);
          const m = await page.evaluate(() => {
            const sizes = [];
            const walker = document.createTreeWalker(document.querySelector("main"), NodeFilter.SHOW_TEXT);
            for (let n = walker.nextNode(); n; n = walker.nextNode()) {
              if (!n.textContent.trim() || !n.parentElement || n.parentElement.closest(".sr-only, .hp, [aria-hidden='true'], script, style")) continue;
              const cs = getComputedStyle(n.parentElement);
              if (cs.display === "none" || cs.visibility === "hidden") continue;
              sizes.push(parseFloat(cs.fontSize));
            }
            const wa = [...document.querySelectorAll('a[href^="https://wa.me/"]')].map(a => a.href);
            const wrap = document.querySelector(".sales-table-wrap");
            return { tableOverflow: wrap ? wrap.scrollWidth - wrap.clientWidth : 0, overflow: document.documentElement.scrollWidth - innerWidth, minFont: Math.min(...sizes), wa, buttons: [...document.querySelectorAll("main a.btn, main button.btn")].map(b => Math.round(b.getBoundingClientRect().height)) };
          });
          assert.ok(m.overflow <= 0, `yatay taşma ${m.overflow}px`);
          assert.ok(m.tableOverflow <= 1, `karşılaştırma tablosu yana taşıyor (${m.tableOverflow}px)`);
          assert.ok(m.minFont >= 12, `en küçük yazı ${m.minFont}px`);
          for (const url of m.wa) {
            assert.match(url, /^https:\/\/wa\.me\/905353753358\?text=/);
            assert.ok(decodeURIComponent(url).includes("Adım:"));
          }
          if (route !== "/basvuru") assert.ok(m.wa.length >= 2, "WhatsApp bağlantısı yok");
          assert.ok(m.buttons.every(h => h >= 44), `düğme yüksekliği ${m.buttons}`);
          if (shots && engineName === "chromium") await page.screenshot({ path: path.join(shots, `${label}${route.replace(/\//g, "_")}.png`), fullPage: true });
        });
      }
      await check(`${engineName}/${label}: konsol hatası yok`, async () => assert.deepEqual(errors, []));
      await context.close();
    }

    // Paket WhatsApp mesajı: seçilen paket ve proje türü
    await check(`${engineName}: paket bağlantıları paket adı, fiyat ve proje türünü taşır`, async () => {
      const page = await browser.newPage();
      await page.goto(base + "/web-sitesi", { waitUntil: "networkidle" });
      const links = (await page.locator('main a[href^="https://wa.me/"]').evaluateAll(a => a.map(x => decodeURIComponent(x.href)))).join("\n");
      assert.ok(links.includes("Başlangıç Web Sitesi") && links.includes("5.000 TL kampanya fiyatı") && links.includes("Proje türü: Başlangıç web sitesi"));
      assert.ok(links.includes("Profesyonel Web Sitesi") && links.includes("7.500–10.000 TL kampanya fiyatı"));
      await page.close();
    });
    await check(`${engineName}: fiyat sayfasındaki tutarlar talimatla aynı`, async () => {
      const page = await browser.newPage();
      await page.goto(base + "/fiyatlar", { waitUntil: "networkidle" });
      const text = await page.locator("main").innerText();
      for (const t of ["5.000 TL", "10.000 TL", "7.500–10.000 TL", "15.000–20.000 TL", "15.000–25.000 TL", "750 TL", "1.500 TL", "2.500 TL", "4.000 TL", "3.000 TL", "5.000 TL"]) assert.ok(text.includes(t), t);
      assert.ok(text.includes("İlk 10 müşteri"));
      assert.ok(text.includes("Alan adı (domain), barındırma (hosting)"));
      assert.ok(text.includes("Ayrı tekliflendirilir: E-ticaret, Ödeme sistemi, Stok takibi, Kargo, Özel entegrasyonlar"));
      await page.close();
    });

    // Başvuru akışı (her bağlama ayrı IP: saatlik 3 başvuru sınırı gerçek davranıştır)
    const fill = async (page, { email, phone }) => {
      await page.fill("#f-name", "Ayşe Yılmaz");
      await page.fill("#f-phone", phone);
      await page.fill("#f-email", email);
      await page.fill("#f-businessName", "Yılmaz Makine");
      await page.selectOption("#f-sector", "sanayi");
      await page.fill("#f-city", "Gebze");
      await page.getByLabel("Teklif talep formu").check();
      await page.getByLabel("Teknik çizim yükleme").check();
      await page.getByLabel("Yerel SEO").check();
      await page.getByLabel("Logom var").check();
      await page.fill("#f-designNotes", "Koyu tema");
      await page.selectOption("#f-budget", "10-20");
      await page.selectOption("#f-deadline", "tarih");
      await page.fill("#f-deadlineDate", new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10));
      await page.fill("#f-notes", "Tezgâh listesi olacak");
    };
    for (const [label, ctxOpts, seed] of [["masaüstü", { viewport: { width: 1280, height: 800 } }, 1], ["iPhone", { ...devices["iPhone 13"] }, 2]]) {
      await check(`${engineName}/${label}: başvuru formu uçtan uca`, async () => {
        const before = backend.rows.length;
        const emailsBefore = backend.emails.length;
        const context = await browser.newContext({ ...ctxOpts, extraHTTPHeaders: { "x-forwarded-for": `10.9.${seed}.${++ipCounter}` } });
        const page = await context.newPage();
        const tag = `${engineName}${seed}${Date.now() % 100000}`;
        const phone = `0555 20${seed} 00 ${String(ipCounter).padStart(2, "0")}`;
        await page.goto(base + "/basvuru?paket=sanayi", { waitUntil: "networkidle" });
        assert.ok(await page.getByLabel("Sanayi web sitesi (CNC, imalat)").isChecked(), "paket önceden seçilmeli");

        // boş gönderim: hata özeti ve alan hataları, istek yok
        await page.waitForTimeout(2800);
        await page.getByTestId("submit").click();
        await page.getByTestId("form-summary").waitFor();
        assert.ok(await page.locator("#e-name").isVisible());
        assert.equal(backend.rows.length, before);

        await fill(page, { email: `${tag}@Firma.test`, phone });
        await page.getByTestId("submit").click();
        await page.locator("#e-consent").waitFor(); // onay kutusu işaretlenmedi
        await page.getByLabel("Bilgilerimin başvurumu değerlendirmek için kullanılmasını kabul ediyorum.").check();
        await page.getByTestId("submit").click();
        const no = (await page.getByTestId("application-no").innerText({ timeout: 10000 })).trim();
        assert.match(no, /^EA-[A-HJ-NP-Z2-9]{8}$/);
        if (shots && engineName === "chromium") await page.screenshot({ path: path.join(shots, `${label}_basvuru_basarili.png`), fullPage: true });

        // kayıt ve bildirim
        assert.equal(backend.rows.length, before + 1);
        const row = backend.rows.at(-1);
        assert.equal(row.application_no, no);
        assert.equal(row.project_type, "sanayi");
        assert.deepEqual(row.features, ["teklif-formu", "teknik-cizim"]);
        assert.deepEqual(row.extra_services, ["yerel-seo"]);
        assert.equal(row.deadline, "tarih");
        assert.equal(row.email, `${tag}@firma.test`.toLowerCase());
        await page.waitForTimeout(600);
        assert.equal(backend.emails.length, emailsBefore + 1);
        assert.equal(backend.rows.at(-1).notify_status, "sent");

        // başarı ekranındaki WhatsApp bağlantısı ad, proje türü ve numarayı taşır
        const wa = decodeURIComponent(await page.locator('a[href^="https://wa.me/"]').first().getAttribute("href"));
        assert.ok(wa.includes("Adım: Ayşe Yılmaz") && wa.includes("Proje türü: Sanayi web sitesi (CNC, imalat)") && wa.includes(no));

        // aynı e-postayla ikinci başvuru: sunucu reddeder, mesaj arayüzde görünür, kayıt artmaz
        await page.goto(base + "/basvuru", { waitUntil: "networkidle" });
        await page.waitForTimeout(2800);
        await fill(page, { email: `${tag}@firma.test`, phone: `0555 30${seed} 00 ${String(ipCounter).padStart(2, "0")}` });
        await page.getByLabel("Sanayi web sitesi (CNC, imalat)").check();
        await page.getByLabel("Logom var").check();
        await page.getByLabel("WhatsApp", { exact: true }).check();
        await page.getByLabel("Bilgilerimin başvurumu değerlendirmek için kullanılmasını kabul ediyorum.").check();
        await page.getByTestId("submit").click();
        await page.getByTestId("form-summary").waitFor();
        assert.ok((await page.getByTestId("form-summary").innerText()).includes("son 24 saatte başvuru alındı"));
        assert.equal(backend.rows.length, before + 1);
        await context.close();
      });
    }
    await browser.close();
  }

  // Doğrudan API kötüye kullanım denemeleri (gerçek sunucu)
  await check("API: yabancı Origin, Origin'siz istek ve yanlış içerik türü reddedilir", async () => {
    const body = JSON.stringify({});
    assert.equal((await fetch(`${base}/api/basvuru`, { method: "POST", headers: { "content-type": "application/json", origin: "https://evil.example" }, body })).status, 403);
    assert.equal((await fetch(`${base}/api/basvuru`, { method: "POST", headers: { "content-type": "application/json" }, body })).status, 403);
    assert.equal((await fetch(`${base}/api/basvuru`, { method: "POST", headers: { "content-type": "text/plain", origin: base }, body })).status, 415);
    assert.equal((await fetch(`${base}/api/basvuru`, { method: "GET" })).status, 405);
  });
  await check("API: hata yanıtı iç ayrıntı sızdırmaz", async () => {
    backend.state.failInsert = true;
    const res = await fetch(`${base}/api/basvuru`, { method: "POST", headers: { "content-type": "application/json", origin: base, "x-forwarded-for": "198.51.100.200" }, body: JSON.stringify({ name: "x" }) });
    assert.equal(res.status, 422);
    backend.state.failInsert = false;
  });
  await check("güvenlik başlıkları ve robots/sitemap", async () => {
    const home = await fetch(base);
    assert.equal(home.headers.get("x-content-type-options"), "nosniff");
    assert.equal(home.headers.get("x-frame-options"), "DENY");
    const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
    for (const p of ["/web-sitesi", "/fiyatlar", "/sanayi-cozumleri", "/basvuru"]) assert.ok(sitemap.includes(p), p);
    assert.ok((await (await fetch(`${base}/robots.txt`)).text()).includes("Disallow: /api/"));
    const html = await (await fetch(`${base}/fiyatlar`)).text();
    assert.ok(html.includes('rel="canonical" href="https://www.emirr.com.tr/fiyatlar"'));
    assert.ok(html.includes("https://www.emirr.com.tr/og/fiyatlar.jpg") && html.includes('name="twitter:card" content="summary_large_image"'));
    assert.equal((await fetch(`${base}/og/fiyatlar.jpg`)).status, 200);
  });
} finally {
  app.kill();
  fake.close();
}

const failed = results.filter(r => r[0] === "FAIL");
console.log(`\n${results.length - failed.length}/${results.length} geçti`);
if (failed.length) { console.log(appLog.split("\n").slice(-15).join("\n")); process.exitCode = 1; }
