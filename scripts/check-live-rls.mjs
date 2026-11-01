// Gerçek Supabase projesinde herkese açık (anon) anahtarın başvuru tablosuna erişemediğini doğrular.
// Kurulumdan sonra bir kez çalıştırın:
//   SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/check-live-rls.mjs
// Beklenen: okuma boş veya reddedilir, ekleme reddedilir. Anahtarlar komut satırında kalır, dosyaya yazılmaz.
const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
const key = process.env.SUPABASE_ANON_KEY;
if (!url || !key) { console.error("SUPABASE_URL ve SUPABASE_ANON_KEY gerekli."); process.exit(2); }
const h = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

const read = await fetch(`${url}/rest/v1/applications?select=id&limit=1`, { headers: h });
const rows = read.ok ? await read.json() : [];
const readOk = !read.ok || (Array.isArray(rows) && rows.length === 0);
console.log(readOk ? "ok  " : "FAIL", `anon okuma: HTTP ${read.status}, ${rows.length ?? 0} satır`);

const write = await fetch(`${url}/rest/v1/applications`, { method: "POST", headers: { ...h, Prefer: "return=minimal" }, body: JSON.stringify({ application_no: "EA-ZZZZZZZZ" }) });
const writeOk = !write.ok;
console.log(writeOk ? "ok  " : "FAIL", `anon ekleme: HTTP ${write.status}`);
process.exit(readOk && writeOk ? 0 : 1);
