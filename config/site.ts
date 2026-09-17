export const SITE_CONFIG = {
  name: 'Web Audits Helper',
  legacyName: 'VitalsSniper PRO',
  domain: 'webaudits.pro',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://webaudits.pro',
  supportEmail: 'support@webaudits.pro',
  description: '1-Click Proof-of-Flaw Web Inspector & Agency Client Acquisition Engine',
  appsumoUrl: process.env.NEXT_PUBLIC_APPSUMO_URL || 'https://appsumo.com/products/vitalssniper',
  docsUrl: '/docs',
  licenseUrl: '/license',
  dashboardUrl: '/dashboard',
  pricingUrl: '/pricing',
  pricing: {
    free: {
      price: 0,
      period: 'forever',
      audits: '1 scan / week',
      seats: 1,
    },
    pro: {
      price: 49,
      period: 'mo',
      appsumoPrice: 39,
      audits: 'Unlimited (client-side)',
      seats: 5,
    },
    enterprise: {
      price: 399,
      period: 'mo',
      audits: 'Unlimited + API access',
      seats: 25,
    },
  },
};
