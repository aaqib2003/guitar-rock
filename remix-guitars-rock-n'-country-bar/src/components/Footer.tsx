import React from 'react';
import { GuitarsLogo } from './GuitarsLogo';
import { MapPin, Phone, ExternalLink, KeyRound, Heart } from 'lucide-react';

interface FooterProps {
  onOpenAdmin?: () => void;
  onOpenJukebox?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenJukebox }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#11100f] border-t border-[#493225]/80 text-[#F1E7D5] relative overflow-hidden">
      {/* Decorative guitar string divider */}
      <div className="guitar-string w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Column 1: Brand & Logo Lockup */}
          <div className="lg:col-span-5 space-y-4">
            <GuitarsLogo size="md" />
            <p className="text-sm text-[#F1E7D5]/70 max-w-sm leading-relaxed">
              Joplin’s home for authentic live rock and country music, high-energy line dancing, open-air patio nights, and classic American roadhouse hospitality.
            </p>
            <div className="pt-2 text-xs text-[#B08B50] font-medium tracking-wide">
              Where Rock Meets Country. And Every Night Has a Story.
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#B08B50]">
              Explore Guitars
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#F1E7D5]/80">
              <li>
                <a href="#experience" className="hover:text-[#B08B50] transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a href="#specials" className="hover:text-[#B08B50] transition-colors">
                  Weekly Specials & Happy Hour
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-[#B08B50] transition-colors">
                  Live Bands & Event Calendar
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#B08B50] transition-colors">
                  Photo Gallery
                </a>
              </li>
              <li>
                <a href="#reservations" className="hover:text-[#B08B50] transition-colors">
                  VIP Booth & Party Reservations
                </a>
              </li>
              <li>
                <a href="#visit" className="hover:text-[#B08B50] transition-colors">
                  Location & Operating Hours
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Visit Information */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-[#B08B50]">
              Visit & Connect
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-[#F1E7D5]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#9C2529] shrink-0 mt-0.5" />
                <span>1800 W 7th Street, Joplin, MO 64801</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B08B50] shrink-0" />
                <a href="tel:4177826444" className="hover:text-white underline">
                  (417) 782-6444
                </a>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=1800+W+7th+St,+Joplin,+MO+64801"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#241a15] hover:bg-[#493225] border border-[#493225] text-xs font-semibold text-[#F1E7D5] rounded-xs transition-colors"
              >
                <span>Get Driving Directions</span>
                <ExternalLink className="w-3 h-3 text-[#B08B50]" />
              </a>

              {onOpenJukebox && (
                <button
                  onClick={onOpenJukebox}
                  type="button"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#241a15] hover:bg-[#493225] border border-[#493225] text-xs font-semibold text-[#B08B50] hover:text-[#F1E7D5] rounded-xs transition-colors"
                >
                  <span>Open Jukebox</span>
                </button>
              )}
            </div>

            <div className="pt-2 text-xs text-[#F1E7D5]/60">
              Follow our community on social media for live band announcements and weekend lineups.
            </div>
          </div>
        </div>

        {/* Bottom Legal, Staff Access & Copyright */}
        <div className="mt-14 pt-8 border-t border-[#493225]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F1E7D5]/50 gap-4">
          <p>
            © {currentYear} Guitars Rock N' Country Bar. All rights reserved. Joplin, Missouri.
          </p>

          <div className="flex items-center gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                type="button"
                className="flex items-center gap-1.5 text-[#B08B50]/70 hover:text-[#B08B50] transition-colors"
                title="Management login for schedule updates"
              >
                <KeyRound className="w-3 h-3" />
                <span>Staff Access</span>
              </button>
            )}
            <span>21+ Venue for evening live music</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
