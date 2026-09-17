import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import validHashes from '@/data/valid_hashes.json';

const hashesSet = new Set(validHashes);

function hashKey(k: string): string {
  return crypto.createHash('sha256').update(k.trim().toUpperCase()).digest('hex');
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const key = (searchParams.get('key') || '').trim().toUpperCase();
    const keyHash = hashKey(key);

    if (!key || !hashesSet.has(keyHash)) {
      return NextResponse.json(
        {
          error: 'Access Denied: A valid, verified VitalsSniper PRO license key is required to download this asset.',
        },
        { status: 403 }
      );
    }

    const filePath = path.join(process.cwd(), 'private_releases', 'vitalssniper_pro.zip');

    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'Release file temporarily unavailable. Please contact support.' },
        { status: 404 }
      );
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="vitalssniper_pro.zip"',
        'Content-Length': fileBuffer.length.toString(),
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
