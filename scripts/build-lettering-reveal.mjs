import sharp from 'sharp';
import { letteringStrokes } from './lettering-strokes.mjs';

// Bake a time field, rather than use wide SVG masks that expose adjacent letters.
// Each original ink pixel belongs to exactly one traced pen route and timestamp.
const { data, info } = await sharp('public/images/wedding-lettering-text-calligraphy.webp').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const segments = letteringStrokes.map(word => {
  let distance = 0;
  const list = [];
  for (const stroke of word.strokes) {
    for (let i = 1; i < stroke.length; i++) {
      const [x, y] = stroke[i - 1], [ex, ey] = stroke[i];
      const dx = ex - x, dy = ey - y, length = Math.hypot(dx, dy);
      list.push({ x, y, dx, dy, length, distance });
      distance += length;
    }
    distance += 10; // A short lift between strokes.
  }
  return { ...word, list, length: distance };
});
const schedule = Buffer.alloc(info.width * info.height);
let ink = 0;
for (let y = 0; y < info.height; y++) for (let x = 0; x < info.width; x++) {
  const pixel = y * info.width + x, offset = pixel * 4;
  if (!data[offset + 3]) continue;
  const green = data[offset + 1] > data[offset];
  const word = segments[green ? (y < 280 ? 0 : 2) : (y < (x < 620 ? 340 : 318) ? 1 : 3)];
  let nearest = Infinity, position = 0;
  for (const s of word.list) {
    const t = Math.max(0, Math.min(1, ((x - s.x) * s.dx + (y - s.y) * s.dy) / (s.length * s.length)));
    const distance = (x - s.x - t * s.dx) ** 2 + (y - s.y - t * s.dy) ** 2;
    if (distance < nearest) { nearest = distance; position = s.distance + t * s.length; }
  }
  schedule[pixel] = Math.max(1, Math.min(255, Math.round((word.start + word.duration * position / word.length) / 2800 * 255)));
  ink++;
}
await sharp(schedule, { raw: { width: info.width, height: info.height, channels: 1 } }).png().toFile('public/images/wedding-lettering-reveal.png');
console.log(`Scheduled ${ink} ink pixels along ${segments.reduce((n, w) => n + w.strokes.length, 0)} pen strokes; original artwork unchanged.`);
