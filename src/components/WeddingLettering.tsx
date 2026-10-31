import { useId, useState } from "react";

import type { CSSProperties } from "react";

// Pen routes follow the poster's calligraphy; the original artwork supplies every visible pixel.
const penRoutes = [
  { d: "M277 112 C250 61 361 3 401 48 C448 102 230 107 259 165 C306 231 453 53 490 26 L450 135 Q493 64 570 20 Q481 126 517 155", start: 0.25, duration: 0.95, width: 34 },
  { d: "M524 109 Q571 111 586 79 Q567 66 546 102 Q516 151 555 140 L587 115", start: 1.1, duration: 0.3, width: 32 },
  { d: "M582 118 L618 61 Q610 94 638 84 Q621 106 609 134 L646 110", start: 1.35, duration: 0.28, width: 32 },
  { d: "M636 113 L659 62 Q649 92 683 82 L658 128 L704 106", start: 1.6, duration: 0.28, width: 32 },
  { d: "M718 78 Q677 155 716 128 L764 70 Q736 137 716 162 C650 229 613 204 656 171 Q716 139 768 125 C950 -10 960 165 850 151 Q800 139 834 122 M846 157 Q881 181 916 164", start: 1.85, duration: 0.7, width: 31 },
  { d: "M448 211 C550 131 386 135 307 238 C213 370 385 349 477 230 M285 254 C196 252 197 329 253 318", start: 2.5, duration: 0.6, width: 40 },
  { d: "M451 281 Q497 203 558 168 Q587 147 552 182 L465 278 Q526 215 517 251 L501 281 L545 252", start: 3.05, duration: 0.32, width: 34 },
  { d: "M540 257 L552 219 Q554 241 578 238 L555 278 L595 251 M600 268 L627 232 Q598 290 634 271 M625 213 L630 213", start: 3.34, duration: 0.3, width: 34 },
  { d: "M641 267 Q689 254 662 221 Q663 260 642 283 Q683 292 701 263 M707 275 L754 188 Q698 235 700 274 L739 270 M681 222 L759 201", start: 3.6, duration: 0.35, width: 35 },
  { d: "M738 274 L774 237 L758 276 Q800 218 802 245 L792 274 Q842 216 831 252 Q811 296 848 268 M883 231 Q843 215 838 267 Q845 296 883 235 Q860 290 899 263 M911 226 Q877 264 892 279 Q924 288 945 254 M964 211 Q962 233 983 253 Q1000 281 964 299 Q927 317 938 293 L985 260", start: 3.9, duration: 0.65, width: 36 },
  { d: "M1017 161 C1043 96 1158 103 1113 163 Q1084 194 1041 212 L1025 234 M1025 263 L1026 267 M984 170 L1002 203 M1014 181 L1014 204 M1046 237 L1086 256", start: 4.52, duration: 0.35, width: 39 },
  { d: "M934 293 Q771 321 630 307 Q534 299 540 334", start: 4.85, duration: 0.22, width: 25 },
  { d: "M167 386 C245 286 278 357 203 431 C106 524 106 417 174 362 M220 408 Q244 377 251 385 Q263 396 234 426 Q219 447 220 421 M230 465 L282 374 Q258 421 274 425 Q300 421 316 391 M286 444 L333 374 Q313 418 342 411 M339 375 Q309 417 323 424 Q342 430 346 410 L330 386 M169 468 L365 390", start: 5.05, duration: 0.6, width: 24 },
  { d: "M375 426 L394 401 Q382 441 402 422 L416 400 Q407 437 424 420 M429 418 Q458 410 443 400 Q431 408 432 422 L463 416 M465 416 L482 398 L477 421 Q497 388 501 400 L494 418 Q522 383 519 404 L513 418 M521 408 Q544 408 542 393 Q525 388 524 416 L550 405 M563 394 Q549 386 548 407 Q548 426 565 395 Q553 419 576 405 M580 407 L592 385 L586 408 Q612 380 608 397 L604 405 L621 395", start: 5.6, duration: 0.5, width: 22 },
  { d: "M650 382 C602 330 790 313 774 350 C739 410 590 509 548 476 C509 442 650 410 685 408 M684 449 Q729 359 792 333 L733 438 Q800 333 850 336 Q810 360 784 409 Q762 455 801 445", start: 6.05, duration: 0.6, width: 38 },
  { d: "M851 400 Q821 384 808 423 Q799 463 831 436 L858 402 Q833 454 872 432 M870 427 L880 388 Q876 408 901 401 L882 439 L918 421 M918 422 L931 388 Q924 411 949 405 L933 440 L970 422 M974 396 Q939 460 979 434 L1015 394 Q1002 455 968 477 Q921 508 929 484 L998 449", start: 6.6, duration: 0.65, width: 35 },
  { d: "M1046 423 L1091 348 M1041 444 L1039 446 M664 481 Q834 445 1029 462 C1140 451 1116 509 1038 489 M359 460 Q487 424 647 425", start: 7.2, duration: 0.45, width: 28 },
  { d: "M192 261 L232 170 L266 236 L304 202 M884 350 L916 343 M963 367 L997 342 M699 449 L699 474 M1062 434 L1084 435", start: 7.6, duration: 0.3, width: 70 },
];

