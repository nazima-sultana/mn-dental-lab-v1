import React, { useState } from 'react';
import { Image as ImageIcon, X, ZoomIn, Tag, MessageCircle } from 'lucide-react';
import { GalleryItem, BusinessInfo } from '../types';

interface GalleryProps {
  gallery: GalleryItem[];
  business: BusinessInfo;
}

export const Gallery: React.FC<GalleryProps> = ({ gallery, business }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(gallery.map(item => item.category)))];

  const filteredGallery = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold tracking-wide uppercase">
            <ImageIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Clinical Work Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sample Dental Restorations & Prosthetics
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Exemplifying our precision in esthetic crowns, multi-unit bridges, custom titanium implant abutments, and balanced complete dentures.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-500/20'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
            >
              {/* Image box */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="p-3 rounded-full bg-white/90 backdrop-blur-md text-blue-900 shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn className="w-6 h-6" />
                  </div>
                </div>

                {/* Tag badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-slate-900/80 backdrop-blur-md text-sky-300 border border-white/10">
                    <Tag className="w-3 h-3 text-cyan-300" />
                    {item.tag || item.category}
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-blue-700 transition-colors mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold">
                  <span>{item.category}</span>
                  <span className="text-slate-400 group-hover:text-blue-600 transition-colors">
                    Click to inspect &rarr;
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveItem(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                <img
                  src={activeItem.imageUrl}
                  alt={activeItem.title}
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
                <button
                  onClick={() => setActiveItem(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-900 transition-colors focus:outline-none"
                  aria-label="Close photo preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                    {activeItem.category}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Tag: {activeItem.tag}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {activeItem.title}
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {activeItem.description}
                </p>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-slate-500">
                    Fabricated by Mohd. Ahmed Uddin • M.N Dental Laboratory
                  </span>

                  <a
                    href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                      `Hello Mohd. Ahmed Uddin, I saw this restoration (${activeItem.title}) on your website and would like to order a similar case.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire About Similar Case</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
