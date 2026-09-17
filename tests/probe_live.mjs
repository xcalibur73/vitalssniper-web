import https from 'https';

const endpoints = [
  '/',
  '/articles',
  '/articles/web-performance',
  '/articles/seo',
  '/articles/ai-search',
  '/articles/web-design',
  '/articles/conversion',
  '/articles/tools',
  '/articles/5-best-wordpress-speed-plugins-2026',
  '/articles/how-many-dom-elements-is-too-many',
  '/articles/we-measured-it-elementor-vs-gutenberg-performance',
  '/articles/why-mobile-lcp-is-slow-on-shopify',
  '/tools',
  '/tools/website-speed-test',
  '/tools/lcp-checker',
  '/tools/directory',
  '/reviews',
  '/reviews/cloudways',
  '/reviews/generatepress',
  '/comparisons',
  '/comparisons/cloudways-vs-siteground',
  '/research',
  '/research/website-performance-report',
  '/teardowns',
  '/teardowns/website-teardown-027',
  '/products/vitalssniper-pro',
  '/vitalssniper',
  '/free-audit-report',
  '/about',
  '/about/methodology',
  '/about/authors/devin-vance',
  '/newsletter',
  '/editorial-policy',
  '/affiliate-disclosure',
  '/privacy',
  '/terms',
  '/cookies',
  '/robots.txt',
  '/sitemap.xml',
];

async function probeAll() {
  console.log('Probing https://www.webaudits.pro live production endpoints...\n');
  let successCount = 0;

  for (const ep of endpoints) {
    await new Promise((resolve) => {
      const req = https.get('https://www.webaudits.pro' + ep, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          const hasBrand = data.includes('Web Audits Helper') || data.includes('VitalsSniper');
          console.log(`[${res.statusCode}] https://www.webaudits.pro${ep} (${data.length} bytes) - Brand match: ${hasBrand}`);
          if (res.statusCode === 200) successCount++;
          resolve();
        });
      });
      req.on('error', (err) => {
        console.error(`[ERROR] ${ep}:`, err.message);
        resolve();
      });
      req.setTimeout(10000, () => {
        req.destroy();
        console.error(`[TIMEOUT] ${ep}`);
        resolve();
      });
    });
  }

  console.log(`\nResults: ${successCount}/${endpoints.length} endpoints returned 200 OK.`);
}

probeAll();