// Keep the artwork intact while timing its lettering, ornaments, and flourishes separately.
const textRoutes = penRoutes.filter((_, index) => ![11, 16, 17].includes(index));
const ornaments = [
  "M108 253 183 195 205 144 236 132 259 164 295 179 295 250 245 276 184 286Z",
  "M864 333 887 305 914 331 930 363 907 384 885 364Z",
  "M932 300 1022 290 1050 366 995 399 939 376Z",
  "M650 429 718 429 722 484 655 486Z",
  "M992 174 1075 168 1089 267 1005 278Z",
];
const flourishes = [
  { d: "M526 329 Q585 297 680 308 T928 303", width: 25 },
  { d: "M346 456 Q478 420 650 420", width: 19 },
  { d: "M656 482 Q851 449 1039 463 Q1113 463 1081 493", width: 23 },
];

export default function WeddingLettering() {
  const id = useId();
  const penId = `${id}-pen`;
  const textId = `${id}-text`;
  const ornamentId = `${id}-ornaments`;
  const flourishId = `${id}-flourishes`;
  const finishId = `${id}-finish`;
  const [ready, setReady] = useState(false);
  const src = `${import.meta.env.BASE_URL}images/christmas-wedding-lettering-flat.webp`;

  return (
    <h1 className={`wedding-lettering wedding-lettering--poster${ready ? " lettering-ready" : ""}`}>
      <span className="sr-only">Merry Christmas? Oops, we mean Marry!</span>
      <svg viewBox="0 0 1200 500" aria-hidden="true">
        <defs>
          <mask id={textId} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500">
            <rect width="1200" height="500" fill="white" />
            {ornaments.map((d) => <path key={d} d={d} fill="black" />)}
            {flourishes.map(({ d, width }) => <path key={d} d={d} fill="none" stroke="black" strokeWidth={width} strokeLinecap="round" />)}
          </mask>
          <mask id={ornamentId} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500">
            {ornaments.map((d) => <path key={d} d={d} fill="white" />)}
          </mask>
          <mask id={flourishId} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500">
            {flourishes.map(({ d, width }) => <path key={d} d={d} fill="none" stroke="white" strokeWidth={width} strokeLinecap="round" />)}
          </mask>
          <mask id={penId} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500" style={{ maskType: "luminance" }}>
            {textRoutes.map((route, index) => (
              <path
                key={index}
                className="poster-pen-stroke"
                d={route.d}
                pathLength="1"
                style={{ "--pen-delay": `${route.start * 0.37}s`, "--pen-duration": `${route.duration * 0.37}s`, strokeWidth: route.width } as CSSProperties}
              />
            ))}
            <path className="poster-pen-stroke" d="M1046 423 L1091 348 M1041 444 L1039 446" pathLength="1" style={{ "--pen-delay": "2.69s", "--pen-duration": "0.17s", strokeWidth: 28 } as CSSProperties} />
            <rect className="poster-pen-finish" width="1200" height="500" fill="white" />
          </mask>
          <mask id={finishId} maskUnits="userSpaceOnUse" x="0" y="0" width="1200" height="500" style={{ maskType: "luminance" }}>
            {flourishes.map(({ d, width }, index) => (
              <path key={d} className="poster-pen-stroke" d={d} pathLength="1" style={{ "--pen-delay": `${3.35 + index * 0.12}s`, "--pen-duration": "0.35s", strokeWidth: width } as CSSProperties} />
            ))}
            <rect className="poster-flourish-finish" width="1200" height="500" fill="white" />
          </mask>
        </defs>
        <g mask={`url(#${textId})`}>
          <image href={src} width="1200" height="500" mask={`url(#${penId})`} onLoad={() => setReady(true)} />
        </g>
        <image className="poster-ornament-layer" href={src} width="1200" height="500" mask={`url(#${ornamentId})`} />
        <g mask={`url(#${flourishId})`}>
          <image href={src} width="1200" height="500" mask={`url(#${finishId})`} />
        </g>
      </svg>
    </h1>
  );
}
