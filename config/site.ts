export const SITE_CONFIG = {
  name: 'VitalsSniper PRO',
  description: '1-Click Proof-of-Flaw Web Inspector & Agency Client Acquisition Engine',
  appsumoUrl: process.env.NEXT_PUBLIC_APPSUMO_URL || 'https://appsumo.com/products/vitalssniper',
  docsUrl: '/docs',
  licenseUrl: '/license',
  pricing: {
    solo: {
      price: 39,
      originalPrice: 99,
      discount: '60% OFF',
      seats: 1,
    },
    agency: {
      price: 79,
      originalPrice: 199,
      discount: '60% OFF',
      seats: 5,
    },
  },
};
