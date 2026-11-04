import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const GuitarsLogo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const dimensions = {
    sm: { w: 42, h: 42, text: 'text-sm' },
    md: { w: 52, h: 52, text: 'text-lg' },
    lg: { w: 72, h: 72, text: 'text-2xl' },
  }[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Emblem SVG: Dual crossed guitars with circular brass rim and stars */}
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:rotate-3"
      >
        <circle cx="50" cy="50" r="47" stroke="#B08B50" strokeWidth="2.5" strokeDasharray="3 2" />
        <circle cx="50" cy="50" r="44" stroke="#9C2529" strokeWidth="2" fill="#151515" />
        <circle cx="50" cy="50" r="40" stroke="#493225" strokeWidth="1" />

        {/* Vintage Stars */}
        <polygon points="50,14 52,19 57,19 53,22 55,27 50,24 45,27 47,22 43,19 48,19" fill="#B08B50" />
        <polygon points="26,26 27,30 31,30 28,32 29,36 26,34 23,36 24,32 21,30 25,30" fill="#B08B50" />
        <polygon points="74,26 75,30 79,30 76,32 77,36 74,34 71,36 72,32 69,30 73,30" fill="#B08B50" />

        {/* Left Crossed Guitar (Electric) */}
        <g transform="translate(50,50) rotate(-42) translate(-50,-50)">
          {/* Headstock & Neck */}
          <line x1="50" y1="18" x2="50" y2="60" stroke="#F1E7D5" strokeWidth="2.5" />
          <polygon points="46,16 54,16 52,22 48,22" fill="#B08B50" />
          {/* Guitar Body */}
          <path
            d="M44,60 C40,64 38,72 43,80 C47,86 53,86 57,80 C62,72 60,64 56,60 Z"
            fill="#9C2529"
            stroke="#B08B50"
            strokeWidth="1.5"
          />
          <circle cx="50" cy="70" r="3" fill="#151515" />
        </g>

        {/* Right Crossed Guitar (Acoustic) */}
        <g transform="translate(50,50) rotate(42) translate(-50,-50)">
          {/* Headstock & Neck */}
          <line x1="50" y1="18" x2="50" y2="60" stroke="#F1E7D5" strokeWidth="2.5" />
          <polygon points="46,16 54,16 52,22 48,22" fill="#B08B50" />
          {/* Guitar Body */}
          <path
            d="M43,58 C37,64 36,73 42,82 C46,88 54,88 58,82 C64,73 63,64 57,58 Z"
            fill="#B08B50"
            stroke="#F1E7D5"
            strokeWidth="1.2"
          />
          <circle cx="50" cy="70" r="3.5" fill="#151515" />
        </g>

        {/* Center Rock N' Country Banner Badge */}
        <rect x="20" y="44" width="60" height="15" rx="3" fill="#151515" stroke="#B08B50" strokeWidth="1.5" />
        <text
          x="50"
          y="54"
          textAnchor="middle"
          fill="#F1E7D5"
          fontSize="7.5"
          fontFamily="Oswald, sans-serif"
          fontWeight="bold"
          letterSpacing="0.8"
        >
          ROCK N' COUNTRY
        </text>

        {/* Joplin MO Arch */}
        <path id="bottomArch" d="M 28 78 A 36 36 0 0 0 72 78" fill="none" />
        <text fill="#B08B50" fontSize="5.5" fontWeight="bold" letterSpacing="1">
          <textPath href="#bottomArch" startOffset="50%" textAnchor="middle">
            JOPLIN, MISSOURI
          </textPath>
        </text>
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className="font-display text-xl sm:text-2xl font-bold tracking-wider text-[#F1E7D5] leading-none">
          GUITARS
        </span>
        <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#B08B50] uppercase mt-0.5">
          Rock N' Country Bar
        </span>
      </div>
    </div>
  );
};
