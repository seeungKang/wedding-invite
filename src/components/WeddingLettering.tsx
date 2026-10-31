import { useId, useState } from "react";

import type { CSSProperties } from "react";

const wordLayers = [
  { id: "merry", color: "green", region: "M0 0H1200V250H0Z", left: 230, width: 730, start: 0, duration: 0.65, swash: { left: 540, top: 150, width: 420, height: 100 } },
  { id: "christmas", color: "red", region: "M0 0H1200V318H620V340H0Z", left: 235, width: 915, start: 0.65, duration: 0.85, swash: null },
  { id: "oops", color: "green", region: "M0 300H1200V500H0Z", left: 90, width: 550, start: 1.5, duration: 0.55, swash: null },
  { id: "marry", color: "red", region: "M0 340H620V318H1200V500H0Z", left: 500, width: 650, start: 2.05, duration: 0.75, swash: { left: 900, top: 450, width: 200, height: 50 } },
];

export default function WeddingLettering() {
  const id = useId();
  const [loadedLayers, setLoadedLayers] = useState(0);
  const ready = loadedLayers === 63;
  const base = `${import.meta.env.BASE_URL}images/`;

  return (
    <h1 className={`wedding-lettering wedding-lettering--poster${ready ? " lettering-ready" : ""}`}>
      <span className="sr-only">Merry Christmas? Oops, we mean Marry!</span>
      <svg viewBox="0 0 1200 500" aria-hidden="true">
        <defs>
          {["green", "red"].map((color) => (
            <filter key={color} id={`${id}-${color}`} x="0" y="0" width="1200" height="500" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feColorMatrix in="SourceGraphic" type="matrix" values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  ${color === "green" ? "-1 1" : "1 -1"} 0 0 0`} result="color-selection" />
              <feComponentTransfer in="color-selection" result="color-mask"><feFuncA type="linear" slope="20" /></feComponentTransfer>
              <feComposite in="SourceGraphic" in2="color-mask" operator="in" />
            </filter>
          ))}
          {wordLayers.map((word) => (
            <g key={word.id}>
              <clipPath id={`${id}-${word.id}-clip`}><path d={word.region} /></clipPath>
              <mask id={`${id}-${word.id}-reveal`} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500" style={{ maskType: "luminance" }}>
                <rect
                  className="poster-word-reveal"
                  x={word.left} y="0" width={word.width} height="500" fill="white"
                  style={{ "--word-delay": `${word.start}s`, "--word-duration": `${word.duration}s` } as CSSProperties}
                />
                {word.swash !== null ? (
                  <>
                    <rect x={word.swash.left} y={word.swash.top} width={word.swash.width} height={word.swash.height} fill="black" />
                    <rect className="poster-swash-reveal" x={word.swash.left} y={word.swash.top} width={word.swash.width} height={word.swash.height} fill="white"
                      style={{ "--swash-delay": `${word.start + word.duration - 0.14}s` } as CSSProperties} />
                  </>
                ) : null}
              </mask>
            </g>
          ))}
        </defs>
        {wordLayers.map((word, index) => (
          <g key={word.id} className="poster-text-layer" data-lettering-layer={word.id} clipPath={`url(#${id}-${word.id}-clip)`}>
            <image
              href={`${base}wedding-lettering-text-calligraphy.webp`}
              width="1200" height="500"
              filter={`url(#${id}-${word.color})`}
              mask={`url(#${id}-${word.id}-reveal)`}
              onLoad={() => setLoadedLayers((loaded) => loaded | (1 << index))}
            />
          </g>
        ))}
        <image className="poster-underline-layer" data-lettering-layer="underlines"
          href={`${base}wedding-lettering-underlines.svg`} width="1200" height="500"
          onLoad={() => setLoadedLayers((loaded) => loaded | 16)} />
        <image className="poster-decoration-layer" data-lettering-layer="illustrations"
          href={`${base}wedding-lettering-illustrations-v2.svg`} width="1200" height="500"
          onLoad={() => setLoadedLayers((loaded) => loaded | 32)} />
      </svg>
    </h1>
  );
}
