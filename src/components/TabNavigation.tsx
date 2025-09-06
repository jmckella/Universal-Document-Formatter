import React from 'react';
import { FileText, BarChart3 } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'formatter' | 'stats';
  setActiveTab: (tab: 'formatter' | 'stats') => void;
  isDarkMode: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, isDarkMode }) => {
  return (
    <div className={`fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-sm transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900/95 border-slate-700' 
        : 'bg-white/95 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-center">
          <div className={`flex rounded-xl p-1 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-800 border border-slate-700' 
              : 'bg-gray-100 border border-gray-200'
          }`}>
            <button
              onClick={() => setActiveTab('formatter')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'formatter'
                  ? isDarkMode
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-lg'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
              aria-label="Switch to formatter tab"
            >
              <FileText className="w-4 h-4" />
              Formatter
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeTab === 'stats'
                  ? isDarkMode
                    ? 'bg-slate-700 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-lg'
                  : isDarkMode
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              }`}
              aria-label="Switch to stats tab"
            >
              <BarChart3 className="w-4 h-4" />
              Stats
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;