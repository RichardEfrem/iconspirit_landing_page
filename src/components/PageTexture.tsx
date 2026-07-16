/**
 * Site-wide subtle texture: a fixed, full-viewport procedural grain (inline SVG
 * noise, stretched into faint horizontal streaks reminiscent of wood grain).
 * Rendered once in the root layout so it stays consistent across every section
 * — cream, sand, and dark — as the page scrolls. Pure CSS/SVG, no image request,
 * so it costs nothing on load time. Purely decorative and non-interactive.
 */
export default function PageTexture() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-20 h-full w-full opacity-[0.045] mix-blend-soft-light"
    >
      <filter id="page-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.012 0.35"
          numOctaves={3}
          seed={7}
          stitchTiles="stitch"
          result="noise"
        />
        <feColorMatrix
          in="noise"
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.9 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#page-grain)" />
    </svg>
  );
}
