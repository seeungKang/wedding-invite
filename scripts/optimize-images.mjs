import { existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join, parse } from "node:path";

import sharp from "sharp";

const ORIGINAL_DIR = join(process.cwd(), "assets", "original");
const FALLBACK_DIR = join(process.cwd(), "public");
const OUTPUT_DIR = join(process.cwd(), "public", "images");

const supportedExtensions = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function toKebabCase(fileName) {
  return fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function collectImageFiles(rootDir) {
  if (!existsSync(rootDir)) {
    return [];
  }

  const entries = readdirSync(rootDir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(rootDir, entry);
    const entryStats = statSync(fullPath);

    if (entryStats.isDirectory()) {
      continue;
    }

    const extension = parse(fullPath).ext.toLowerCase();
    if (supportedExtensions.has(extension)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function optimizeAll() {
  const originalFiles = collectImageFiles(ORIGINAL_DIR);
  const inputDir = originalFiles.length > 0 ? ORIGINAL_DIR : FALLBACK_DIR;
  const sourceFiles = inputDir === ORIGINAL_DIR ? originalFiles : collectImageFiles(FALLBACK_DIR);

  if (sourceFiles.length === 0) {
    console.warn("No source images were found.");
    return;
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const sourceFile of sourceFiles) {
    const parsed = parse(sourceFile);
    const outputName = `${toKebabCase(parsed.name)}.webp`;
    const outputPath = join(OUTPUT_DIR, outputName);

    await sharp(sourceFile)
      .rotate()
      .resize({ width: 1800, withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(outputPath);

    console.log(`optimized: ${outputPath}`);
  }
}

await optimizeAll();
