import React from 'react';
import { BookOpen, Sparkles, Home } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
  currentView: 'home' | 'reading' | 'gallery';
  onChangeView: (view: 'home' | 'reading' | 'gallery') => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reading', label: 'Reading', icon: Sparkles },
    { id: 'gallery', label: 'Compendium', icon: BookOpen },
  ] as const;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-4 pointer-events-none">
      <div className="bg-slate-950/80 backdrop-blur-md border border-amber-900/30 rounded-full px-6 py-2 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.5)] flex gap-8">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={clsx(
                "flex items-center gap-2 text-sm font-serif tracking-widest uppercase transition-all duration-300",
                isActive 
                  ? "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" 
                  : "text-slate-400 hover:text-amber-100"
              )}
            >
              <Icon className={clsx("w-4 h-4", isActive && "animate-pulse")} />
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;