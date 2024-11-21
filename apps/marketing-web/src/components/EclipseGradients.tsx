export const BluePurpleEclipseGradient = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      fill="none"
      height="1220"
      viewBox="0 0 1152 1220"
      width="1152"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_f_32_150)">
        <circle cx="551" cy="610" fill="url(#paint0_linear_32_150)" r="410" />
      </g>
      <defs>
        <filter
          color-interpolation-filters="sRGB"
          filterUnits="userSpaceOnUse"
          height="1220"
          id="filter0_f_32_150"
          width="1220"
          x="-59"
          y="0"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
          <feGaussianBlur result="effect1_foregroundBlur_32_150" stdDeviation="100" />
        </filter>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="paint0_linear_32_150"
          x1="551"
          x2="551"
          y1="200"
          y2="1020"
        >
          <stop stop-color="#00C2FF" stop-opacity="0" />
          <stop offset="1" stop-color="#FF29C3" />
        </linearGradient>
      </defs>
    </svg>
  )
}
