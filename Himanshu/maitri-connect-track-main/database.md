# Database schema for Maitri Connect (Supabase)

This file contains SQL you can copy/paste into the Supabase SQL editor to create the tables used by the project.

Notes:
- The project code uses camelCase keys in JavaScript (e.g. `maitriId`, `createdAt`). To make Supabase return rows with the same property names, the SQL below creates columns using double-quoted camelCase identifiers (e.g. "maitriId").
- Quoted identifiers are case-sensitive in Postgres; be careful when writing queries directly in SQL—use the same quoted names.
- The SQL below creates these tables:
  - `admins` (demo admin users)
  - `workers` (registered migrant workers)
  - `jobs` (job postings)
  - `job_applicants` (applicants for jobs)

Run order matters: tables are created in an order that satisfies foreign keys.

---

-- Enable pgcrypto for gen_random_uuid() (Supabase typically has this installed; safe to run)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ADMIN USERS: demo/admin accounts
CREATE TABLE IF NOT EXISTS "admins" (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL UNIQUE,
  password text, -- for demo only; consider Supabase Auth for production
  name text,
  organization text,
  "createdAt" timestamptz DEFAULT now()
);

-- WORKERS: migrant worker profiles
-- Note: column names use camelCase to match the project's JS keys (e.g. "maitriId").
CREATE TABLE IF NOT EXISTS "workers" (
  "maitriId" text PRIMARY KEY,
  email text UNIQUE,
  name text,
  photo text,
  age integer,
  gender text,
  "homeState" text,
  skills text,
  "currentEmployer" text,
  phone text,
  aadhaar text,
  "registrationDate" timestamptz,
  availability text,
  "checkIns" jsonb DEFAULT '[]'::jsonb,
  "sosAlerts" jsonb DEFAULT '[]'::jsonb
);

-- JOBS: job postings
CREATE TABLE IF NOT EXISTS "jobs" (
  id text PRIMARY KEY,
  title text NOT NULL,
  description text,
  "createdAt" timestamptz DEFAULT now(),
  status text DEFAULT 'open',
  -- keep applicants jsonb for convenience (optional)
  applicants jsonb DEFAULT '{}'::jsonb
);

-- JOB_APPLICANTS: normalized applicants (recommended)
-- This table is used if you want applicants as rows instead of nested JSON.
CREATE TABLE IF NOT EXISTS "job_applicants" (
  id text PRIMARY KEY,
  job_id text REFERENCES "jobs"(id) ON DELETE CASCADE,
  name text,
  "maitriId" text,
  email text,
  "appliedAt" timestamptz DEFAULT now(),
  status text DEFAULT 'applied'
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_workers_email ON "workers" (email);
CREATE INDEX IF NOT EXISTS idx_jobs_createdAt ON "jobs" ("createdAt");
CREATE INDEX IF NOT EXISTS idx_job_applicants_job_id ON "job_applicants" (job_id);

-- Sample demo data (copy/paste or edit before running)
-- Demo admins
INSERT INTO "admins" (email, password, name, organization)
VALUES
  ('admin@maitri.org', 'admin123', 'Admin User', 'Maitri NGO')
ON CONFLICT (email) DO NOTHING;

INSERT INTO "admins" (email, password, name, organization)
VALUES
  ('admin@migrantworker.com', 'admin123', 'Migrant Admin', 'Employer')
ON CONFLICT (email) DO NOTHING;

-- Sample job (if you want one to appear immediately)
INSERT INTO "jobs" (id, title, description, status)
VALUES ('job-sample-1', 'Mason', 'Experienced mason required for construction projects', 'open')
ON CONFLICT (id) DO NOTHING;

-- Sample worker (example with camelCase fields matching JS keys)
INSERT INTO "workers" (
  "maitriId", email, name, photo, age, gender, "homeState", skills, "currentEmployer", phone, aadhaar, "registrationDate", availability
)
VALUES (
  'MT-TN-1A3B5C',
  'worker1@example.com',
  'Ramu',
  '',
  28,
  'male',
  'Tamil Nadu',
  'Construction, Masonry',
  '',
  '9999999999',
  '1234-5678-9012',
  now(),
  'available'
)
ON CONFLICT ("maitriId") DO NOTHING;

-- Sample applicant for normalized table
INSERT INTO "job_applicants" (id, job_id, name, "maitriId", email, status)
VALUES ('app-sample-1', 'job-sample-1', 'Ramu', 'MT-TN-1A3B5C', 'worker1@example.com', 'applied')
ON CONFLICT (id) DO NOTHING;

---

Notes & mapping to the project code

- The project's Supabase helper (`src/lib/supabase.ts`) expects the following table names and basic schemas:
  - `workers` table with a primary key field named `maitriId` (camelCase). I created the column quoted as "maitriId" so the Supabase client returns an object with that exact property.
  - `jobs` table with primary key `id` and camelCase `createdAt` and optional `applicants` JSON column. The helper `db.getJobs()` expects rows with `id`, `title`, `description`, `createdAt`, `status`, and (optionally) `applicants`.
  - `job_applicants` table for normalized applicants. If you prefer to store applicants as nested JSON in `jobs.applicants`, you can skip creating `job_applicants`. The JS helper `db.applyToJob` will attempt to insert into `job_applicants` when Supabase is configured.

- If you use the normalized `job_applicants` table, update the admin UI to read applicants with `select * from job_applicants where job_id = '...'` (the helper has a `getApplicants` function already).

- For production use:
  - Use Supabase Auth for authentication instead of storing passwords in plain text in the `admins` table.
  - Add row-level security (RLS) policies so only authorized users can insert/update/delete rows.
  - Add proper validations and constraints as necessary (e.g. NOT NULL where appropriate).

If you want, I can:
- Update the Supabase helper (`src/lib/supabase.ts`) to prefer `job_applicants` for reads and to keep `jobs.applicants` in sync (or the opposite).
- Add migration SQL that transforms localStorage data into Supabase rows.
- Replace demo admin credentials with Supabase Auth + role-based profiles.

Tell me if you want the SQL adjusted (snake_case columns instead of camelCase, or different constraints) and I will update the file.