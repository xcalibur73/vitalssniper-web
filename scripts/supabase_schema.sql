-- ==============================================================================
-- WebAudits PRO / VitalsSniper Database Schema for Supabase
-- Run this in your Supabase SQL Editor (Day 4 of Launch Plan)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS licenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_id VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  tier VARCHAR(50) DEFAULT 'pro', -- 'pro', 'enterprise', 'lifetime'
  status VARCHAR(50) DEFAULT 'active',
  activated_date TIMESTAMP DEFAULT NOW(),
  expiry_date TIMESTAMP NOT NULL,
  features JSONB DEFAULT '{"bulk_audit": false, "scheduler": false, "white_label": true, "api_access": false}',
  usage JSONB DEFAULT '{"audits_this_month": 0, "audits_limit": 100}',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_license_id ON licenses(license_id);
CREATE INDEX IF NOT EXISTS idx_email ON licenses(email);

-- Leads captured from the /free-audit-report lead magnet
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  company_name VARCHAR(255),
  health_score INT,
  cms VARCHAR(100),
  primary_flaw TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);

-- Seed sandbox test license (VS-PRO-TEST-9999)
INSERT INTO licenses (license_id, email, tier, status, expiry_date, features, usage)
VALUES (
  'VS-PRO-TEST-9999',
  'demo@webaudits.pro',
  'pro',
  'active',
  NOW() + INTERVAL '10 years',
  '{"bulk_audit": true, "scheduler": true, "white_label": true, "api_access": true}',
  '{"audits_this_month": 12, "audits_limit": 1000}'
)
ON CONFLICT (license_id) DO NOTHING;
