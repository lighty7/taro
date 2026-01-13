import React, { useEffect, useState } from 'react';
import { IReadingCard, ISpreadConfig } from '../types';
import TarotCard from './TarotCard';
import { motion } from 'framer-motion';
import { Sparkles, RefreshCcw } from 'lucide-react';
import { generateReadingSynthesis } from '../services/geminiService';

interface ReadingAreaProps {
  cards: IReadingCard[];
  spreadConfig: ISpreadConfig;
  onReset: () => void;
}

const ReadingArea: React.FC<ReadingAreaProps> = ({ cards, spreadConfig, onReset }) => {
  const [synthesis, setSynthesis] = useState<string>("");

  useEffect(() => {
    const fetchSynthesis = async () => {
        const text = await generateReadingSynthesis(cards, spreadConfig.name);
        setSynthesis(text);
    };
    fetchSynthesis();
  }, [cards, spreadConfig.name]);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8 min-h-screen flex flex-col">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 mb-3 drop-shadow-[0_0_10px_rgba(251,191,36,0.5)]">
          {spreadConfig.name}
        </h2>
        <div className="h-1 w-16 md:w-24 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>
      </div>

      {/* Cards Spread */}
      <div className="flex flex-wrap justify-center items-start gap-8 md:gap-12 mb-12 md:mb-16 min-h-[300px]">
        {cards.map((readingCard, index) => (
          <div key={readingCard.card.id} className="flex flex-col items-center group w-40 md:w-48">
             <TarotCard
                card={readingCard.card}
                isRevealed={true}
                isReversed={readingCard.isReversed}
                positionLabel={readingCard.positionName}
                index={index}
                showDetails={false} 
              />
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.2) }}
                className="mt-6 w-full text-center"
              >
                  <h4 className="text-amber-300 font-serif text-lg mb-2">{readingCard.card.name}</h4>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed px-2">
                      {readingCard.isReversed ? readingCard.card.meaningReversed : readingCard.card.meaningUpright}
                  </p>
              </motion.div>
          </div>
        ))}
      </div>

      {/* Synthesis Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: cards.length * 0.3 + 0.5 }}
        className="max-w-3xl mx-auto bg-slate-900/50 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-amber-900/30 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
        
        <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="text-xl md:text-2xl font-serif text-amber-100">The Interpretation</h3>
            <Sparkles className="w-5 h-5 text-amber-300" />
        </div>

        {synthesis ? (
            <p className="text-amber-50/90 text-base md:text-xl leading-loose text-center font-light italic animate-in fade-in duration-1000">
                "{synthesis}"
            </p>
        ) : (
            <div className="h-24 flex items-center justify-center text-amber-500/50 italic">
                Consulting the spirits...
            </div>
        )}
      </motion.div>

      {/* Action Bar */}
      <div className="mt-12 flex justify-center pb-20">
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-8 py-3 bg-amber-900/20 border border-amber-600/40 rounded-full text-amber-200 hover:bg-amber-900/40 hover:border-amber-500 transition-all duration-300 group"
        >
          <RefreshCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
          <span className="font-serif tracking-widest uppercase text-sm">New Reading</span>
        </button>
      </div>
    </div>
  );
};

export default ReadingArea;