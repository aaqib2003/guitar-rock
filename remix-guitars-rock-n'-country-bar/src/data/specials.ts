import { SpecialItem } from './types';

export const INITIAL_SPECIALS: SpecialItem[] = [
  {
    id: 'special-happy-hour',
    title: 'HAPPY HOUR',
    timeframe: '7:00 PM – 8:00 PM',
    detail: 'Early evening drink specials across all domestic drafts & well spirits.',
    perk: 'Special Happy Hour Pricing',
    subtext: 'Kick off your evening with cold drafts and roadhouse hospitality.',
    active: true,
  },
  {
    id: 'special-pool-tournament',
    title: '8-BALL POOL TOURNAMENT',
    timeframe: 'Every Thursday & Sunday at 8:00 PM',
    detail: 'Double elimination 8-ball bracket on our tournament slate tables.',
    perk: '$10 Buy-In · Cash Payouts',
    subtext: 'Sign-ups open at 7:30 PM. All skill levels welcome.',
    active: true,
  },
  {
    id: 'special-no-cover-early',
    title: 'EARLY ENTRY NO COVER',
    timeframe: '7:00 PM – 8:00 PM Nightly',
    detail: 'Walk right through the doors with zero cover charge during the first hour.',
    perk: 'Free Admission 7 PM – 8 PM',
    subtext: 'Get inside early, grab your favorite bar stool, and beat the weekend rush.',
    active: true,
  },
  {
    id: 'special-cowboy-military',
    title: 'COWBOY HAT & MILITARY SPECIAL',
    timeframe: 'All Night Every Weekend',
    detail: 'Wear your authentic western cowboy hat or present valid active/veteran Military ID.',
    perk: 'Zero Cover All Night',
    subtext: 'Honoring our country culture and the men and women who serve.',
    active: true,
  },
];

const STORAGE_KEY_SPECIALS = 'guitars_bar_specials_v1';

export function getStoredSpecials(): SpecialItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SPECIALS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Failed to load stored specials', e);
  }
  return INITIAL_SPECIALS;
}

export function saveStoredSpecials(specials: SpecialItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY_SPECIALS, JSON.stringify(specials));
  } catch (e) {
    console.error('Failed to save specials', e);
  }
}
