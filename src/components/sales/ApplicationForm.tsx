"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import {
  BUDGETS, CONTACT_METHODS, DEADLINES, DESIGN_LOGO, EXTRA_SERVICES, FEATURES, PROJECT_TYPES, QUOTE_FEATURES, SECTORS, labelOf,
} from "@/lib/applications/options";
import { applicationSchema, fieldErrors } from "@/lib/applications/schema";
import { siteConfig } from "@/data/site";
import { whatsappLink } from "@/lib/whatsapp";

interface Values {
  name: string; phone: string; email: string; preferredContact: string;
  businessName: string; sector: string; city: string; currentSite: string;
  projectType: string; features: string[]; extraServices: string[];
  designLogo: string; designNotes: string; budget: string; deadline: string; deadlineDate: string; notes: string;
  consent: boolean; website: string;
}

const empty = (projectType: string): Values => ({
  name: "", phone: "", email: "", preferredContact: "whatsapp",
  businessName: "", sector: "", city: "", currentSite: "",
  projectType, features: [], extraServices: [],
  designLogo: "", designNotes: "", budget: "", deadline: "", deadlineDate: "", notes: "",
  consent: false, website: "",
});

// Tarih alanı yalnız kullanıcı seçince çizilir; sunucuda üretilmediği için saat dilimi uyuşmazlığı olmaz.
const todayLocal = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
};

const FIELD_ORDER = ["name", "phone", "email", "preferredContact", "businessName", "sector", "city", "currentSite", "projectType", "features", "extraServices", "designLogo", "designNotes", "budget", "deadline", "deadlineDate", "notes", "consent"];

function Field({ id, label, error, hint, children }: { id: string; label: string; error?: string; hint?: string; children: ReactNode }) {
  return (
    <div className="field" data-field={id}>
      <label htmlFor={`f-${id}`}>{label}</label>
      {children}
      {hint && !error && <p className="field-hint" id={`h-${id}`}>{hint}</p>}
      {error && <p className="field-error" id={`e-${id}`} role="alert">{error}</p>}
    </div>
  );
}

