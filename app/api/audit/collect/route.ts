import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, agencyName, domain, url, score, telemetry, primaryFlaw, source } = body;

    if (!domain && !url) {
      return NextResponse.json({ error: 'Domain or URL is required.' }, { status: 400 });
    }

    const entry = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: new Date().toISOString(),
      email: email ? String(email).trim().toLowerCase() : null,
      agencyName: agencyName ? String(agencyName).trim() : null,
      domain: domain ? String(domain).trim().toLowerCase() : null,
      url: url ? String(url).trim() : null,
      score: typeof score === 'number' ? score : null,
      telemetry: telemetry || null,
      primaryFlaw: primaryFlaw || null,
      source: source || 'webaudits_beta_auditor',
    };

    // Log to server console for telemetry aggregation
    console.log('[PUBLIC_BETA_TELEMETRY_COLLECTED]:', JSON.stringify(entry));

    // Persist to local JSON data store if environment allows
    try {
      const dataFilePath = path.join(process.cwd(), 'data', 'beta_leads.json');
      let currentData: any[] = [];
      if (fs.existsSync(dataFilePath)) {
        const fileContent = fs.readFileSync(dataFilePath, 'utf8');
        try {
          currentData = JSON.parse(fileContent.replace(/^\uFEFF/, ''));
          if (!Array.isArray(currentData)) currentData = [];
        } catch {
          currentData = [];
        }
      }

      currentData.push(entry);

      // Cap dataset at 10,000 entries
      if (currentData.length > 10000) {
        currentData = currentData.slice(-10000);
      }

      fs.writeFileSync(dataFilePath, JSON.stringify(currentData, null, 2), 'utf8');
    } catch (fsErr) {
      // In read-only serverless platforms like Vercel edge/lambda, log is preserved in stdout
      console.warn('[BETA_LEADS_STORAGE_NOTE]: Local file write skipped or read-only:', fsErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Beta telemetry and cohort registration successfully recorded.',
      data: {
        id: entry.id,
        domain: entry.domain,
        registeredAt: entry.timestamp,
      },
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Error collecting telemetry.' }, { status: 500 });
  }
}
