import { chromium } from 'playwright';
import path from 'path';

async function runLiveSuite() {
  console.log('====================================================');
  console.log('🚀 STARTING WEB AUDITS HELPER LIVE VERIFICATION SUITE');
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

  try {
    // ----------------------------------------------------
    // TEST SECTION 1: Brand Hub Homepage & Navigation
    // ----------------------------------------------------
    console.log('[SECTION 1] Testing Brand Hub Homepage & Navigation...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    const title = await page.title();
    assert(title.includes('VitalsSniper PRO') && title.includes('Web Audits Helper'), 'Page title correctly renders brand name and VitalsSniper PRO');

    const homeText = await page.innerText('body');
    assert(homeText.includes('Find the Right Web Tools'), 'Brand hero headline rendered cleanly');
    assert(homeText.includes('Built by Us, Trusted by Agencies'), 'VitalsSniper spotlight section rendered');
    assert(homeText.includes('Top Web Tools We Recommend'), 'Curated tools grid rendered');
    assert(homeText.includes('From the Blog'), 'Blog preview section rendered');

    // ----------------------------------------------------
    // TEST SECTION 2: VitalsSniper PRO Product Page & Live Auditor
    // ----------------------------------------------------
    console.log('\n[SECTION 2] Testing Dedicated VitalsSniper PRO Product Page & Auditor...');
    await page.goto('http://localhost:3000/vitalssniper', { waitUntil: 'networkidle' });

    // Deliverables grid check
    const deliverableCards = await page.$$('section#deliverables .grid > div');
    assert(deliverableCards.length >= 6, `Deliverables grid rendered with ${deliverableCards.length} items`);

    const deliverablesText = await page.$eval('section#deliverables', el => el.innerText);
    assert(deliverablesText.includes('Head-to-Head Competitor Mode'), 'Competitor mode featured in deliverables');
    assert(deliverablesText.includes('Live LCP Element Visual Highlighter'), 'LCP Highlighter featured in deliverables');
    assert(deliverablesText.includes('1-Click Lead Pipeline & CSV Export'), 'Lead Pipeline CRM featured in deliverables');
    assert(deliverablesText.includes('White-Label Agency PDF & Booking CTA'), 'White-Label PDF featured in deliverables');

    await page.locator('#auditor').scrollIntoViewIfNeeded();

    // Click sample button for instant audit
    const sampleBtn = page.locator('button:has-text("apple.com")').first();
    await sampleBtn.click();

    console.log('  ... waiting for live website audit to complete ...');
    await page.waitForSelector('text=AUDITED DOMAIN', { timeout: 20000 });
    await page.waitForTimeout(1000);

    const auditorText = await page.locator('#auditor').innerText();
    assert(auditorText.includes('apple.com'), 'Audited domain (apple.com) rendered in teaser');
    assert(auditorText.includes('/ 100') || auditorText.includes('Score'), 'Health score dial rendered in teaser');

    // Check lock overlay presence for unauthenticated user
    assert(auditorText.includes('Full Diagnostic Report & Outreach Pitches Locked'), 'Frosted-glass lock overlay is ACTIVE and displayed for unauthenticated visitors');
    assert(auditorText.includes('Unlock Full Report on AppSumo ($39)'), 'AppSumo redirect CTA is present inside lock overlay');

    // ----------------------------------------------------
    // TEST SECTION 3: In-Auditor Key Activation & Dynamic Unblur
    // ----------------------------------------------------
    console.log('\n[SECTION 3] Testing License Key Activation & Dynamic Report Unblur...');
    
    // Click "Already bought? Activate Key" to reveal inline form
    const toggleKeyBtn = page.locator('button:has-text("Already bought? Activate Key")').first();
    await toggleKeyBtn.click();
    await page.waitForTimeout(400);

    const input = page.locator('#inputDirectUnlock');
    assert(await input.isVisible(), 'Inline license key input revealed upon toggle');
    await input.fill('VS-PRO-TEST-9999');

    const btnUnlock = page.locator('#btnDirectUnlock');
    await btnUnlock.click();
    console.log('  ... verifying license key against /api/license/verify ...');
    await page.waitForTimeout(2500);

    // After unlock, the lock overlay disappears and full results become unblurred
    const isLockStillVisible = await page.locator('text=Full Diagnostic Report & Outreach Pitches Locked').isVisible();
    assert(!isLockStillVisible, 'Lock overlay successfully DISMISSED upon key activation');

    const unlockedAuditorText = await page.locator('#auditor').innerText();
    assert(unlockedAuditorText.includes('DOM Tree Depth') || unlockedAuditorText.includes('DOM Elements'), 'Forensic telemetry cards unblurred & visible');
    assert(unlockedAuditorText.includes('Recommended Technical Improvements'), 'Technical remediation blueprint displayed');
    assert(unlockedAuditorText.includes('Cold Email Pitch') || unlockedAuditorText.includes('Copy Pitch Script'), 'Cold outreach generator displayed');

    // ----------------------------------------------------
    // TEST SECTION 4: Multi-Channel Outreach Switcher
    // ----------------------------------------------------
    console.log('\n[SECTION 4] Testing Multi-Channel Outreach Tabs (Email, DM, Loom)...');
    
    const dmTab = page.locator('button:has-text("LinkedIn DM")').first();
    await dmTab.click();
    await page.waitForTimeout(300);
    const dmContent = await page.locator('#auditor pre').innerText();
    assert(dmContent.includes('noticed') || dmContent.includes('Hey') || dmContent.includes('apple.com'), 'LinkedIn DM pitch rendered with personalized hook');

    const loomTab = page.locator('button:has-text("30s Loom Script")').first();
    await loomTab.click();
    await page.waitForTimeout(300);
    const loomContent = await page.locator('#auditor pre').innerText();
    assert(loomContent.includes('0:00') && loomContent.includes('0:08'), '30-second Loom script rendered with timestamps');

    // ----------------------------------------------------
    // TEST SECTION 5: Curated Tools Catalog & Review Pages
    // ----------------------------------------------------
    console.log('\n[SECTION 5] Testing Tools Catalog & Review Routes...');
    await page.goto('http://localhost:3000/tools', { waitUntil: 'networkidle' });
    const toolsText = await page.innerText('body');
    assert(toolsText.includes('Web Tools Catalog'), 'Tools catalog heading displayed');
    assert(toolsText.includes('Cloudways') && toolsText.includes('GeneratePress'), 'Affiliate tools present in catalog');

    // Test individual tool review page
    await page.goto('http://localhost:3000/tools/cloudways', { waitUntil: 'networkidle' });
    const reviewText = await page.innerText('body');
    assert(reviewText.includes('Cloudways'), 'Cloudways review page rendered');
    assert(reviewText.includes('Pros') && reviewText.includes('Cons'), 'Pros and Cons displayed on review page');

    // ----------------------------------------------------
    // TEST SECTION 6: Extension Popup Functionality in Browser
    // ----------------------------------------------------
    console.log('\n[SECTION 6] Testing VitalsSniper Extension Popup UI & Modals...');
    const extPopupPath = 'file:///' + path.resolve('../vitalssniper_extension/popup.html').replace(/\\/g, '/');
    await page.goto(extPopupPath, { waitUntil: 'load' });
    await page.waitForTimeout(1000);

    const extContent = await page.content();
    assert(extContent.includes('VitalsSniper'), 'Extension popup loaded cleanly');
    assert(extContent.includes('btnOpenCompetitor') && extContent.includes('btnOpenPipeline') && extContent.includes('btnOpenSettings'), 'Header tools present (Vs, Pipeline, Settings)');

    // Test Settings Modal
    const btnSettings = page.locator('#btnOpenSettings');
    await btnSettings.click();
    await page.waitForTimeout(300);
    assert(await page.locator('#settingsModal').isVisible(), 'White-Label Settings modal opens cleanly');

    await page.locator('#cfgAgencyName').fill('Apex Performance Labs');
    await page.locator('#cfgBookingUrl').fill('https://calendly.com/apex/audit');
    await page.locator('#settingsClose').click();
    await page.waitForTimeout(300);
    assert(!(await page.locator('#settingsModal').isVisible()), 'Settings modal closes cleanly');

    // Test Competitor Modal
    const btnCompetitor = page.locator('#btnOpenCompetitor');
    await btnCompetitor.click();
    await page.waitForTimeout(300);
    assert(await page.locator('#competitorModal').isVisible(), 'Competitor Comparison modal opens cleanly');
    await page.locator('#competitorClose').click();

    // Test Lead Pipeline Drawer
    const btnPipeline = page.locator('#btnOpenPipeline');
    await btnPipeline.click();
    await page.waitForTimeout(300);
    assert(await page.locator('#pipelineModal').isVisible(), 'Lead Pipeline CRM drawer opens cleanly');
    await page.locator('#pipelineClose').click();

    // Test License Activation Modal
    const proTag = page.locator('#proTag');
    await proTag.click();
    await page.waitForTimeout(300);
    assert(await page.locator('#activationModal').isVisible(), 'PRO License Activation modal opens cleanly');
    await page.locator('#activationClose').click();

  } catch (err) {
    console.error('Test Execution Error:', err);
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

runLiveSuite();
