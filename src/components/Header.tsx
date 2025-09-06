import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {

  return (
    <header className={`relative overflow-hidden transition-all duration-300 ${
      isDarkMode ? 'bg-slate-900' : ''
    }`}>
      <div className={`absolute inset-0 ${
        isDarkMode 
          ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700' 
          : 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600'
      } transition-all duration-300`}></div>
      
      <div className="relative z-10 text-center py-16 px-6">
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleDarkMode}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-white/80" />
            ) : (
              <Moon className="w-5 h-5 text-white/80" />
            )}
          </button>
        </div>
        
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <Sparkles className="w-12 h-12 text-white/80" />
          </div>
        </div>
        
        <h1 className="text-4xl font-semibold text-white mb-4 tracking-tight">
          Universal Document Formatter
        </h1>
        <p className="text-lg text-white/80 font-normal max-w-2xl mx-auto leading-relaxed">
          Transform your content for any platform in seconds
        </p>
      </div>
    </header>
  );
};

export default Header;