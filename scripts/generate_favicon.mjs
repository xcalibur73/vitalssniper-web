import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const svgFinal = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <defs>
    <linearGradient id="waBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#242321"/>
      <stop offset="100%" stop-color="#141312"/>
    </linearGradient>
    <linearGradient id="waAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97757"/>
      <stop offset="100%" stop-color="#B76345"/>
    </linearGradient>
  </defs>

  <!-- Squircle Base (Apple/Modern Tech Standard rx=112) -->
  <rect width="512" height="512" rx="114" fill="url(#waBg)"/>
  <rect x="8" y="8" width="496" height="496" rx="106" fill="none" stroke="#383632" stroke-width="12"/>

  <!-- Bold Tech Publication Lettermark -->
  <text x="246" y="328"
        text-anchor="middle"
        font-family="-apple-system, BlinkMacSystemFont, 'Plus Jakarta Sans', 'Segoe UI', Roboto, 'Inter', sans-serif"
        font-weight="900"
        font-size="214"
        letter-spacing="-8"
        fill="#F7F4EE">WA<tspan fill="url(#waAccent)">.</tspan></text>
</svg>`;

async function generateAllIcons() {
  console.log('Building production-grade WA favicon suite...');

  // 1. Write SVGs
  fs.writeFileSync('public/favicon.svg', svgFinal);
  fs.writeFileSync('public/icon.svg', svgFinal);
  fs.writeFileSync('app/icon.svg', svgFinal);

  // 2. Launch browser to render razor-sharp PNGs at exact device sizes
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'favicon-48x48.png', size: 48 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'android-chrome-192x192.png', size: 192 },
    { name: 'android-chrome-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });

    const html = `<!DOCTYPE html>
<html>
<head>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body { width: ${size}px; height: ${size}px; overflow: hidden; background: transparent; }
    svg { width: 100%; height: 100%; display: block; }
  </style>
</head>
<body>
  ${svgFinal}
</body>
</html>`;

    await page.setContent(html);
    const outPath = path.join('public', name);
    await page.screenshot({ path: outPath, omitBackground: true });
    console.log(`  ✓ Generated: ${outPath} (${size}x${size})`);
    await page.close();
  }

  // Copy 32x32 to favicon.ico for standard fallback
  fs.copyFileSync('public/favicon-32x32.png', 'public/favicon.ico');
  fs.copyFileSync('public/favicon-32x32.png', 'app/favicon.ico');
  console.log('  ✓ Generated: public/favicon.ico & app/favicon.ico');

  // Also create a test preview to visually check tabs
  const tabPreviewPage = await browser.newPage({ viewport: { width: 800, height: 400 } });
  const tabPreviewHtml = `<!DOCTYPE html>
<html>
<head>
  <title>Browser Tab Simulation</title>
  <style>
    body { background: #0F0F11; color: #FFF; font-family: system-ui; padding: 40px; }
    .tab-bar-dark {
      background: #1E1F22;
      border-radius: 8px 8px 0 0;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      width: 260px;
      border-bottom: 2px solid #333;
    }
    .tab-bar-light {
      background: #DEE1E6;
      border-radius: 8px 8px 0 0;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      gap: 10px;
      width: 260px;
      color: #222;
      margin-top: 30px;
    }
    .tab-title { font-size: 12px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .preview-row { display: flex; gap: 30px; margin-top: 30px; align-items: flex-end; }
  </style>
</head>
<body>
  <h2>Simulated Browser Chrome Tabs</h2>
  <div class="tab-bar-dark">
    <img src="favicon-32x32.png" width="16" height="16">
    <span class="tab-title">Web Audits Helper | Technical Audits</span>
  </div>

  <div class="tab-bar-light">
    <img src="favicon-32x32.png" width="16" height="16">
    <span class="tab-title">Web Audits Helper | Technical Audits</span>
  </div>

  <h3 style="margin-top: 40px;">All Generated Resolutions:</h3>
  <div class="preview-row">
    <div><img src="android-chrome-512x512.png" width="96" height="96"><br><small>512px</small></div>
    <div><img src="apple-touch-icon.png" width="64" height="64"><br><small>180px</small></div>
    <div><img src="favicon.ico" width="48" height="48"><br><small>48px</small></div>
    <div><img src="favicon-32x32.png" width="32" height="32"><br><small>32px</small></div>
    <div><img src="favicon-16x16.png" width="16" height="16"><br><small>16px</small></div>
  </div>
</body>
</html>`;

  await tabPreviewPage.setContent(tabPreviewHtml);
  await tabPreviewPage.screenshot({ path: 'public/tab_simulation.png' });
  console.log('  ✓ Generated: public/tab_simulation.png');

  await browser.close();
  console.log('Favicon suite successfully generated!');
}

generateAllIcons();
