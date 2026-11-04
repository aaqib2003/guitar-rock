import { GalleryItem } from './types';
import { FALLBACK_IMAGES } from '../utils/imageUrl';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Guitars Roadhouse Exterior at Twilight',
    category: 'atmosphere',
    caption: 'The unmistakable neon and timber facade of Guitars Rock N\' Country Bar lighting up West 7th Street in Joplin.',
    imageUrl: FALLBACK_IMAGES.hero,
    aspect: 'col-span-2 row-span-2',
  },
  {
    id: 'gal-2',
    title: 'Electrifying Live Stage Performance',
    category: 'shows',
    caption: 'Full-throttle guitar solos and live rock energy under the stage lights on Joplin’s favorite live music stage.',
    imageUrl: FALLBACK_IMAGES.liveStage,
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'gal-3',
    title: 'Packed Concert Crowd Cheering',
    category: 'shows',
    caption: 'Enthusiastic crowd singing along and hands raised under the warm stage glow of Guitars Rock N\' Country Bar.',
    imageUrl: FALLBACK_IMAGES.crowd,
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'gal-4',
    title: 'Country Line Dancing in Full Swing',
    category: 'dancing',
    caption: 'Boot-stomping rhythm on Joplin’s favorite hardwood dance floor during our weekly dance nights.',
    imageUrl: FALLBACK_IMAGES.lineDance,
    aspect: 'col-span-1 row-span-2',
  },
  {
    id: 'gal-5',
    title: 'Rustic Outdoor Patio Bar at Night',
    category: 'patio',
    caption: 'Warm string lights, cold craft beer, and comfortable bench seating under the Missouri night sky.',
    imageUrl: FALLBACK_IMAGES.patio,
    aspect: 'col-span-1 row-span-1',
  },
  {
    id: 'gal-6',
    title: 'Handcrafted Walnut Bar & 8-Ball Slate',
    category: 'atmosphere',
    caption: 'Vintage guitars mounted on exposed brick, cold tap selection, and tournament-grade billiards.',
    imageUrl: FALLBACK_IMAGES.interior,
    aspect: 'col-span-2 row-span-1',
  },
  {
    id: 'gal-7',
    title: 'Cold Craft Beer & Top-Shelf Whiskey Bar',
    category: 'atmosphere',
    caption: 'Frosted beer steins and craft cocktails served over a solid oak bar top under vibrant neon signs.',
    imageUrl: FALLBACK_IMAGES.drinks,
    aspect: 'col-span-1 row-span-1',
  },
];
