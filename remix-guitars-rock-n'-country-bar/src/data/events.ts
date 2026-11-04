import { EventItem } from './types';
import { FALLBACK_IMAGES, normalizeImageUrl } from '../utils/imageUrl';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-1',
    title: 'Crossroads Southern Rock Revival',
    date: 'Friday, Nov 14',
    time: '8:30 PM – 12:30 AM',
    category: 'live-music',
    featuredArtist: 'The Ozark Outlaws',
    genre: 'Southern Rock & Classic Hits',
    cover: '$10 at Door / Free with Cowboy Hat before 8 PM',
    description: 'High-octane dual-guitar rock anthems and outlaw country classics live on the Guitars main stage.',
    badge: 'Live Band',
    image: FALLBACK_IMAGES.liveStage,
  },
  {
    id: 'evt-2',
    title: 'Saturday Night Country Dance & DJ Party',
    date: 'Saturday, Nov 15',
    time: '7:00 PM – 1:30 AM',
    category: 'line-dancing',
    featuredArtist: 'DJ Cody West & Dance Crew',
    genre: 'Modern Country & Dance Rhythms',
    cover: '$5 After 8 PM',
    description: 'Step onto Joplin’s largest hardwood dance floor! Free beginner line dance tutorial at 7:30 PM followed by non-stop country hits.',
    badge: 'Line Dancing',
    image: FALLBACK_IMAGES.lineDance,
  },
  {
    id: 'evt-3',
    title: 'Joplin 8-Ball Showdown Tournament',
    date: 'Thursday, Nov 20',
    time: '8:00 PM Sharp',
    category: 'pool-tournament',
    featuredArtist: 'Hosted by Guitars Billiards Club',
    genre: 'Competitive Billiards',
    cover: '$10 Player Buy-In / Free for Spectators',
    description: 'Double elimination 8-ball bracket on our tournament slate tables. 100% cash payout to top 3 finishers plus bar tab prizes.',
    badge: 'Tournament',
    image: FALLBACK_IMAGES.interior,
  },
  {
    id: 'evt-4',
    title: 'Acoustic Roadhouse Sessions on the Patio',
    date: 'Friday, Nov 21',
    time: '7:30 PM – 10:30 PM',
    category: 'special',
    featuredArtist: 'Jessie Holt & Friends',
    genre: 'Americana & Outlaw Country',
    cover: 'No Cover',
    description: 'Intimate acoustic storyteller sets, cold draft craft beers, and firepit warmth under the stars on our open-air patio bar.',
    badge: 'Patio Acoustic',
    image: FALLBACK_IMAGES.patio,
  },
  {
    id: 'evt-5',
    title: 'Red Dirt & Heavy Country Weekend',
    date: 'Saturday, Nov 22',
    time: '8:00 PM – 1:00 AM',
    category: 'live-music',
    featuredArtist: 'Whiskey Ridge Band',
    genre: 'Red Dirt & Honky Tonk Rock',
    cover: '$10 Cover / Free 7-8 PM',
    description: 'Four hours of relentless Texas and Oklahoma red dirt favorites, soaring fiddles, and driving guitar riffs.',
    badge: 'Live Band',
    image: FALLBACK_IMAGES.crowd,
  },
  {
    id: 'evt-6',
    title: 'Line Dance Boot Camp & Mixer',
    date: 'Wednesday, Nov 26',
    time: '7:00 PM – 10:00 PM',
    category: 'line-dancing',
    featuredArtist: 'Instructor Sarah Vance',
    genre: 'Line Dancing Lessons & Social',
    cover: 'Free Admission',
    description: 'Beginner-friendly step-by-step breakdown of trending and classic line dances. No partner needed! Drink specials all night.',
    badge: 'Dance Workshop',
    image: FALLBACK_IMAGES.lineDance,
  },
];

const STORAGE_KEY_EVENTS = 'guitars_bar_events_v2';
const LEGACY_STORAGE_KEY_EVENTS = 'guitars_bar_events_v1';

export function getStoredEvents(): EventItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS) || localStorage.getItem(LEGACY_STORAGE_KEY_EVENTS);
    if (raw) {
      const parsed: EventItem[] = JSON.parse(raw);
      // Normalize all image paths so legacy /src/assets/images/ paths are healed
      const normalized = parsed.map((item) => ({
        ...item,
        image: normalizeImageUrl(item.image, FALLBACK_IMAGES.liveStage),
      }));
      return normalized;
    }
  } catch (e) {
    console.error('Failed to load stored events', e);
  }
  return INITIAL_EVENTS;
}

export function saveStoredEvents(events: EventItem[]) {
  try {
    const normalized = events.map((item) => ({
      ...item,
      image: normalizeImageUrl(item.image, FALLBACK_IMAGES.liveStage),
    }));
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(normalized));
  } catch (e) {
    console.error('Failed to save events', e);
  }
}
