// Builds web-sized copies of the gallery photos in public/images/web.
// The originals (often 20-100MB PNGs) are too large for the Next.js image
// optimizer (50MB limit) and slow to resize on first request.
// Run with `npm run optimize:images` after adding new photos.
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.join(process.cwd(), 'public', 'images');
const OUTPUT_DIR = path.join(SOURCE_DIR, 'web');
const MAX_EDGE = 2400;
const SUPPORTED = new Set(['.png', '.jpg', '.jpeg', '.webp', '.tif', '.tiff']);

sharp.cache(false);
sharp.concurrency(2);

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const entries = await fs.readdir(SOURCE_DIR, { withFileTypes: true });
const files = entries
  .filter((entry) => entry.isFile() && SUPPORTED.has(path.extname(entry.name).toLowerCase()))
  .map((entry) => entry.name);

for (const fileName of files) {
  const input = path.join(SOURCE_DIR, fileName);
  const output = path.join(OUTPUT_DIR, `${path.parse(fileName).name}.jpg`);

  const [inputStat, outputStat] = await Promise.all([
    fs.stat(input),
    fs.stat(output).catch(() => null),
  ]);

  if (outputStat && outputStat.mtimeMs >= inputStat.mtimeMs) {
    continue;
  }

  await sharp(input, { limitInputPixels: false })
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#1a1512' })
    .jpeg({ quality: 84, mozjpeg: true, progressive: true })
    .toFile(output);

  const { size } = await fs.stat(output);
  console.log(`${fileName} (${(inputStat.size / 1e6).toFixed(1)}MB) -> web/${path.basename(output)} (${(size / 1e6).toFixed(2)}MB)`);
}

// Record each web photo's size so the masonry gallery can reserve space
// before images load (no layout jumps while scrolling).
const DIMENSIONS_FILE = path.join(process.cwd(), 'app', 'photography', 'components', 'photoDimensions.json');
const webFiles = (await fs.readdir(OUTPUT_DIR)).filter((name) => name.endsWith('.jpg')).sort();
const dimensions = {};

for (const fileName of webFiles) {
  const { width, height } = await sharp(path.join(OUTPUT_DIR, fileName)).metadata();
  dimensions[`/images/web/${fileName}`] = [width, height];
}

await fs.writeFile(DIMENSIONS_FILE, `${JSON.stringify(dimensions, null, 2)}\n`);
console.log(`Wrote ${webFiles.length} photo sizes to ${path.relative(process.cwd(), DIMENSIONS_FILE)}`);
