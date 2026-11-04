/**
 * Utility for robust image URL resolution and graceful fallback handling
 */

export const FALLBACK_IMAGES = {
  hero: '/images/hero_exterior.jpg',
  liveStage: '/images/live_stage.jpg',
  lineDance: '/images/line_dance.jpg',
  patio: '/images/patio_bar.jpg',
  interior: '/images/interior_bar.jpg',
  crowd: '/images/crowd_live_show.jpg',
  drinks: '/images/drinks_bar.jpg',
};

/**
 * Normalizes any image URL so both legacy /src/assets/images/... paths
 * and clean /images/... paths resolve seamlessly.
 */
export function normalizeImageUrl(
  url: string | undefined | null,
  fallback: string = FALLBACK_IMAGES.liveStage
): string {
  if (!url || typeof url !== 'string') return fallback;

  let clean = url.trim();

  // If path is from older src/assets/images/ references, map to /images/
  if (clean.startsWith('/src/assets/images/')) {
    clean = clean.replace('/src/assets/images/', '/images/');
  } else if (clean.startsWith('src/assets/images/')) {
    clean = '/' + clean.replace('src/assets/images/', 'images/');
  }

  // Handle specific filename aliases
  if (clean.includes('hero_venue_exterior')) return FALLBACK_IMAGES.hero;
  if (clean.includes('live_stage_performance')) return FALLBACK_IMAGES.liveStage;
  if (clean.includes('line_dance_floor')) return FALLBACK_IMAGES.lineDance;
  if (clean.includes('patio_bar_evening')) return FALLBACK_IMAGES.patio;
  if (clean.includes('interior_bar_pool')) return FALLBACK_IMAGES.interior;
  if (clean.includes('crowd_live_show')) return FALLBACK_IMAGES.crowd;
  if (clean.includes('drinks_bar_tap')) return FALLBACK_IMAGES.drinks;

  return clean;
}

/**
 * Image onError handler to prevent broken image icons.
 * If the requested image fails to load, gracefully falls back to the safe image.
 */
export function handleImageError(
  e: React.SyntheticEvent<HTMLImageElement, Event>,
  fallbackSrc: string = FALLBACK_IMAGES.hero
) {
  const target = e.currentTarget;
  // Prevent infinite loops if fallback itself fails
  if (target.dataset.hasFailed) return;
  target.dataset.hasFailed = 'true';
  target.src = fallbackSrc;
}
