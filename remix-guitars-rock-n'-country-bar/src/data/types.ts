export interface EventItem {
  id: string;
  title: string;
  date: string; // e.g. "Friday, Nov 14"
  time: string; // e.g. "8:00 PM – Midnight"
  category: 'live-music' | 'line-dancing' | 'dj-night' | 'pool-tournament' | 'special';
  featuredArtist?: string;
  genre?: string;
  cover?: string; // e.g. "$5 Cover" or "No Cover"
  description: string;
  badge?: string;
  image?: string;
}

export interface SpecialItem {
  id: string;
  title: string;
  timeframe: string;
  detail: string;
  perk: string;
  subtext?: string;
  active: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'shows' | 'dancing' | 'patio' | 'atmosphere';
  caption: string;
  imageUrl: string;
  aspect?: string;
}

export interface JukeboxTrack {
  id: string;
  title: string;
  artist: string;
  genre: 'Classic Rock' | 'Outlaw Country' | 'Roadhouse Blues' | 'Southern Rock';
  year: string;
  bpm: number;
  riffKey: string;
  notesPattern: number[];
}

export interface ReservationRequest {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  boothType: 'vip-main-stage' | 'dance-floor-rail' | 'patio-lounge' | 'pool-hall-booth';
  specialOccasion?: string;
  notes?: string;
  createdAt: string;
  status: 'pending' | 'confirmed';
}

export interface VenueHours {
  day: string;
  hours: string;
  note?: string;
}
