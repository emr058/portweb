import { createHash, randomInt } from "node:crypto";
import type { ApplicationInput } from "./schema";

// Supabase REST (PostgREST) üzerinden başvuru kaydı. Yalnız sunucuda çalışır; service role anahtarı
// tarayıcıya hiçbir zaman gitmez. Tabloya anon/authenticated rolleri erişemez (RLS, bkz. migration).

export interface StoreConfig {
  url: string;
  key: string;
}

export function storeConfig(env: NodeJS.ProcessEnv = process.env): StoreConfig | null {
  const url = env.SUPABASE_URL?.trim().replace(/\/+$/, "");
  const key = env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  return url && key ? { url, key } : null;
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
export function newApplicationNo(): string {
  let id = "";
  for (let i = 0; i < 8; i++) id += ALPHABET[randomInt(ALPHABET.length)];
  return `EA-${id}`;
}

export function hashIp(ip: string, env: NodeJS.ProcessEnv = process.env): string {
  const salt = env.IP_HASH_SECRET || env.SUPABASE_SERVICE_ROLE_KEY || "dev-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

const headers = (cfg: StoreConfig, extra: Record<string, string> = {}) => ({
  apikey: cfg.key,
  Authorization: `Bearer ${cfg.key}`,
  "Content-Type": "application/json",
  ...extra,
});

const TIMEOUT = () => AbortSignal.timeout(8000);

// Belirli bir süredeki kayıt sayısı. `filter` PostgREST filtreleridir (değerler kodlanmış olmalı).
export async function countApplications(cfg: StoreConfig, filter: string): Promise<number> {
  const res = await fetch(`${cfg.url}/rest/v1/applications?select=id&${filter}`, {
    headers: headers(cfg, { Prefer: "count=exact", Range: "0-0" }),
    signal: TIMEOUT(),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`count failed: ${res.status}`);
  const total = res.headers.get("content-range")?.split("/")[1];
  const n = Number(total);
  if (!Number.isFinite(n)) throw new Error("count failed: no content-range");
  return n;
}

export const since = (ms: number) => new Date(Date.now() - ms).toISOString();
export const eq = (column: string, value: string) => `${column}=eq.${encodeURIComponent(value)}`;
export const gte = (column: string, value: string) => `${column}=gte.${encodeURIComponent(value)}`;

export interface ApplicationRow {
  application_no: string;
  name: string;
  phone: string;
  email: string;
  preferred_contact: string;
  business_name: string;
  sector: string;
  city: string | null;
  current_site: string | null;
  project_type: string;
  features: string[];
  extra_services: string[];
  design_logo: string;
  design_notes: string | null;
  budget: string;
  deadline: string;
  deadline_date: string | null;
  notes: string | null;
  consent_at: string;
  ip_hash: string;
  user_agent: string | null;
}

export function toRow(data: ApplicationInput, applicationNo: string, ipHash: string, userAgent: string | null): ApplicationRow {
  return {
    application_no: applicationNo,
    name: data.name,
    phone: data.phone,
    email: data.email,
    preferred_contact: data.preferredContact,
    business_name: data.businessName,
    sector: data.sector,
    city: data.city ?? null,
    current_site: data.currentSite ?? null,
    project_type: data.projectType,
    features: data.features,
    extra_services: data.extraServices,
    design_logo: data.designLogo,
    design_notes: data.designNotes ?? null,
    budget: data.budget,
    deadline: data.deadline,
    deadline_date: data.deadline === "tarih" ? data.deadlineDate ?? null : null,
    notes: data.notes ?? null,
    consent_at: new Date().toISOString(),
    ip_hash: ipHash,
    user_agent: userAgent ? userAgent.slice(0, 300) : null,
  };
}

export type InsertResult = { ok: true } | { ok: false; conflict: boolean; status: number };

export async function insertApplication(cfg: StoreConfig, row: ApplicationRow): Promise<InsertResult> {
  const res = await fetch(`${cfg.url}/rest/v1/applications`, {
    method: "POST",
    headers: headers(cfg, { Prefer: "return=minimal" }),
    body: JSON.stringify(row),
    signal: TIMEOUT(),
    cache: "no-store",
  });
  if (res.ok) return { ok: true };
  return { ok: false, conflict: res.status === 409, status: res.status };
}

export async function setNotifyStatus(cfg: StoreConfig, applicationNo: string, status: "sent" | "failed" | "skipped", error?: string) {
  await fetch(`${cfg.url}/rest/v1/applications?${eq("application_no", applicationNo)}`, {
    method: "PATCH",
    headers: headers(cfg, { Prefer: "return=minimal" }),
    body: JSON.stringify({ notify_status: status, notify_error: error ? error.slice(0, 200) : null }),
    signal: TIMEOUT(),
    cache: "no-store",
  });
}
