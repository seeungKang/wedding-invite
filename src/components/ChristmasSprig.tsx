export default function ChristmasSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={`winter-sprig ${className}`} viewBox="0 0 200 76" fill="none" aria-hidden="true">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M98 53C69 49 38 37 17 19M102 53C131 49 162 37 183 19" />
        <path d="M33 31L26 9M33 31L12 29M46 39L41 14M46 39L22 40M60 45L56 23M60 45L37 49M74 49L73 29M74 49L53 56M87 52L88 35M87 52L72 61" />
        <path d="M167 31L174 9M167 31L188 29M154 39L159 14M154 39L178 40M140 45L144 23M140 45L163 49M126 49L127 29M126 49L147 56M113 52L112 35M113 52L128 61" />
        <path d="M23 23L17 10M40 35L31 18M54 42L47 23M68 48L64 30M177 23L183 10M160 35L169 18M146 42L153 23M132 48L136 30" opacity=".65" />
      </g>
      <g fill="var(--color-red)">
        <circle cx="45" cy="25" r="3.3" /><circle cx="51" cy="21" r="2.8" />
        <circle cx="155" cy="25" r="3.3" /><circle cx="149" cy="21" r="2.8" />
        <path d="M100 53C75 29 71 54 94 56L84 72L99 63L105 73L105 57C130 57 127 31 100 53Z" />
      </g>
      <path d="M100 7V19M94 13H106" stroke="var(--color-gold)" strokeWidth="1.2" />
    </svg>
  );
}
