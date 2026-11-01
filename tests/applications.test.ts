import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import { createFakeBackend } from "./helpers/fake-backend";
import { applicationSchema, fieldErrors, normalizePhone } from "../src/lib/applications/schema";
import { handleApplication, MESSAGES } from "../src/lib/applications/handler";
import { formatRange, formatTL, industrial, maintenancePlans, seoPlans, socialPlans, websitePackages } from "../src/data/pricing";
import { whatsappMessage, whatsappNumber, whatsappUrl } from "../src/lib/whatsapp";

let counter = 0;
const valid = (over: Record<string, unknown> = {}) => {
  counter++;
  return {
    name: "Ayşe Yılmaz",
    phone: `0555 100 ${String(1000 + counter).slice(-4)}`,
    email: `Musteri${counter}@Firma.com`,
    preferredContact: "whatsapp",
    businessName: "Yılmaz Makine",
    sector: "sanayi",
    city: "Gebze",
    currentSite: "www.yilmazmakine.com",
    projectType: "sanayi",
    features: ["teklif-formu", "teknik-cizim", "teklif-formu"],
    extraServices: ["yerel-seo"],
    designLogo: "var",
    designNotes: "Koyu renk olsun",
    budget: "10-20",
    deadline: "1-ay",
    notes: "Tezgâh listesi olacak",
    consent: true,
    fillMs: 20_000,
    ...over,
  };
};

describe("fiyat yapılandırması", () => {
  it("tutarlar Türkçe biçimlenir", () => {
    assert.equal(formatTL(5000), "5.000 TL");
    assert.equal(formatRange({ min: 7500, max: 10000 }), "7.500–10.000 TL");
    assert.equal(formatRange(industrial.from), "15.000–25.000 TL");
  });
  it("kampanya fiyatı normal fiyatın altında ve değerler talimatla aynı", () => {
    const [baslangic, pro] = websitePackages;
    assert.deepEqual([baslangic.normal.min, baslangic.campaign.min], [10000, 5000]);
    assert.deepEqual([pro.normal, pro.campaign], [{ min: 15000, max: 20000 }, { min: 7500, max: 10000 }]);
    for (const p of websitePackages) {
      assert.ok(p.campaign.min < p.normal.min);
      assert.ok((p.campaign.max ?? 0) < (p.normal.max ?? Infinity));
    }
  });
  it("ek hizmet fiyatları", () => {
    assert.deepEqual(maintenancePlans.map(p => p.price), [750, 1500, 2500]);
    assert.deepEqual(seoPlans.map(p => p.price), [2500, 4000]);
    assert.deepEqual(socialPlans.map(p => p.price), [3000, 5000]);
  });
});

describe("whatsapp", () => {
  it("numara site telefonundan türetilir, uydurma yok", () => {
    assert.equal(whatsappNumber(), "905353753358");
    assert.equal(whatsappNumber("0555 111 22 33"), "905551112233");
    assert.equal(whatsappNumber("+90 555 111 22 33"), "905551112233");
  });
  it("mesaj paket, ad ve proje türünü içerir", () => {
    const text = whatsappMessage({ packageName: "Başlangıç Web Sitesi", priceText: "5.000 TL", name: "Ayşe", projectType: "Sanayi web sitesi", applicationNo: "EA-ABCDEFGH" });
    for (const part of ["Başlangıç Web Sitesi", "5.000 TL", "Adım: Ayşe", "Proje türü: Sanayi web sitesi", "EA-ABCDEFGH"]) assert.ok(text.includes(part), part);
    assert.ok(whatsappUrl(text, "905551112233").startsWith("https://wa.me/905551112233?text=Merhaba"));
  });
});

