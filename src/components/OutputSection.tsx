import React, { useState, useEffect } from 'react';
import { Hash, Smartphone, Globe, Mail, MessageSquare, Camera } from 'lucide-react';
import { formatForPlatform, Platform } from '../utils/formatters';
import { useClipboard } from '../hooks/useClipboard';
import { useFocusManagementContext } from './FocusManagementProvider';

interface OutputSectionProps {
  input: string;
  selectedPlatform: Platform;
  isDarkMode: boolean;
  recordCopy: (platform: Platform, characterCount: number) => void;
}

const platformConfig = {
  linkedin: {
    icon: Globe,
    color: 'blue-500',
    tip: 'Professional networking platform',
    mockup: 'browser'
  },
  twitter: {
    icon: MessageSquare,
    color: 'gray-900',
    tip: 'Microblogging platform',
    mockup: 'browser'
  },
  email: {
    icon: Mail,
    color: 'red-500',
    tip: 'Professional communication',
    mockup: 'email'
  },
  whatsapp: {
    icon: Smartphone,
    color: 'green-500',
    tip: 'Mobile messaging',
    mockup: 'mobile'
  },
  instagram: {
    icon: Camera,
    color: 'pink-500',
    tip: 'Visual storytelling platform',
    mockup: 'mobile'
  }
};