function Choices({ name, label, options, value, onChange, error }: { name: string; label: string; options: readonly { value: string; label: string }[]; value: string; onChange: (v: string) => void; error?: string }) {
  return (
    <div className="field" data-field={name} role="radiogroup" aria-label={label} aria-invalid={!!error}>
      <span className="label">{label}</span>
      <div className="choice-grid">
        {options.map(o => (
          <label key={o.value} className="choice">
            <input type="radio" name={name} value={o.value} checked={value === o.value} onChange={() => onChange(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

function Checks({ label, options, values, onChange, error }: { label: string; options: readonly { value: string; label: string }[]; values: string[]; onChange: (v: string[]) => void; error?: string }) {
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter(x => x !== v) : [...values, v]);
  return (
    <div className="field">
      <span className="label">{label}</span>
      <div className="choice-grid">
        {options.map(o => (
          <label key={o.value} className="choice">
            <input type="checkbox" value={o.value} checked={values.includes(o.value)} onChange={() => toggle(o.value)} />
            <span>{o.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="field-error" role="alert">{error}</p>}
    </div>
  );
}

export function ApplicationForm({ initialProject }: { initialProject?: string }) {
  const [values, setValues] = useState<Values>(() => empty(initialProject ?? ""));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [summary, setSummary] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ applicationNo: string; snapshot: Values } | null>(null);
  const startedAt = useRef(0);
  const summaryRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    startedAt.current = performance.now();
  }, []);
  useEffect(() => { if (done) doneRef.current?.focus(); }, [done]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues(v => ({ ...v, [key]: value }));
    if (errors[key]) setErrors(e => { const next = { ...e }; delete next[key]; return next; });
  };
  const text = (id: keyof Values & string, type: "text" | "tel" | "email" = "text", extra: Record<string, string> = {}) => ({
    id: `f-${id}`, name: id, type, value: values[id] as string,
    onChange: (e: { target: { value: string } }) => set(id, e.target.value as never),
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `e-${id}` : undefined,
    ...extra,
  });

  const area = (id: "designNotes" | "notes") => ({
    id: `f-${id}`, name: id, value: values[id],
    onChange: (e: { target: { value: string } }) => set(id, e.target.value),
    "aria-invalid": errors[id] ? true : undefined,
    "aria-describedby": errors[id] ? `e-${id}` : undefined,
  });

  function focusFirst(errs: Record<string, string>) {
    const key = FIELD_ORDER.find(k => errs[k]);
    if (!key) return;
    const root = document.querySelector<HTMLElement>(`[data-field="${key}"]`);
    root?.querySelector<HTMLElement>("input, select, textarea")?.focus();
    root?.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    setSummary("");
    const payload = {
      ...values,
      deadlineDate: values.deadline === "tarih" ? values.deadlineDate : undefined,
      fillMs: Math.round(performance.now() - startedAt.current),
    };
    const checked = applicationSchema.safeParse(payload);
    if (!checked.success) {
      const errs = fieldErrors(checked.error);
      setErrors(errs);
      setSummary("Formda eksik veya hatalı alanlar var. İşaretli alanları düzeltin.");
      requestAnimationFrame(() => focusFirst(errs));
      return;
    }
    setErrors({});
    setSending(true);
    try {
      const res = await fetch("/api/basvuru", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.ok) {
        setDone({ applicationNo: data.applicationNo, snapshot: values });
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        if (data?.fieldErrors) { setErrors(data.fieldErrors); requestAnimationFrame(() => focusFirst(data.fieldErrors)); }
        setSummary(data?.message ?? "Başvuru gönderilemedi. Biraz sonra tekrar deneyin veya WhatsApp'tan yazın.");
        requestAnimationFrame(() => summaryRef.current?.focus());
      }
    } catch {
      setSummary("Bağlantı koptu. İnternetinizi kontrol edip tekrar deneyin.");
      requestAnimationFrame(() => summaryRef.current?.focus());
    } finally {
      setSending(false);
    }
  }

  if (done) {
    const s = done.snapshot;
    const contact = labelOf(CONTACT_METHODS, s.preferredContact);
    return (
      <section className="success" aria-labelledby="done-title">
        <h2 id="done-title" ref={doneRef} tabIndex={-1}>Başvurunuz alındı</h2>
        <div>
          <p style={{ marginBottom: 8 }}>Başvuru numaranız</p>
          <span className="appno" data-testid="application-no">{done.applicationNo}</span>
        </div>
        <p>
          {s.name.split(" ")[0]}, başvurunuz bana ulaştı. Size {contact === "E-posta" ? "e-posta" : contact === "Telefon" ? "telefon" : "WhatsApp"} ile dönüş yapacağım. Yazarken bu numarayı belirtin.
        </p>
        <div className="sales-actions">
          <a
            className="btn btn-wa"
            href={whatsappLink({ name: s.name, projectType: labelOf(PROJECT_TYPES, s.projectType), applicationNo: done.applicationNo, packageName: undefined })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} aria-hidden /> WhatsApp&apos;tan yaz
          </a>
          <Link href="/" className="btn btn-ghost">Ana sayfa</Link>
        </div>
      </section>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate aria-label="Web sitesi başvuru formu">
      {summary && (
        <div className="form-summary" role="alert" tabIndex={-1} ref={summaryRef} data-testid="form-summary">
          {summary}{" "}
          <a href={whatsappLink({})} target="_blank" rel="noopener noreferrer">WhatsApp&apos;tan yazın</a>
        </div>
      )}

      <fieldset>
        <legend>İletişim bilgileri</legend>
        <div className="form-row">
          <Field id="name" label="Ad soyad" error={errors.name}><input {...text("name", "text", { autoComplete: "name" })} /></Field>
          <Field id="phone" label="Telefon" error={errors.phone} hint="Örnek: 0555 123 45 67"><input {...text("phone", "tel", { autoComplete: "tel", inputMode: "tel" })} /></Field>
        </div>
        <Field id="email" label="E-posta" error={errors.email}><input {...text("email", "email", { autoComplete: "email", inputMode: "email" })} /></Field>
        <Choices name="preferredContact" label="Size nasıl ulaşalım?" options={CONTACT_METHODS} value={values.preferredContact} onChange={v => set("preferredContact", v)} error={errors.preferredContact} />
      </fieldset>

      <fieldset>
        <legend>İşletme bilgileri</legend>
        <div className="form-row">
          <Field id="businessName" label="İşletme adı" error={errors.businessName}><input {...text("businessName", "text", { autoComplete: "organization" })} /></Field>
          <Field id="sector" label="Sektör" error={errors.sector}>
            <select id="f-sector" name="sector" value={values.sector} onChange={e => set("sector", e.target.value)} aria-invalid={errors.sector ? true : undefined} aria-describedby={errors.sector ? "e-sector" : undefined}>
              <option value="">Seçin</option>
              {SECTORS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
        </div>
        <div className="form-row">
          <Field id="city" label="Şehir (isteğe bağlı)" error={errors.city}><input {...text("city", "text", { autoComplete: "address-level2" })} /></Field>
          <Field id="currentSite" label="Mevcut web siteniz (isteğe bağlı)" error={errors.currentSite}><input {...text("currentSite", "text", { inputMode: "url", placeholder: "www.firma.com" })} /></Field>
        </div>
      </fieldset>

      <fieldset>
        <legend>Proje</legend>
        <Choices name="projectType" label="Proje türü" options={PROJECT_TYPES} value={values.projectType} onChange={v => set("projectType", v)} error={errors.projectType} />
        <Checks label="İstediğiniz özellikler" options={FEATURES} values={values.features} onChange={v => set("features", v)} error={errors.features} />
        <Checks label="Ayrı tekliflendirilen özellikler" options={QUOTE_FEATURES} values={values.features} onChange={v => set("features", v)} />
        <Checks label="İlgilendiğiniz ek hizmetler" options={EXTRA_SERVICES} values={values.extraServices} onChange={v => set("extraServices", v)} error={errors.extraServices} />
      </fieldset>

      <fieldset>
        <legend>Tasarım, bütçe ve zaman</legend>
        <Choices name="designLogo" label="Logo" options={DESIGN_LOGO} value={values.designLogo} onChange={v => set("designLogo", v)} error={errors.designLogo} />
        <Field id="designNotes" label="Tasarım beklentiniz (isteğe bağlı)" error={errors.designNotes} hint="Renkler, beğendiğiniz siteler, istemediğiniz şeyler.">
          <textarea {...area("designNotes")} rows={4} maxLength={1000} />
        </Field>
        <div className="form-row">
          <Field id="budget" label="Bütçe" error={errors.budget}>
            <select id="f-budget" name="budget" value={values.budget} onChange={e => set("budget", e.target.value)} aria-invalid={errors.budget ? true : undefined} aria-describedby={errors.budget ? "e-budget" : undefined}>
              <option value="">Seçin</option>
              {BUDGETS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
          <Field id="deadline" label="Ne zamana kadar?" error={errors.deadline}>
            <select id="f-deadline" name="deadline" value={values.deadline} onChange={e => set("deadline", e.target.value)} aria-invalid={errors.deadline ? true : undefined} aria-describedby={errors.deadline ? "e-deadline" : undefined}>
              <option value="">Seçin</option>
              {DEADLINES.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
        </div>
        {values.deadline === "tarih" && (
          <Field id="deadlineDate" label="Teslim tarihi" error={errors.deadlineDate}>
            <input id="f-deadlineDate" name="deadlineDate" type="date" min={todayLocal()} value={values.deadlineDate} onChange={e => set("deadlineDate", e.target.value)} aria-invalid={errors.deadlineDate ? true : undefined} aria-describedby={errors.deadlineDate ? "e-deadlineDate" : undefined} />
          </Field>
        )}
      </fieldset>

      <fieldset>
        <legend>Ek açıklamalar</legend>
        <Field id="notes" label="Eklemek istedikleriniz (isteğe bağlı)" error={errors.notes}>
          <textarea {...area("notes")} rows={5} maxLength={2000} />
        </Field>
      </fieldset>

      <div className="hp" aria-hidden="true">
        <label>Bu alanı boş bırakın<input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={e => set("website", e.target.value)} /></label>
      </div>

      <div className="consent" data-field="consent">
        <label className="choice" style={{ border: 0, background: "transparent", padding: 0 }}>
          <input type="checkbox" name="consent" checked={values.consent} onChange={e => set("consent", e.target.checked)} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "e-consent" : undefined} />
          <span>Bilgilerimin başvurumu değerlendirmek için kullanılmasını kabul ediyorum.</span>
        </label>
        {errors.consent && <p className="field-error" id="e-consent" role="alert">{errors.consent}</p>}
        <details>
          <summary>Bilgileriniz nasıl kullanılır?</summary>
          <p style={{ marginTop: 8 }}>
            Formdaki bilgiler yalnız başvurunuzu değerlendirmek ve size teklif iletmek için kullanılır; yalnız ben görürüm. Veriler, başvuru kaydı ve bildirim e-postası için kullandığım hizmet sağlayıcılarda (veritabanı ve e-posta servisi) işlenir. Bilgilerinizin silinmesini {siteConfig.links.emailDisplay} adresinden isteyebilirsiniz.
          </p>
        </details>
      </div>

      <div className="sales-actions">
        <button type="submit" className="btn btn-primary" disabled={sending} data-testid="submit">
          {sending ? "Gönderiliyor…" : "Başvuruyu gönder"}
        </button>
        <a href={whatsappLink({})} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
          <MessageCircle size={16} aria-hidden /> WhatsApp&apos;tan yaz
        </a>
      </div>
    </form>
  );
}
