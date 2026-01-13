import React from 'react';
import { SPREADS } from '../constants';
import { SpreadType } from '../types';
import { LayoutDashboard, Layers, Sparkles } from 'lucide-react';
import clsx from 'clsx';

interface SpreadSelectorProps {
  selectedSpread: SpreadType;
  onSelect: (type: SpreadType) => void;
}

const SpreadSelector: React.FC<SpreadSelectorProps> = ({ selectedSpread, onSelect }) => {
  return (
    <div className="flex flex-col items-center space-y-6 z-10 relative max-w-4xl mx-auto px-4">
      <h2 className="text-3xl font-serif text-amber-100 text-center mb-4 tracking-widest drop-shadow-lg">
        Choose Your Path
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {Object.values(SPREADS).map((spread) => {
          const isSelected = selectedSpread === spread.type;
          return (
            <button
              key={spread.type}
              onClick={() => onSelect(spread.type)}
              className={clsx(
                "group relative p-6 rounded-xl border border-amber-900/50 backdrop-blur-sm transition-all duration-300 overflow-hidden",
                isSelected 
                  ? "bg-amber-900/30 border-amber-400/50 shadow-[0_0_20px_rgba(251,191,36,0.2)]" 
                  : "bg-slate-900/40 hover:bg-slate-800/60 hover:border-amber-700/50"
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 via-amber-500/0 to-amber-500/5 group-hover:via-amber-500/10 transition-all duration-500" />
              
              <div className="flex flex-col items-center text-center space-y-3 relative z-10">
                {spread.type === 1 && <Sparkles className={clsx("w-8 h-8", isSelected ? "text-amber-300" : "text-slate-500")} />}
                {spread.type === 3 && <LayoutDashboard className={clsx("w-8 h-8", isSelected ? "text-amber-300" : "text-slate-500")} />}
                {spread.type === 5 && <Layers className={clsx("w-8 h-8", isSelected ? "text-amber-300" : "text-slate-500")} />}
                
                <h3 className={clsx("text-xl font-serif", isSelected ? "text-amber-200" : "text-slate-300")}>
                  {spread.name}
                </h3>
                <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                  {spread.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SpreadSelector;