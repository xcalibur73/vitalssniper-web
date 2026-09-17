import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/config/site';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tier = 'pro', email = 'customer@webaudits.pro' } = body;

    const merchantCode = process.env.CHECKOUT_MERCHANT_CODE;
    const merchantKey = process.env.CHECKOUT_MERCHANT_KEY;

    const pricingTable: Record<string, { name: string; price: number }> = {
      pro: { name: 'WebAudits PRO Monthly', price: 49 },
      enterprise: { name: 'WebAudits Enterprise', price: 399 },
    };

    const selectedProduct = pricingTable[tier] || pricingTable.pro;

    // If 2Checkout credentials are configured in production:
    if (merchantCode && merchantKey) {
      // In production with 2Checkout:
      const checkoutUrl = `https://secure.2checkout.com/order/checkout.php?PRODS=${tier}&QTY=1&CART=1&CARD=1&MERCHANT=${merchantCode}`;
      return NextResponse.json({
        success: true,
        checkoutUrl,
      });
    }

    // Default graceful fallback: AppSumo Lifetime deal or success mock
    return NextResponse.json({
      success: true,
      checkoutUrl: SITE_CONFIG.appsumoUrl,
      notice: '2Checkout keys not configured yet in environment. Directing to AppSumo lifetime deal.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Checkout initialization failed' },
      { status: 500 }
    );
  }
}
