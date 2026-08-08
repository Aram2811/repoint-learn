#!/usr/bin/env node
// این اسکریپت فونت Vazirmatn رو از GitHub دانلود می‌کنه
// و در پوشه public/fonts قرار می‌ده

const https = require('https');
const fs = require('fs');
const path = require('path');

const FONTS_DIR = path.join(__dirname, '..', 'apps', 'web', 'public', 'fonts');

const FONTS = [
  {
    name: 'Vazirmatn-Regular.woff2',
    url: 'https://github.com/rastikerdar/vazirmatn/raw/master/fonts/webfonts/Vazirmatn-Regular.woff2',
  },
  {
    name: 'Vazirmatn-Medium.woff2',
    url: 'https://github.com/rastikerdar/vazirmatn/raw/master/fonts/webfonts/Vazirmatn-Medium.woff2',
  },
  {
    name: 'Vazirmatn-SemiBold.woff2',
    url: 'https://github.com/rastikerdar/vazirmatn/raw/master/fonts/webfonts/Vazirmatn-SemiBold.woff2',
  },
  {
    name: 'Vazirmatn-Bold.woff2',
    url: 'https://github.com/rastikerdar/vazirmatn/raw/master/fonts/webfonts/Vazirmatn-Bold.woff2',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // handle redirect
        https.get(response.headers.location, (res) => {
          res.pipe(file);
          file.on('finish', () => { file.close(); resolve(); });
        }).on('error', reject);
        return;
      }
      response.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  if (!fs.existsSync(FONTS_DIR)) {
    fs.mkdirSync(FONTS_DIR, { recursive: true });
  }

  console.log('دانلود فونت Vazirmatn...');
  for (const font of FONTS) {
    const dest = path.join(FONTS_DIR, font.name);
    if (fs.existsSync(dest)) {
      console.log(`  ✓ ${font.name} (موجود)`);
      continue;
    }
    process.stdout.write(`  ↓ ${font.name}...`);
    await downloadFile(font.url, dest);
    console.log(' ✓');
  }
  console.log('فونت‌ها آماده شدند!');
}

main().catch(console.error);
