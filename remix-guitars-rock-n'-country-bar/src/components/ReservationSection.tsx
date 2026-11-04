import React, { useState } from 'react';
import { Phone, Calendar, Users, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, MapPin } from 'lucide-react';
import { EventItem } from '../data/types';
import { FALLBACK_IMAGES, handleImageError } from '../utils/imageUrl';

interface ReservationSectionProps {
  preselectedEvent?: EventItem | null;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ preselectedEvent }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [boothZone, setBoothZone] = useState<string>('vip-stage');
  const [guestCount, setGuestCount] = useState<number>(6);
  const [date, setDate] = useState<string>('2026-11-20');
  const [timeSlot, setTimeSlot] = useState<string>('8:00 PM');
  const [occasion, setOccasion] = useState<string>('Birthday Celebration');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const boothOptions = [
    {
      id: 'vip-stage',
      title: 'Main Stage VIP Table',
      description: 'Prime front-facing view of the live bands, dedicated server service, and immediate dance floor access.',
      capacity: 'Seats 4–10 Guests',
      tag: 'Best for Live Shows',
      image: FALLBACK_IMAGES.liveStage,
    },
    {
      id: 'dance-rail',
      title: 'Dance Floor Rail Booth',
      description: 'Right on the hardwood perimeter. Quick step-in for line dancing tutorials and high-energy music.',
      capacity: 'Seats 4–8 Guests',
      tag: 'Best for Dancers',
      image: FALLBACK_IMAGES.lineDance,
    },
    {
      id: 'patio-lounge',
      title: 'Open-Air Patio Lounge',
      description: 'Relaxed wooden outdoor booths under festive string lights with easy access to the patio bar.',
      capacity: 'Seats 6–16 Guests',
      tag: 'Best for Social Groups',
      image: FALLBACK_IMAGES.patio,
    },
    {
      id: 'pool-hall',
      title: 'Billiards Hall Reserve',
      description: 'Adjacent to the 8-ball slate tournament tables and craft tap counter. Ideal for casual mixers.',
      capacity: 'Seats 4–12 Guests',
      tag: 'Best for Pool Players',
      image: FALLBACK_IMAGES.interior,
    },
  ];

  const timeSlots = [
    '7:00 PM (Happy Hour / No Cover)',
    '7:30 PM (Line Dance Lesson)',
    '8:00 PM (Pool Tournament / Show Start)',
    '8:30 PM (Main Band Set)',
    '9:30 PM (Late Night Energy)',
  ];

  const occasions = [
    'Birthday Celebration',
    'Bachelorette or Bachelor Party',
    'Anniversary or Reunion',
    'Line Dance Group Night',
    'Touring Band Support',
    'Casual Night Out with Friends',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    // Save to local reservations storage
    const newReservation = {
      id: 'res-' + Date.now(),
      name: customerName,
      phone: customerPhone,
      boothZone,
      guestCount,
      date,
      timeSlot,
      occasion,
      notes: customerNotes,
      createdAt: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('guitars_reservations') || '[]');
      existing.push(newReservation);
      localStorage.setItem('guitars_reservations', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerNotes('');
  };

  return (
    <section id="reservations" className="py-24 bg-[#181615] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-amp-mesh opacity-10 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#B08B50]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#B08B50] uppercase">
              TABLES, BOOTHS & PRIVATE EVENTS
            </span>
            <span className="h-[1px] w-8 bg-[#B08B50]" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5] leading-tight">
            GOT SOMETHING TO CELEBRATE? <br />
            <span className="text-[#9C2529]">LET'S MAKE IT A NIGHT TO REMEMBER.</span>
          </h2>

          <p className="mt-4 text-[#F1E7D5]/80 text-base sm:text-lg">
            Planning a special occasion or looking for a place to bring people together?
            Get in touch with Guitars Rock N' Country Bar to discuss reservations for your special event.
          </p>

          {/* Primary Click-to-Call CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:4177826444"
              className="w-full sm:w-auto px-8 py-3.5 text-sm sm:text-base font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] border border-[#9C2529] rounded-xs shadow-xl transition-all flex items-center justify-center gap-2.5"
            >
              <Phone className="w-4 h-4" />
              <span>CALL TO MAKE A RESERVATION: (417) 782-6444</span>
            </a>
          </div>
        </div>

        {/* Interactive Multi-step Reservation Container */}
        <div className="bg-[#1c1816] border-2 border-[#493225] rounded-xs p-6 sm:p-10 shadow-2xl relative">
          {/* Top Brass Accents */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B08B50] via-[#9C2529] to-[#B08B50]" />

          {isSubmitted ? (
            /* Confirmation Screen */
            <div className="text-center py-12 px-4 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-950/80 border border-emerald-500 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#B08B50]">
                  REQUEST RECEIVED
                </span>
                <h3 className="font-display text-3xl font-bold uppercase text-[#F1E7D5] mt-1">
                  We'll Have Your Table Ready, {customerName}!
                </h3>
                <p className="mt-3 text-sm text-[#F1E7D5]/80 max-w-lg mx-auto">
                  Your reservation inquiry for {guestCount} guests in the{' '}
                  <span className="text-[#B08B50] font-semibold">
                    {boothOptions.find((b) => b.id === boothZone)?.title}
                  </span>{' '}
                  on {date} at {timeSlot} has been recorded. Our venue coordinator will contact you at {customerPhone}.
                </p>
              </div>

              <div className="p-4 bg-[#151515] border border-[#493225] rounded-xs max-w-md mx-auto text-xs text-[#F1E7D5]/70 text-left space-y-1.5">
                <p>
                  <strong className="text-[#B08B50]">Location:</strong> 1800 W 7th St, Joplin, MO 64801
                </p>
                <p>
                  <strong className="text-[#B08B50]">Occasion:</strong> {occasion}
                </p>
                <p>
                  <strong className="text-[#B08B50]">Need immediate confirmation?</strong> Call (417) 782-6444
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  href="tel:4177826444"
                  className="px-6 py-3 text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Box Office
                </a>
                <button
                  onClick={handleReset}
                  type="button"
                  className="px-6 py-3 text-xs font-display uppercase tracking-wider font-bold text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] hover:border-[#B08B50] rounded-xs"
                >
                  Submit Another Reservation
                </button>
              </div>
            </div>
          ) : (
            /* Multi-Step Flow */
            <div>
              {/* Step Indicators */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#493225]">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xs flex items-center justify-center font-display text-xs font-bold ${
                      currentStep === 1
                        ? 'bg-[#9C2529] text-white'
                        : 'bg-[#2A1C15] text-[#B08B50] border border-[#493225]'
                    }`}
                  >
                    1
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F1E7D5]">
                    Select Seating Zone
                  </span>
                </div>

                <div className="hidden sm:block h-[1px] w-12 bg-[#493225]" />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xs flex items-center justify-center font-display text-xs font-bold ${
                      currentStep === 2
                        ? 'bg-[#9C2529] text-white'
                        : 'bg-[#2A1C15] text-[#B08B50] border border-[#493225]'
                    }`}
                  >
                    2
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F1E7D5]">
                    Date & Party Size
                  </span>
                </div>

                <div className="hidden sm:block h-[1px] w-12 bg-[#493225]" />

                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-xs flex items-center justify-center font-display text-xs font-bold ${
                      currentStep === 3
                        ? 'bg-[#9C2529] text-white'
                        : 'bg-[#2A1C15] text-[#B08B50] border border-[#493225]'
                    }`}
                  >
                    3
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#F1E7D5]">
                    Contact Details
                  </span>
                </div>
              </div>

              {/* STEP 1: Choose Booth Zone */}
              {currentStep === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <div className="text-left">
                    <h3 className="font-display text-xl font-bold uppercase text-[#F1E7D5]">
                      Choose Your Preferred Seating Area
                    </h3>
                    <p className="text-xs text-[#F1E7D5]/70 mt-1">
                      All booths include dedicated server service and guaranteed seating during high-demand nights.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {boothOptions.map((booth) => (
                      <div
                        key={booth.id}
                        onClick={() => setBoothZone(booth.id)}
                        className={`overflow-hidden rounded-xs border cursor-pointer transition-all flex flex-col ${
                          boothZone === booth.id
                            ? 'bg-[#2A1C15] border-[#B08B50] shadow-lg ring-1 ring-[#B08B50]'
                            : 'bg-[#151515] border-[#493225] hover:border-[#B08B50]/60'
                        }`}
                      >
                        <div className="relative h-28 w-full overflow-hidden bg-[#241a15]">
                          <img
                            src={booth.image}
                            alt={booth.title}
                            onError={(e) => handleImageError(e, FALLBACK_IMAGES.hero)}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#1c1816] via-transparent to-transparent" />
                          <div className="absolute top-2 left-2 bg-[#151515]/90 border border-[#493225] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#9C2529] rounded-xs backdrop-blur-sm">
                            {booth.tag}
                          </div>
                          <div className="absolute bottom-2 right-2 bg-[#151515]/90 border border-[#B08B50]/50 px-2 py-0.5 text-[10px] text-[#B08B50] font-semibold rounded-xs backdrop-blur-sm">
                            {booth.capacity}
                          </div>
                        </div>

                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="font-display text-lg font-bold uppercase text-[#F1E7D5]">
                              {booth.title}
                            </h4>
                            <p className="text-xs text-[#F1E7D5]/75 mt-1.5 leading-relaxed">
                              {booth.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      type="button"
                      className="px-6 py-3 text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs flex items-center gap-2"
                    >
                      <span>Continue to Party Details</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Date, Time & Guest Count */}
              {currentStep === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200 text-left">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-[#F1E7D5]">
                      Date & Party Size
                    </h3>
                    <p className="text-xs text-[#F1E7D5]/70 mt-1">
                      Tell us when your group will be arriving.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Date Picker */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                        Reservation Date
                      </label>
                      <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#151515] border border-[#493225] rounded-xs text-[#F1E7D5] focus:outline-none focus:border-[#B08B50] text-sm"
                      />
                    </div>

                    {/* Time Slot Picker */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                        Preferred Arrival Time
                      </label>
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#151515] border border-[#493225] rounded-xs text-[#F1E7D5] focus:outline-none focus:border-[#B08B50] text-sm"
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#151515] text-[#F1E7D5]">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Guest Count Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                        Estimated Guests: <span className="text-[#F1E7D5]">{guestCount} People</span>
                      </label>
                      <div className="flex items-center gap-3 bg-[#151515] border border-[#493225] rounded-xs p-2">
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.max(2, guestCount - 1))}
                          className="w-8 h-8 bg-[#2A1C15] text-[#F1E7D5] hover:text-[#B08B50] font-bold rounded-xs flex items-center justify-center"
                        >
                          -
                        </button>
                        <input
                          type="range"
                          min="2"
                          max="30"
                          value={guestCount}
                          onChange={(e) => setGuestCount(parseInt(e.target.value, 10))}
                          className="flex-1 accent-[#9C2529] cursor-pointer"
                        />
                        <button
                          type="button"
                          onClick={() => setGuestCount(Math.min(30, guestCount + 1))}
                          className="w-8 h-8 bg-[#2A1C15] text-[#F1E7D5] hover:text-[#B08B50] font-bold rounded-xs flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Occasion Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                      Type of Occasion
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {occasions.map((occ) => (
                        <button
                          key={occ}
                          type="button"
                          onClick={() => setOccasion(occ)}
                          className={`p-2.5 text-xs text-left rounded-xs border transition-colors ${
                            occasion === occ
                              ? 'bg-[#2A1C15] border-[#B08B50] text-[#F1E7D5] font-semibold'
                              : 'bg-[#151515] border-[#493225] text-[#F1E7D5]/70 hover:text-[#F1E7D5]'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setCurrentStep(1)}
                      type="button"
                      className="px-5 py-3 text-xs font-display uppercase tracking-wider font-bold text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] rounded-xs flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      onClick={() => setCurrentStep(3)}
                      type="button"
                      className="px-6 py-3 text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs flex items-center gap-2"
                    >
                      <span>Continue to Contact Info</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Info & Review */}
              {currentStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-200 text-left">
                  <div>
                    <h3 className="font-display text-xl font-bold uppercase text-[#F1E7D5]">
                      Review & Contact Details
                    </h3>
                    <p className="text-xs text-[#F1E7D5]/70 mt-1">
                      Provide your phone number for SMS or call confirmation from our venue host.
                    </p>
                  </div>

                  {/* Selection Summary Pill */}
                  <div className="p-3 bg-[#151515] border border-[#B08B50]/40 rounded-xs flex flex-wrap items-center justify-between text-xs text-[#F1E7D5]/80 gap-2">
                    <div>
                      <span className="text-[#B08B50] font-semibold">Zone:</span>{' '}
                      {boothOptions.find((b) => b.id === boothZone)?.title}
                    </div>
                    <div>
                      <span className="text-[#B08B50] font-semibold">Date/Time:</span> {date} · {timeSlot}
                    </div>
                    <div>
                      <span className="text-[#B08B50] font-semibold">Guests:</span> {guestCount}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Wyatt Travis"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#151515] border border-[#493225] rounded-xs text-[#F1E7D5] focus:outline-none focus:border-[#B08B50] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                        Phone Number (Mobile) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (417) 555-0199"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#151515] border border-[#493225] rounded-xs text-[#F1E7D5] focus:outline-none focus:border-[#B08B50] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#B08B50] mb-2">
                      Special Requests, Cake Drop-off, or Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Let us know if you need specific song shoutouts, champagne setup, or special accommodations."
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#151515] border border-[#493225] rounded-xs text-[#F1E7D5] focus:outline-none focus:border-[#B08B50] text-sm"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={() => setCurrentStep(2)}
                      type="button"
                      className="px-5 py-3 text-xs font-display uppercase tracking-wider font-bold text-[#F1E7D5] bg-[#2A1C15] border border-[#493225] rounded-xs flex items-center gap-1.5"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>

                    <button
                      type="submit"
                      className="px-8 py-3.5 text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs shadow-xl flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm Reservation Request</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
