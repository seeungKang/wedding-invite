import { existsSync, readdirSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const DIST_DIR = join(process.cwd(), "dist");
const JS_DIR = join(DIST_DIR, "assets");

const MAX_DIST_BYTES = 2 * 1024 * 1024;
const MAX_JS_TOTAL_BYTES = 350 * 1024;
const MAX_IMAGE_BYTES = 250 * 1024;

const imageExtensions = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function formatBytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

function readFilesRecursively(rootDir) {
  if (!existsSync(rootDir)) {
    return [];
  }

  const entries = readdirSync(rootDir);
  const files = [];

  for (const entry of entries) {
    const fullPath = join(rootDir, entry);
    const entryStats = statSync(fullPath);

    if (entryStats.isDirectory()) {
      files.push(...readFilesRecursively(fullPath));
      continue;
    }

    files.push({ path: fullPath, size: entryStats.size });
  }

  return files;
}

const distFiles = readFilesRecursively(DIST_DIR);
const totalDistBytes = distFiles.reduce((sum, file) => sum + file.size, 0);

const jsFiles = readFilesRecursively(JS_DIR).filter(
  (file) => extname(file.path) === ".js",
);
const totalJsBytes = jsFiles.reduce((sum, file) => sum + file.size, 0);

const imageFiles = distFiles.filter((file) => imageExtensions.has(extname(file.path)));
const oversizedImages = imageFiles.filter((file) => file.size > MAX_IMAGE_BYTES);

const violations = [];

if (totalDistBytes > MAX_DIST_BYTES) {
  violations.push(
    `dist total size exceeds limit: ${formatBytes(totalDistBytes)} > ${formatBytes(MAX_DIST_BYTES)}`,
  );
}

if (totalJsBytes > MAX_JS_TOTAL_BYTES) {
  violations.push(
    `JavaScript total size exceeds limit: ${formatBytes(totalJsBytes)} > ${formatBytes(MAX_JS_TOTAL_BYTES)}`,
  );
}

if (oversizedImages.length > 0) {
  for (const image of oversizedImages) {
    violations.push(
      `Image exceeds per-file limit: ${image.path} (${formatBytes(image.size)} > ${formatBytes(MAX_IMAGE_BYTES)})`,
    );
  }
}

console.log(`dist total: ${formatBytes(totalDistBytes)}`);
console.log(`js total: ${formatBytes(totalJsBytes)}`);
console.log(`image files: ${imageFiles.length}`);

if (violations.length > 0) {
  console.error("Bundle size check failed:");
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log("Bundle size check passed.");
