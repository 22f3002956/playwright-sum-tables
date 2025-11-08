// scrape.js
const { chromium } = require('playwright');

const seeds = [
  'https://example.com/seed81',
  'https://example.com/seed82',
  'https://example.com/seed83',
  'https://example.com/seed84',
  'https://example.com/seed85',
  'https://example.com/seed86',
  'https://example.com/seed87',
  'https://example.com/seed88',
  'https://example.com/seed89',
  'https://example.com/seed90',
];

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  let grandTotal = 0;

  for (const url of seeds) {
    console.log(`Visiting: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });

    // adjust selector if needed
    const numbers = await page.$$eval('table td', tds =>
      tds
        .map(td => td.textContent.trim())
        .filter(Boolean)
        .map(v => v.replace(/[, ]/g, '')) // remove commas/spaces
        .filter(v => !isNaN(Number(v)))
        .map(Number)
    );

    const sum = numbers.reduce((a, b) => a + b, 0);
    console.log(`Page total (${url}):`, sum);
    grandTotal += sum;
  }

  console.log('FINAL TOTAL:', grandTotal);
  await browser.close();
})();
