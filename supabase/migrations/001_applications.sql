-- emirr.com.tr web sitesi başvuruları
-- Tabloya yalnız sunucu (service role) erişir. anon ve authenticated rolleri için politika yoktur;
-- RLS açık ve yetkiler geri alınmıştır, yani tarayıcıdan gelen herkese açık anahtar tabloyu
-- ne okuyabilir ne yazabilir. service_role RLS'yi aşar ve yalnız Vercel sunucu ortamında bulunur.

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  application_no text not null unique check (application_no ~ '^EA-[A-HJ-NP-Z2-9]{8}$'),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost', 'spam')),

  name text not null check (char_length(name) between 2 and 120),
  phone text not null check (phone ~ '^\+[1-9][0-9]{9,14}$'),
  email text not null check (char_length(email) between 5 and 254 and email = lower(email)),
  preferred_contact text not null check (preferred_contact in ('whatsapp', 'telefon', 'eposta')),

  business_name text not null check (char_length(business_name) between 2 and 160),
  sector text not null,
  city text check (city is null or char_length(city) <= 80),
  current_site text check (current_site is null or char_length(current_site) <= 300),

  project_type text not null check (project_type in ('baslangic', 'profesyonel', 'sanayi', 'eticaret', 'belirsiz')),
  features text[] not null default '{}' check (cardinality(features) <= 20),
  extra_services text[] not null default '{}' check (cardinality(extra_services) <= 6),

  design_logo text not null check (design_logo in ('var', 'yok', 'yenilenecek')),
  design_notes text check (design_notes is null or char_length(design_notes) <= 1000),
  budget text not null,
  deadline text not null check (deadline in ('acelem-yok', '1-ay', '2-3-ay', 'tarih')),
  deadline_date date,
  notes text check (notes is null or char_length(notes) <= 2000),

  consent_at timestamptz not null,
  ip_hash text not null check (char_length(ip_hash) = 32),
  user_agent text check (user_agent is null or char_length(user_agent) <= 300),

  notify_status text not null default 'pending' check (notify_status in ('pending', 'sent', 'failed', 'skipped')),
  notify_error text check (notify_error is null or char_length(notify_error) <= 200)
);

alter table public.applications enable row level security;
alter table public.applications force row level security;
revoke all on public.applications from anon, authenticated;

create index if not exists applications_created_idx on public.applications (created_at desc);
create index if not exists applications_ip_idx on public.applications (ip_hash, created_at desc);
create index if not exists applications_email_idx on public.applications (email, created_at desc);
create index if not exists applications_phone_idx on public.applications (phone, created_at desc);
