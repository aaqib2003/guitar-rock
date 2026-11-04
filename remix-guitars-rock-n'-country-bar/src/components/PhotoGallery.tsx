import React, { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/gallery';
import { GalleryItem } from '../data/types';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { normalizeImageUrl, handleImageError, FALLBACK_IMAGES } from '../utils/imageUrl';

export const PhotoGallery: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'shows' | 'dancing' | 'patio' | 'atmosphere'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Photos' },
    { id: 'shows', label: 'Live Shows' },
    { id: 'dancing', label: 'Dance Floor' },
    { id: 'patio', label: 'Patio Bar' },
    { id: 'atmosphere', label: 'Atmosphere & Bar' },
  ];

  const filteredItems =
    selectedFilter === 'all'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedFilter);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-24 bg-[#151515] relative border-b border-[#493225]/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="h-[1px] w-8 bg-[#9C2529]" />
            <span className="text-xs font-bold tracking-[0.25em] text-[#9C2529] uppercase">
              PHOTO GALLERY · INSIDE GUITARS
            </span>
            <span className="h-[1px] w-8 bg-[#9C2529]" />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-tight text-[#F1E7D5]">
            THE MUSIC. THE PEOPLE. <br className="hidden sm:inline" />
            <span className="text-[#B08B50]">THE MEMORIES.</span>
          </h2>
          <p className="mt-4 text-[#F1E7D5]/70 text-base">
            Take a visual tour inside Joplin’s legendary roadhouse, from the thundering live stage and hardwood dance floor to our open-air patio bar.
          </p>
        </div>

        {/* Filter Segmented Buttons */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
              className={`px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-xs whitespace-nowrap transition-colors border ${
                selectedFilter === tab.id
                  ? 'bg-[#B08B50] text-[#151515] border-[#B08B50] font-bold shadow-md'
                  : 'bg-[#241a15] text-[#F1E7D5]/75 border-[#493225] hover:border-[#B08B50] hover:text-[#F1E7D5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Editorial Asymmetrical Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative cursor-pointer overflow-hidden rounded-xs border border-[#493225] hover:border-[#B08B50] bg-[#2A1C15] shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                <img
                  src={normalizeImageUrl(item.imageUrl, FALLBACK_IMAGES.hero)}
                  alt={item.title}
                  onError={(e) => handleImageError(e, FALLBACK_IMAGES.hero)}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151515]/90 via-[#151515]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover Maximize Button */}
                <div className="absolute top-3 right-3 p-2 bg-[#151515]/80 text-[#B08B50] border border-[#493225] rounded-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B08B50]">
                    {item.category.toUpperCase()}
                  </span>
                  <h3 className="font-display text-lg font-bold uppercase text-[#F1E7D5] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F1E7D5]/75 mt-1 line-clamp-2">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-md animate-in fade-in duration-200">
            {/* Close Button */}
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-5 right-5 z-50 p-3 text-[#F1E7D5] hover:text-[#9C2529] bg-[#241a15]/80 rounded-xs border border-[#493225] transition-colors"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev / Next Buttons */}
            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : 0
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-[#F1E7D5] hover:text-[#B08B50] bg-[#241a15]/80 rounded-xs border border-[#493225] transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setLightboxIndex((prev) =>
                  prev !== null ? (prev + 1) % filteredItems.length : 0
                )
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-[#F1E7D5] hover:text-[#B08B50] bg-[#241a15]/80 rounded-xs border border-[#493225] transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Active Image & Caption */}
            <div className="max-w-4xl w-full flex flex-col items-center">
              <div className="relative max-h-[75vh] w-full flex items-center justify-center overflow-hidden border border-[#493225] rounded-xs shadow-2xl bg-[#151515]">
                <img
                  src={normalizeImageUrl(filteredItems[lightboxIndex].imageUrl, FALLBACK_IMAGES.hero)}
                  alt={filteredItems[lightboxIndex].title}
                  onError={(e) => handleImageError(e, FALLBACK_IMAGES.hero)}
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center max-w-2xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B08B50]">
                  Photo {lightboxIndex + 1} of {filteredItems.length}
                </span>
                <h4 className="font-display text-2xl font-bold uppercase text-[#F1E7D5] mt-1">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <p className="text-sm text-[#F1E7D5]/80 mt-1">
                  {filteredItems[lightboxIndex].caption}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
