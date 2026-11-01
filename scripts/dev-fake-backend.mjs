// Yerelde başvuru formunu Supabase ve e-posta hesabı olmadan denemek için sahte uç.
// Çalıştırma:  node --import tsx scripts/dev-fake-backend.mjs
// Sonra başka bir terminalde siteyi şu değişkenlerle başlatın (komutu betik yazdırır).
// Başvurular yalnız bellekte tutulur, betik kapanınca silinir. Canlıda kullanılmaz.
import http from "node:http";
import { createFakeBackend } from "../tests/helpers/fake-backend.ts";

const PORT = 4011;
const backend = createFakeBackend();

http
  .createServer((req, res) => {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const reply = backend.handle(req.method, `http://fake${req.url}`, body);
      if (req.method === "POST" && req.url.startsWith("/rest/v1/applications") && reply.status === 201) {
        const row = JSON.parse(body);
        console.log(`\n[başvuru] ${row.application_no}  ${row.name}  ${row.phone}  ${row.email}\n          ${row.business_name} · ${row.project_type} · bütçe ${row.budget}`);
      }
      if (req.url === "/emails" && reply.status === 200) {
        const mail = JSON.parse(body);
        console.log(`[e-posta] ${mail.subject}`);
      }
      res.writeHead(reply.status, reply.headers);
      res.end(reply.body);
    });
  })
  .listen(PORT, "127.0.0.1", () => {
    console.log(`Sahte uç hazır: http://127.0.0.1:${PORT}\n`);
    console.log("Siteyi şu komutla başlatın:\n");
    console.log(
      `SUPABASE_URL=http://127.0.0.1:${PORT} SUPABASE_SERVICE_ROLE_KEY=yerel RESEND_API_KEY=yerel RESEND_API_URL=http://127.0.0.1:${PORT}/emails NOTIFY_EMAIL_TO=ben@example.test NOTIFY_EMAIL_FROM=basvuru@example.test node node_modules/next/dist/bin/next dev --webpack\n`,
    );
  });
