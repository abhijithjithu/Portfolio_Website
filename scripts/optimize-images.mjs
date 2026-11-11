/**
 * Turns the full-size originals in assets-src/ into the responsive WebP
 * files the site actually serves, and records their dimensions.
 *
 *   npm run images
 *
 * Run it after adding or replacing a file in assets-src/. The outputs in
 * public/assets/ and src/lib/images.json are committed, so the Vercel build
 * never needs sharp.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = path.join(root, 'assets-src');
const outDir = path.join(root, 'public', 'assets');
const manifestPath = path.join(root, 'src', 'lib', 'images.json');

/** Candidate widths; anything wider than the original is skipped. */
const WIDTHS = [480, 800, 1200, 1800];
const QUALITY = 80;

const files = (await readdir(srcDir)).filter((f) => /\.(png|jpe?g)$/i.test(f)).sort();
await mkdir(outDir, { recursive: true });

const manifest = {};

for (const file of files) {
  const input = path.join(srcDir, file);
  const name = file.replace(/\.[^.]+$/, '');
  // .rotate() bakes in EXIF orientation so the recorded size matches what renders.
  const { width, height } = await sharp(input).rotate().metadata().then(async (m) => {
    const swap = (m.orientation ?? 1) >= 5;
    return { width: swap ? m.height : m.width, height: swap ? m.width : m.height };
  });

  const widths = WIDTHS.filter((w) => w < width);
  // Keep the original width as the top rung unless it is absurdly large.
  if (width <= WIDTHS.at(-1)) widths.push(width);

  for (const w of widths) {
    await sharp(input)
      .rotate()
      .resize({ width: w })
      .webp({ quality: QUALITY })
      .toFile(path.join(outDir, `${name}-${w}.webp`));
  }

  // Keyed by the path data.js already uses, so content never changes.
  manifest[`/assets/${file}`] = { name, width, height, widths };
  console.log(`${file}  ${width}x${height}  ->  ${widths.join(', ')}`);
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`\nWrote ${path.relative(root, manifestPath)}`);
