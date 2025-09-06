import React from 'react';
import { Sparkles, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  activeTab: 'formatter' | 'stats';
  setActiveTab: (tab: 'formatter' | 'stats') => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, activeTab, setActiveTab }) => {

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
        <div className="absolute top-6 right-6 flex items-center gap-3">
          <div className="flex bg-white/10 backdrop-blur-sm rounded-xl p-1">
            <button
              onClick={() => setActiveTab('formatter')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'formatter'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Switch to formatter tab"
            >
              Formatter
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'stats'
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              aria-label="Switch to stats tab"
            >
              Stats
            </button>
          </div>
          
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
          {activeTab === 'formatter' 
            ? 'Transform your content for any platform in seconds'
            : 'Track your formatting activity and platform usage'
          }
        </p>
      </div>
    </header>
  );
};

export default Header;