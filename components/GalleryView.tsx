import React, { useState, useEffect } from 'react';
import { TAROT_DECK } from '../constants';
import { ITarotCard, ArcanaType, Suit } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye } from 'lucide-react';

const GalleryView: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedCard, setSelectedCard] = useState<ITarotCard | null>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedCard) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedCard]);

  const filters = ['All', 'Major', ...Object.values(Suit).filter(s => s !== 'None')];

  const filteredDeck = TAROT_DECK.filter(card => {
    if (filter === 'All') return true;
    if (filter === 'Major') return card.arcana === ArcanaType.Major;
    return card.suit === filter;
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-amber-100 mb-3">Arcana Compendium</h2>
        <div className="h-0.5 w-24 md:w-32 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mb-6 md:mb-8"></div>
        
        {/* Filter Tabs - Horizontal Scroll on mobile */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 px-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest border transition-all duration-300 ${
                filter === f 
                  ? 'bg-amber-900/40 border-amber-500 text-amber-200 shadow-[0_0_10px_rgba(251,191,36,0.2)]' 
                  : 'bg-slate-900/40 border-slate-700 text-slate-400 hover:border-amber-700 hover:text-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid - 2 columns on mobile, increasing up to 6 on lg */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6">
        {filteredDeck.map((card) => (
          <motion.div
            key={card.id}
            layoutId={`card-${card.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCard(card)}
            className="cursor-pointer group relative aspect-[2/3] rounded-lg overflow-hidden border border-amber-900/30 hover:border-amber-400/80 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] shadow-lg bg-slate-900 transition-all duration-300"
          >
            <img src={card.image} alt={card.name} loading="lazy" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* View Details Indicator - New Feature */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                <div className="bg-black/50 p-3 rounded-full backdrop-blur-sm border border-amber-500/50">
                    <Eye className="w-6 h-6 text-amber-300" />
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-3 pt-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-amber-100 text-[10px] md:text-xs font-serif text-center uppercase tracking-wider">{card.name}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-amber-800/50 rounded-2xl w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[85vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white z-50 p-2 bg-black/40 backdrop-blur rounded-full hover:bg-amber-900/40 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-2/5 h-[40vh] md:h-auto md:min-h-[600px] p-6 bg-black/30 flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-900/20 to-transparent"></div>
                 <motion.div layoutId={`card-${selectedCard.id}`} className="relative h-full w-auto aspect-[2/3] rounded-xl overflow-hidden shadow-2xl border border-amber-900/50">
                  <img src={selectedCard.image} alt={selectedCard.name} className="w-full h-full object-cover" />
                </motion.div>
              </div>

              {/* Details Section - Scrollable */}
              <div className="w-full md:w-3/5 p-6 md:p-10 overflow-y-auto custom-scrollbar bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-5xl font-serif text-amber-100 mb-3">{selectedCard.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.keywords.map(k => (
                      <span key={k} className="text-[10px] md:text-xs uppercase tracking-wider text-amber-400 bg-amber-950/40 border border-amber-900/30 px-3 py-1 rounded-full">
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-8 text-slate-300 leading-relaxed font-light">
                  <div>
                    <h4 className="text-amber-200 font-serif text-sm uppercase tracking-widest mb-3 border-b border-amber-900/30 pb-1 inline-block">Description</h4>
                    <p className="text-sm md:text-base text-slate-300/90">{selectedCard.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div className="bg-emerald-950/20 border border-emerald-900/30 p-5 rounded-xl">
                      <h4 className="text-emerald-400 font-serif text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Upright
                      </h4>
                      <p className="text-sm md:text-base text-emerald-100/80">{selectedCard.meaningUpright}</p>
                    </div>
                    <div className="bg-rose-950/20 border border-rose-900/30 p-5 rounded-xl">
                      <h4 className="text-rose-400 font-serif text-xs uppercase tracking-widest mb-2 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span> Reversed
                      </h4>
                      <p className="text-sm md:text-base text-rose-100/80">{selectedCard.meaningReversed}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryView;