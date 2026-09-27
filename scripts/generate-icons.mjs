// Renders the PWA icon set from hand-authored SVG to PNG at build time.
// Run with `npm run icons` after editing the SVG markup below.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const PINK = '#e0699a';
const CREAM = '#fff7f5';

const scissors = ({ scale = 1, cornerRadius = 22 } = {}) => {
  const cx = 50;
  const cy = 50;
  const s = scale;
  const t = (x, y) => [cx + (x - cx) * s, cy + (y - cy) * s];
  const [p1x, p1y] = t(50, 54);
  const [b1ax, b1ay] = t(20, 16);
  const [b1bx, b1by] = t(26, 14);
  const [b2ax, b2ay] = t(80, 16);
  const [b2bx, b2by] = t(74, 14);
  const [pivotX, pivotY] = t(50, 54);
  const [arm1x, arm1y] = t(33, 75);
  const [arm2x, arm2y] = t(67, 75);
  const [h1x, h1y] = t(30, 80);
  const [h2x, h2y] = t(70, 80);
  const [spx, spy] = t(78, 24);

  return `
    <rect width="100" height="100" rx="${cornerRadius}" fill="${PINK}"/>
    <path d="M${p1x} ${p1y} L${b1ax} ${b1ay} L${b1bx} ${b1by} Z" fill="${CREAM}"/>
    <path d="M${p1x} ${p1y} L${b2ax} ${b2ay} L${b2bx} ${b2by} Z" fill="${CREAM}"/>
    <circle cx="${pivotX}" cy="${pivotY}" r="${4 * s}" fill="${CREAM}"/>
    <line x1="${pivotX}" y1="${pivotY}" x2="${arm1x}" y2="${arm1y}" stroke="${CREAM}" stroke-width="${6 * s}" stroke-linecap="round"/>
    <line x1="${pivotX}" y1="${pivotY}" x2="${arm2x}" y2="${arm2y}" stroke="${CREAM}" stroke-width="${6 * s}" stroke-linecap="round"/>
    <circle cx="${h1x}" cy="${h1y}" r="${9 * s}" fill="none" stroke="${CREAM}" stroke-width="${6 * s}"/>
    <circle cx="${h2x}" cy="${h2y}" r="${9 * s}" fill="none" stroke="${CREAM}" stroke-width="${6 * s}"/>
    <path d="M${spx} ${spy} l${2.4 * s} ${5.6 * s} ${5.6 * s} ${2.4 * s} -${5.6 * s} ${2.4 * s} -${2.4 * s} ${5.6 * s} -${2.4 * s} -${5.6 * s} -${5.6 * s} -${2.4 * s} ${5.6 * s} -${2.4 * s}z" fill="${CREAM}" opacity="0.9"/>
  `;
};

const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${inner}</svg>`;

const regular = svg(scissors({ scale: 1, cornerRadius: 22 }));
// Maskable icons get cropped to a circle by some OSes — keep content inside
// the safe zone by scaling it down within the same full-bleed canvas.
const maskable = svg(scissors({ scale: 0.72, cornerRadius: 0 }));

async function render(markup, size, outPath) {
  await sharp(Buffer.from(markup))
    .resize(size, size)
    .png()
    .toFile(outPath);
  console.log('wrote', outPath);
}

async function main() {
  await mkdir('public/assets', { recursive: true });
  await render(regular, 192, 'public/assets/icon-192.png');
  await render(regular, 512, 'public/assets/icon-512.png');
  await render(regular, 512, 'public/assets/apple-touch-icon.png');
  await render(maskable, 512, 'public/assets/icon-maskable-512.png');
}

main();
