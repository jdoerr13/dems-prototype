CREATE TABLE IF NOT EXISTS cases (
  caseId TEXT PRIMARY KEY,
  createdBy TEXT,
  status TEXT,
  prosecutorEmail TEXT,
  defenseEmail TEXT,
  coDefendants TEXT[] -- or JSONB
);

CREATE TABLE IF NOT EXISTS evidence (
  id TEXT PRIMARY KEY,
  caseId TEXT,
  filename TEXT,
  type TEXT,
  size INTEGER,
  uploadedBy TEXT,
  url TEXT
);

CREATE TABLE IF NOT EXISTS audits (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp TIMESTAMPTZ,
  actor TEXT,
  action TEXT,
  targetId TEXT,
  ip TEXT
);

create table notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  message TEXT,
  read BOOLEAN,
  ts TIMESTAMPTZ
);



