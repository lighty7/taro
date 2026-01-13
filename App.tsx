import React, { useState, useCallback, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import SpreadSelector from './components/SpreadSelector';
import DeckView from './components/DeckView';
import ReadingArea from './components/ReadingArea';
import Navbar from './components/Navbar';
import GalleryView from './components/GalleryView';
import { ITarotCard, SpreadType, IReadingCard, ISpreadConfig } from './types';
import { TAROT_DECK, SPREADS } from './constants';
import { motion, AnimatePresence } from 'framer-motion';

// Shuffle helper
const shuffleDeck = (deck: ITarotCard[]) => {
  // Fisher-Yates shuffle for true randomness
  const newDeck = [...deck];
  for (let i = newDeck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
  }
  return newDeck;
};

const App: React.FC = () => {
  // View State
  const [currentView, setCurrentView] = useState<'home' | 'reading' | 'gallery'>('home');
  
  // Reading State
  const [readingPhase, setReadingPhase] = useState<'selection' | 'reading'>('selection');
  const [spreadType, setSpreadType] = useState<SpreadType>(SpreadType.ThreeCard);
  const [deck, setDeck] = useState<ITarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<IReadingCard[]>([]);

  const currentSpreadConfig: ISpreadConfig = SPREADS[spreadType];
  const requiredCards = currentSpreadConfig.positions.length;
  const cardsNeeded = requiredCards - selectedCards.length;

  // Initialize a shuffled deck whenever we enter the Reading view or reset
  const initReading = useCallback(() => {
    setDeck(shuffleDeck(TAROT_DECK));
    setSelectedCards([]);
    setReadingPhase('selection');
  }, []);

  // Handle View Switching
  const handleViewChange = (view: 'home' | 'reading' | 'gallery') => {
    if (view === 'reading' && currentView !== 'reading') {
      initReading(); // Ensure fresh deck on entry
    }
    setCurrentView(view);
  };

  const handleSpreadSelect = (type: SpreadType) => {
    setSpreadType(type);
    setSelectedCards([]); 
    setDeck(shuffleDeck(TAROT_DECK)); // Reshuffle for new spread
  };

  const handleCardSelect = useCallback((card: ITarotCard) => {
    if (selectedCards.length >= requiredCards) return;

    const positionIndex = selectedCards.length;
    const isReversed = Math.random() > 0.8; // 20% chance of reversal

    const newReadingCard: IReadingCard = {
      card,
      isReversed,
      positionName: currentSpreadConfig.positions[positionIndex]
    };

    const newSelection = [...selectedCards, newReadingCard];
    setSelectedCards(newSelection);

    if (newSelection.length === requiredCards) {
      setTimeout(() => {
        setReadingPhase('reading');
      }, 800);
    }
  }, [selectedCards, requiredCards, currentSpreadConfig]);

  const handleResetReading = () => {
    initReading();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 relative overflow-x-hidden selection:bg-amber-900/30 selection:text-amber-100 font-sans">
      <StarBackground />
      
      <Navbar currentView={currentView} onChangeView={handleViewChange} />

      <main className="relative z-10 pt-20 min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* HOME VIEW */}
          {currentView === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              className="flex-1 flex flex-col items-center justify-center p-6 text-center"
            >
               <div className="mb-8 relative">
                 <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full"></div>
                 <h1 className="relative text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-amber-50 via-amber-200 to-amber-700 drop-shadow-2xl">
                    Celestia
                 </h1>
               </div>
               <p className="text-amber-100/60 tracking-[0.4em] uppercase text-sm md:text-lg mb-12 font-light">
                 The Oracle of the Stars
               </p>

               <div className="flex flex-col md:flex-row gap-6">
                 <button 
                    onClick={() => handleViewChange('reading')}
                    className="group relative px-8 py-4 bg-slate-900/50 border border-amber-500/30 hover:border-amber-400 rounded-xl overflow-hidden transition-all duration-300 w-64"
                 >
                    <div className="absolute inset-0 bg-amber-900/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative font-serif text-xl text-amber-100 group-hover:tracking-wider transition-all">Begin Reading</span>
                 </button>

                 <button 
                    onClick={() => handleViewChange('gallery')}
                    className="group relative px-8 py-4 bg-slate-900/50 border border-slate-600/30 hover:border-slate-400 rounded-xl overflow-hidden transition-all duration-300 w-64"
                 >
                    <div className="absolute inset-0 bg-slate-800/50 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                    <span className="relative font-serif text-xl text-slate-300 group-hover:text-white transition-colors">View Deck</span>
                 </button>
               </div>
            </motion.div>
          )}

          {/* GALLERY VIEW */}
          {currentView === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1"
            >
              <GalleryView />
            </motion.div>
          )}

          {/* READING VIEW */}
          {currentView === 'reading' && (
            <motion.div
              key="reading-container"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col"
            >
               <AnimatePresence mode="wait">
                  {readingPhase === 'selection' && (
                    <motion.div
                      key="selection"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex-1 flex flex-col"
                    >
                      {selectedCards.length === 0 && (
                        <div className="mb-4">
                          <SpreadSelector selectedSpread={spreadType} onSelect={handleSpreadSelect} />
                        </div>
                      )}

                      {selectedCards.length > 0 && (
                         <div className="flex justify-center gap-4 mb-4 h-24 items-end">
                            {Array.from({ length: requiredCards }).map((_, i) => (
                              <div key={i} className="w-10 h-16 md:w-14 md:h-24 rounded border border-amber-900/50 bg-slate-900/50 flex items-center justify-center relative">
                                 {selectedCards[i] ? (
                                   <motion.div layoutId={`mini-${selectedCards[i].card.id}`} className="w-full h-full bg-amber-900/80"></motion.div>
                                 ) : (
                                   <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                                 )}
                              </div>
                            ))}
                         </div>
                      )}

                      <DeckView 
                        deck={deck} 
                        selectedCardIds={selectedCards.map(c => c.card.id)} 
                        onCardSelect={handleCardSelect}
                        cardsNeeded={cardsNeeded}
                      />
                    </motion.div>
                  )}

                  {readingPhase === 'reading' && (
                    <motion.div
                      key="reading-result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1"
                    >
                      <ReadingArea 
                        cards={selectedCards} 
                        spreadConfig={currentSpreadConfig} 
                        onReset={handleResetReading} 
                      />
                    </motion.div>
                  )}
               </AnimatePresence>
            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;