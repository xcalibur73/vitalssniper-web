import fs from 'fs';
import path from 'path';

function findHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = findHtmlFiles('.next/server/app');
console.log(`Found ${htmlFiles.length} static HTML files in Next.js build output.\n`);

let totalSchemas = 0;
let errors = 0;
const schemaCounts = {};

for (const htmlFile of htmlFiles) {
  const content = fs.readFileSync(htmlFile, 'utf8');
  const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const jsonStr = match[1];
    try {
      const parsed = JSON.parse(jsonStr);
      totalSchemas++;
      const type = parsed['@type'] || (Array.isArray(parsed) ? 'Array' : 'Unknown');
      schemaCounts[type] = (schemaCounts[type] || 0) + 1;

      // Validate required fields
      if (!parsed['@context'] || !parsed['@type']) {
        console.error(`Missing @context or @type in ${htmlFile}`);
        errors++;
      }
      if (parsed['@type'] === 'Review') {
        if (!parsed.reviewRating || !parsed.reviewRating.ratingValue) {
          console.error(`Review schema missing reviewRating in ${htmlFile}`);
          errors++;
        }
      }
      if (parsed['@type'] === 'BreadcrumbList') {
        if (!Array.isArray(parsed.itemListElement) || parsed.itemListElement.length === 0) {
          console.error(`BreadcrumbList empty in ${htmlFile}`);
          errors++;
        }
      }
    } catch (err) {
      console.error(`JSON-LD parse error in ${htmlFile}: ${err.message}`);
      errors++;
    }
  }
}

console.log('=== SCHEMA VALIDATION RESULTS ===');
console.log(`Total JSON-LD schemas validated: ${totalSchemas}`);
for (const [type, count] of Object.entries(schemaCounts)) {
  console.log(`  - ${type}: ${count} instances`);
}
console.log(`Errors encountered: ${errors}`);

if (errors > 0 || totalSchemas === 0) {
  console.error('\nFAIL: Schema validation failed.');
  process.exit(1);
} else {
  console.log('\nPASS: All Schema.org JSON-LD structured data validated successfully!');
}
