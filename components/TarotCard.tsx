import React from 'react';
import { ITarotCard } from '../types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface TarotCardProps {
  card?: ITarotCard;
  isRevealed?: boolean;
  isReversed?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  showDetails?: boolean;
  positionLabel?: string;
  index?: number;
}

const TarotCard: React.FC<TarotCardProps> = ({ 
  card, 
  isRevealed = false, 
  isReversed = false, 
  onClick, 
  disabled = false,
  showDetails = false,
  positionLabel,
  index = 0
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={clsx(
        "relative w-40 h-64 md:w-48 md:h-72 cursor-pointer perspective-1000",
        disabled && "cursor-default pointer-events-none opacity-50"
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {/* Position Label (Floating above) */}
      {positionLabel && (
        <div className="absolute -top-8 left-0 right-0 text-center">
          <span className="text-amber-200/80 font-serif text-xs tracking-widest uppercase bg-slate-950/50 px-2 py-1 rounded-full backdrop-blur-md border border-amber-900/30">
            {positionLabel}
          </span>
        </div>
      )}

      {/* Card Container with Flip */}
      <motion.div
        className="w-full h-full relative card-preserve-3d transition-all duration-700"
        animate={{ rotateY: isRevealed ? 180 : 0 }}
      >
        {/* Card Back */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden border-2 border-amber-900/30 shadow-xl bg-slate-900">
          <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] bg-repeat opacity-50 absolute inset-0"></div>
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-950 to-slate-950">
            <div className="border-4 border-amber-700/40 w-[90%] h-[90%] rounded-lg flex items-center justify-center">
               <div className="w-12 h-12 rounded-full border-2 border-amber-600/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_#f59e0b]"></div>
               </div>
            </div>
          </div>
        </div>

        {/* Card Front */}
        <div className={clsx(
            "absolute inset-0 w-full h-full backface-hidden rounded-xl overflow-hidden shadow-2xl rotate-y-180 bg-slate-900 border border-amber-800",
            isReversed && "rotate-180" // If reversed, we rotate the content itself 180 deg
          )}
        >
          {card && (
            <>
              {/* Image */}
              <div className="h-[65%] w-full relative overflow-hidden">
                <img src={card.image} alt={card.name} className="w-full h-full object-cover opacity-90 hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>

              {/* Text Content */}
              <div className={clsx("h-[35%] p-3 flex flex-col items-center justify-center text-center bg-slate-900 relative z-10", isReversed && "rotate-180")}>
                <h4 className="text-amber-100 font-serif text-sm md:text-base font-bold mb-1 leading-tight">{card.name}</h4>
                <p className="text-amber-500/80 text-[10px] uppercase tracking-widest">{card.arcana}</p>
                {showDetails && (
                  <p className="text-slate-300 text-xs mt-2 line-clamp-3 leading-relaxed">
                     {isReversed ? card.meaningReversed : card.meaningUpright}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TarotCard;