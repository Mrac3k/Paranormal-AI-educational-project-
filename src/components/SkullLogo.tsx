export function SkullLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="skullGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#skullGlow)">
        {/* Cranium */}
        <path
          d="M100 20 C55 20 25 60 25 105 C25 135 40 160 60 175 L60 195 C60 205 70 215 85 215 L115 215 C130 215 140 205 140 195 L140 175 C160 160 175 135 175 105 C175 60 145 20 100 20 Z"
          fill="#1a0505"
          stroke="#ff1a1a"
          strokeWidth="2"
        />
        {/* Eye sockets */}
        <ellipse cx="70" cy="110" rx="22" ry="26" fill="#000" stroke="#ff1a1a" strokeWidth="1.5" />
        <ellipse cx="130" cy="110" rx="22" ry="26" fill="#000" stroke="#ff1a1a" strokeWidth="1.5" />
        {/* Nose cavity */}
        <path
          d="M100 135 L90 165 L110 165 Z"
          fill="#000"
          stroke="#ff1a1a"
          strokeWidth="1"
        />
        {/* Teeth */}
        <rect x="75" y="185" width="8" height="18" rx="1" fill="#000" stroke="#ff1a1a" strokeWidth="0.8" />
        <rect x="88" y="185" width="8" height="20" rx="1" fill="#000" stroke="#ff1a1a" strokeWidth="0.8" />
        <rect x="104" y="185" width="8" height="20" rx="1" fill="#000" stroke="#ff1a1a" strokeWidth="0.8" />
        <rect x="117" y="185" width="8" height="18" rx="1" fill="#000" stroke="#ff1a1a" strokeWidth="0.8" />
        {/* Cracks */}
        <path d="M100 20 L95 50 L105 60 L100 80" fill="none" stroke="#ff1a1a" strokeWidth="1" opacity="0.6" />
        <path d="M170 90 L150 105 L155 125" fill="none" stroke="#ff1a1a" strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
}
