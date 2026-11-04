import React, { useState } from 'react';
import { EventItem, SpecialItem, VenueHours } from '../data/types';
import { X, Lock, Plus, Trash2, Edit2, Save, RotateCcw, Download, Check } from 'lucide-react';
import { INITIAL_EVENTS } from '../data/events';
import { INITIAL_SPECIALS } from '../data/specials';
import { DEFAULT_HOURS } from './VisitSection';
import { FALLBACK_IMAGES, normalizeImageUrl } from '../utils/imageUrl';

interface EventAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: EventItem[];
  onSaveEvents: (events: EventItem[]) => void;
  specials: SpecialItem[];
  onSaveSpecials: (specials: SpecialItem[]) => void;
  hours: VenueHours[];
  onSaveHours: (hours: VenueHours[]) => void;
}

export const EventAdminModal: React.FC<EventAdminModalProps> = ({
  isOpen,
  onClose,
  events,
  onSaveEvents,
  specials,
  onSaveSpecials,
  hours,
  onSaveHours,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'specials' | 'hours'>('events');

  // Form states for creating/editing an event
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [eventForm, setEventForm] = useState<Partial<EventItem>>({
    title: '',
    date: '',
    time: '',
    category: 'live-music',
    featuredArtist: '',
    genre: '',
    cover: '$10 Cover',
    description: '',
    badge: 'Live Band',
  });

  // State copies
  const [localEvents, setLocalEvents] = useState<EventItem[]>(events);
  const [localSpecials, setLocalSpecials] = useState<SpecialItem[]>(specials);
  const [localHours, setLocalHours] = useState<VenueHours[]>(hours);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Default PIN: 1800 (address number) or 'pass'
    if (pinInput === '1800' || pinInput === 'admin' || pinInput === 'guitars') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleSaveAll = () => {
    onSaveEvents(localEvents);
    onSaveSpecials(localSpecials);
    onSaveHours(localHours);
    setSaveSuccessMsg('All updates saved successfully to website!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handleDeleteEvent = (id: string) => {
    const updated = localEvents.filter((e) => e.id !== id);
    setLocalEvents(updated);
  };

  const handleStartEditEvent = (evt: EventItem) => {
    setEditingEventId(evt.id);
    setEventForm(evt);
  };

  const handleSaveEventForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date) return;

    if (editingEventId) {
      // Update existing
      const updated = localEvents.map((evt) =>
        evt.id === editingEventId ? ({ ...evt, ...eventForm } as EventItem) : evt
      );
      setLocalEvents(updated);
    } else {
      // Create new
      const newEvt: EventItem = {
        id: 'evt-' + Date.now(),
        title: eventForm.title || 'Live Show',
        date: eventForm.date || 'TBD',
        time: eventForm.time || '8:00 PM',
        category: eventForm.category || 'live-music',
        featuredArtist: eventForm.featuredArtist,
        genre: eventForm.genre,
        cover: eventForm.cover,
        description: eventForm.description || '',
        badge: eventForm.badge || 'Upcoming',
        image: FALLBACK_IMAGES.liveStage,
      };
      setLocalEvents([newEvt, ...localEvents]);
    }

    setEditingEventId(null);
    setEventForm({
      title: '',
      date: '',
      time: '',
      category: 'live-music',
      featuredArtist: '',
      genre: '',
      cover: '$10 Cover',
      description: '',
      badge: 'Live Band',
    });
  };

  const handleResetDefaults = () => {
    if (window.confirm('Reset all events and specials to default website data?')) {
      setLocalEvents(INITIAL_EVENTS);
      setLocalSpecials(INITIAL_SPECIALS);
      setLocalHours(DEFAULT_HOURS);
      onSaveEvents(INITIAL_EVENTS);
      onSaveSpecials(INITIAL_SPECIALS);
      onSaveHours(DEFAULT_HOURS);
      setSaveSuccessMsg('Restored original default schedules.');
    }
  };

  const handleExportJson = () => {
    const exportData = {
      events: localEvents,
      specials: localSpecials,
      hours: localHours,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `guitars_bar_data_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#1c1816] border-2 border-[#B08B50] rounded-xs max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#241a15] p-4 sm:p-5 border-b border-[#493225] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#B08B50]" />
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wider text-[#F1E7D5]">
                GUITARS BAR MANAGEMENT CMS
              </h3>
              <p className="text-[11px] text-[#B08B50]">
                Live Schedule, Specials & Operating Hours Editor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#F1E7D5]/70 hover:text-white rounded-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          /* PIN Authentication Screen */
          <div className="p-8 text-center max-w-sm mx-auto space-y-4 my-auto">
            <div className="p-3 bg-[#2A1C15] border border-[#493225] text-[#B08B50] rounded-full w-12 h-12 flex items-center justify-center mx-auto">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-display text-xl font-bold uppercase text-[#F1E7D5]">
              Manager Access Required
            </h4>
            <p className="text-xs text-[#F1E7D5]/70">
              Enter the manager PIN to edit live events, drink specials, and venue operating hours. (Hint: venue address <strong className="text-[#B08B50]">1800</strong>)
            </p>

            <form onSubmit={handlePinSubmit} className="space-y-3 pt-2">
              <input
                type="password"
                placeholder="Enter PIN (e.g. 1800)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center px-4 py-2.5 bg-[#151515] border border-[#493225] rounded-xs text-[#F1E7D5] font-display text-lg tracking-widest focus:outline-none focus:border-[#B08B50]"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-red-400 font-medium">
                  Incorrect PIN. Please try 1800.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-2.5 text-xs font-display uppercase tracking-wider font-bold text-white bg-[#9C2529] hover:bg-[#BF2A30] rounded-xs transition-colors"
              >
                Unlock Management Console
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated CMS Tabs */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Nav Tabs */}
            <div className="flex items-center justify-between border-b border-[#493225] pb-3">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('events')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                    activeTab === 'events'
                      ? 'bg-[#9C2529] text-white border-[#9C2529]'
                      : 'bg-[#241a15] text-[#F1E7D5]/70 border-[#493225]'
                  }`}
                >
                  Events ({localEvents.length})
                </button>
                <button
                  onClick={() => setActiveTab('specials')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                    activeTab === 'specials'
                      ? 'bg-[#9C2529] text-white border-[#9C2529]'
                      : 'bg-[#241a15] text-[#F1E7D5]/70 border-[#493225]'
                  }`}
                >
                  Specials ({localSpecials.length})
                </button>
                <button
                  onClick={() => setActiveTab('hours')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xs border transition-colors ${
                    activeTab === 'hours'
                      ? 'bg-[#9C2529] text-white border-[#9C2529]'
                      : 'bg-[#241a15] text-[#F1E7D5]/70 border-[#493225]'
                  }`}
                >
                  Operating Hours
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportJson}
                  type="button"
                  className="p-1.5 text-[#B08B50] hover:text-white"
                  title="Export Data Backup"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={handleResetDefaults}
                  type="button"
                  className="p-1.5 text-[#F1E7D5]/60 hover:text-red-400"
                  title="Reset Defaults"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {saveSuccessMsg && (
              <div className="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xs text-xs text-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* TAB 1: Events Manager */}
            {activeTab === 'events' && (
              <div className="space-y-6">
                {/* Event Form (Add or Edit) */}
                <form
                  onSubmit={handleSaveEventForm}
                  className="bg-[#151515] p-4 rounded-xs border border-[#493225] space-y-3"
                >
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B08B50]">
                    {editingEventId ? 'Edit Event' : 'Add New Upcoming Event'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="Event Title (e.g. Red Dirt Rockers)"
                      value={eventForm.title || ''}
                      onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                      className="px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Date (e.g. Friday, Dec 5)"
                      value={eventForm.date || ''}
                      onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                      className="px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                    />
                    <input
                      type="text"
                      placeholder="Time (e.g. 8:00 PM – Midnight)"
                      value={eventForm.time || ''}
                      onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                      className="px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                    />
                    <select
                      value={eventForm.category || 'live-music'}
                      onChange={(e) =>
                        setEventForm({
                          ...eventForm,
                          category: e.target.value as EventItem['category'],
                        })
                      }
                      className="px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                    >
                      <option value="live-music">Live Bands</option>
                      <option value="line-dancing">Line Dancing</option>
                      <option value="pool-tournament">Pool Tournaments</option>
                      <option value="dj-night">DJ Nights</option>
                      <option value="special">Special Nights</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Featured Artist / Host"
                      value={eventForm.featuredArtist || ''}
                      onChange={(e) =>
                        setEventForm({ ...eventForm, featuredArtist: e.target.value })
                      }
                      className="px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                    />
                    <input
                      type="text"
                      placeholder="Cover Charge (e.g. $10 / Free before 8)"
                      value={eventForm.cover || ''}
                      onChange={(e) => setEventForm({ ...eventForm, cover: e.target.value })}
                      className="px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="Short description of the event, band lineup, or tournament rules..."
                    value={eventForm.description || ''}
                    onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                    className="w-full px-3 py-2 bg-[#1c1816] border border-[#493225] rounded-xs text-xs text-[#F1E7D5]"
                  />

                  <div className="flex justify-end gap-2 pt-1">
                    {editingEventId && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEventId(null);
                          setEventForm({});
                        }}
                        className="px-3 py-1.5 text-xs text-[#F1E7D5]/70 hover:text-white"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-4 py-2 text-xs font-display font-bold uppercase tracking-wider bg-[#9C2529] hover:bg-[#BF2A30] text-white rounded-xs flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{editingEventId ? 'Update Event' : 'Add to Schedule'}</span>
                    </button>
                  </div>
                </form>

                {/* Existing Events List */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B08B50]">
                    Current Schedule Items ({localEvents.length})
                  </h4>
                  {localEvents.map((evt) => (
                    <div
                      key={evt.id}
                      className="p-3 bg-[#151515] border border-[#493225] rounded-xs flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate">
                        <span className="font-semibold text-[#F1E7D5]">{evt.title}</span>
                        <div className="text-[11px] text-[#B08B50] flex items-center gap-2 mt-0.5">
                          <span>{evt.date}</span>
                          <span>·</span>
                          <span>{evt.time}</span>
                          <span>·</span>
                          <span>{evt.cover}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleStartEditEvent(evt)}
                          className="p-1 text-[#B08B50] hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteEvent(evt.id)}
                          className="p-1 text-red-400 hover:text-red-300"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: Specials Manager */}
            {activeTab === 'specials' && (
              <div className="space-y-4">
                <p className="text-xs text-[#F1E7D5]/70">
                  Update timeframes, pricing, and promotional terms for the 4 roadhouse panels.
                </p>
                {localSpecials.map((spec, idx) => (
                  <div
                    key={spec.id}
                    className="p-4 bg-[#151515] border border-[#493225] rounded-xs space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#B08B50] uppercase">
                        Offer 0{idx + 1}: {spec.title}
                      </span>
                      <label className="flex items-center gap-2 cursor-pointer text-[11px] text-[#F1E7D5]/80">
                        <input
                          type="checkbox"
                          checked={spec.active}
                          onChange={(e) => {
                            const updated = [...localSpecials];
                            updated[idx].active = e.target.checked;
                            setLocalSpecials(updated);
                          }}
                          className="accent-[#9C2529]"
                        />
                        <span>Active on Website</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      <div>
                        <label className="text-[10px] text-[#F1E7D5]/50 block">Timeframe</label>
                        <input
                          type="text"
                          value={spec.timeframe}
                          onChange={(e) => {
                            const updated = [...localSpecials];
                            updated[idx].timeframe = e.target.value;
                            setLocalSpecials(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#1c1816] border border-[#493225] rounded-xs text-[#F1E7D5]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#F1E7D5]/50 block">Perk Badge</label>
                        <input
                          type="text"
                          value={spec.perk}
                          onChange={(e) => {
                            const updated = [...localSpecials];
                            updated[idx].perk = e.target.value;
                            setLocalSpecials(updated);
                          }}
                          className="w-full px-2.5 py-1.5 bg-[#1c1816] border border-[#493225] rounded-xs text-[#F1E7D5]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-[#F1E7D5]/50 block">Detail Text</label>
                      <input
                        type="text"
                        value={spec.detail}
                        onChange={(e) => {
                          const updated = [...localSpecials];
                          updated[idx].detail = e.target.value;
                          setLocalSpecials(updated);
                        }}
                        className="w-full px-2.5 py-1.5 bg-[#1c1816] border border-[#493225] rounded-xs text-[#F1E7D5]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 3: Operating Hours */}
            {activeTab === 'hours' && (
              <div className="space-y-3">
                <p className="text-xs text-[#F1E7D5]/70">
                  Update daily operating hours shown on the website and visitor contact section.
                </p>
                {localHours.map((h, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-[#151515] border border-[#493225] rounded-xs grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs items-center"
                  >
                    <span className="font-semibold text-[#F1E7D5]">{h.day}</span>
                    <input
                      type="text"
                      value={h.hours}
                      onChange={(e) => {
                        const updated = [...localHours];
                        updated[idx].hours = e.target.value;
                        setLocalHours(updated);
                      }}
                      className="px-2.5 py-1.5 bg-[#1c1816] border border-[#493225] rounded-xs text-[#F1E7D5]"
                    />
                    <input
                      type="text"
                      placeholder="Note (e.g. Pool Tournament)"
                      value={h.note || ''}
                      onChange={(e) => {
                        const updated = [...localHours];
                        updated[idx].note = e.target.value;
                        setLocalHours(updated);
                      }}
                      className="px-2.5 py-1.5 bg-[#1c1816] border border-[#493225] rounded-xs text-[#F1E7D5]/80"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        {isAuthenticated && (
          <div className="bg-[#241a15] p-4 border-t border-[#493225] flex items-center justify-between">
            <span className="text-[11px] text-[#F1E7D5]/60">
              Changes persist instantly in browser storage.
            </span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#F1E7D5]/80 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleSaveAll}
                className="px-5 py-2 text-xs font-display font-bold uppercase tracking-wider bg-[#B08B50] hover:bg-[#CDB07B] text-[#151515] rounded-xs shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
