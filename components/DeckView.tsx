import React, { useMemo } from 'react';
import { ITarotCard } from '../types';
import { motion } from 'framer-motion';

interface DeckViewProps {
  deck: ITarotCard[];
  selectedCardIds: number[];
  onCardSelect: (card: ITarotCard) => void;
  cardsNeeded: number;
}

const DeckView: React.FC<DeckViewProps> = ({ deck, selectedCardIds, onCardSelect, cardsNeeded }) => {
  // Generate random visual offsets once per deck load
  const visualOffsets = useMemo(() => {
    return deck.map(() => ({
      rotation: Math.random() * 8 - 4, // Slightly more rotation for chaos
      x: Math.random() * 6 - 3,       
      y: Math.random() * 10 - 5,      
    }));
  }, [deck]);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 md:px-4 pb-20 pt-4 md:pt-8 flex flex-col items-center">
      <div className="text-center mb-8 md:mb-12 relative z-10 pointer-events-none sticky top-24 md:top-28">
         <motion.h3 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={cardsNeeded}
            className="text-amber-100/90 font-serif uppercase tracking-[0.15em] text-xs md:text-sm bg-slate-950/80 inline-block px-6 py-3 rounded-full backdrop-blur-xl border border-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.2)]"
         >
            {cardsNeeded === 0 ? "Spread Complete" : `Draw ${cardsNeeded} Card${cardsNeeded !== 1 ? 's' : ''}`}
         </motion.h3>
      </div>
      
      {/* 
        Flex container with flex-wrap. 
        Adjusted margins and sizes for better mobile experience.
      */}
      <div className="flex flex-wrap justify-center content-start gap-y-2 px-2 md:px-12 w-full min-h-[50vh]">
        {deck.map((card, i) => {
          const isSelected = selectedCardIds.includes(card.id);
          const offset = visualOffsets[i];

          if (isSelected) return null;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotate: offset.rotation,
                x: offset.x,
                translateY: offset.y
              }}
              transition={{ 
                duration: 0.4, 
                delay: Math.min(i * 0.01, 1), // Cap delay so large decks don't take forever
                type: "spring",
                stiffness: 60
              }}
              whileHover={{ 
                y: -40, 
                scale: 1.15,
                rotate: 0,
                zIndex: 100,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
              className="relative -ml-5 md:-ml-8 mb-4 md:mb-6 transition-all duration-300"
              style={{ zIndex: i }} 
            >
               <div 
                  className="w-16 h-28 sm:w-20 sm:h-32 md:w-32 md:h-52 bg-slate-800 rounded-lg border border-amber-900/40 cursor-pointer shadow-lg hover:shadow-[0_0_30px_rgba(251,191,36,0.5),0_0_60px_rgba(124,58,237,0.3)] hover:border-amber-400/80 group overflow-hidden relative transition-all duration-300"
                  onClick={() => onCardSelect(card)}
               >
                   {/* Card Back Texture */}
                   <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] bg-repeat opacity-40 group-hover:opacity-60 transition-opacity"></div>
                   
                   {/* Mystic Center Symbol */}
                   <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-8 h-8 md:w-16 md:h-16 border border-amber-700/30 rotate-45 flex items-center justify-center animate-[spin_10s_linear_infinite] group-hover:animate-[spin_3s_linear_infinite]">
                        <div className="w-6 h-6 md:w-12 md:h-12 border border-amber-700/30 rotate-45"></div>
                      </div>
                   </div>

                   {/* Shimmer Effect */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent translate-y-full group-hover:translate-y-[-100%] transition-transform duration-700 ease-in-out"></div>
               </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DeckView;