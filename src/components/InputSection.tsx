import React, { useState } from 'react';
import { X, Clipboard, Zap } from 'lucide-react';
import { useFocusManagementContext } from './FocusManagementProvider';
import { Platform } from '../utils/formatters';

interface InputSectionProps {
  input: string;
  onInputChange: (value: string) => void;
  selectedPlatform: Platform;
  isDarkMode: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  input, 
  onInputChange,
  selectedPlatform,
  isDarkMode
}) => {
  const [showPasteSuccess, setShowPasteSuccess] = useState(false);

  const { announce } = useFocusManagementContext();

  const characterCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const progressPercentage = Math.min((characterCount / 1000) * 100, 100);

  const handleClear = () => {
    onInputChange('');
    announce('Content cleared', 'polite');
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onInputChange(text);
      setShowPasteSuccess(true);
      announce(`Content pasted, ${text.split(' ').length} words`, 'polite');
      setTimeout(() => setShowPasteSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to read clipboard:', err);
      announce('Failed to paste content from clipboard', 'assertive');
    }
  };

  // Keyboard shortcut handler for Ctrl/Cmd+Enter
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      // Trigger copy action if there's content
      if (input.trim()) {
        const copyEvent = new CustomEvent('triggerCopy', { 
          detail: { platform: selectedPlatform } 
        });
        document.dispatchEvent(copyEvent);
      }
    }
  };

  return (
    <div className={`rounded-2xl shadow-xl p-6 border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-lg font-semibold transition-all duration-300 ${
          isDarkMode ? 'text-slate-100' : 'text-gray-900'
        }`}>Your Content</h3>
        
        <div className="flex flex-wrap justify-end gap-2">
          <button
            onClick={handlePasteFromClipboard}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-200 hover:scale-105 ${
              isDarkMode ? 'focus-ring-dark' : 'focus-ring'
            } ${
              showPasteSuccess
                ? isDarkMode
                  ? 'bg-green-900/20 text-green-400 border-green-700'
                  : 'bg-green-50 text-green-600 border-green-200'
                : isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
            }`}
            aria-label="Paste content from clipboard"
            title="Paste from clipboard"
          >
            {showPasteSuccess ? (
              <>
                <Zap className="w-4 h-4" />
                Pasted!
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4" />
                Paste
              </>
            )}
          </button>
          
          <button
            onClick={() => onInputChange(`We're launching our new design system that helps teams build consistent user interfaces. After months of research and development, we've created a comprehensive library of components, patterns, and guidelines. The system includes over 50 reusable components, detailed documentation, and automatic code generation. Teams using our design system report 60% faster development time and significantly improved consistency across products.`)}
            className={`text-xs underline transition-colors duration-200 rounded px-1 whitespace-nowrap ${
              isDarkMode ? 'focus-ring-dark' : 'focus-ring'
            } ${
              isDarkMode 
                ? 'text-slate-400 hover:text-slate-300' 
                : 'text-gray-700 hover:text-gray-900'
            }`}
            aria-label="Load sample text for testing"
          >
            Load sample text
          </button>
          
          {input && (
            <button
              onClick={handleClear}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-all duration-200 hover:scale-105 ${
                isDarkMode ? 'focus-ring-dark' : 'focus-ring'
              } ${
                isDarkMode 
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 border-slate-600' 
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200'
              }`}
              aria-label="Clear all content"
              title="Clear content"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="relative">
        <textarea
          id="content-input"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Try pasting a blog post, email, or any text..."
          className={`w-full p-4 rounded-xl border resize-none transition-all duration-300 ${
            isDarkMode ? 'focus-ring-dark' : 'focus-ring'
          } ${
            isDarkMode 
              ? 'bg-slate-700 border-slate-600 text-slate-100 placeholder-slate-400' 
              : 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
          }`}
          style={{ minHeight: '300px' }}
          aria-label="Content input area"
          aria-describedby="char-count word-count keyboard-tip"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  className={isDarkMode ? 'text-slate-600' : 'text-gray-300'}
                />
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 14}`}
                  strokeDashoffset={`${2 * Math.PI * 14 * (1 - progressPercentage / 100)}`}
                  className={`transition-all duration-500 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-xs font-medium ${
                  isDarkMode ? 'text-slate-400' : 'text-gray-600'
                }`}>
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
            <div className={`text-sm font-normal tracking-wide transition-all duration-300 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-600'
            }`} id="char-count word-count">
              {characterCount.toLocaleString()} characters • {wordCount.toLocaleString()} words
            </div>
          </div>
        </div>
        
        <div className={`text-xs transition-all duration-300 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-500'
        } ${!isDarkMode ? 'text-gray-700' : ''}`}>
          <span id="keyboard-tip">Tip: Cmd+Enter to copy</span>
        </div>
      </div>
      
      <div className={`mt-3 text-sm flex items-center gap-2 transition-all duration-300 ${
        isDarkMode ? 'text-slate-400' : 'text-gray-600'
      } ${!isDarkMode ? 'text-gray-700' : ''}`}>
        <span>💡</span>
        <span>Tip: Great for converting blog posts to social media</span>
      </div>
    </div>
  );
};

export default InputSection;