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

    // Server-only Ed25519 private key (never shipped to extension)
    const SERVER_PRIVATE_KEY_HEX = process.env.ED25519_PRIVATE_KEY_HEX ||
      '302e020100300506032b657004220420e23ae98e226416a08db84946017e5083542cc289b78ea83e83bb43f84a672004';

    // Strict validation against genuine 1,000 AppSumo / Lifetime license keys
    if (cleanKey && hashesSet.has(keyHash)) {
      const payload = {
        sub: cleanKey,
        tier: 'pro',
        iat: Date.now(),
        exp: null, // Lifetime entitlement
        iss: 'vitalssniper.pro',
        aud: 'vitalssniper-extension',
        jti: 'ent-' + Date.now() + '-' + crypto.randomBytes(6).toString('hex')
      };

      const canonicalJson = JSON.stringify(payload, Object.keys(payload).sort());
      const privKeyObj = crypto.createPrivateKey({
        key: Buffer.from(SERVER_PRIVATE_KEY_HEX, 'hex'),
        format: 'der',
        type: 'pkcs8'
      });
      const signatureHex = crypto.sign(null, Buffer.from(canonicalJson), privKeyObj).toString('hex');

      return NextResponse.json({
        valid: true,
        key: cleanKey,
        tier: 'pro',
        seats: 5,
        payload,
        signature: signatureHex,
        downloadUrl: `/api/download?key=${cleanKey}`,
        message: 'License verified successfully.'
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
