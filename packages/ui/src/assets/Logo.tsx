export const LogoFull = ({ className }: { className?: string }) => (
  <div className="font-serif text-xl text-amber-500">
    <svg height="23" viewBox="0 0 130 23" width="130" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11.5" cy="11.5" fill="none" r="10.5" stroke="teal" stroke-width="1.5" />

      <polygon fill="lime" points="11.5,2 8,11.5 13,11.5 9.5,20 14.5,11.5 11.5,11.5" />

      <filter id="glow">
        <feGaussianBlur result="coloredBlur" stdDeviation="0.5" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      <circle
        cx="11.5"
        cy="11.5"
        fill="none"
        filter="url(#glow)"
        r="10.5"
        stroke="teal"
        stroke-width="1.5"
      />
      <polygon
        fill="lime"
        filter="url(#glow)"
        points="11.5,2 8,11.5 13,11.5 9.5,20 14.5,11.5 11.5,11.5"
      />
      <text fill="white" font-family="Arial, sans-serif" font-size="14" x="25" y="15">
        Autofiller
      </text>
    </svg>
  </div>
)
