import React, { useState } from 'react';
import Header from './components/Header';
import SkipLinks from './components/SkipLinks';
import InstructionCard from './components/InstructionCard';
import InputSection from './components/InputSection';
import PlatformSelector from './components/PlatformSelector';
import OutputSection from './components/OutputSection';
import { FocusManagementProvider } from './components/FocusManagementProvider';
import { Platform } from './utils/formatters';
import { useDarkMode } from './hooks/useDarkMode';
import { useClipboard } from './hooks/useClipboard';

function App() {
  const [input, setInput] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('linkedin');
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { copyCount } = useClipboard();

  return (
    <FocusManagementProvider>
    <div className={`min-h-screen transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-900' 
        : 'bg-gradient-to-br from-gray-50 to-white'
    }`}>
      <SkipLinks isDarkMode={isDarkMode} />
      
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main 
        id="main-content"
        tabIndex={-1}
        className={`max-w-7xl mx-auto px-6 py-8 space-y-8 transition-all duration-300 outline-none ${
          isDarkMode ? 'bg-slate-900' : 'bg-white'
        }`}
        aria-label="Document formatter application"
      >
        <InstructionCard />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <InputSection
              input={input}
              onInputChange={setInput}
              selectedPlatform={selectedPlatform}
              isDarkMode={isDarkMode}
            />
            
            <div id="platform-selector">
              <PlatformSelector
                selectedPlatform={selectedPlatform}
                onPlatformChange={setSelectedPlatform}
                copyCount={copyCount}
                isDarkMode={isDarkMode}
              />
            </div>
          </div>
          
          <div id="output-section">
            <OutputSection
              input={input}
              selectedPlatform={selectedPlatform}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </main>
      
      <footer className={`text-center py-8 text-sm transition-all duration-300 ${
        isDarkMode 
          ? 'text-slate-400 bg-slate-900' 
          : 'text-gray-700 bg-transparent'
      }`}>
        Made with ✨ by Jeremy McKellar | Save time formatting content
        <span className="mx-2">•</span>
        <a 
          href="mailto:support@example.com?subject=Document%20Formatter%20Issue" 
          className={`hover:underline transition-colors duration-200 focus:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded ${
            isDarkMode ? 'hover:text-slate-300' : 'hover:text-gray-700'
          }`}
        >
          Report issue
        </a>
      </footer>
    </div>
    </FocusManagementProvider>
  );
}

export default App;