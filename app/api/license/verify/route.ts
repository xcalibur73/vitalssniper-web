import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import validHashes from '@/data/valid_hashes.json';

const hashesSet = new Set(validHashes);

function hashKey(k: string): string {
  return crypto.createHash('sha256').update(k.trim().toUpperCase()).digest('hex');
}

export async function POST(req: NextRequest) {
  try {
    const { key, email } = await req.json();

    if (!key && !email) {
      return NextResponse.json({ valid: false, message: 'Please provide a license key.' }, { status: 400 });
    }

    const cleanKey = (key || '').trim().toUpperCase();
    const keyHash = hashKey(cleanKey);

    // Strict validation against genuine 1,000 AppSumo / Lifetime license keys
    if (cleanKey && hashesSet.has(keyHash)) {
      return NextResponse.json({
        valid: true,
        key: cleanKey,
        tier: 'PRO Lifetime License',
        seats: 5,
        downloadUrl: `/api/download?key=${cleanKey}`,
        message: 'License verified successfully.',
      });
    }

    // If key is not in genuine database
    if (cleanKey) {
      return NextResponse.json({
        valid: false,
        message: 'License key not found or inactive. Please verify your code or purchase a valid license.',
      });
    }

    // If only email was provided without a registered transaction
    return NextResponse.json({
      valid: false,
      message: 'No active license associated with this email address. Please enter your purchase redemption code.',
    });
  } catch (err: any) {
    return NextResponse.json({ valid: false, message: err.message }, { status: 500 });
  }
}
