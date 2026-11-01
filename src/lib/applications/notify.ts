import { BUDGETS, CONTACT_METHODS, DEADLINES, DESIGN_LOGO, EXTRA_SERVICES, ALL_FEATURES, PROJECT_TYPES, SECTORS, labelOf } from "./options";
import type { ApplicationInput } from "./schema";

// Yönetici bildirimi: Resend HTTP API ile düz metin e-posta. Anahtar yoksa atlanır;
// başvuru bildirimden bağımsız olarak zaten kaydedilmiştir.

export type NotifyResult = { status: "sent" } | { status: "skipped" } | { status: "failed"; reason: string };

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export function notificationText(applicationNo: string, d: ApplicationInput): { subject: string; text: string } {
  const list = (items: string[], source: readonly { value: string; label: string }[]) => (items.length ? items.map(v => labelOf(source, v)).join(", ") : "-");
  const waNumber = d.phone.replace(/\D/g, "");
  const lines = [
    `Başvuru no: ${applicationNo}`,
    "",
    `Ad soyad: ${oneLine(d.name)}`,
    `Telefon: ${d.phone}  (WhatsApp: https://wa.me/${waNumber})`,
    `E-posta: ${d.email}`,
    `Tercih edilen iletişim: ${labelOf(CONTACT_METHODS, d.preferredContact)}`,
    "",
    `İşletme: ${oneLine(d.businessName)}`,
    `Sektör: ${labelOf(SECTORS, d.sector)}`,
    `Şehir: ${d.city ?? "-"}`,
    `Mevcut site: ${d.currentSite ?? "-"}`,
    "",
    `Proje türü: ${labelOf(PROJECT_TYPES, d.projectType)}`,
    `İstenen özellikler: ${list(d.features, ALL_FEATURES)}`,
    `Ek hizmetler: ${list(d.extraServices, EXTRA_SERVICES)}`,
    `Logo: ${labelOf(DESIGN_LOGO, d.designLogo)}`,
    `Tasarım notları: ${d.designNotes ?? "-"}`,
    `Bütçe: ${labelOf(BUDGETS, d.budget)}`,
    `Teslim: ${labelOf(DEADLINES, d.deadline)}${d.deadline === "tarih" && d.deadlineDate ? ` (${d.deadlineDate})` : ""}`,
    "",
    `Notlar: ${d.notes ?? "-"}`,
  ];
  return { subject: `Yeni başvuru ${applicationNo}: ${oneLine(d.businessName).slice(0, 80)}`, text: lines.join("\n") };
}

export async function sendNotification(applicationNo: string, data: ApplicationInput, env: NodeJS.ProcessEnv = process.env): Promise<NotifyResult> {
  const key = env.RESEND_API_KEY?.trim();
  const to = env.NOTIFY_EMAIL_TO?.trim();
  const from = env.NOTIFY_EMAIL_FROM?.trim();
  if (!key || !to || !from) return { status: "skipped" };
  const { subject, text } = notificationText(applicationNo, data);
  try {
    const res = await fetch(env.RESEND_API_URL || "https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text }),
      signal: AbortSignal.timeout(8000),
    });
    return res.ok ? { status: "sent" } : { status: "failed", reason: `HTTP ${res.status}` };
  } catch (error) {
    return { status: "failed", reason: error instanceof Error ? error.name : "error" };
  }
}