describe("başvuru şeması", () => {
  it("geçerli girdiyi düzenler", () => {
    const r = applicationSchema.safeParse(valid({ name: "  Ayşe Yılmaz  " }));
    assert.ok(r.success);
    assert.equal(r.data.name, "Ayşe Yılmaz");
    assert.match(r.data.phone, /^\+90555/);
    assert.equal(r.data.email, r.data.email.toLowerCase());
    assert.equal(r.data.currentSite, "https://www.yilmazmakine.com/");
    assert.deepEqual(r.data.features, ["teklif-formu", "teknik-cizim"]);
  });
  it("telefon biçimleri", () => {
    assert.equal(normalizePhone("0555 123 45 67"), "+905551234567");
    assert.equal(normalizePhone("+90 (555) 123-45-67"), "+905551234567");
    assert.equal(normalizePhone("5551234567"), "+905551234567");
    assert.equal(normalizePhone("905551234567"), "+905551234567");
    assert.equal(normalizePhone("00905551234567"), "+905551234567");
    assert.equal(normalizePhone("123"), null);
    assert.equal(normalizePhone("abc"), null);
  });
  it("zorunlu alanlar, onay ve bilinmeyen seçenekler reddedilir", () => {
    const r = applicationSchema.safeParse(valid({ consent: false, projectType: "x", email: "yanlis", name: "" }));
    assert.ok(!r.success);
    const errors = fieldErrors(r.error);
    for (const key of ["consent", "projectType", "email", "name"]) assert.ok(errors[key], key);
  });
  it("javascript: ve diğer şemalar site adresinde kabul edilmez", () => {
    assert.ok(!applicationSchema.safeParse(valid({ currentSite: "javascript:alert(1)" })).success);
    assert.ok(!applicationSchema.safeParse(valid({ currentSite: "ftp://x.com" })).success);
  });
  it("teslim tarihi kuralları", () => {
    const day = 86_400_000;
    const iso = (offset: number) => new Date(Date.now() + offset * day).toISOString().slice(0, 10);
    assert.ok(applicationSchema.safeParse(valid({ deadline: "tarih", deadlineDate: iso(30) })).success);
    assert.ok(!applicationSchema.safeParse(valid({ deadline: "tarih" })).success);
    assert.ok(!applicationSchema.safeParse(valid({ deadline: "tarih", deadlineDate: iso(-10) })).success);
    assert.ok(!applicationSchema.safeParse(valid({ deadline: "tarih", deadlineDate: iso(900) })).success);
    assert.ok(!applicationSchema.safeParse(valid({ deadline: "tarih", deadlineDate: "2026-02-31" })).success);
  });
  it("uzun metinler reddedilir", () => {
    assert.ok(!applicationSchema.safeParse(valid({ notes: "a".repeat(2001) })).success);
  });
});

