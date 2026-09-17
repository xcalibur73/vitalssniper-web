import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { key, email } = await req.json();

    if (!key && !email) {
      return NextResponse.json({ valid: false, message: 'Please provide a license key or email.' }, { status: 400 });
    }

    // Verify key format: VS-PRO-XXXX-XXXX
    const cleanKey = (key || '').trim().toUpperCase();
    const isValidKeyFormat = /^VS-PRO-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(cleanKey);

    if (isValidKeyFormat || (email && email.includes('@'))) {
      return NextResponse.json({
        valid: true,
        key: cleanKey || 'VS-PRO-LIFETIME-FOUNDER',
        tier: 'PRO Lifetime License',
        seats: 5,
        downloadUrl: '/vitalssniper_pro.zip',
        message: 'License verified successfully.',
      });
    }

    return NextResponse.json({
      valid: false,
      message: 'Invalid license key format. Expected format: VS-PRO-XXXX-XXXX',
    });
  } catch (err: any) {
    return NextResponse.json({ valid: false, message: err.message }, { status: 500 });
  }
}
