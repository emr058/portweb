// Tema kaynaklarını (~/Desktop/2026/temalar/<id>) portfolyoya kopyalar ve önizleme görsellerini üretir.
// Kullanım: PLAYWRIGHT_FROM=/yol/package.json CHROMIUM_EXECUTABLE=... node scripts/sync-temalar.mjs [id ...]
import { createRequire } from "node:module";
import { cpSync, mkdirSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = process.env.TEMALAR_DIR || path.join(homedir(), "Desktop/2026/temalar");
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const { chromium } = require("playwright");
const sharp = require("sharp");

const ids = process.argv.slice(2);
const all = ["yeme-icme-1", "sanayi-1", "klinik-1", "guzellik-1", "spor-1"];
const list = ids.length ? ids : all;
const version = Date.now().toString(36);

const browser = await chromium.launch(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {});
for (const id of list) {
  const from = path.join(src, id);
  const to = path.join(root, "public", "temalar", id);
  if (!existsSync(from)) throw new Error(`Kaynak yok: ${from}`);
  rmSync(to, { recursive: true, force: true });
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true, filter: p => !p.includes(".taste-skill") && !p.endsWith(".DS_Store") && !p.endsWith("credits.json") });

  let html = readFileSync(path.join(to, "index.html"), "utf8");
  html = html.replace('<meta name="description"', '<meta name="robots" content="noindex">\n<meta name="description"');
  html = html.replace(/href="(fonts\.css|style\.css)"/g, `href="$1?v=${version}"`).replace('src="app.js"', `src="app.js?v=${version}"`);
  html = html.replace("</body>", `<script src="/temalar/demo-bar.js" data-theme="${id}" defer></script>\n</body>`);
  writeFileSync(path.join(to, "index.html"), html);

  const shot = async (name, viewport, width, isMobile = false) => {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 1, isMobile, hasTouch: isMobile });
    await page.goto(pathToFileURL(path.join(to, "index.html")).href);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2600);
    await page.evaluate(() => document.getElementById("demo-bar")?.remove());
    const buf = await page.screenshot({ type: "jpeg", quality: 88 });
    await sharp(buf).resize(width).jpeg({ quality: 80, mozjpeg: true }).toFile(path.join(root, "public", "temalar", `${id}-${name}.jpg`));
    await page.close();
  };
  await shot("onizleme", { width: 1440, height: 900 }, 1200);
  await shot("telefon", { width: 390, height: 844 }, 390, true);
  console.log("ok", id);
}
await browser.close();
