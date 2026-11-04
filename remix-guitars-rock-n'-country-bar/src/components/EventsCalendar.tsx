import React, { useState } from 'react';
import { EventItem } from '../data/types';
import { Calendar, Clock, DollarSign, PlusCircle, Check, Share2, Info } from 'lucide-react';
import { FALLBACK_IMAGES, normalizeImageUrl, handleImageError } from '../utils/imageUrl';

interface EventsCalendarProps {
  events: EventItem[];
  onOpenAdmin?: () => void;
  onSelectEventForBooking?: (event: EventItem) => void;
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({
  events,
  onOpenAdmin,
  onSelectEventForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [rsvpdEventIds, setRsvpdEventIds] = useState<string[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Events' },
    { id: 'live-music', label: 'Live Bands' },
    { id: 'line-dancing', label: 'Line Dancing' },
    { id: 'pool-tournament', label: 'Pool Tournaments' },
    { id: 'special', label: 'Special Nights' },
  ];

  const filteredEvents =
    selectedCategory === 'all'
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const toggleRsvp = (id: string) => {
    if (rsvpdEventIds.includes(id)) {
      setRsvpdEventIds(rsvpdEventIds.filter((item) => item !== id));
    } else {
      setRsvpdEventIds([...rsvpdEventIds, id]);
    }
  };

  const handleShare = (event: EventItem) => {
    const shareText = `${event.title} at Guitars Rock N' Country Bar (Joplin, MO) on ${event.date}!`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopiedId(event.id);
      setTimeout(() => setCopiedId(null), 2500);
    }
  };

  return (
    <section id="events" className="py-24 bg-[#181615] relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-[1px] w-6 bg-[#9C2529]" />
              <span className="text-xs font-bold tracking-[0.25em] text-[#9C2529] uppercase">
                LIVE ENTERTAINMENT SCHEDULE
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5]">
              WHAT'S HAPPENING AT GUITARS?
            </h2>
            <p className="mt-2 text-[#F1E7D5]/70 text-sm sm:text-base max-w-2xl">
              Rock anthems, classic country shuffles, line dancing tutorials, and championship 8-ball billiards.
            </p>
          </div>

          {/* Owner Quick CMS trigger button */}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              type="button"
              className="inline-flex items-center gap-2 self-start md:self-auto px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#F1E7D5] hover:text-white bg-[#493225] hover:bg-[#9C2529] border border-[#B08B50]/50 rounded-xs transition-all shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5 text-[#B08B50]" />
              <span>Add / Manage Events</span>
            </button>
          )}
        </div>

        {/* Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors border ${
                selectedCategory === cat.id
                  ? 'bg-[#9C2529] text-white border-[#9C2529] shadow-md font-semibold'
                  : 'bg-[#241a15] text-[#F1E7D5]/75 border-[#493225] hover:border-[#B08B50] hover:text-[#F1E7D5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="text-center py-16 px-6 bg-[#241a15] border border-[#493225] rounded-xs max-w-2xl mx-auto">
            <Calendar className="w-12 h-12 text-[#B08B50] mx-auto mb-4 opacity-80" />
            <h3 className="font-display text-2xl font-bold uppercase text-[#F1E7D5]">
              New Shows Announcing Soon
            </h3>
            <p className="mt-2 text-sm text-[#F1E7D5]/75 max-w-md mx-auto">
              We are currently booking upcoming touring bands and weekend dance nights. Follow Guitars Rock N' Country Bar on social media for fast updates.
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <a
                href="#visit"
                className="px-5 py-2.5 text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs"
              >
                Plan Your Visit
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event) => {
              const isRsvpd = rsvpdEventIds.includes(event.id);

              return (
                <div
                  key={event.id}
                  className="group flex flex-col bg-[#1c1816] rounded-xs border border-[#493225] hover:border-[#B08B50] overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Event Thumbnail */}
                  <div className="relative h-48 w-full bg-[#2A1C15] overflow-hidden">
                    <img
                      src={normalizeImageUrl(event.image, FALLBACK_IMAGES.liveStage)}
                      alt={event.title}
                      onError={(e) => handleImageError(e, FALLBACK_IMAGES.liveStage)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1c1816] via-[#1c1816]/30 to-transparent" />

                    {/* Date Badge */}
                    <div className="absolute top-3 left-3 bg-[#151515]/95 border border-[#B08B50]/50 px-3 py-1.5 rounded-xs backdrop-blur-sm text-center">
                      <span className="font-display text-sm font-bold text-[#F1E7D5] block leading-none">
                        {event.date}
                      </span>
                    </div>

                    {/* Category Label */}
                    {event.badge && (
                      <div className="absolute top-3 right-3 bg-[#9C2529] text-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-xs">
                        {event.badge}
                      </div>
                    )}
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Unboxed Metadata Line with typographic separators */}
                      <div className="flex items-center gap-2 text-xs text-[#B08B50] font-medium mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {event.time}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{event.genre || 'Live Entertainment'}</span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-[#F1E7D5] group-hover:text-[#B08B50] transition-colors leading-snug">
                        {event.title}
                      </h3>

                      {event.featuredArtist && (
                        <p className="text-sm font-medium text-[#B08B50] mt-1">
                          {event.featuredArtist}
                        </p>
                      )}

                      <p className="mt-3 text-xs sm:text-sm text-[#F1E7D5]/75 leading-relaxed line-clamp-3">
                        {event.description}
                      </p>

                      {event.cover && (
                        <div className="mt-4 flex items-center gap-2 text-xs text-[#F1E7D5]/80 font-medium bg-[#151515] p-2 rounded-xs border border-[#493225]/70">
                          <DollarSign className="w-3.5 h-3.5 text-[#B08B50]" />
                          <span>{event.cover}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="mt-6 pt-4 border-t border-[#493225]/50 flex items-center justify-between gap-3">
                      <button
                        onClick={() => toggleRsvp(event.id)}
                        type="button"
                        className={`flex-1 py-2 px-3 text-xs font-display uppercase tracking-wider font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5 ${
                          isRsvpd
                            ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-600'
                            : 'bg-[#2A1C15] text-[#F1E7D5] hover:bg-[#9C2529] hover:text-white border border-[#493225]'
                        }`}
                      >
                        {isRsvpd ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Going!</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-3.5 h-3.5 text-[#B08B50]" />
                            <span>I'm Interested</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setActiveModalEvent(event)}
                        type="button"
                        className="p-2 text-[#B08B50] hover:text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] rounded-xs transition-colors"
                        title="View Full Event Details"
                      >
                        <Info className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleShare(event)}
                        type="button"
                        className="p-2 text-[#B08B50] hover:text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] rounded-xs transition-colors"
                        title="Copy event invite info"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>

                    {copiedId === event.id && (
                      <p className="text-[11px] text-emerald-400 mt-2 text-center animate-fade-in">
                        Event invite copied to clipboard!
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal: Full Event Details */}
        {activeModalEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1c1816] border border-[#B08B50] rounded-xs max-w-lg w-full p-6 sm:p-8 relative shadow-2xl space-y-6">
              <div className="flex items-start justify-between border-b border-[#493225] pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#9C2529]">
                    {activeModalEvent.badge || 'EVENT SPOTLIGHT'}
                  </span>
                  <h3 className="font-display text-2xl font-bold uppercase text-[#F1E7D5] mt-1">
                    {activeModalEvent.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalEvent(null)}
                  className="text-[#F1E7D5]/70 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-sm text-[#F1E7D5]/80">
                <div className="flex items-center gap-2 text-[#B08B50]">
                  <Calendar className="w-4 h-4 shrink-0" />
                  <span className="font-semibold">{activeModalEvent.date}</span>
                  <span>·</span>
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>{activeModalEvent.time}</span>
                </div>
                {activeModalEvent.featuredArtist && (
                  <p className="text-base text-[#F1E7D5] font-medium">
                    Performers: <span className="text-[#B08B50]">{activeModalEvent.featuredArtist}</span>
                  </p>
                )}
                <p className="leading-relaxed text-sm">{activeModalEvent.description}</p>
                <div className="p-3 bg-[#151515] border border-[#493225] rounded-xs">
                  <p className="text-xs text-[#F1E7D5]/90">
                    <strong className="text-[#B08B50]">Cover & Admission:</strong> {activeModalEvent.cover}
                  </p>
                  <p className="text-xs text-[#F1E7D5]/60 mt-1">
                    Venue: Guitars Rock N' Country Bar · 1800 W 7th St, Joplin, MO 64801
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#493225] flex gap-3">
                <a
                  href="#reservations"
                  onClick={() => {
                    setActiveModalEvent(null);
                    if (onSelectEventForBooking) {
                      onSelectEventForBooking(activeModalEvent);
                    }
                  }}
                  className="flex-1 py-3 text-center text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs"
                >
                  Reserve VIP Booth for This Show
                </a>
                <a
                  href="tel:4177826444"
                  className="px-4 py-3 text-center text-xs font-display uppercase tracking-wider font-bold text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] hover:border-[#B08B50] rounded-xs"
                >
                  Call Box Office
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
