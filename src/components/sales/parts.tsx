import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowUpRight, ChartColumn, ClipboardList, Cog, Factory, FileUp, Gauge, Globe, Images, Layers, LayoutDashboard, ListChecks,
  Mail, MessageCircle, Newspaper, Package, Palette, PhoneCall, Search, ShoppingBag, Smartphone, Store, type LucideIcon,
} from "lucide-react";
import {
  addonGroups, campaign, freeSupport, maintenanceNotes, chooser, formatRange, formatTL, notIncluded, quoteSeparately, steps,
  type Feature, type IconName, type WebPackage,
} from "@/data/pricing";
import { legal } from "@/data/legal";
import { siteConfig } from "@/data/site";
import { PROJECT_TYPES, labelOf } from "@/lib/applications/options";
import { whatsappLink, type WhatsAppContext } from "@/lib/whatsapp";

const ICONS: Record<IconName, LucideIcon> = {
  smartphone: Smartphone, palette: Palette, "message-circle": MessageCircle, "layout-dashboard": LayoutDashboard, search: Search,
  package: Package, newspaper: Newspaper, mail: Mail, chart: ChartColumn, cog: Cog, gauge: Gauge, layers: Layers, images: Images,
  "file-up": FileUp, "clipboard-list": ClipboardList, factory: Factory, store: Store, "shopping-bag": ShoppingBag,
  "phone-call": PhoneCall, "list-checks": ListChecks, globe: Globe,
};

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const Cmp = ICONS[name];
  return <Cmp size={size} aria-hidden strokeWidth={1.7} />;
}

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

/** Sayfa girişi: solda başlık ve düğmeler, sağda görsel. */
export function SalesHero({ eyebrow, title, children, actions, visual }: { eyebrow: string; title: string; children: ReactNode; actions?: ReactNode; visual?: ReactNode }) {
  return (
    <header className={`sales-hero${visual ? " sales-hero-split" : ""}`}>
      <div className="sales-hero-copy">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="sales-lead">{children}</p>
        {actions}
      </div>
      {visual && <div className="sales-hero-visual">{visual}</div>}
    </header>
  );
}

export function SectionTitle({ id, eyebrow, title, children }: { id: string; eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </div>
  );
}

