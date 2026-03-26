import './HuskySprite.scss';

// ── Palette ───────────────────────────────────────────────────
const _ = '';
const K = '#1a2830'; // near-black outline
const D = '#2e4555'; // dark charcoal
const G = '#4a6878'; // mid-dark gray
const M = '#7898a8'; // medium gray
const L = '#adc0ca'; // light gray
const W = '#e8e4d8'; // white / cream

// ── Sprite grid (22 × 26) ─────────────────────────────────────
// Traced from reference image — sitting husky, facing forward.
// Each row is an array of colour tokens read left-to-right.

const SPRITE: string[][] = [
  /* 0  */ [_,_,_,D,D,_,_,_,_,_,_,_,_,_,_,D,D,_,_,_,_,_],
  /* 1  */ [_,_,D,G,D,D,_,_,_,_,_,_,_,D,D,G,D,_,_,_,_,_],
  /* 2  */ [_,D,D,G,G,D,D,_,_,_,_,_,D,D,G,G,D,D,_,_,_,_],
  /* 3  */ [_,D,K,G,G,G,D,D,_,_,_,D,D,G,G,G,K,D,_,_,_,_],
  /* 4  */ [D,K,K,G,M,G,K,K,D,_,D,K,K,G,M,G,K,K,D,_,_,_],
  /* 5  */ [K,K,K,G,G,G,G,K,K,K,K,K,G,G,G,G,K,K,K,_,_,_],
  /* 6  */ [K,K,G,G,M,M,G,G,K,K,K,G,G,M,M,G,G,K,K,_,_,_],
  /* 7  */ [_,K,G,M,W,W,M,G,K,K,K,G,M,W,W,M,G,K,_,_,_,_],
  /* 8  */ [_,K,M,W,W,W,W,M,G,K,G,M,W,W,W,W,M,K,_,_,_,_],
  /* 9  */ [_,K,M,W,K,K,W,M,G,K,G,M,W,K,K,W,M,K,_,_,_,_],  // eyes
  /* 10 */ [_,K,M,W,K,K,W,G,D,K,D,G,W,K,K,W,M,K,_,_,_,_],  // eyes
  /* 11 */ [_,K,G,M,W,W,M,D,D,D,D,D,M,W,W,M,G,K,_,_,_,_],
  /* 12 */ [_,K,G,M,W,W,M,D,K,K,K,D,M,W,W,M,G,K,_,_,_,_],  // nose
  /* 13 */ [_,_,K,G,M,W,W,M,D,K,D,M,W,W,M,G,K,_,_,_,_,_],
  /* 14 */ [_,_,K,G,M,W,W,W,M,M,M,W,W,W,M,G,K,_,_,_,_,_],
  /* 15 */ [_,_,K,K,G,M,W,W,W,W,W,W,W,M,G,K,K,_,_,_,_,_],
  /* 16 */ [_,K,K,G,G,M,W,W,W,W,W,W,W,M,G,G,K,K,_,_,_,_],
  /* 17 */ [K,K,D,G,M,M,W,W,W,W,W,W,W,M,M,G,D,K,K,_,_,_],
  /* 18 */ [K,D,D,G,M,W,W,W,W,W,W,W,W,W,M,G,D,D,K,_,_,_],
  /* 19 */ [K,D,G,G,M,W,W,W,W,W,W,W,W,W,M,G,G,D,K,_,_,_],
  /* 20 */ [K,D,G,M,M,W,W,W,W,W,W,W,W,W,M,M,G,D,K,_,_,_],
  /* 21 */ [K,D,G,M,W,W,W,W,W,W,W,W,W,W,W,M,G,D,K,_,_,_],
  /* 22 */ [K,D,G,M,M,W,W,W,W,W,W,W,W,W,M,M,G,D,K,_,_,_],
  /* 23 */ [K,D,D,G,G,M,M,M,M,M,M,M,M,M,G,G,D,D,K,_,_,_],
  /* 24 */ [_,K,D,D,D,D,D,D,D,D,D,D,D,D,D,D,D,K,_,_,_,_],  // paws
  /* 25 */ [_,_,K,K,K,D,D,D,D,D,D,D,D,K,K,K,_,_,_,_,_,_],
];

// ── Component ─────────────────────────────────────────────────

interface HuskySpriteProps {
  /** Size of one "pixel" in real px. Default: 6 */
  pixelSize?: number;
  /** Extra class for animation etc. */
  className?: string;
}

export default function HuskySprite({ pixelSize = 6, className = '' }: HuskySpriteProps) {
  const px = pixelSize;

  const shadow = SPRITE
    .flatMap((row, y) =>
      row.map((color, x) =>
        color ? `${x * px}px ${y * px}px 0 0 ${color}` : null
      )
    )
    .filter(Boolean)
    .join(', ');

  const cols = SPRITE[0].length;
  const rows = SPRITE.length;

  return (
    <div
      className={`husky-sprite ${className}`}
      style={{
        width:  cols * px,
        height: rows * px,
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width:  px,
          height: px,
          boxShadow: shadow,
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
}
