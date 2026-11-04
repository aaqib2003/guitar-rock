import React from 'react';
import { ArrowUpRight, Music, Beer, Sparkles, SunMoon } from 'lucide-react';
import { FALLBACK_IMAGES, handleImageError, normalizeImageUrl } from '../utils/imageUrl';

interface ExperienceCard {
  id: string;
  tag: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  icon: React.ElementType;
  accentColor: string;
  linkText: string;
  targetHref: string;
}

const EXPERIENCES: ExperienceCard[] = [
  {
    id: 'live-shows',
    tag: 'CONCERTS & BANDS',
    title: 'LIVE SHOWS',
    headline: 'Feel the Music.',
    description:
      'Experience the atmosphere of live entertainment and the unmistakable energy of rock and country music.',
    image: FALLBACK_IMAGES.liveStage,
    icon: Music,
    accentColor: '#9C2529',
    linkText: 'View Band Lineup',
    targetHref: '#events',
  },
  {
    id: 'country-nightlife',
    tag: 'THE ROADHOUSE VIBE',
    title: 'COUNTRY BAR & NIGHTLIFE',
    headline: 'Where the Night Comes Alive.',
    description:
      'A welcoming country nightlife destination where music, friends, and a lively atmosphere come together.',
    image: FALLBACK_IMAGES.interior,
    icon: Beer,
    accentColor: '#B08B50',
    linkText: 'Drink & Billiards Specials',
    targetHref: '#specials',
  },
  {
    id: 'line-dancing',
    tag: 'DANCE FLOOR',
    title: 'LINE DANCE LESSONS',
    headline: 'Find Your Rhythm.',
    description:
      'Get on the dance floor, learn the moves, and enjoy the spirit of country dancing.',
    image: FALLBACK_IMAGES.lineDance,
    icon: Sparkles,
    accentColor: '#CDB07B',
    linkText: 'Check Lesson Times',
    targetHref: '#events',
  },
  {
    id: 'patio-bar',
    tag: 'OPEN-AIR SOCIAL',
    title: 'PATIO BAR',
    headline: 'Take the Party Outside.',
    description:
      'Enjoy the relaxed atmosphere of the patio bar and make your night out even better.',
    image: FALLBACK_IMAGES.patio,
    icon: SunMoon,
    accentColor: '#B08B50',
    linkText: 'Plan a Patio Night',
    targetHref: '#reservations',
  },
];

export const Experiences: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-[#181615] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-wood-pattern opacity-10 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#B08B50]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B08B50] uppercase">
              DISTINCTIVE VENUE SPACES
            </span>
            <span className="h-[1px] w-8 bg-[#B08B50]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5]">
            FOUR ICONIC EXPERIENCES
          </h2>
          <p className="mt-4 text-[#F1E7D5]/70 text-base sm:text-lg">
            Whether you come for high-voltage stage guitars, stomping line dances, cold drafts on the patio, or tournament billiards.
          </p>
        </div>

        {/* 4 Cards Grid with Distinct Visual Treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXPERIENCES.map((exp) => {
            const Icon = exp.icon;
            return (
              <div
                key={exp.id}
                className="group relative flex flex-col bg-[#1c1816] rounded-xs border border-[#493225]/70 hover:border-[#B08B50] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                {/* Photo Carrier with Subtle Contrast Scrim */}
                <div className="relative h-60 w-full overflow-hidden bg-[#2A1C15]">
                  <img
                    src={normalizeImageUrl(exp.image, FALLBACK_IMAGES.liveStage)}
                    alt={exp.title}
                    onError={(e) => handleImageError(e, FALLBACK_IMAGES.liveStage)}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1c1816] via-[#1c1816]/30 to-transparent" />

                  {/* Corner Category Tag */}
                  <div className="absolute top-3 left-3 bg-[#151515]/90 border border-[#493225] px-2.5 py-1 text-[10px] font-semibold tracking-widest text-[#B08B50] uppercase backdrop-blur-sm">
                    {exp.tag}
                  </div>

                  {/* Floating Icon */}
                  <div className="absolute top-3 right-3 p-2 rounded-xs bg-[#151515]/80 text-[#F1E7D5] border border-[#493225] backdrop-blur-sm group-hover:text-[#B08B50] transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[#F1E7D5] group-hover:text-[#B08B50] transition-colors">
                      {exp.title}
                    </h3>
                    <h4 className="text-sm font-semibold text-[#9C2529] mt-1 font-display">
                      {exp.headline}
                    </h4>
                    <p className="mt-3 text-xs sm:text-sm text-[#F1E7D5]/75 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-3 border-t border-[#493225]/40 flex items-center justify-between">
                    <a
                      href={exp.targetHref}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#B08B50] group-hover:text-[#F1E7D5] transition-colors"
                    >
                      <span>{exp.linkText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
