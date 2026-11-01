import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { addonGroups, campaign, formatRange, formatTL, notIncluded, quoteSeparately, type WebPackage } from "@/data/pricing";
import { PROJECT_TYPES, labelOf } from "@/lib/applications/options";
import { whatsappLink, type WhatsAppContext } from "@/lib/whatsapp";

export function Actions({ apply, whatsapp, applyLabel = "Başvuru yap" }: { apply: string; whatsapp: WhatsAppContext; applyLabel?: string }) {
  return (
    <div className="sales-actions">
      <Link href={apply} className="btn btn-primary">
        {applyLabel}
        <ArrowUpRight size={16} aria-hidden />
      </Link>
      <a href={whatsappLink(whatsapp)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
        <MessageCircle size={16} aria-hidden />
        WhatsApp&apos;tan yaz
      </a>
    </div>
  );
}

export function PackageCard({ pkg, featured = false, as: Tag = "h3" }: { pkg: WebPackage; featured?: boolean; as?: "h2" | "h3" }) {
  const projectType = labelOf(PROJECT_TYPES, pkg.id);
  return (
    <article className={`sales-card pkg${featured ? " pkg-featured" : ""}`}>
      <div className="pkg-head">
        <Tag>{pkg.name}</Tag>
        <p>{pkg.pages}</p>
      </div>
      <div>
        <span className="badge-campaign">{campaign.label}</span>
        <p className="price-main" aria-label={`Kampanya fiyatı ${formatRange(pkg.campaign)}`}>{formatRange(pkg.campaign)}</p>
        <p className="price-old">
          Normal fiyat: <s>{formatRange(pkg.normal)}</s>
        </p>
      </div>
      <ul className="check-list">
        {pkg.features.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Actions
        apply={`/basvuru?paket=${pkg.id}`}
        whatsapp={{ packageName: pkg.name, priceText: `${formatRange(pkg.campaign)} kampanya fiyatı`, projectType }}
      />
    </article>
  );
}

export function AddonGroups() {
  return (
    <>
      <div className="sales-grid">
        {addonGroups.map(group => (
          <section key={group.id} className="sales-card" aria-labelledby={`addon-${group.id}`}>
            <h3 id={`addon-${group.id}`}>{group.title}</h3>
            <div style={{ marginTop: 8 }}>
              {group.plans.map(plan => (
                <div key={plan.id} className="addon-plan">
                  <strong>{plan.name}</strong>
                  <span>
                    {formatTL(plan.price)} <small>/ {plan.unit}</small>
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <p className="sales-note" style={{ marginTop: 18 }}>
        Ek hizmetlerin kapsamı teklifte yazılı olarak belirtilir. Web sitesi paketlerinden ayrı fiyatlanır.
      </p>
    </>
  );
}

export function ExclusionNote() {
  return (
    <div className="sales-note">
      <ul style={{ margin: 0 }}>
        {notIncluded.map(line => (
          <li key={line}>{line}</li>
        ))}
        <li>
          {quoteSeparately.intro} {quoteSeparately.items.join(", ")}.
        </li>
      </ul>
    </div>
  );
}

export function CtaStrip({ title = "Projenizi anlatın", text = "Başvuruyu doldurun veya WhatsApp'tan yazın.", context }: { title?: string; text?: string; context: WhatsAppContext }) {
  return (
    <section className="sales-cta" aria-labelledby="cta-title">
      <div>
        <h2 id="cta-title">{title}</h2>
        <p>{text}</p>
      </div>
      <Actions apply="/basvuru" whatsapp={context} />
    </section>
  );
}
