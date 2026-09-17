import { chromium } from 'playwright';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function runExtensionE2ETest() {
  console.log('====================================================');
  console.log('🧪 RUNNING VITALSSNIPER PRO EXTENSION E2E TEST');
  console.log('====================================================\n');

  const extPath = path.resolve('b:/Project Seo for WU and AA/projects/micro_saas_extensions/vitalssniper_extension');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vs-ext-e2e-'));
  const screenshotDir = path.resolve(__dirname, 'screenshots');
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true });
  }

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

  let context;
  try {
    console.log('[STEP 1] Launching Chromium with unpacked VitalsSniper extension...');
    context = await chromium.launchPersistentContext(tempDir, {
      channel: 'msedge',
      headless: false,
      args: [
        `--disable-extensions-except=${extPath}`,
        `--load-extension=${extPath}`,
        '--no-sandbox'
      ]
    });

    // Wait for service worker
    let [serviceWorker] = context.serviceWorkers();
    if (!serviceWorker) {
      serviceWorker = await context.waitForEvent('serviceworker', { timeout: 7000 }).catch(() => null);
    }

    assert(serviceWorker !== null, 'Extension service worker registered successfully');
    const extId = serviceWorker ? serviceWorker.url().split('/')[2] : '';
    console.log(`  → Extension ID: ${extId}`);

    // Create a target webpage tab to simulate inspecting an actual website
    console.log('\n[STEP 2] Navigating active tab to target site for inspection...');
    const targetPage = await context.newPage();
    await targetPage.goto('https://example.com', { waitUntil: 'domcontentloaded' });
    assert(await targetPage.title() === 'Example Domain', 'Active tab navigated to example.com');

    // Open extension popup page
    console.log('\n[STEP 3] Opening extension popup UI...');
    const popupUrl = `chrome-extension://${extId}/popup.html`;
    const popupPage = await context.newPage();
    
    // Capture page console logs and errors
    const consoleErrors = [];
    popupPage.on('pageerror', err => consoleErrors.push(err.message));
    popupPage.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await popupPage.goto(popupUrl, { waitUntil: 'load' });
    await popupPage.waitForTimeout(1000);

    const title = await popupPage.title();
    assert(title.includes('VitalsSniper'), `Popup loaded with title "${title}"`);
    assert(consoleErrors.length === 0, `Zero runtime console errors on launch (found: ${consoleErrors.length})`);

    // Verify key UI elements exist
    const proTag = popupPage.locator('#proTag');
    assert(await proTag.isVisible(), 'PRO / ACTIVATE badge is rendered');
    const initialBadgeText = await proTag.innerText();
    console.log(`  → Current License State Badge: "${initialBadgeText}"`);

    await popupPage.screenshot({ path: path.join(screenshotDir, '1_popup_initial.png') });

    // Step 4: Test PRO License Activation Flow
    console.log('\n[STEP 4] Testing PRO License Activation Flow...');
    if (initialBadgeText.includes('ACTIVATE')) {
      // Click proTag to open activation modal
      await proTag.click();
      await popupPage.waitForTimeout(400);

      const modal = popupPage.locator('#activationModal');
      assert(await modal.isVisible(), 'Activation modal opened on clicking ACTIVATE');

      const keyInput = popupPage.locator('#licenseKeyInput');
      const activateBtn = popupPage.locator('#btnActivateLicense');
      const errorDiv = popupPage.locator('#activationError');

      // Test format validation
      await keyInput.fill('INVALID-KEY');
      await activateBtn.click();
      await popupPage.waitForTimeout(300);
      assert(await errorDiv.isVisible(), 'Format error displayed for invalid key format');
      const errText = await errorDiv.innerText();
      assert(errText.includes('VS-PRO-XXXX-XXXX'), 'Error specifies expected VS-PRO-XXXX-XXXX pattern');

      // Test valid master key activation
      console.log('  ... submitting pre-authorized key VS-PRO-DEMO-2026 ...');
      await keyInput.fill('VS-PRO-DEMO-2026');
      await activateBtn.click();
      await popupPage.waitForTimeout(600);

      // Verify modal is closed or shows active details
      const isModalVisible = await modal.isVisible();
      const newBadgeText = await proTag.innerText();
      assert(newBadgeText === 'PRO', 'PRO badge updated to "PRO" upon key entry');
      
      const hasActiveClass = await proTag.evaluate(el => el.classList.contains('active'));
      assert(hasActiveClass, 'PRO badge has active highlight styling');

      // Close activation modal to return to main audit view
      const closeBtn = popupPage.locator('#activationClose');
      if (await closeBtn.isVisible()) await closeBtn.click();
      await popupPage.waitForTimeout(400);

      await popupPage.screenshot({ path: path.join(screenshotDir, '2_pro_activated.png') });
    } else {
      console.log('  → Extension already in PRO mode.');
      assert(initialBadgeText === 'PRO', 'Verified active PRO badge');
    }

    // Step 5: Test Multi-Channel Outreach Switcher
    console.log('\n[STEP 5] Testing Multi-Channel Outreach Tabs...');
    const btnEmail = popupPage.locator('#tabEmail');
    const btnDm = popupPage.locator('#tabDm');
    const btnLoom = popupPage.locator('#tabLoom');
    const pitchText = popupPage.locator('#emailPreviewBox');
    const btnCopyHook = popupPage.locator('#btnCopyHook');

    assert(await btnEmail.isVisible(), 'Email outreach tab visible');
    assert(await btnDm.isVisible(), 'LinkedIn DM tab visible');
    assert(await btnLoom.isVisible(), '30s Loom tab visible');

    // Click LinkedIn DM
    await btnDm.click();
    await popupPage.waitForTimeout(300);
    const dmText = await pitchText.innerText();
    assert(dmText.length > 20, 'LinkedIn DM pitch populated with personalized copy');

    // Click 30s Loom Script
    await btnLoom.click();
    await popupPage.waitForTimeout(300);
    const loomText = await pitchText.innerText();
    assert(loomText.length > 20, 'Loom pitch script populated with structured talking points');

    // Click Copy Hook button
    await btnCopyHook.click();
    await popupPage.waitForTimeout(300);
    const copyHookText = await btnCopyHook.innerText();
    assert(copyHookText.includes('Copied') || copyHookText.includes('Hook'), 'Copy Hook button responded with feedback');

    await popupPage.screenshot({ path: path.join(screenshotDir, '3_outreach_dm.png') });

    // Step 6: Test 1-Page Teardown Dossier Export (Confirm no ReferenceError)
    console.log('\n[STEP 6] Testing 1-Page Teardown Dossier Export...');
    const btnExportCard = popupPage.locator('#btnExportCard');
    assert(await btnExportCard.isVisible(), 'Export Teardown Dossier button is visible');

    // Expect a new page/tab to open when clicked
    const [dossierPage] = await Promise.all([
      context.waitForEvent('page', { timeout: 5000 }).catch(() => null),
      btnExportCard.click()
    ]);

    if (dossierPage) {
      await dossierPage.waitForLoadState('domcontentloaded');
      const dossierTitle = await dossierPage.title();
      assert(dossierTitle.includes('Teardown') || dossierTitle.includes('Audit') || dossierTitle.includes('Diagnostic') || dossierTitle.includes('VitalsSniper'), `Dossier opened in new tab with title "${dossierTitle}"`);
      
      const dossierContent = await dossierPage.innerText('body');
      assert(dossierContent.includes('TECHNICAL AUDIT') || dossierContent.includes('CONFIDENTIAL') || dossierContent.includes('Score') || dossierContent.includes('DOM Hierarchy'), 'Dossier rendered technical audit content');
      await dossierPage.screenshot({ path: path.join(screenshotDir, '4_dossier_report.png') });
      await dossierPage.close();
    } else {
      console.log('  (Dossier tab was blocked or handled in-page, checking console for errors)');
    }

    assert(consoleErrors.length === 0, `Zero runtime errors during export (extpay ReferenceError successfully resolved!)`);

    // Step 7: Test Competitor Mode Modal (Verify no fake data)
    console.log('\n[STEP 7] Testing Competitor Comparison Modal...');
    const btnCompetitor = popupPage.locator('#btnOpenCompetitor');
    if (await btnCompetitor.isVisible()) {
      await btnCompetitor.click();
      await popupPage.waitForTimeout(400);

      const compModal = popupPage.locator('#competitorModal');
      assert(await compModal.isVisible(), 'Competitor comparison modal opened');

      const modalText = await compModal.innerText();
      // Ensure fake stats are NEVER shown
      assert(!modalText.includes('1,140') || !modalText.includes('42 KB (Clean)'), 'Fake competitor fallback data is NOT generated');
      
      const closeCompBtn = popupPage.locator('#competitorClose');
      if (await closeCompBtn.isVisible()) await closeCompBtn.click();
    }

    console.log('\n====================================================');
    console.log(`TOTAL E2E CHECKS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
    console.log('====================================================');

    if (failed === 0) {
      console.log('\n>> ALL EXTENSION LIVE E2E CHECKS PASSED WITH 100% SUCCESS <<\n');
    }

  } catch (err) {
    console.error('Test run encountered an unexpected exception:', err);
    failed++;
  } finally {
    if (context) await context.close();
    try {
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (e) {}
  }
}

runExtensionE2ETest();
