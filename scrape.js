// scrape.js
const { chromium } = require('playwright');

const seeds = [
  'https://sanand0.github.io/tdsdata/js_table/?seed=81',
  'https://sanand0.github.io/tdsdata/js_table/?seed=82',
  'https://sanand0.github.io/tdsdata/js_table/?seed=83',
  'https://sanand0.github.io/tdsdata/js_table/?seed=84',
  'https://sanand0.github.io/tdsdata/js_table/?seed=85',
  'https://sanand0.github.io/tdsdata/js_table/?seed=86',
  'https://sanand0.github.io/tdsdata/js_table/?seed=87',
  'https://sanand0.github.io/tdsdata/js_table/?seed=88',
  'https://sanand0.github.io/tdsdata/js_table/?seed=89',
  'https://sanand0.github.io/tdsdata/js_table/?seed=90',
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
