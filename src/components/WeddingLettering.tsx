import { useEffect, useRef, useState } from "react";

type InkDrawing = {
  pixels: Uint32Array;
  order: Uint32Array[];
};

export default function WeddingLettering({ animate = true }: { animate?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawingRef = useRef<InkDrawing | null>(null);
  const [loadedLayers, setLoadedLayers] = useState(0);
  const [fallback, setFallback] = useState(false);
  const ready = loadedLayers === 7;
  const base = `${import.meta.env.BASE_URL}images/`;

  useEffect(() => {
    let cancelled = false;
    const artwork = new Image();
    const schedule = new Image();
    artwork.src = `${base}wedding-lettering-text-calligraphy.webp`;
    schedule.src = `${base}wedding-lettering-reveal.png`;

    void Promise.all([artwork.decode(), schedule.decode()]).then(() => {
      if (cancelled) {return;}
      const scratch = document.createElement("canvas");
      scratch.width = 1200;
      scratch.height = 500;
      const context = scratch.getContext("2d", { willReadFrequently: true });
      if (!context) {throw new Error("Canvas unavailable");}
      context.drawImage(artwork, 0, 0);
      const pixels = new Uint32Array(context.getImageData(0, 0, 1200, 500).data.buffer);
      context.clearRect(0, 0, 1200, 500);
      context.drawImage(schedule, 0, 0);
      const times = context.getImageData(0, 0, 1200, 500).data;
      const buckets: number[][] = Array.from({ length: 256 }, () => []);
      for (let i = 0; i < pixels.length; i++) {
        const pixel = pixels[i] ?? 0;
        if (pixel >>> 24) {
          buckets[times[i * 4] ?? 0]?.push(i);
        }
      }
      drawingRef.current = { pixels, order: buckets.map(bucket => Uint32Array.from(bucket)) };
      setLoadedLayers(loaded => loaded | 1);
    }).catch(() => {
      if (!cancelled) {
        setFallback(true);
        setLoadedLayers(loaded => loaded | 1);
      }
    });
    return () => { cancelled = true; };
  }, [base]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    const drawing = drawingRef.current;
    if (!canvas || !context || !drawing || !ready || !animate) {return;}
    const frame = context.createImageData(1200, 500);
    const output = new Uint32Array(frame.data.buffer);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let animationFrame = 0;
    let startedAt: number | undefined;
    let nextBucket = 0;

    const paint = (now: number) => {
      startedAt ??= now;
      const elapsed = reducedMotion ? 2800 : Math.min(now - startedAt, 2800);
      const bucket = Math.min(255, Math.floor(elapsed / 2800 * 255));
      // Write each original pixel once. Adjacent letters cannot leak through
      // a broad stroke mask, and there is no final full-image fill or fade.
      while (nextBucket <= bucket) {
        for (const pixel of drawing.order[nextBucket] ?? []) {
          output[pixel] = drawing.pixels[pixel] ?? 0;
        }
        nextBucket++;
      }
      context.putImageData(frame, 0, 0);
      canvas.dataset.inkProgress = String(Math.round(elapsed));
      if (elapsed < 2800) {animationFrame = requestAnimationFrame(paint);}
    };
    animationFrame = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(animationFrame);
  }, [ready, animate]);

  return (
    <h1 className={`wedding-lettering wedding-lettering--poster${ready ? " lettering-ready" : ""}`}>
      <span className="sr-only">Merry Christmas? Oops, we mean Marry!</span>
      <canvas ref={canvasRef} className="poster-ink-canvas" width="1200" height="500" aria-hidden="true" />
      {fallback ? <img className="poster-ink-fallback" src={`${base}wedding-lettering-text-calligraphy.webp`} alt="" /> : null}
      <svg viewBox="0 0 1200 500" aria-hidden="true">
        <image className="poster-underline-layer" data-lettering-layer="underlines"
          href={`${base}wedding-lettering-underlines.svg`} width="1200" height="500"
          onLoad={() => setLoadedLayers(loaded => loaded | 2)}
          onError={() => setLoadedLayers(loaded => loaded | 2)} />
        <image className="poster-decoration-layer" data-lettering-layer="illustrations"
          href={`${base}wedding-lettering-illustrations-v2.svg`} width="1200" height="500"
          onLoad={() => setLoadedLayers(loaded => loaded | 4)}
          onError={() => setLoadedLayers(loaded => loaded | 4)} />
      </svg>
    </h1>
  );
}
