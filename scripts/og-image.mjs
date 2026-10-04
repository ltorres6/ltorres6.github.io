// Generates public/og-default.png, the 1200×630 social preview card.
// Run with: node scripts/og-image.mjs
import sharp from 'sharp';

const W = 1200;
const H = 630;
const navy = '#14213d';
const gold = '#d9b25f';
const cream = '#ece7dc';
const mist = '#b4bdcc';

// A complete bit-reversed radial acquisition (64 spokes over 0–π), matching the hero ornament.
const SPOKES = 64;
const cx = 975;
const cy = 315;
const r = 205;
let spokes = '';
for (let i = 0; i < SPOKES; i++) {
  const a = (Math.PI * i) / SPOKES;
  const dx = Math.cos(a) * r;
  const dy = Math.sin(a) * r;
  const o = 0.3;
  spokes += `<line x1="${cx - dx}" y1="${cy - dy}" x2="${cx + dx}" y2="${cy + dy}" stroke-opacity="${o}"/>`;
}

const photoSize = 240;
const photo = await sharp('src/assets/profile-photo.jpg')
  .resize(photoSize, photoSize)
  .composite([
    {
      input: Buffer.from(
        `<svg width="${photoSize}" height="${photoSize}"><circle cx="${photoSize / 2}" cy="${photoSize / 2}" r="${photoSize / 2}"/></svg>`,
      ),
      blend: 'dest-in',
    },
  ])
  .png()
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${navy}"/>
  <g stroke="${gold}" stroke-width="1.5">${spokes}</g>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${gold}" stroke-opacity="0.18"/>
  <circle cx="${cx}" cy="${cy}" r="${photoSize / 2 + 4}" fill="${navy}" stroke="${gold}" stroke-width="2"/>
  <text x="80" y="200" fill="${gold}" font-family="Consolas, monospace" font-size="22" letter-spacing="2">MEDICAL PHYSICIST · SCIENTIFIC SOLUTIONS ENGINEER</text>
  <text x="80" y="300" fill="${cream}" font-family="Georgia, serif" font-size="84">Luis Torres, PhD</text>
  <text x="80" y="370" fill="${mist}" font-family="Segoe UI, Arial, sans-serif" font-size="30">Software for MRI research and imaging data</text>
  <rect x="80" y="440" width="64" height="3" fill="${gold}"/>
  <text x="80" y="490" fill="${cream}" font-family="Consolas, monospace" font-size="24">luistorresphd.com</text>
</svg>`;

await sharp(Buffer.from(svg))
  .composite([
    { input: photo, left: cx - photoSize / 2, top: cy - photoSize / 2 },
  ])
  .png({ compressionLevel: 9, palette: true })
  .toFile('public/og-default.png');

console.log('wrote public/og-default.png');