export function FeatureList({ features, hints = true }: { features: Feature[]; hints?: boolean }) {
  return (
    <ul className="feature-list">
      {features.map(item => (
        <li key={item.title}>
          <span className="feature-icon"><Icon name={item.icon} size={18} /></span>
          <span>
            <strong>{item.title}</strong>
            {hints && <small>{item.hint}</small>}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function PackageCard({ pkg, featured = false, hints = true, as: Tag = "h3" }: { pkg: WebPackage; featured?: boolean; hints?: boolean; as?: "h2" | "h3" }) {
  const projectType = labelOf(PROJECT_TYPES, pkg.id);
  return (
    <article className={`sales-card pkg${featured ? " pkg-featured" : ""}`}>
      {featured && <span className="pkg-ribbon">Daha kapsamlı</span>}
      <div className="pkg-head">
        <Tag>{pkg.name}</Tag>
        <p>{pkg.pages}</p>
      </div>
      <p className="pkg-for">{pkg.forWhom}</p>
      <div className="pkg-price">
        <span className="badge-campaign">{campaign.label}</span>
        <p className="price-main" aria-label={`Kampanya fiyatı ${formatRange(pkg.campaign)}`}>{formatRange(pkg.campaign)}</p>
        <p className="price-old">
          Liste fiyatı: <s>{formatRange(pkg.normal)}</s>
        </p>
        <p className="price-note">{campaign.note}</p>
      </div>
      <FeatureList features={pkg.features} hints={hints} />
      <Actions
        apply={`/basvuru?paket=${pkg.id}`}
        whatsapp={{ packageName: pkg.name, priceText: `${formatRange(pkg.campaign)} kampanya fiyatı`, projectType }}
      />
    </article>
  );
}

/** "Hangisi bana uygun?" rehberi. */
export function Chooser({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`chooser${compact ? " chooser-compact" : ""}`}>
      {chooser.map(item => (
        <Link key={item.id} href={item.href} className="chooser-item">
          <span className="feature-icon feature-icon-lg"><Icon name={item.icon} size={22} /></span>
          <span className="chooser-text">
            <strong>{item.title}</strong>
            <small>{item.text}</small>
          </span>
          <ArrowUpRight size={16} aria-hidden className="chooser-arrow" />
        </Link>
      ))}
    </div>
  );
}

export function Steps() {
  return (
    <ol className="steps">
      {steps.map((step, index) => (
        <li key={step.title}>
          <span className="step-badge">
            <Icon name={step.icon} size={20} />
            <i>{index + 1}</i>
          </span>
          <strong>{step.title}</strong>
          <p>{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Genel bir işletme sitesinin şematik görünümü; metinler yalnız bölüm adlarıdır, müşteri verisi içermez. */
export function SiteWireframe() {
  return (
    <figure className="wire" aria-label="Web sitesi şematik görünümü">
      <div className="wire-frame">
        <div className="mac-bar"><i /><i /><i /><span>firmaniz.com</span></div>
        <div className="wire-body">
          <div className="wire-top"><b /><span /><span /><span /></div>
          <div className="wire-hero">
            <div className="wire-lines"><i /><i /><i /></div>
            <span className="wire-wa"><MessageCircle size={13} aria-hidden /> WhatsApp</span>
          </div>
          <div className="wire-block">
            <p className="wire-label"><Package size={14} aria-hidden /> Hizmetlerimiz</p>
            <div className="wire-cards wire-cards-3"><i /><i /><i /></div>
          </div>
          <div className="wire-block">
            <p className="wire-label"><Mail size={14} aria-hidden /> İletişim</p>
            <div className="wire-lines"><i /><i /></div>
          </div>
        </div>
      </div>
      <div className="wire-phone" aria-hidden>
        <b />
        <i /><i /><i />
        <span><MessageCircle size={11} /> WhatsApp</span>
      </div>
      <figcaption className="device-caption">Şematik görünüm. Siteniz kendi logonuz, fotoğraflarınız ve bilgilerinizle hazırlanır.</figcaption>
    </figure>
  );
}

/** Sanayi sitesinin nasıl görüneceğini gösteren şematik çizim; metinler yalnız bölüm adlarıdır. */
export function IndustrialWireframe() {
  return (
    <figure className="wire" aria-label="Sanayi web sitesi şematik görünümü">
      <div className="wire-frame">
        <div className="mac-bar"><i /><i /><i /><span>firmaniz.com</span></div>
        <div className="wire-body">
          <div className="wire-top"><b /><span /><span /><span /></div>
          <div className="wire-block">
            <p className="wire-label"><Cog size={14} aria-hidden /> Makine parkuru</p>
            <div className="wire-cards"><i /><i /><i /><i /></div>
          </div>
          <div className="wire-cols">
            <div className="wire-block">
              <p className="wire-label"><Gauge size={14} aria-hidden /> Üretim kabiliyetleri</p>
              <div className="wire-lines"><i /><i /><i /></div>
            </div>
            <div className="wire-block">
              <p className="wire-label"><Images size={14} aria-hidden /> Parça galerisi</p>
              <div className="wire-tiles"><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div>
          <div className="wire-block wire-quote">
            <p className="wire-label"><ClipboardList size={14} aria-hidden /> Teklif talep formu</p>
            <div className="wire-form">
              <div className="wire-lines"><i /><i /></div>
              <div className="wire-drop"><FileUp size={14} aria-hidden /> Çizim ekle</div>
            </div>
            <div className="wire-send"><span>Teklif iste</span><span className="wire-wa"><MessageCircle size={13} aria-hidden /> WhatsApp</span></div>
          </div>
        </div>
      </div>
      <figcaption className="device-caption">Şematik görünüm. Siteniz kendi logonuz, fotoğraflarınız ve bilgilerinizle hazırlanır.</figcaption>
    </figure>
  );
}

export function TrustCard() {
  return (
    <aside className="trust" aria-label="Sizinle kim ilgilenir">
      <Image src="/emir.jpg" alt="Emir Aydın" width={96} height={96} className="trust-photo" />
      <div>
        <strong>Emir Aydın</strong>
        <p>Full stack yazılım geliştiriciyim; Aydın Torna CNC&apos;de teknik mühendis olarak da çalışıyorum. Başvurular doğrudan bana ulaşır.</p>
        <Link href="/projects" className="sales-link">Yaptığım işler <ArrowUpRight size={14} aria-hidden /></Link>
      </div>
    </aside>
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
                  {plan.includes && (
                    <ul className="addon-includes">
                      {plan.includes.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <div className="sales-note" style={{ marginTop: 18 }}>
        <ul style={{ margin: 0 }}>
          {maintenanceNotes.map(line => <li key={line}>{line}</li>)}
          <li>SEO ve sosyal medya kapsamı teklifte yazılı olarak belirtilir. Web sitesi paketlerinden ayrı fiyatlanır.</li>
        </ul>
      </div>
      <section className="sales-card" style={{ marginTop: 18 }} aria-labelledby="free-support">
        <h3 id="free-support">{freeSupport.title}</h3>
        <p>{freeSupport.text}</p>
        <p><strong>Dahil:</strong></p>
        <ul>{freeSupport.includes.map(i => <li key={i}>{i}</li>)}</ul>
        <p><strong>Dahil değil:</strong></p>
        <ul>{freeSupport.excludes.map(i => <li key={i}>{i}</li>)}</ul>
      </section>
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

/** Hizmeti veren bilgisi: boş bırakılan alanlar (adres, vergi) gösterilmez. */
export function ProviderInfo() {
  const parts = [legal.controller, legal.address || legal.city, legal.taxOffice && legal.taxNo ? `${legal.taxOffice} V.D. ${legal.taxNo}` : "", legal.email].filter(Boolean);
  return (
    <p className="provider">
      Hizmeti veren: {parts.join(" · ")} ·{" "}
      <Link href="/aydinlatma">Aydınlatma metni</Link>
    </p>
  );
}

/** Başvuru depolaması ayarlanmadığında form yerine gösterilir: ziyaretçi boş bir forma yönlendirilmez. */
export function ApplicationClosed() {
  return (
    <section className="success" aria-labelledby="closed-title">
      <h2 id="closed-title">Başvuru formu yakında açılıyor</h2>
      <p>Şimdilik projenizi WhatsApp&apos;tan veya e-postayla yazabilirsiniz. Paket, işletme adı ve ne istediğinizi yazmanız yeterli.</p>
      <div className="sales-actions">
        <a className="btn btn-wa" href={whatsappLink({})} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} aria-hidden /> WhatsApp&apos;tan yaz
        </a>
        <a className="btn btn-ghost" href={siteConfig.links.email}>
          <Mail size={16} aria-hidden /> E-posta yaz
        </a>
      </div>
    </section>
  );
}
