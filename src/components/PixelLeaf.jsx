// 7x9 bitmap leaf sprite, rendered as crisp SVG rects — an 8-bit take on the
// brand's plant motif for the loading screen. Flip the 1s below to redesign.
const LEAF_BITMAP = [
  [0, 0, 1, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 1, 1, 1, 0],
  [0, 0, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
]

export default function PixelLeaf({ size = 16, color = 'var(--color-voice-gold)', className = '' }) {
  return (
    <svg
      width={size}
      height={size * (9 / 7)}
      viewBox="0 0 7 9"
      shapeRendering="crispEdges"
      className={className}
    >
      {LEAF_BITMAP.map((row, y) =>
        row.map((cell, x) =>
          cell ? <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={color} /> : null,
        ),
      )}
    </svg>
  )
}
