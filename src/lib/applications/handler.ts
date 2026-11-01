import { siteConfig } from "@/data/site";
import { applicationSchema, fieldErrors } from "./schema";
import { sendNotification } from "./notify";
import { countApplications, eq, gte, hashIp, insertApplication, newApplicationNo, setNotifyStatus, since, storeConfig, toRow } from "./store";

const MAX_BODY = 20_000;
const MIN_FILL_MS = 2500;
const PER_IP_PER_HOUR = 3;
const ALL_PER_10_MIN = 40;
const HOUR = 3_600_000;
const DAY = 24 * HOUR;

// Her mesaj iki parçalı: ne oldu + ne yapmalı.
export const MESSAGES = {
  unavailable: "Başvuru formu şu an çalışmıyor. WhatsApp'tan yazabilirsiniz.",
  retry: "Başvuru gönderilemedi. Sayfayı yenileyip tekrar deneyin.",
  invalid: "Formda eksik veya hatalı alanlar var. İşaretli alanları düzeltin.",
  tooMany: "Kısa sürede çok fazla başvuru geldi. Bir saat sonra tekrar deneyin ya da WhatsApp'tan yazın.",
  duplicate: "Bu e-posta veya telefonla son 24 saatte başvuru alındı. Değişiklik için WhatsApp'tan yazın.",
  failed: "Başvuru kaydedilemedi. Biraz sonra tekrar deneyin veya WhatsApp'tan yazın.",
} as const;

export type Schedule = (task: () => Promise<void>) => void;

const json = (status: number, body: Record<string, unknown>, headers: Record<string, string> = {}) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }
  const own = new URL(siteConfig.url).host;
  return host === own || host === own.replace(/^www\./, "") || host === req.headers.get("host");
}

const clientIp = (req: Request) =>
  req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

export async function handleApplication(req: Request, schedule: Schedule): Promise<Response> {
  const cfg = storeConfig();
  if (!cfg) {
    console.error("[basvuru] depolama ayarlı değil (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY)");
    return json(503, { ok: false, message: MESSAGES.unavailable });
  }
  if (!originAllowed(req)) return json(403, { ok: false, message: MESSAGES.retry });
  if (!(req.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) {
    return json(415, { ok: false, message: MESSAGES.retry });
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, message: MESSAGES.retry });
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, message: MESSAGES.retry });
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) return json(400, { ok: false, message: MESSAGES.retry });

  // Gizli tuzak alanı: insan görmez ve doldurmaz.
  if ((body as Record<string, unknown>).website) return json(400, { ok: false, message: MESSAGES.retry });

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) return json(422, { ok: false, message: MESSAGES.invalid, fieldErrors: fieldErrors(parsed.error) });
  const data = parsed.data;
  if (data.fillMs < MIN_FILL_MS) return json(400, { ok: false, message: MESSAGES.retry });

  const ipHash = hashIp(clientIp(req));
  try {
    const [byIp, byEmail, byPhone, recent] = await Promise.all([
      countApplications(cfg, `${eq("ip_hash", ipHash)}&${gte("created_at", since(HOUR))}`),
      countApplications(cfg, `${eq("email", data.email)}&${gte("created_at", since(DAY))}`),
      countApplications(cfg, `${eq("phone", data.phone)}&${gte("created_at", since(DAY))}`),
      countApplications(cfg, gte("created_at", since(10 * 60_000))),
    ]);
    if (byIp >= PER_IP_PER_HOUR || recent >= ALL_PER_10_MIN) {
      return json(429, { ok: false, message: MESSAGES.tooMany }, { "Retry-After": "3600" });
    }
    if (byEmail > 0 || byPhone > 0) return json(409, { ok: false, message: MESSAGES.duplicate });

    let applicationNo = "";
    let saved = false;
    for (let attempt = 0; attempt < 3 && !saved; attempt++) {
      applicationNo = newApplicationNo();
      const result = await insertApplication(cfg, toRow(data, applicationNo, ipHash, req.headers.get("user-agent")));
      if (result.ok) saved = true;
      else if (!result.conflict) throw new Error(`insert failed: ${result.status}`);
    }
    if (!saved) throw new Error("insert failed: numara çakışması");

    schedule(async () => {
      const result = await sendNotification(applicationNo, data);
      if (result.status === "failed") console.error(`[basvuru] bildirim gönderilemedi (${applicationNo}): ${result.reason}`);
      await setNotifyStatus(cfg, applicationNo, result.status, result.status === "failed" ? result.reason : undefined).catch(() => undefined);
    });

    return json(201, { ok: true, applicationNo });
  } catch (error) {
    console.error("[basvuru]", error instanceof Error ? error.message : "bilinmeyen hata");
    return json(503, { ok: false, message: MESSAGES.failed });
  }
}
