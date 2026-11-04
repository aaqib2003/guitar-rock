import React from 'react';
import { SpecialItem } from '../data/types';
import { Clock, Trophy, ShieldCheck, Sparkles, Edit3 } from 'lucide-react';

interface SpecialsBannersProps {
  specials: SpecialItem[];
  onOpenAdmin?: () => void;
}

export const SpecialsBanners: React.FC<SpecialsBannersProps> = ({ specials, onOpenAdmin }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'special-happy-hour':
        return Clock;
      case 'special-pool-tournament':
        return Trophy;
      case 'special-no-cover-early':
        return Sparkles;
      case 'special-cowboy-military':
      default:
        return ShieldCheck;
    }
  };

  return (
    <section id="specials" className="py-24 bg-[#151515] relative border-y border-[#493225]/50 overflow-hidden">
      {/* Background textured wood planks gradient */}
      <div className="absolute inset-0 bg-wood-pattern opacity-20 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-[#9C2529]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#9C2529] uppercase">
                WEEKLY SPECIALS & PROMOTIONS
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5]">
              GOOD MUSIC. GREAT DRINKS. <br className="hidden sm:inline" />
              <span className="text-[#B08B50]">EVEN BETTER NIGHTS.</span>
            </h2>
          </div>

          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              type="button"
              className="inline-flex items-center gap-2 self-start sm:self-auto px-3.5 py-1.5 text-xs font-medium text-[#B08B50] hover:text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] hover:border-[#B08B50] rounded-xs transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Manager Edit Specials</span>
            </button>
          )}
        </div>

        {/* 4 Vintage Wooden / Brass Promotional Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {specials.filter(s => s.active).map((item, index) => {
            const Icon = getIcon(item.id);
            const isHighlight = item.id === 'special-cowboy-military' || item.id === 'special-pool-tournament';

            return (
              <div
                key={item.id}
                className={`relative flex flex-col justify-between p-6 rounded-xs transition-all duration-300 hover:-translate-y-1 ${
                  isHighlight
                    ? 'bg-gradient-to-b from-[#2E1E16] via-[#241711] to-[#1a110c] border-2 border-[#B08B50] shadow-xl'
                    : 'bg-[#1e1916] border border-[#493225] hover:border-[#B08B50]/60 shadow-lg'
                }`}
              >
                {/* Brass Corner Rivets Aesthetic */}
                <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-[#B08B50]/60" />
                <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B08B50]/60" />
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-[#B08B50]/60" />
                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-[#B08B50]/60" />

                <div>
                  {/* Top Bar with Number & Icon */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#493225]/60 mb-4">
                    <span className="font-display text-xs tracking-widest text-[#B08B50]">
                      OFFER 0{index + 1}
                    </span>
                    <div className="p-2 bg-[#151515] border border-[#493225] rounded-xs text-[#B08B50]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Timeframe */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#F1E7D5] leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-2 text-xs font-semibold tracking-wider uppercase text-[#9C2529]">
                    {item.timeframe}
                  </div>

                  {/* Detail */}
                  <p className="mt-3 text-xs sm:text-sm text-[#F1E7D5]/75 leading-relaxed">
                    {item.detail}
                  </p>
                </div>

                {/* Bottom Perk Badge */}
                <div className="mt-6 pt-4 border-t border-[#493225]/40">
                  <div className="p-2.5 bg-[#151515]/90 border border-[#B08B50]/40 rounded-xs text-center">
                    <span className="font-display text-sm font-bold uppercase tracking-wider text-[#F1E7D5] block">
                      {item.perk}
                    </span>
                  </div>
                  {item.subtext && (
                    <p className="mt-2 text-[11px] text-[#B08B50]/90 text-center italic">
                      {item.subtext}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Note for Venue Owner */}
        <div className="mt-10 text-center">
          <p className="text-xs text-[#F1E7D5]/50 tracking-wide">
            Note: All promotional offers and drink specials are subject to change. Confirm current daily specials with your server or bartender.
          </p>
        </div>
      </div>
    </section>
  );
};
