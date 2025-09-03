CREATE TABLE IF NOT EXISTS cases (
  case_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  officer_name TEXT,
  officer_badge TEXT NOT NULL,
  incident_date TEXT NOT NULL,
  agency TEXT,
  created_by TEXT,
  status TEXT,
  prosecutor_email TEXT,
  defense_email TEXT,
  co_defendants TEXT[]
);

CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  case_id TEXT NOT NULL,
  filename TEXT,
  type TEXT,
  size INTEGER,
  uploaded_by TEXT,
  url TEXT
);

CREATE TABLE IF NOT EXISTS audits (
  id SERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ,
  actor TEXT,
  action TEXT,
  target_id TEXT,
  ip TEXT
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  message TEXT,
  read BOOLEAN,
  ts TIMESTAMPTZ
);

CREATE TYPE user_role AS ENUM ('lea', 'prosecutor', 'defense', 'admin');

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL,
  agency text,
  status text DEFAULT 'active',
  created_at timestamp DEFAULT now(),
  updated_at timestamp DEFAULT now()
);

INSERT INTO users (
  email,
  role,
  agency,
  status,
  created_at,
  updated_at
) VALUES (
  'lea@county.gov',
  'lea',
  'Mission PD',
  'active',
  now(),
  now()
);

INSERT INTO users (
  email,
  role,
  agency,
  status,
  created_at,
  updated_at
) VALUES (
  'pro@county.gov',
  'prosecutor',
  'Mission Court',
  'active',
  now(),
  now()
);

INSERT INTO users (
  email,
  role,
  agency,
  status,
  created_at,
  updated_at
) VALUES (
  'def@county.gov',
  'defense',
  'Mission Court',
  'active',
  now(),
  now()
);

INSERT INTO users (
  email,
  role,
  agency,
  status,
  created_at,
  updated_at
) VALUES (
  'admin@county.gov',
  'admin',
  'Mission PD',
  'active',
  now(),
  now()
);

create policy "Allow uploads to evidence bucket"
on storage.objects
for insert
with check (bucket_id = 'evidence');

create policy "Allow public read"
on storage.objects
for select
using (bucket_id = 'evidence');
