import { z } from "zod";
import { enumValues as e } from "./options";

// Form ve sunucu aynı şemayı kullanır; sunucudaki doğrulama asıl kontroldür.

export function normalizePhone(input: string): string | null {
  let s = input.replace(/[\s().-]/g, "");
  if (s.startsWith("00")) s = `+${s.slice(2)}`;
  if (!s.startsWith("+")) {
    if (/^0\d{10}$/.test(s)) s = `+9${s}`;
    else if (/^90\d{10}$/.test(s)) s = `+${s}`;
    else if (/^5\d{9}$/.test(s)) s = `+90${s}`;
    else return null;
  }
  return /^\+[1-9]\d{9,14}$/.test(s) ? s : null;
}

export function normalizeUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    if (!/^https?:$/.test(url.protocol) || !url.hostname.includes(".")) return null;
    return url.toString();
  } catch {
    return null;
  }
}

const text = (label: string, min: number, max: number) =>
  z.string({ error: `${label} zorunlu.` }).trim().min(min, `${label} zorunlu.`).max(max, `${label} çok uzun.`);

const optionalText = (max: number) =>
  z.string().trim().max(max, "Metin çok uzun. Kısaltın.").optional().transform(v => v || undefined);

const choice = <T extends [string, ...string[]]>(list: T, message = "Bir seçenek seçin.") => z.enum(list, { error: message });

const phone = z
  .string({ error: "Telefon numarası zorunlu." })
  .trim()
  .min(1, "Telefon numarası zorunlu.")
  .transform((value, ctx) => {
    const normalized = normalizePhone(value);
    if (!normalized) {
      ctx.addIssue({ code: "custom", message: "Telefon numarası geçersiz. Örnek: 0555 123 45 67." });
      return z.NEVER;
    }
    return normalized;
  });

const currentSite = z
  .string()
  .trim()
  .max(200, "Adres çok uzun.")
  .optional()
  .transform((value, ctx) => {
    if (!value) return undefined;
    const url = normalizeUrl(value);
    if (!url) {
      ctx.addIssue({ code: "custom", message: "Site adresi geçersiz. Örnek: www.firma.com." });
      return z.NEVER;
    }
    return url;
  });

const list = <T extends [string, ...string[]]>(values: T, max: number) =>
  z.array(z.enum(values), { error: "Seçimler geçersiz." }).max(max).transform(a => [...new Set(a)]);

export const applicationSchema = z
  .object({
    name: text("Ad soyad", 2, 120),
    phone,
    email: z
      .string({ error: "E-posta adresi zorunlu." })
      .trim()
      .toLowerCase()
      .max(254, "E-posta adresi çok uzun.")
      .pipe(z.email("E-posta adresi geçersiz. Örnek: ad@firma.com.")),
    preferredContact: choice(e.contact, "Size nasıl ulaşalım, seçin."),

    businessName: text("İşletme adı", 2, 160),
    sector: choice(e.sector, "Sektörü seçin."),
    city: optionalText(80),
    currentSite,

    projectType: choice(e.projectType, "Proje türünü seçin."),
    features: list(e.features, 20).default([]),
    extraServices: list(e.extraServices, 6).default([]),

    designLogo: choice(e.designLogo, "Logo durumunu seçin."),
    designNotes: optionalText(1000),
    budget: choice(e.budget, "Bütçe aralığını seçin."),
    deadline: choice(e.deadline, "Teslim zamanını seçin."),
    deadlineDate: z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/, "Tarih geçersiz.").optional().or(z.literal("").transform(() => undefined)),
    notes: optionalText(2000),

    fillMs: z.number({ error: "Form süresi okunamadı." }).int().min(0).max(86_400_000),
  })
  .superRefine((value, ctx) => {
    if (value.deadline !== "tarih") return;
    if (!value.deadlineDate) {
      ctx.addIssue({ code: "custom", path: ["deadlineDate"], message: "Teslim tarihini yazın." });
      return;
    }
    const picked = Date.parse(`${value.deadlineDate}T00:00:00Z`);
    const day = 86_400_000;
    if (Number.isNaN(picked) || new Date(picked).toISOString().slice(0, 10) !== value.deadlineDate) {
      ctx.addIssue({ code: "custom", path: ["deadlineDate"], message: "Tarih geçersiz." });
    } else if (picked < Date.now() - day) {
      ctx.addIssue({ code: "custom", path: ["deadlineDate"], message: "Geçmiş bir tarih seçilemez." });
    } else if (picked > Date.now() + 730 * day) {
      ctx.addIssue({ code: "custom", path: ["deadlineDate"], message: "Tarih en fazla 2 yıl sonrası olabilir." });
    }
  });

export type ApplicationInput = z.output<typeof applicationSchema>;

export function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    if (!(key in out)) out[key] = issue.message;
  }
  return out;
}
