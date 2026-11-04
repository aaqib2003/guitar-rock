import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { Experiences } from './components/Experiences';
import { SpecialsBanners } from './components/SpecialsBanners';
import { EventsCalendar } from './components/EventsCalendar';
import { JukeboxPlayer } from './components/JukeboxPlayer';
import { PhotoGallery } from './components/PhotoGallery';
import { ReservationSection } from './components/ReservationSection';
import { VisitSection, DEFAULT_HOURS } from './components/VisitSection';
import { Footer } from './components/Footer';
import { EventAdminModal } from './components/EventAdminModal';
import { EventItem, SpecialItem, VenueHours } from './data/types';
import { getStoredEvents, saveStoredEvents } from './data/events';
import { getStoredSpecials, saveStoredSpecials } from './data/specials';

export default function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [specials, setSpecials] = useState<SpecialItem[]>([]);
  const [hours, setHours] = useState<VenueHours[]>(DEFAULT_HOURS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isJukeboxOpen, setIsJukeboxOpen] = useState(false);
  const [selectedEventForBooking, setSelectedEventForBooking] = useState<EventItem | null>(null);

  // Initialize data from persistent local storage
  useEffect(() => {
    setEvents(getStoredEvents());
    setSpecials(getStoredSpecials());

    try {
      const storedHours = localStorage.getItem('guitars_bar_hours');
      if (storedHours) {
        setHours(JSON.parse(storedHours));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save event updates from CMS
  const handleSaveEvents = (newEvents: EventItem[]) => {
    setEvents(newEvents);
    saveStoredEvents(newEvents);
  };

  // Save special updates from CMS
  const handleSaveSpecials = (newSpecials: SpecialItem[]) => {
    setSpecials(newSpecials);
    saveStoredSpecials(newSpecials);
  };

  // Save hours updates from CMS
  const handleSaveHours = (newHours: VenueHours[]) => {
    setHours(newHours);
    try {
      localStorage.setItem('guitars_bar_hours', JSON.stringify(newHours));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-[#151515] text-[#F1E7D5] flex flex-col selection:bg-[#9C2529] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenJukebox={() => setIsJukeboxOpen(true)}
        onOpenReservation={() => {
          const el = document.getElementById('reservations');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero onOpenJukebox={() => setIsJukeboxOpen(true)} />

        {/* 2. Editorial Introduction */}
        <Introduction />

        {/* 3. Four Featured Experiences */}
        <Experiences />

        {/* 4. Specials & Nightlife Promotions (Vintage Panels) */}
        <SpecialsBanners
          specials={specials}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />

        {/* 5. Live Events Calendar */}
        <EventsCalendar
          events={events}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onSelectEventForBooking={(evt) => setSelectedEventForBooking(evt)}
        />

        {/* 6. Photo Gallery (Inside Guitars) */}
        <PhotoGallery />

        {/* 7. Special Events & Multi-Step Reservation System */}
        <ReservationSection preselectedEvent={selectedEventForBooking} />

        {/* 8. Location, Directions, Map & Operating Hours */}
        <VisitSection
          hours={hours}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </main>

      {/* Dockable Jukebox Preview Player */}
      <JukeboxPlayer
        isOpen={isJukeboxOpen}
        onToggle={() => setIsJukeboxOpen(!isJukeboxOpen)}
      />

      {/* Staff & Manager Admin Modal */}
      <EventAdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        events={events}
        onSaveEvents={handleSaveEvents}
        specials={specials}
        onSaveSpecials={handleSaveSpecials}
        hours={hours}
        onSaveHours={handleSaveHours}
      />

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenJukebox={() => setIsJukeboxOpen(true)}
      />
    </div>
  );
}
