// Renders /resume/ to public/luis-torres-resume.pdf with headless Chrome.
// Start the site first (npm run build && npm run preview), then:
//   node scripts/resume-pdf.mjs [url]
// Set CHROME to override the browser path.
import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.argv[2] ?? 'http://localhost:4321/resume/';
const out = resolve('public/luis-torres-resume.pdf');
const candidates = [
  process.env.CHROME,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) throw new Error('Chrome not found; set CHROME=/path/to/chrome');

execFileSync(chrome, [
  '--headless',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--run-all-compositor-stages-before-draw',
  '--virtual-time-budget=5000',
  `--print-to-pdf=${out}`,
  url,
]);
console.log(`wrote ${out}`);
