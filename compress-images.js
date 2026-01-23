import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

const files = fs.readdirSync(publicDir).filter(file => /\.(jpg|jpeg|png)$/i.test(file));

console.log(`Found ${files.length} images to compress...`);

for (const file of files) {
  const inputPath = path.join(publicDir, file);
  const tempPath = path.join(publicDir, `temp_${file}`);
  const stats = fs.statSync(inputPath);
  const originalSize = (stats.size / 1024 / 1024).toFixed(2);

  try {
    await sharp(inputPath)
      .resize(800, 800, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 75, progressive: true })
      .toFile(tempPath);

    fs.unlinkSync(inputPath);
    fs.renameSync(tempPath, inputPath);

    const newStats = fs.statSync(inputPath);
    const newSize = (newStats.size / 1024 / 1024).toFixed(2);
    const reduction = (((stats.size - newStats.size) / stats.size) * 100).toFixed(1);

    console.log(`✓ ${file}: ${originalSize}MB → ${newSize}MB (${reduction}% reduction)`);
  } catch (error) {
    console.error(`✗ Error processing ${file}:`, error.message);
  }
}
