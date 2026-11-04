import React, { useState, useEffect } from 'react';
import { GuitarsLogo } from './GuitarsLogo';
import { Menu, X, Phone, MapPin, Music } from 'lucide-react';

interface NavbarProps {
  onOpenJukebox?: () => void;
  onOpenReservation?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJukebox, onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'The Experience', href: '#experience' },
    { label: 'Specials', href: '#specials' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Visit Us', href: '#visit' },
    { label: 'Reservations', href: '#reservations' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#151515]/95 backdrop-blur-md border-b border-[#493225]/60 shadow-xl py-3'
          : 'bg-gradient-to-b from-[#151515]/80 via-[#151515]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="whitespace-nowrap shrink-0 group focus:outline-none">
            <GuitarsLogo size="sm" />
          </a>

          {/* Zone 2: Single-line Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#F1E7D5]/80 hover:text-[#B08B50] transition-colors whitespace-nowrap tracking-wide py-1 border-b border-transparent hover:border-[#B08B50]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Quick Tools */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            {onOpenJukebox && (
              <button
                onClick={onOpenJukebox}
                type="button"
                className="flex items-center gap-2 px-3 py-2 text-xs font-semibold tracking-wider uppercase text-[#B08B50] hover:text-[#F1E7D5] bg-[#2A1C15]/80 hover:bg-[#493225] border border-[#B08B50]/30 rounded-sm transition-colors whitespace-nowrap"
                title="Open Roadhouse Jukebox"
              >
                <Music className="w-3.5 h-3.5" />
                <span>Jukebox</span>
              </button>
            )}

            <a
              href="#reservations"
              onClick={onOpenReservation}
              className="px-4 py-2 text-xs sm:text-sm font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] border border-[#9C2529] hover:border-[#F1E7D5]/20 rounded-sm shadow-md transition-all whitespace-nowrap"
            >
              Plan Your Visit
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="tel:4177826444"
              className="p-2 text-[#B08B50] hover:text-white bg-[#2A1C15] border border-[#493225] rounded-sm"
              aria-label="Call venue"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 text-[#F1E7D5] hover:text-[#B08B50] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#151515] border-b border-[#493225] px-5 py-6 space-y-4 animate-in fade-in slide-in-from-top-4 duration-200 shadow-2xl">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 text-base font-medium text-[#F1E7D5] hover:text-[#B08B50] border-b border-[#2A1C15] tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <a
              href="#reservations"
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReservation) onOpenReservation();
              }}
              className="w-full text-center py-3 text-sm font-display font-bold uppercase tracking-wider text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-sm"
            >
              Plan Your Visit / Reserve
            </a>
            <div className="flex items-center justify-between text-xs text-[#B08B50] pt-2 px-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> 1800 W 7th St, Joplin, MO
              </span>
              <a href="tel:4177826444" className="flex items-center gap-1.5 underline hover:text-white">
                <Phone className="w-3.5 h-3.5" /> (417) 782-6444
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
