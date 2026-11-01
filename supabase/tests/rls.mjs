// Migration'ı gerçek bir PostgreSQL motorunda (PGlite) Supabase'in varsayılan yetkileriyle çalıştırır ve
// anon/authenticated rollerinin tabloya erişemediğini, kısıtların kötü veriyi reddettiğini doğrular.
// Çalıştırma: PGLITE_FROM=/yol/@electric-sql/pglite-kurulu/package.json node supabase/tests/rls.mjs
// (pglite depoya eklenmedi; yalnız bu doğrulama için gerekir.)
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(process.env.PGLITE_FROM || import.meta.url);
const { PGlite } = require("@electric-sql/pglite");
const sql = readFileSync(new URL("../migrations/001_applications.sql", import.meta.url), "utf8");

const db = new PGlite();
// Supabase benzeri roller ve varsayılan yetkiler (yeni tablolara anon/authenticated/service_role tam yetki verilir)
await db.exec(`
  create role anon nologin; create role authenticated nologin; create role service_role nologin bypassrls;
  grant usage on schema public to anon, authenticated, service_role;
  alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
`);
await db.exec(sql);

const row = (n, over = {}) => ({
  application_no: `EA-${n}`, name: "Ayşe Yılmaz", phone: "+905551234567", email: "a@b.co", preferred_contact: "whatsapp",
  business_name: "Yılmaz Makine", sector: "sanayi", project_type: "sanayi", design_logo: "var", budget: "10-20", deadline: "1-ay",
  consent_at: new Date().toISOString(), ip_hash: "a".repeat(32), ...over,
});
const insert = r => {
  const cols = Object.keys(r);
  return `insert into public.applications (${cols.join(",")}) values (${cols.map(c => `'${String(r[c]).replace(/'/g, "''")}'`).join(",")})`;
};
const attempt = async (role, query) => {
  await db.exec(`set role ${role}`);
  try { const res = await db.query(query); return { ok: true, rows: res.rows.length }; }
  catch (e) { return { ok: false, err: e.message }; }
  finally { await db.exec("reset role"); }
};

const out = [];
const expect = (name, cond, detail = "") => { out.push([cond ? "ok  " : "FAIL", name, detail]); };

const good = insert(row("ABCDEFGH"));
let r = await attempt("service_role", good);
expect("service_role kayıt ekleyebilir (RLS'yi aşar)", r.ok, r.err);
r = await attempt("service_role", "select id from public.applications");
expect("service_role kayıtları okuyabilir", r.ok && r.rows === 1, r.err);

for (const role of ["anon", "authenticated"]) {
  r = await attempt(role, "select * from public.applications");
  expect(`${role} okuyamaz`, !r.ok && /permission denied/i.test(r.err), r.err);
  r = await attempt(role, insert(row("JKLMNPQR")));
  expect(`${role} ekleyemez`, !r.ok && /permission denied/i.test(r.err), r.err);
  r = await attempt(role, "update public.applications set status='won'");
  expect(`${role} güncelleyemez`, !r.ok, r.err);
  r = await attempt(role, "delete from public.applications");
  expect(`${role} silemez`, !r.ok, r.err);
}

// RLS tek başına da kilitli mi? Yetkiyi geri verip politikasız RLS'nin boş döndürdüğünü doğrula.
await db.exec("grant select, insert on public.applications to anon");
r = await attempt("anon", "select * from public.applications");
expect("yetki geri verilse bile politika yok: anon 0 satır görür (RLS ikinci kat)", r.ok && r.rows === 0, r.err);
r = await attempt("anon", insert(row("STUVWXYZ")));
expect("yetki geri verilse bile politika yok: anon ekleyemez (RLS)", !r.ok && /row-level security/i.test(r.err), r.err);
await db.exec("revoke all on public.applications from anon");

// Kısıtlar
const bad = {
  "geçersiz telefon": row("ABCDEFG2", { phone: "0555" }),
  "geçersiz başvuru numarası": row("abc"),
  "büyük harfli e-posta": row("ABCDEFG3", { email: "A@B.CO" }),
  "bilinmeyen proje türü": row("ABCDEFG4", { project_type: "hack" }),
  "kısa ip özeti": row("ABCDEFG5", { ip_hash: "x" }),
  "tekrarlanan başvuru numarası": row("ABCDEFGH"),
};
for (const [name, value] of Object.entries(bad)) {
  r = await attempt("service_role", insert(value));
  expect(`kısıt: ${name} reddedilir`, !r.ok, r.err);
}
r = await attempt("service_role", "select notify_status, status from public.applications");
await db.exec("set role service_role");
const d = (await db.query("select notify_status, status from public.applications")).rows[0];
expect("varsayılanlar: notify_status=pending, status=new", d.notify_status === "pending" && d.status === "new", JSON.stringify(d));

for (const line of out) console.log(line[0], line[1], line[0] === "FAIL" ? `\n     ${line[2]}` : "");
console.log(`\n${out.filter(o => o[0] === "ok  ").length}/${out.length} geçti`);
process.exitCode = out.some(o => o[0] === "FAIL") ? 1 : 0;
