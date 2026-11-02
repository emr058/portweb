// Yerel sistem demosundan kapak, ekran görüntüleri ve kısa videolar kaydeder.
// Kullanım: PLAYWRIGHT_FROM=/yol/package.json CHROMIUM_EXECUTABLE=/yol/chromium node scripts/sistem-kayit.mjs <id> <url>
import { createRequire } from "node:module";
import { copyFile, mkdir, mkdtemp, readFile, rm, stat } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(process.env.PLAYWRIGHT_FROM || import.meta.url);
const id = process.argv[2];
const base = process.argv[3];
if (!id || !base) {
  console.error("Kullanım: node scripts/sistem-kayit.mjs <telefoncu|takimtek> <url>");
  process.exit(1);
}
const source = await readFile(path.join(root, "src", "data", "systems.ts"), "utf8");
const routeBlock = new RegExp(`id: "${id}"[\\s\\S]*?kayitYollari: \\{([^}]+)\\}`).exec(source)?.[1];
if (!routeBlock || ![...routeBlock.matchAll(/(anaSayfa|liste|urun|teklif): "([^"]+)"/g)].length) {
  console.error(`systems.ts içinde ${id} kaydı veya kayitYollari bulunamadı.`);
  process.exit(1);
}
const routes = Object.fromEntries([...routeBlock.matchAll(/(anaSayfa|liste|urun|teklif): "([^"]+)"/g)].map(([, key, value]) => [key, value]));
if (["anaSayfa", "liste", "urun", "teklif"].some(key => !routes[key])) {
  console.error(`${id} kaydı anaSayfa, liste, urun ve teklif yollarını içermeli.`);
  process.exit(1);
}
const system = { id };
const outputDir = path.join(root, "public", "sistemler", id);

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: "inherit" });
    child.once("error", reject);
    child.once("exit", code => code === 0 ? resolve() : reject(new Error(`${command} çıktı kodu ${code}`)));
  });
}

async function installCaptureCleanup(page) {
  await page.addInitScript(() => {
    const clean = () => {
      document.querySelectorAll("#demo-bar, [data-demo-bar], [data-demo-toolbar], .demo-bar, .demo-toolbar, iframe[name='admin']").forEach(node => node.remove());
      document.querySelectorAll("a[href*='/admin'], a[href*='/yonetim'], a[href*='/yönetim']").forEach(node => node.remove());
      document.querySelectorAll("a, button").forEach(node => {
        if (/yönetim|yonetim|admin panel/i.test(node.textContent || "")) node.remove();
      });
    };
    new MutationObserver(clean).observe(document, { childList: true, subtree: true });
    document.addEventListener("DOMContentLoaded", clean, { once: true });
  });
}

async function openClean(page, route) {
  const url = new URL(route, base.endsWith("/") ? base : `${base}/`).href;
  const response = await page.goto(url, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${route} açılamadı (${response?.status() ?? "yanıt yok"})`);
  await page.evaluate(() => {
    document.getElementById("demo-bar")?.remove();
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
  });
  await page.waitForTimeout(350);
}

async function recordVideo(browser, viewport, mobile, seconds, temp, playback) {
  const context = await browser.newContext({
    viewport,
    deviceScaleFactor: 1,
    isMobile: mobile,
    hasTouch: mobile,
    recordVideo: { dir: temp, size: viewport },
  });
  const page = await context.newPage();
  await installCaptureCleanup(page);
  const video = page.video();
  try {
    const start = Date.now();
    await playback(page);
    const elapsed = Date.now() - start;
    if (elapsed < seconds * 1000) await page.waitForTimeout(seconds * 1000 - elapsed);
  } finally {
    await context.close();
  }
  return video.path();
}

let browser;
let temp;
try {
  const { chromium } = require("playwright");
  browser = await chromium.launch(process.env.CHROMIUM_EXECUTABLE ? { executablePath: process.env.CHROMIUM_EXECUTABLE } : {});
  await mkdir(outputDir, { recursive: true });

  // Dört masaüstü ekran: ana sayfa, liste, ürün ve teklif/sepet.
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  await installCaptureCleanup(page);
  const captureRoutes = [routes.anaSayfa, routes.liste, routes.urun, routes.teklif];
  for (let index = 0; index < captureRoutes.length; index++) {
    await openClean(page, captureRoutes[index]);
    await page.screenshot({ path: path.join(outputDir, `ekran-${index + 1}.jpg`), type: "jpeg", quality: 82 });
    if (index === 0) await copyFile(path.join(outputDir, "ekran-1.jpg"), path.join(outputDir, "kapak.jpg"));
  }
  await context.close();

  temp = await mkdtemp(path.join(os.tmpdir(), `portweb-${system.id}-`));
  const desktopRaw = await recordVideo(browser, { width: 1280, height: 800 }, false, 10, temp, async videoPage => {
    await openClean(videoPage, routes.anaSayfa);
    const max = await videoPage.evaluate(() => Math.max(0, document.documentElement.scrollHeight - innerHeight));
    await videoPage.evaluate(maxScroll => new Promise(resolve => {
      const start = performance.now();
      const duration = 9500;
      const frame = now => {
        const p = Math.min(1, (now - start) / duration);
        const eased = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        scrollTo(0, maxScroll * eased);
        if (p < 1) requestAnimationFrame(frame); else resolve();
      };
      requestAnimationFrame(frame);
    }), max);
  });
  const desktopOut = path.join(outputDir, "masaustu.mp4");
  const desktopFilter = "[0:v]fps=24,scale=720:450:force_original_aspect_ratio=decrease,pad=720:450:(ow-iw)/2:(oh-ih)/2,setsar=1,format=yuv420p[v]";
  await run("ffmpeg", ["-y", "-i", desktopRaw, "-filter_complex", desktopFilter, "-map", "[v]", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "31", "-b:v", "850k", "-maxrate", "850k", "-bufsize", "1700k", "-t", "10", "-movflags", "+faststart", desktopOut]);

  const phoneRaw = await recordVideo(browser, { width: 390, height: 844 }, true, 10, temp, async phonePage => {
    const mobileRoutes = [routes.anaSayfa, routes.liste, routes.urun];
    for (const route of mobileRoutes) {
      await openClean(phonePage, route);
      await phonePage.waitForTimeout(1500);
    }
  });
  const phoneOut = path.join(outputDir, "telefon.mp4");
  await run("ffmpeg", ["-y", "-i", phoneRaw, "-vf", "fps=24,scale=390:844,setsar=1,format=yuv420p", "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "30", "-b:v", "850k", "-maxrate", "850k", "-bufsize", "1700k", "-t", "10", "-movflags", "+faststart", phoneOut]);

  for (const file of [desktopOut, phoneOut]) {
    const size = (await stat(file)).size;
    if (size > 1_500_000) throw new Error(`${path.basename(file)} 1,5 MB sınırını aştı (${size} bayt)`);
    console.log(`${path.relative(root, file)} (${size} bayt)`);
  }
  console.log(`${path.relative(root, outputDir)} medya kayıtları tamamlandı.`);
} catch (error) {
  console.error(`Kayıt başarısız: ${error instanceof Error ? error.message : error}`);
  process.exitCode = 1;
} finally {
  await browser?.close();
  if (temp) await rm(temp, { recursive: true, force: true });
}
