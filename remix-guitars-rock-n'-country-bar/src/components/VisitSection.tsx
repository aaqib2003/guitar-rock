import React from 'react';
import { MapPin, Phone, Clock, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { VenueHours } from '../data/types';
import { FALLBACK_IMAGES, handleImageError } from '../utils/imageUrl';

interface VisitSectionProps {
  hours?: VenueHours[];
  onOpenAdmin?: () => void;
}

export const DEFAULT_HOURS: VenueHours[] = [
  { day: 'Wednesday', hours: '6:00 PM – Midnight', note: 'Line Dance Boot Camp & Mixer' },
  { day: 'Thursday', hours: '6:00 PM – Midnight', note: '8-Ball Pool Tournament 8 PM' },
  { day: 'Friday', hours: '5:00 PM – 1:30 AM', note: 'Live Bands & Patio Acoustic' },
  { day: 'Saturday', hours: '6:00 PM – 1:30 AM', note: 'Country Dance Night & DJ Party' },
  { day: 'Sunday', hours: '6:00 PM – 11:00 PM', note: 'Sunday 8-Ball & Roadhouse Social' },
  { day: 'Monday – Tuesday', hours: 'Available for Private Bookings', note: 'Call (417) 782-6444' },
];

export const VisitSection: React.FC<VisitSectionProps> = ({ hours = DEFAULT_HOURS, onOpenAdmin }) => {
  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/dir/?api=1&destination=1800+W+7th+St,+Joplin,+MO+64801';
  const googleMapsViewUrl =
    'https://www.google.com/maps/search/?api=1&query=1800+W+7th+St,+Joplin,+MO+64801';

  return (
    <section id="visit" className="py-24 bg-[#151515] relative border-t border-[#493225]/60 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-wood-pattern opacity-15 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#9C2529]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#9C2529] uppercase">
              LOCATION & HOURS
            </span>
            <span className="h-[1px] w-8 bg-[#9C2529]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5]">
            YOUR NEXT NIGHT OUT STARTS HERE.
          </h2>
          <p className="mt-4 text-[#F1E7D5]/80 text-base sm:text-lg">
            Located conveniently on West 7th Street in Joplin. Easy parking, great company, and cold drinks await.
          </p>
        </div>

        {/* 2-Column Info & Maps Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Venue Details Card */}
          <div className="lg:col-span-5 bg-[#1c1816] border border-[#493225] rounded-xs p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="border-b border-[#493225]/60 pb-6 mb-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B08B50]">
                  ESTABLISHMENT DETAILS
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-[#F1E7D5] mt-1">
                  Guitars Rock N' Country Bar
                </h3>
                <p className="text-xs text-[#F1E7D5]/70 mt-1">
                  Joplin's Authentic Live Music Hall & Roadhouse
                </p>
              </div>

              {/* Address Block */}
              <div className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#2A1C15] border border-[#493225] text-[#B08B50] rounded-xs shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#B08B50]">
                      Street Address
                    </h4>
                    <p className="text-sm font-medium text-[#F1E7D5] mt-0.5">
                      1800 W 7th Street
                    </p>
                    <p className="text-xs text-[#F1E7D5]/70">
                      Joplin, MO 64801
                    </p>
                  </div>
                </div>

                {/* Phone Block */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 bg-[#2A1C15] border border-[#493225] text-[#9C2529] rounded-xs shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#B08B50]">
                      Phone / Reservations
                    </h4>
                    <a
                      href="tel:4177826444"
                      className="text-base font-bold text-[#F1E7D5] hover:text-[#9C2529] transition-colors mt-0.5 block"
                    >
                      (417) 782-6444
                    </a>
                    <p className="text-xs text-[#F1E7D5]/60">
                      Click to call directly on mobile
                    </p>
                  </div>
                </div>

                {/* Operating Hours Table */}
                <div className="pt-4 border-t border-[#493225]/40">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B08B50]">
                      <Clock className="w-4 h-4" />
                      <span>Weekly Operating Schedule</span>
                    </div>
                    {onOpenAdmin && (
                      <button
                        onClick={onOpenAdmin}
                        type="button"
                        className="text-[10px] text-[#B08B50] hover:text-white underline"
                      >
                        Edit Hours
                      </button>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    {hours.map((h, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-1 border-b border-[#2A1C15] text-[#F1E7D5]/80"
                      >
                        <span className="font-medium text-[#F1E7D5]">{h.day}</span>
                        <div className="text-right">
                          <span className="font-semibold text-[#B08B50]">{h.hours}</span>
                          {h.note && (
                            <span className="block text-[10px] text-[#F1E7D5]/50">
                              {h.note}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#493225] flex flex-col sm:flex-row gap-3">
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 text-center text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href="tel:4177826444"
                className="flex-1 py-3 text-center text-xs font-display uppercase tracking-wider font-bold text-[#F1E7D5] bg-[#2A1C15] hover:bg-[#493225] border border-[#B08B50]/40 rounded-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B08B50]" />
                <span>Call Now</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps & Venue Exterior Photo */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Interactive Map Embed */}
            <div className="relative h-80 sm:h-96 w-full rounded-xs overflow-hidden border border-[#493225] shadow-xl bg-[#2A1C15]">
              <iframe
                title="Guitars Rock N' Country Bar Google Maps Location"
                src="https://maps.google.com/maps?q=1800+W+7th+St,+Joplin,+MO+64801&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter invert contrast-125 hue-rotate-180 opacity-90"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Overlay Badge */}
              <div className="absolute top-4 left-4 p-3 bg-[#151515]/95 border border-[#B08B50]/60 rounded-xs shadow-lg backdrop-blur-sm pointer-events-none">
                <p className="text-xs font-display font-bold uppercase text-[#F1E7D5]">
                  GUITARS ROCK N' COUNTRY
                </p>
                <p className="text-[11px] text-[#B08B50]">
                  1800 W 7th St, Joplin, MO 64801
                </p>
              </div>

              <a
                href={googleMapsViewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 px-3 py-1.5 bg-[#151515]/90 hover:bg-[#2A1C15] border border-[#B08B50]/60 rounded-xs text-[11px] font-semibold text-[#F1E7D5] flex items-center gap-1.5 shadow-md transition-colors"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#B08B50]" />
              </a>
            </div>

            {/* Venue Exterior Showcase Banner */}
            <div className="relative h-44 rounded-xs overflow-hidden border border-[#493225] group">
              <img
                src={FALLBACK_IMAGES.hero}
                alt="Guitars Rock N' Country Bar lighted sign and venue exterior"
                onError={(e) => handleImageError(e, FALLBACK_IMAGES.hero)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#151515] via-[#151515]/60 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-center max-w-md">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B08B50]">
                  PLENTY OF PARKING
                </span>
                <h4 className="font-display text-xl font-bold uppercase text-[#F1E7D5] mt-1">
                  Ample Paved & Gravel Parking Right Out Front
                </h4>
                <p className="text-xs text-[#F1E7D5]/75 mt-1">
                  Easy highway access off 7th Street with motorcycle parking spots and safe lighting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
