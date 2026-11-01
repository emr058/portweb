import { siteConfig } from "@/data/site";

// Numara: NEXT_PUBLIC_WHATSAPP_NUMBER (örn. 905551112233) yoksa sitedeki iletişim telefonu kullanılır.
export function whatsappNumber(raw: string = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || siteConfig.phone): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = `9${digits}`;
  if (digits.length === 10 && digits.startsWith("5")) digits = `90${digits}`;
  return digits;
}

export function whatsappUrl(message: string, number: string = whatsappNumber()): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export interface WhatsAppContext {
  packageName?: string;
  priceText?: string;
  name?: string;
  projectType?: string;
  applicationNo?: string;
}

// Boş bırakılan alanlar (ad, proje türü) müşterinin WhatsApp'ta tamamlayacağı satırlar olarak kalır.
export function whatsappMessage(ctx: WhatsAppContext = {}): string {
  const lines = [
    ctx.packageName ? `Merhaba, ${ctx.packageName} hakkında bilgi almak istiyorum.` : "Merhaba, web sitesi hizmetiniz hakkında bilgi almak istiyorum.",
  ];
  if (ctx.packageName) lines.push(`Paket: ${ctx.packageName}${ctx.priceText ? ` (${ctx.priceText})` : ""}`);
  lines.push(`Adım: ${ctx.name ?? ""}`.trimEnd());
  lines.push(`Proje türü: ${ctx.projectType ?? ""}`.trimEnd());
  if (ctx.applicationNo) lines.push(`Başvuru numaram: ${ctx.applicationNo}`);
  return lines.join("\n");
}

export const whatsappLink = (ctx: WhatsAppContext = {}) => whatsappUrl(whatsappMessage(ctx));
