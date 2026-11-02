// Temalar için sessiz döngülü video önizlemeleri üretir.
// Kullanım: PLAYWRIGHT_FROM=/yol/package.json CHROMIUM_EXECUTABLE=... node scripts/onizleme-video.mjs
import { createRequire } from "node:module";
import { mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const themesDir = path.join(root, "public", "temalar");
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const ids = ["yeme-icme-1", "sanayi-1", "klinik-1", "guzellik-1", "spor-1"];

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", code => code === 0 ? resolve() : reject(new Error(`${command} çıktı kodu ${code}`)));
  });
}

async function record(browser, id, viewport, mobile, seconds, dir) {
  const t0 = Date.now();
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile, recordVideo: { dir, size: viewport } });
  let offset = 0;
  const page = await context.newPage();
  const video = page.video();
  try {
    await page.goto(pathToFileURL(path.join(themesDir, id, "index.html")).href, { waitUntil: "networkidle" });
    await page.evaluate(() => {
      document.getElementById("demo-bar")?.remove();
      document.documentElement.style.scrollBehavior = "auto";
    });
    await page.waitForTimeout(250);
    offset = (Date.now() - t0) / 1000;
    await page.waitForTimeout(900);
    const max = await page.evaluate((k) => Math.min(Math.max(0, document.documentElement.scrollHeight - innerHeight), innerHeight * k), mobile ? 2.6 : 3.2);
    const moves = mobile ? 1 : 3;
    const duration = seconds * 1000 / moves;
    for (let i = 1; i <= moves; i++) {
      const target = Math.round(max * i / moves);
      await page.evaluate(({ target, duration }) => new Promise(resolve => {
        const start = scrollY;
        const began = performance.now();
        const tick = now => {
          const p = Math.min(1, (now - began) / duration);
          const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
          scrollTo(0, start + (target - start) * eased);
          if (p < 1) requestAnimationFrame(tick); else resolve();
        };
        requestAnimationFrame(tick);
      }), { target, duration });
    }
    await page.waitForTimeout(180);
  } finally {
    await context.close();
  }
  return { path: await video.path(), offset };
}

let browser;
try {
  const { chromium } = require("playwright");
  browser = await chromium.launch(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {});
  for (const id of ids) {
    let temp;
    try {
      const html = await readFile(path.join(themesDir, id, "index.html"));
      if (!html.length) throw new Error("index.html boş");
      temp = await mkdtemp(path.join(os.tmpdir(), `portweb-${id}-`));
      const desktop = await record(browser, id, { width: 1280, height: 800 }, false, 6.4, temp);
      const output = path.join(themesDir, `${id}-onizleme.mp4`);
      const filter = "[0:v]fps=24,scale=720:450:force_original_aspect_ratio=decrease,pad=720:450:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p[v]";
      await run("ffmpeg", ["-y", "-ss", String(desktop.offset), "-i", desktop.path, "-filter_complex", filter, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-b:v", "900k", "-maxrate", "900k", "-bufsize", "1800k", "-t", "8.4", "-movflags", "+faststart", output]);
      const size = (await stat(output)).size;
      if (size > 1_200_000) throw new Error(`MP4 boyutu sınırı aştı: ${size} bayt`);
      console.log(`ok ${id} (${size} bayt)`);
    } catch (error) {
      console.error(`Hata (${id}): ${error instanceof Error ? error.message : error}`);
    } finally {
      if (temp) await rm(temp, { recursive: true, force: true });
    }
  }
} catch (error) {
  console.error(`Playwright başlatılamadı: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
}
