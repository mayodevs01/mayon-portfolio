PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS ideas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL CHECK (length(title) BETWEEN 8 AND 100),
  problem TEXT NOT NULL CHECK (length(problem) BETWEEN 30 AND 1200),
  category TEXT NOT NULL CHECK (category IN ('Work', 'Creator', 'Money', 'Health', 'Education', 'Everyday', 'Other')),
  author_name TEXT NOT NULL DEFAULT 'Anonymous builder' CHECK (length(author_name) <= 40),
  visitor_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('published', 'hidden', 'building', 'shipped')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS votes (
  idea_id TEXT NOT NULL REFERENCES ideas(id) ON DELETE CASCADE,
  voter_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (idea_id, voter_id)
);

CREATE INDEX IF NOT EXISTS idx_ideas_status_created_at
ON ideas(status, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ideas_visitor_created_at
ON ideas(visitor_id, created_at DESC);

PRAGMA optimize;

