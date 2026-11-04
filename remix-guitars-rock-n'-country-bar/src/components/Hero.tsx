import React, { useState } from 'react';
import { ArrowDown, MapPin, Calendar, Volume2 } from 'lucide-react';
import { FALLBACK_IMAGES, handleImageError } from '../utils/imageUrl';

interface HeroProps {
  onOpenJukebox?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenJukebox }) => {
  const [pluckedString, setPluckedString] = useState<number | null>(null);

  const handleStringPluck = (index: number) => {
    setPluckedString(index);
    setTimeout(() => setPluckedString(null), 600);
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={FALLBACK_IMAGES.hero}
          alt="Guitars Rock N' Country Bar exterior in Joplin Missouri at twilight"
          onError={(e) => handleImageError(e, FALLBACK_IMAGES.hero)}
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim & Vignette: darkens sides and base for 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-[#151515]/65 to-[#151515]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#151515]/40 to-[#151515]/85" />
      </div>

      {/* Subtle Interactive Guitar String Fretboard Lines Overlay */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none opacity-25 hidden md:block">
        <div className="max-w-6xl mx-auto px-8 space-y-4">
          {[1, 2, 3, 4, 5, 6].map((stringNum, idx) => (
            <div
              key={stringNum}
              onClick={() => handleStringPluck(idx)}
              className={`h-[1px] w-full transition-all duration-300 pointer-events-auto cursor-pointer ${
                pluckedString === idx
                  ? 'bg-[#B08B50] scale-y-150 shadow-[0_0_8px_#B08B50]'
                  : 'bg-gradient-to-r from-transparent via-[#B08B50]/40 to-transparent hover:via-[#F1E7D5]/70'
              }`}
              style={{
                height: `${0.8 + idx * 0.3}px`,
              }}
              title="Click string to strum"
            />
          ))}
        </div>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 mb-4 px-3.5 py-1 bg-[#2A1C15]/80 border border-[#B08B50]/40 rounded-sm backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#9C2529]" />
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#B08B50] uppercase">
            JOPLIN, MISSOURI | ROCK N' COUNTRY
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#9C2529]" />
        </div>

        {/* Main Headline */}
        <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold uppercase tracking-wide text-[#F1E7D5] leading-[0.95] mb-6 drop-shadow-2xl">
          WHERE ROCK <br className="hidden sm:inline" />
          <span className="text-[#9C2529] inline-block neon-glow-red">MEETS COUNTRY.</span>
        </h1>

        {/* Supporting Copy */}
        <p className="max-w-2xl text-base sm:text-lg md:text-xl text-[#F1E7D5]/90 font-normal leading-relaxed mb-8 drop-shadow">
          Live music, country nights, line dancing, and unforgettable good times. Step inside and experience the energy of Guitars Rock N' Country Bar.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href="#events"
            className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] border border-[#9C2529] rounded-sm shadow-xl hover:shadow-[0_0_20px_rgba(156,37,41,0.5)] transition-all flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>SEE WHAT'S HAPPENING</span>
          </a>

          <a
            href="#visit"
            className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-display uppercase tracking-wider font-bold text-[#F1E7D5] hover:text-white bg-[#2A1C15]/90 hover:bg-[#493225] border border-[#B08B50]/50 hover:border-[#B08B50] rounded-sm shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <MapPin className="w-4 h-4 text-[#B08B50]" />
            <span>GET DIRECTIONS</span>
          </a>
        </div>

        {/* Quick Highlights Bar */}
        <div className="mt-12 pt-6 border-t border-[#493225]/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-center w-full max-w-4xl text-xs sm:text-sm">
          <div className="flex flex-col items-center">
            <span className="font-display text-lg sm:text-xl font-bold text-[#B08B50]">1800 W 7th St</span>
            <span className="text-[#F1E7D5]/70 text-xs">Joplin's Live Stage</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-lg sm:text-xl font-bold text-[#B08B50]">7 PM – 8 PM</span>
            <span className="text-[#F1E7D5]/70 text-xs">No Cover Happy Hour</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-lg sm:text-xl font-bold text-[#B08B50]">Huge Dance Floor</span>
            <span className="text-[#F1E7D5]/70 text-xs">Country & Line Dancing</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-display text-lg sm:text-xl font-bold text-[#B08B50]">Patio & Billiards</span>
            <span className="text-[#F1E7D5]/70 text-xs">8-Ball Tournaments</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#story"
          aria-label="Scroll to introduction"
          className="mt-8 text-[#B08B50] hover:text-[#F1E7D5] transition-colors animate-bounce p-2"
        >
          <ArrowDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};
