export const LogoFull = ({ className }: { className?: string }) => (
<div className="font-serif text-xl text-amber-500">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 23" width="130" height="23">
  <circle cx="11.5" cy="11.5" r="10.5" fill="none" stroke="teal" stroke-width="1.5"/>

  <polygon points="11.5,2 8,11.5 13,11.5 9.5,20 14.5,11.5 11.5,11.5" fill="lime" />

  <filter id="glow">
    <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
    <feMerge>
      <feMergeNode in="coloredBlur"/>
      <feMergeNode in="SourceGraphic"/>
    </feMerge>
  </filter>
  <circle cx="11.5" cy="11.5" r="10.5" fill="none" stroke="teal" stroke-width="1.5" filter="url(#glow)"/>
  <polygon points="11.5,2 8,11.5 13,11.5 9.5,20 14.5,11.5 11.5,11.5" fill="lime" filter="url(#glow)"/>
  <text x="25" y="15" font-family="Arial, sans-serif" font-size="14" fill="white">
    Pagetracker
  </text>
</svg>
</div>
)
