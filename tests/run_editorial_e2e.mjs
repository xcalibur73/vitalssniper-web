import { chromium } from 'playwright';

async function runTests() {
  console.log('====================================================');
  console.log('🚀 RUNNING WEB AUDITS EDITORIAL VERIFICATION');
  console.log('====================================================\n');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      failed++;
    }
  }

  const routes = [
    '/',
    '/articles',
    '/articles/web-performance',
    '/articles/seo',
    '/articles/ai-search',
    '/articles/web-design',
    '/articles/conversion',
    '/articles/tools',
    '/articles/5-best-wordpress-speed-plugins-2026',
    '/articles/how-to-audit-50-client-sites-in-1-week',
    '/articles/how-many-dom-elements-is-too-many',
    '/articles/we-measured-it-elementor-vs-gutenberg-performance',
    '/articles/why-your-lcp-score-tanks-on-mobile-how-to-fix-it',
    '/articles/why-mobile-lcp-is-slow-on-shopify',
    '/articles/what-makes-a-website-feel-fast-when-it-isnt',
    '/articles/the-real-cost-of-third-party-scripts',
    '/articles/does-llms-txt-actually-matter-test',
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
    '/teardowns/website-autopsy-001',
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
  ];

  const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';

  try {
    console.log('[SECTION 1] Testing 20 Routes for 200 OK and 0 Overflow (Desktop)...');
    for (const route of routes) {
      const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      assert(response?.status() === 200, `Route ${route} returned HTTP 200`);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      assert(scrollWidth <= clientWidth, `Route ${route} has zero horizontal overflow (Desktop: ${scrollWidth}px <= ${clientWidth}px)`);
    }

    console.log('\n[SECTION 2] Testing Mobile Viewport (390px) Overflow Across Key Routes...');
    await page.setViewportSize({ width: 390, height: 844 });
    const mobileSampleRoutes = ['/', '/articles', '/tools', '/reviews', '/comparisons', '/research', '/teardowns'];
    for (const route of mobileSampleRoutes) {
      await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle' });
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      assert(scrollWidth <= clientWidth, `Route ${route} has zero mobile overflow (Mobile: ${scrollWidth}px <= ${clientWidth}px)`);
    }

    // Reset viewport to desktop
    await page.setViewportSize({ width: 1280, height: 800 });

    console.log('\n[SECTION 3] Testing Homepage URL Analyzer Bar...');
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const input = page.locator('input[placeholder*="website URL"]');
    assert(await input.isVisible(), 'URL Analyzer input bar is visible in hero');

    await input.fill('https://example.com');
    await page.locator('button:has-text("Analyze")').first().click();
    await page.waitForURL(/.*tools\/website-speed-test.*/, { timeout: 10000 });
    assert(page.url().includes('website-speed-test'), `URL Analyzer routed correctly to: ${page.url()}`);

    console.log('\n[SECTION 4] Testing Affiliate Link Disclosures & rel="sponsored"...');
    await page.goto(`${BASE_URL}/reviews`, { waitUntil: 'networkidle' });
    const sponsoredLinks = page.locator('a[rel*="sponsored"]');
    const count = await sponsoredLinks.count();
    assert(count > 0, `Found ${count} affiliate links strictly enforcing rel="sponsored"`);

    const disclosureText = await page.innerText('body');
    assert(disclosureText.includes('Affiliate Disclosure') || disclosureText.includes('disclosure'), 'Mandatory FTC disclosure present on reviews');

  } catch (err) {
    console.error('Test Error:', err);
    failed++;
  } finally {
    await browser.close();
  }

  console.log('\n====================================================');
  console.log(`FINAL RESULTS: ${passed} PASSED | ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
