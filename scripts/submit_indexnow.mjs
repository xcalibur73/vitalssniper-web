import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOST = 'www.webaudits.pro';
const KEY = 'f4e7ea9ae6665ee6d303c0457e31c7f0';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

async function fetchSitemapUrls() {
  try {
    const res = await fetch(`https://${HOST}/sitemap.xml`, {
      headers: { 'User-Agent': 'WebAudits-IndexNow-Bot/1.0' },
    });
    if (res.ok) {
      const xml = await res.text();
      const matches = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)];
      if (matches.length > 0) {
        return matches.map((m) => m[1]);
      }
    }
  } catch (err) {
    console.warn('Could not fetch live sitemap, falling back to local build:', err.message);
  }

  const localSitemapPath = path.join(__dirname, '..', '.next', 'server', 'app', 'sitemap.xml.body');
  if (fs.existsSync(localSitemapPath)) {
    const xml = fs.readFileSync(localSitemapPath, 'utf8');
    const matches = [...xml.matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)];
    return matches.map((m) => m[1]);
  }

  throw new Error('No sitemap found locally or remotely.');
}

async function submitToIndexNow(endpoint, payload) {
  console.log(`Submitting ${payload.urlList.length} URLs to ${endpoint}...`);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'WebAudits-IndexNow-Client/1.0',
      },
      body: JSON.stringify(payload),
    });

    const bodyText = await res.text();
    console.log(`Endpoint: ${endpoint} -> HTTP ${res.status} ${res.statusText}`);
    if (bodyText) {
      console.log(`Response body: ${bodyText}`);
    }

    if (res.status === 200) {
      console.log('Success: URLs submitted and processed.');
      return true;
    } else if (res.status === 202) {
      console.log('Accepted: URLs received: key verification will occur upon crawler visit.');
      return true;
    } else {
      console.warn(`Warning: Unexpected status code ${res.status}: ${bodyText}`);
      return false;
    }
  } catch (err) {
    console.error(`Error submitting to ${endpoint}:`, err.message);
    return false;
  }
}

async function run() {
  console.log('=== WEBAUDITS.PRO INDEXNOW DISPATCH ===');
  console.log(`Host: ${HOST}`);
  console.log(`Key: ${KEY}`);
  console.log(`Key Location: ${KEY_LOCATION}`);

  const urls = await fetchSitemapUrls();
  console.log(`Discovered ${urls.length} indexable URLs from sitemap.`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  await submitToIndexNow('https://api.indexnow.org/indexnow', payload);
  await submitToIndexNow('https://www.bing.com/indexnow', payload);

  console.log('=== INDEXNOW SUBMISSION COMPLETE ===');
}

run().catch((err) => {
  console.error('Fatal error during IndexNow execution:', err);
  process.exit(1);
});
