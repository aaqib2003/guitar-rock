import React from 'react';
import { Flame, Music2, Wine, Users } from 'lucide-react';
import { FALLBACK_IMAGES, handleImageError } from '../utils/imageUrl';

export const Introduction: React.FC = () => {
  return (
    <section id="story" className="relative py-20 bg-[#151515] border-y border-[#493225]/40 overflow-hidden">
      {/* Subtle background amplifier mesh & wood texture */}
      <div className="absolute inset-0 bg-amp-mesh opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Authentic Photography Stack */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border-2 border-[#493225] shadow-2xl bg-[#2A1C15] group">
              <img
                src={FALLBACK_IMAGES.interior}
                alt="Inside Guitars Rock N' Country Bar interior and bar counter"
                onError={(e) => handleImageError(e, FALLBACK_IMAGES.interior)}
                className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-[#151515]/85 border border-[#B08B50]/30 rounded-xs backdrop-blur-sm">
                <p className="text-xs font-display uppercase tracking-wider text-[#B08B50]">
                  ESTABLISHED IN JOPLIN, MO
                </p>
                <p className="text-xs text-[#F1E7D5]/80 font-medium">
                  The Crossroads of Rock Energy & Country Heart
                </p>
              </div>
            </div>

            {/* Overlapping small accent badge */}
            <div className="hidden sm:block absolute -bottom-5 -right-5 bg-[#9C2529] text-white p-4 rounded-xs border border-[#F1E7D5]/20 shadow-xl max-w-[200px]">
              <span className="font-display text-2xl font-bold block leading-none">100%</span>
              <span className="text-[11px] uppercase tracking-wider font-semibold opacity-90 mt-1 block">
                Pure American Roadhouse Spirit
              </span>
            </div>
          </div>

          {/* Right Column: Editorial Story Prose */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="h-[1px] w-8 bg-[#B08B50]" />
              <span className="text-xs font-bold tracking-[0.2em] text-[#B08B50] uppercase">
                THE GUITARS EXPERIENCE
              </span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5] leading-tight">
              A LITTLE ROCK. <br />
              A LOT OF COUNTRY. <br />
              <span className="text-[#9C2529]">ALL GOOD TIMES.</span>
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#F1E7D5]/80 leading-relaxed font-normal">
              <p>
                Guitars Rock N' Country Bar brings together the energy of rock music and the spirit of country nightlife. From live entertainment and line dancing to patio nights and a lively nightclub atmosphere, Guitars is a place to gather, enjoy the music, and make the most of your night.
              </p>
              <p>
                Whether you're stepping onto the dance floor, enjoying the music, or spending time with friends, there's always a reason to make Guitars part of your night out.
              </p>
            </div>

            {/* Key Pillars */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#493225]/60 text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <Flame className="w-4 h-4 text-[#9C2529] shrink-0" />
                <span className="font-medium text-[#F1E7D5]">Live Stage Energy</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Music2 className="w-4 h-4 text-[#B08B50] shrink-0" />
                <span className="font-medium text-[#F1E7D5]">Line Dance Floor</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Wine className="w-4 h-4 text-[#B08B50] shrink-0" />
                <span className="font-medium text-[#F1E7D5]">Full Bar & Patio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