const OutputSection: React.FC<OutputSectionProps> = ({ input, selectedPlatform, isDarkMode, recordCopy }) => {
  const { copyToClipboard, copiedStates } = useClipboard();
  const { announce } = useFocusManagementContext();
  const [rotatingTipIndex, setRotatingTipIndex] = useState(0);
  
  const rotatingTips = [
    "Try pasting an email to convert to WhatsApp",
    "Perfect for turning blogs into LinkedIn posts",  
    "Format once, share everywhere",
    "Transform newsletters into engaging tweets"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRotatingTipIndex((prev) => (prev + 1) % rotatingTips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const formattedContent = formatForPlatform(input, selectedPlatform);
  const config = platformConfig[selectedPlatform];
  const Icon = config.icon;
  
  const tweetCount = selectedPlatform === 'twitter' && formattedContent.text.includes('---') 
    ? formattedContent.text.split('---').length 
    : 1;

  const handleCopy = async () => {
    await copyToClipboard(formattedContent.text, selectedPlatform, () => {
      recordCopy(selectedPlatform, formattedContent.charCount);
    });
    announce(`Content copied for ${selectedPlatform}`, 'polite');
  };

  // Listen for keyboard shortcut events
  useEffect(() => {
    const handleTriggerCopy = (e: CustomEvent) => {
      if (e.detail.platform === selectedPlatform && input.trim()) {
        handleCopy();
      }
    };

    document.addEventListener('triggerCopy', handleTriggerCopy as EventListener);
    return () => {
      document.removeEventListener('triggerCopy', handleTriggerCopy as EventListener);
    };
  }, [selectedPlatform, input]);

  const handleDownload = () => {
    const blob = new Blob([formattedContent.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedPlatform}-formatted.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!input.trim()) {
    return (
      <div className={`backdrop-blur-lg rounded-2xl shadow-xl p-8 border text-center transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-800/90 border-slate-700' 
          : 'bg-white/90 border-gray-200'
      }`}>
        <div className={`mb-4 transition-all duration-300 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-400'
        } ${!isDarkMode ? 'text-gray-600' : ''}`}>
          <Icon className="w-16 h-16 mx-auto mb-4 opacity-30" />
        </div>
        <h3 className={`text-lg font-medium mb-2 transition-all duration-300 ${
          isDarkMode ? 'text-slate-400' : 'text-gray-600'
        }`}>Ready to transform</h3>
        <p className={`transition-all duration-500 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-500'
        } ${!isDarkMode ? 'text-gray-700' : ''}`}>
          {rotatingTips[rotatingTipIndex]}
        </p>
      </div>
    );
  }

  return (
    <div className={`backdrop-blur-lg rounded-2xl shadow-xl border overflow-hidden transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-800/90 border-slate-700' 
        : 'bg-white/90 border-gray-200'
    }`}>
      {/* Header */}
      <div className={`p-6 text-white ${
        selectedPlatform === 'twitter' 
          ? 'bg-black' 
          : `bg-gradient-to-r from-${config.color} to-${config.color.replace('-500', '-600')}`
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="w-6 h-6" />
            <div>
              <h3 className="text-lg font-semibold capitalize">
                {selectedPlatform === 'twitter' ? 'Twitter/X' : selectedPlatform} Format
              </h3>
              <p className="text-white/80 text-sm">{config.tip}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedPlatform === 'twitter' && tweetCount > 1 && (
              <span className="px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full">
                {tweetCount} tweets
              </span>
            )}
            
            <div className="text-right">
              <div className="text-sm font-medium">
                {formattedContent.charCount.toLocaleString()} chars
              </div>
              {formattedContent.maxChars && (
                <div className="text-xs text-white/70">
                  / {formattedContent.maxChars.toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Preview */}
        <div className={`rounded-xl p-5 mb-6 relative transition-all duration-300 ${
          isDarkMode ? 'bg-slate-700' : 'bg-gray-50'
        }`}>
          {selectedPlatform === 'twitter' && formattedContent.tweetsArray && formattedContent.tweetsArray.length > 1 ? (
            <div className="space-y-4">
              {formattedContent.tweetsArray.map((tweet, index) => (
                <div key={index} className="relative">
                  <pre className={`whitespace-pre-wrap font-mono text-sm leading-relaxed transition-all duration-300 ${
                    isDarkMode ? 'text-slate-200' : 'text-gray-800'
                  }`}>
                    {tweet}
                  </pre>
                  {index < formattedContent.tweetsArray!.length - 1 && (
                    <div className="flex items-center justify-center mt-3 mb-1">
                      <div className={`flex items-center space-x-2 ${
                        isDarkMode ? 'text-slate-500' : 'text-gray-400'
                      }`}>
                        <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                        <div className={`w-8 h-px bg-current opacity-30`}></div>
                        <div className="w-2 h-2 rounded-full bg-current opacity-50"></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <pre className={`whitespace-pre-wrap font-mono text-sm leading-relaxed overflow-hidden transition-all duration-300 ${
              isDarkMode ? 'text-slate-200' : 'text-gray-800'
            }`}>
              {formattedContent.text}
            </pre>
          )}
        </div>

        {/* Platform-specific features */}
        {selectedPlatform === 'linkedin' && formattedContent.hashtags && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-blue-500" />
              <h4 className={`text-sm font-semibold transition-all duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>Suggested Hashtags</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {formattedContent.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-400 ${
                    isDarkMode 
                      ? 'bg-blue-900/20 text-blue-400 border-blue-800 hover:bg-blue-900/30' 
                      : 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`Add hashtag ${hashtag}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigator.clipboard.writeText(hashtag);
                      announce(`Hashtag ${hashtag} copied to clipboard`, 'polite');
                    }
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(hashtag);
                    announce(`Hashtag ${hashtag} copied to clipboard`, 'polite');
                  }}
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}

        {selectedPlatform === 'instagram' && formattedContent.hashtags && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-pink-500" />
              <h4 className={`text-sm font-semibold transition-all duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-gray-700'
              }`}>Suggested Hashtags</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {formattedContent.hashtags.map((hashtag, index) => (
                <span
                  key={index}
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border transition-colors duration-200 cursor-pointer ${
                    isDarkMode 
                      ? 'bg-pink-900/20 text-pink-400 border-pink-800 hover:bg-pink-900/30' 
                      : 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100'
                  }`}
                  tabIndex={0}
                  role="button"
                  aria-label={`Add hashtag ${hashtag}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigator.clipboard.writeText(hashtag);
                      announce(`Hashtag ${hashtag} copied to clipboard`, 'polite');
                    }
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(hashtag);
                    announce(`Hashtag ${hashtag} copied to clipboard`, 'polite');
                  }}
                >
                  {hashtag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopy}
            className={`relative flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-98 ${
              isDarkMode ? 'focus-ring-dark' : 'focus-ring'
            } ${
              copiedStates[selectedPlatform]
                ? 'bg-green-500 text-white shadow-lg'
                : selectedPlatform === 'twitter'
                  ? 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                  : `bg-${config.color} hover:bg-${config.color.replace('-500', '-600')} text-white shadow-lg hover:shadow-xl`
            }`}
            aria-label={`Copy formatted content for ${selectedPlatform}`}
            title={`Copy to clipboard (Cmd+Enter)`}
          >
            {copiedStates[selectedPlatform] ? (
              <>
                <span className="text-lg">✓</span>
                Copied
              </>
            ) : (
              <>
                <span className="text-lg">📋</span>
                Copy Text
              </>
            )}
          </button>
          
          <button
            onClick={handleDownload}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-98 ${
              isDarkMode ? 'focus-ring-dark' : 'focus-ring'
            } ${
              isDarkMode 
                ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-label={`Download formatted content as text file`}
            title="Download as text file"
          >
            <span className="text-lg">⬇️</span>
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default OutputSection;