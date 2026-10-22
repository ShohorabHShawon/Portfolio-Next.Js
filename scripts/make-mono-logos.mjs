// Builds single-colour, transparent versions of the client logos in
// public/brands/mono so they can be tinted to match the site's dark theme.
// The logo's background colour is sampled from the image border and removed;
// whatever differs from it becomes the logo shape (stored in the alpha channel).
// Run with `npm run logos:mono` after adding a new client logo.
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.join(process.cwd(), 'public', 'brands');
const OUTPUT_DIR = path.join(SOURCE_DIR, 'mono');
const SIZE = 640;
// Colour distance from the background: below LOW is fully transparent, above HIGH fully opaque.
const LOW = 38;
const HIGH = 110;
const SUPPORTED = new Set(['.png', '.jpg', '.jpeg', '.webp']);

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const files = (await fs.readdir(SOURCE_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && SUPPORTED.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  return sorted[Math.floor(sorted.length / 2)];
};

for (const fileName of files) {
  const { data, info } = await sharp(path.join(SOURCE_DIR, fileName))
    .flatten({ background: '#ffffff' })
    .resize(SIZE, SIZE, { fit: 'inside' })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height } = info;
  const pixel = (x, y) => {
    const i = (y * width + x) * 3;
    return [data[i], data[i + 1], data[i + 2]];
  };

  // Background colour = median of the outer border pixels.
  const border = [];
  for (let x = 0; x < width; x += 1) border.push(pixel(x, 0), pixel(x, height - 1));
  for (let y = 0; y < height; y += 1) border.push(pixel(0, y), pixel(width - 1, y));
  const background = [0, 1, 2].map((channel) => median(border.map((p) => p[channel])));

  const out = Buffer.alloc(width * height * 4);
  const columnCounts = new Array(width).fill(0);
  const rowCounts = new Array(height).fill(0);
  // Scanned or textured backgrounds leave specks at the very edge; ignore that rim.
  const margin = Math.round(Math.max(width, height) * 0.02);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = pixel(x, y);
      const distance = Math.hypot(r - background[0], g - background[1], b - background[2]);
      const insideRim = x >= margin && y >= margin && x < width - margin && y < height - margin;
      const alpha = insideRim
        ? Math.round(Math.min(1, Math.max(0, (distance - LOW) / (HIGH - LOW))) * 255)
        : 0;
      const o = (y * width + x) * 4;
      out[o] = 255;
      out[o + 1] = 255;
      out[o + 2] = 255;
      out[o + 3] = alpha;
      if (alpha > 90) {
        columnCounts[x] += 1;
        rowCounts[y] += 1;
      }
    }
  }

  // Crop to rows/columns with real ink, so lone specks don't widen the box.
  const MIN_INK = 3;
  const firstInk = (counts) => counts.findIndex((count) => count >= MIN_INK);
  const lastInk = (counts) => counts.length - 1 - [...counts].reverse().findIndex((count) => count >= MIN_INK);
  const minX = firstInk(columnCounts);
  const maxX = lastInk(columnCounts);
  const minY = firstInk(rowCounts);
  const maxY = lastInk(rowCounts);

  if (minX < 0 || minY < 0 || maxX <= minX || maxY <= minY) {
    console.warn(`${fileName}: no logo shape found, skipped`);
    continue;
  }

  const output = path.join(OUTPUT_DIR, `${path.parse(fileName).name}.png`);
  await sharp(out, { raw: { width, height, channels: 4 } })
    .extract({ left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 })
    .png({ compressionLevel: 9 })
    .toFile(output);

  console.log(`${fileName} -> mono/${path.basename(output)} (background rgb(${background.join(', ')}))`);
}
