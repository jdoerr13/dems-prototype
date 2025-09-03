CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cases (
  id SERIAL PRIMARY KEY,
  case_number TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'OPEN',
  created_by INT REFERENCES users(id),
  prosecutor_id INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS evidence (
  id SERIAL PRIMARY KEY,
  case_id INT REFERENCES cases(id),
  filename TEXT NOT NULL,
  metadata TEXT,
  uploaded_by INT REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS defense_assignments (
  id SERIAL PRIMARY KEY,
  case_id INT REFERENCES cases(id),
  defense_id INT REFERENCES users(id)
);
