import https from 'https';

https.get('https://www.webaudits.pro/', (res) => {
  let data = '';
  res.on('data', (chunk) => (data += chunk));
  res.on('end', () => {
    const lines = data.split('>');
    const iconLines = lines.filter((l) => l.includes('rel="icon"') || l.includes('apple-touch-icon') || l.includes('favicon'));
    console.log('Icon tags in live HTML:');
    iconLines.forEach((l) => console.log(l.trim() + '>'));
  });
});
