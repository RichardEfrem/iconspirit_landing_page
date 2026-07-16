import sharp from "sharp";
import { readdir, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Converts the full-resolution master photos in extracted_assets/ into
 * web-sized WebP files under public/images/. Re-run any time the masters change.
 */

// Raw full-resolution masters live OUTSIDE the app repo (sibling folder), so the
// 600+ MB of originals never bloat the project. Only optimized output lands in public/.
const SRC = "../iconspirit_source_assets/site_assets";
const OUT = "public/images";

// Map the scraped project folders -> URL-friendly slugs (see extracted_assets/site_assets/MANIFEST.md)
const PROJECT_FOLDERS = {
  Citraland: "citraland",
  Graha_Family: "graha-family",
  Lunesse: "lunesse",
  Mansion_Nine: "mansion-nine",
  Pakuwon: "pakuwon",
};

async function optimize(input, output, { width, quality = 78 }) {
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(input)
    .rotate() // respect EXIF orientation
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(output);
  return output;
}

async function run() {
  if (existsSync(OUT)) await rm(OUT, { recursive: true, force: true });

  // 1. Hero background
  await optimize(`${SRC}/img/background.jpg`, `${OUT}/hero.webp`, {
    width: 2200,
    quality: 72,
  });
  console.log("hero.webp");

  // 2. Project photos — max 1600px, numbered order preserved (01 = cover)
  for (const [folder, slug] of Object.entries(PROJECT_FOLDERS)) {
    const dir = `${SRC}/img/projects/${folder}`;
    const files = (await readdir(dir))
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort();
    for (const file of files) {
      const num = file.replace(/\.[^.]+$/, "");
      await optimize(`${dir}/${file}`, `${OUT}/projects/${slug}/${num}.webp`, {
        width: 1600,
      });
    }
    console.log(`${slug}: ${files.length} photos`);
  }

  console.log("Done.");
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
