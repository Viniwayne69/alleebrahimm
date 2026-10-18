import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { writeFile } from 'node:fs/promises';
const chrome = await chromeLauncher.launch({chromePath: process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe', chromeFlags: ['--headless']});
try {
  const result = await lighthouse('http://localhost:3001', {port: chrome.port, output: ['html', 'json'], onlyCategories: ['performance', 'accessibility'], logLevel: 'error'});
  await writeFile('artifacts/visual-review/lighthouse-mobile.html', result.report[0]);
  await writeFile('artifacts/visual-review/lighthouse-mobile.json', result.report[1]);
  console.log(JSON.stringify({performance: result.lhr.categories.performance.score * 100, accessibility: result.lhr.categories.accessibility.score * 100, metrics: result.lhr.audits.metrics.details.items[0], accessibilityFailures: result.lhr.categories.accessibility.auditRefs.filter(ref=>result.lhr.audits[ref.id].score===0).map(ref=>result.lhr.audits[ref.id])},null,2));
} finally { await chrome.kill(); }
