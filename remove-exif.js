import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, "public");
const files = fs
  .readdirSync(publicDir)
  .filter((file) => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`Removing EXIF metadata from ${files.length} images...`);

for (const file of files) {
  const inputPath = path.join(publicDir, file);
  const tempPath = path.join(publicDir, `temp_${file}`);

  try {
    await sharp(inputPath)
      .withMetadata(false) // EXIF 메타데이터만 제거
      .toFile(tempPath);

    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    console.log(`✓ ${file}: EXIF metadata removed`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
}

console.log("Done!");