describe("POST /api/basvuru", () => {
  const backend = createFakeBackend();
  const realFetch = globalThis.fetch;
  const saved = { ...process.env };
  let tasks: Promise<void>[] = [];
  const schedule = (task: () => Promise<void>) => { tasks.push(task()); };
  const settle = () => Promise.all(tasks).then(() => { tasks = []; });

  const post = (body: unknown, headers: Record<string, string> = {}, raw?: string) =>
    handleApplication(
      new Request("https://www.emirr.com.tr/api/basvuru", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://www.emirr.com.tr", "x-forwarded-for": "203.0.113.5", "user-agent": "test", ...headers },
        body: raw ?? JSON.stringify(body),
      }),
      schedule,
    );

  beforeEach(() => {
    backend.rows.length = 0;
    backend.emails.length = 0;
    Object.assign(backend.state, { failInsert: false, conflictOnce: false, failEmail: false, failCount: false });
    globalThis.fetch = backend.fakeFetch;
    Object.assign(process.env, {
      SUPABASE_URL: "https://proje.supabase.test",
      SUPABASE_SERVICE_ROLE_KEY: "service-role-test-key",
      RESEND_API_KEY: "re_test",
      RESEND_API_URL: "https://resend.test/emails",
      NOTIFY_EMAIL_TO: "ben@emirr.test",
      NOTIFY_EMAIL_FROM: "Başvuru <basvuru@emirr.test>",
    });
    // Sahte uç tek yoldan okur: URL'nin yalnız path'i önemlidir.
    process.env.SUPABASE_URL = "https://proje.supabase.test";
  });
  afterEach(() => {
    globalThis.fetch = realFetch;
    for (const key of Object.keys(process.env)) if (!(key in saved)) delete process.env[key];
    Object.assign(process.env, saved);
  });

  it("başvuruyu kaydeder, benzersiz numara verir, IP'yi ham saklamaz, yöneticiyi bilgilendirir", async () => {
    const res = await post(valid());
    assert.equal(res.status, 201);
    const json = await res.json();
    assert.match(json.applicationNo, /^EA-[A-HJ-NP-Z2-9]{8}$/);
    await settle();
    assert.equal(backend.rows.length, 1);
    const row = backend.rows[0];
    assert.equal(row.application_no, json.applicationNo);
    assert.match(String(row.phone), /^\+90555/);
    assert.equal(row.business_name, "Yılmaz Makine");
    assert.ok(!JSON.stringify(row).includes("203.0.113.5"), "ham IP saklanmamalı");
    assert.equal(String(row.ip_hash).length, 32);
    assert.equal(row.notify_status, "sent");
    assert.equal(backend.emails.length, 1);
    const mail = backend.emails[0] as { to: string[]; subject: string; text: string; reply_to: string };
    assert.deepEqual(mail.to, ["ben@emirr.test"]);
    assert.ok(mail.subject.includes(json.applicationNo));
    assert.ok(mail.text.includes("Yılmaz Makine") && mail.text.includes("https://wa.me/90555"));
    assert.equal(mail.reply_to, row.email);
  });

  it("iki başvuru farklı numara alır", async () => {
    const a = await (await post(valid(), { "x-forwarded-for": "198.51.100.1" })).json();
    const b = await (await post(valid(), { "x-forwarded-for": "198.51.100.2" })).json();
    assert.notEqual(a.applicationNo, b.applicationNo);
  });

  it("numara çakışırsa yeniden dener", async () => {
    backend.state.conflictOnce = true;
    const res = await post(valid());
    assert.equal(res.status, 201);
    assert.equal(backend.rows.length, 1);
  });

  it("depolama ayarlı değilse 503 döner ve kayıt yapmaz", async () => {
    delete process.env.SUPABASE_URL;
    const res = await post(valid());
    assert.equal(res.status, 503);
    assert.equal((await res.json()).message, MESSAGES.unavailable);
  });

  it("yanlış veya eksik Origin reddedilir", async () => {
    assert.equal((await post(valid(), { origin: "https://kotu-site.example" })).status, 403);
    const noOrigin = await handleApplication(new Request("https://www.emirr.com.tr/api/basvuru", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(valid()) }), schedule);
    assert.equal(noOrigin.status, 403);
    assert.equal(backend.rows.length, 0);
  });

  it("tuzak alanı dolu ise veya form çok hızlı gönderildiyse reddeder", async () => {
    assert.equal((await post(valid({ website: "http://spam.example" }))).status, 400);
    assert.equal((await post(valid({ fillMs: 400 }))).status, 400);
    assert.equal(backend.rows.length, 0);
  });

  it("geçersiz girdi 422 ve alan hataları döner", async () => {
    const res = await post(valid({ email: "yanlis", phone: "12" }));
    assert.equal(res.status, 422);
    const json = await res.json();
    assert.ok(json.fieldErrors.email && json.fieldErrors.phone);
    assert.equal(backend.rows.length, 0);
  });

  it("gövde ve içerik türü sınırları", async () => {
    assert.equal((await post(null, {}, "x".repeat(25_000))).status, 413);
    assert.equal((await post(null, {}, "{bozuk")).status, 400);
    assert.equal((await post(null, {}, "[]")).status, 400);
    assert.equal((await post(valid(), { "content-type": "text/plain" })).status, 415);
  });

  it("aynı kaynaktan saatte 3 başvuru; 4. reddedilir", async () => {
    for (let i = 0; i < 3; i++) assert.equal((await post(valid(), { "x-forwarded-for": "192.0.2.77" })).status, 201);
    const res = await post(valid(), { "x-forwarded-for": "192.0.2.77" });
    assert.equal(res.status, 429);
    assert.equal(res.headers.get("retry-after"), "3600");
    assert.equal(backend.rows.length, 3);
  });

  it("24 saat içinde aynı e-posta veya telefonla ikinci başvuru reddedilir", async () => {
    const first = valid();
    assert.equal((await post(first, { "x-forwarded-for": "192.0.2.1" })).status, 201);
    assert.equal((await post(valid({ email: first.email }), { "x-forwarded-for": "192.0.2.2" })).status, 409);
    assert.equal((await post(valid({ phone: first.phone }), { "x-forwarded-for": "192.0.2.3" })).status, 409);
    assert.equal(backend.rows.length, 1);
  });

  it("veritabanı hatasında iç ayrıntı istemciye sızmaz", async () => {
    backend.state.failInsert = true;
    const res = await post(valid());
    assert.equal(res.status, 503);
    const text = await res.text();
    assert.ok(!text.includes("secret detail") && !text.includes("service-role"));
    assert.ok(text.includes(MESSAGES.failed));
  });

  it("sayım ucu hata verirse başvuru kabul edilmez (sınır atlatılamaz)", async () => {
    backend.state.failCount = true;
    assert.equal((await post(valid())).status, 503);
    assert.equal(backend.rows.length, 0);
  });

  it("e-posta bildirimi başarısız olsa da başvuru kayıtlı kalır", async () => {
    backend.state.failEmail = true;
    assert.equal((await post(valid())).status, 201);
    await settle();
    assert.equal(backend.rows.length, 1);
    assert.equal(backend.rows[0].notify_status, "failed");
  });

  it("e-posta anahtarı yoksa bildirim atlanır, başvuru kaydedilir", async () => {
    delete process.env.RESEND_API_KEY;
    assert.equal((await post(valid())).status, 201);
    await settle();
    assert.equal(backend.rows[0].notify_status, "skipped");
    assert.equal(backend.emails.length, 0);
  });
});
