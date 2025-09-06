import React from 'react';
import { useFocusManagementContext } from './FocusManagementProvider';
import { Platform } from '../utils/formatters';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  copyCount: Record<Platform, number>;
  isDarkMode: boolean;
}

const platforms = [
  {
    id: 'linkedin' as Platform,
    name: 'LinkedIn',
    icon: '💼',
    limit: '3,000',
    bestFor: 'Professional updates',
    gradient: 'from-blue-600 to-blue-700',
    hoverGradient: 'from-blue-700 to-blue-800',
    color: '#0A66C2'
  },
  {
    id: 'twitter' as Platform,
    name: 'Twitter/X',
    icon: '🔷',
    limit: '280',
    bestFor: 'Quick thoughts',
    gradient: 'from-gray-900 to-black',
    hoverGradient: 'from-black to-gray-800',
    color: '#000000'
  },
  {
    id: 'email' as Platform,
    name: 'Email',
    icon: '📧',
    limit: 'No limit',
    bestFor: 'Formal communication',
    gradient: 'from-red-600 to-red-700',
    hoverGradient: 'from-red-700 to-red-800',
    color: '#EA4335'
  },
  {
    id: 'whatsapp' as Platform,
    name: 'WhatsApp',
    icon: '💬',
    limit: 'No limit',
    bestFor: 'Mobile messaging',
    gradient: 'from-green-600 to-green-700',
    hoverGradient: 'from-green-700 to-green-800',
    color: '#25D366'
  },
  {
    id: 'instagram' as Platform,
    name: 'Instagram',
    icon: '📸',
    limit: '2,200',
    bestFor: 'Visual storytelling',
    gradient: 'from-pink-400 to-purple-500',
    hoverGradient: 'from-pink-500 to-purple-600',
    color: '#E4405F'
  }
];

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onPlatformChange,
  copyCount,
  isDarkMode
}) => {
  const { announce } = useFocusManagementContext();

  // Find most used platform
  const mostUsedPlatform = Object.entries(copyCount).reduce((max, [platform, count]) => 
    count > max.count ? { platform: platform as Platform, count } : max
  , { platform: 'linkedin' as Platform, count: 0 });

  const getMostUsedText = () => {
    if (mostUsedPlatform.count === 0) return null;
    const platformName = mostUsedPlatform.platform === 'twitter' ? 'Twitter/X' : 
      mostUsedPlatform.platform.charAt(0).toUpperCase() + mostUsedPlatform.platform.slice(1);
    return `Most used: ${platformName}`;
  };

  return (
    <div className={`rounded-2xl shadow-xl p-6 border transition-all duration-300 ${
      isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className={`text-lg font-semibold transition-all duration-300 ${
          isDarkMode ? 'text-slate-100' : 'text-gray-900'
        }`}>Choose Platform</h3>
        {getMostUsedText() && (
          <span className={`text-xs px-2 py-1 rounded-full transition-all duration-300 ${
            isDarkMode 
              ? 'bg-slate-700 text-slate-400' 
              : 'bg-gray-100 text-gray-600'
          }`}>
            {getMostUsedText()}
          </span>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            onFocus={() => {
              if (selectedPlatform !== platform.id) {
                announce(`${platform.name} platform selected for preview. ${platform.bestFor}. Character limit: ${platform.limit}`, 'polite');
              }
            }}
            className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-0.5 group ${
              isDarkMode ? 'focus-ring-dark' : 'focus-ring'
            } ${
              selectedPlatform === platform.id
                ? 'border-transparent shadow-xl'
                : isDarkMode
                  ? 'border-slate-600 hover:border-slate-500'
                  : 'border-gray-200 hover:border-gray-300'
            }`}
            aria-label={`Select ${platform.name} platform for formatting. ${platform.bestFor}. Character limit: ${platform.limit}`}
            aria-pressed={selectedPlatform === platform.id}
          >
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
              selectedPlatform === platform.id 
                ? platform.gradient 
                : isDarkMode
                  ? 'bg-slate-800 group-hover:bg-slate-700'
                  : 'bg-white group-hover:bg-gray-50'
            } transition-all duration-300`}></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div className="text-left">
                    <h4 className={`font-semibold ${
                     selectedPlatform === platform.id ? 'text-white' : 
                     isDarkMode ? 'text-slate-100' : 'text-gray-900'
                    }`}>
                      {platform.name}
                    </h4>
                    <p className={`text-sm ${
                      selectedPlatform === platform.id ? 'text-white/80' : 
                      isDarkMode ? 'text-slate-400' : 'text-gray-700'
                    }`}>
                      {platform.bestFor}
                    </p>
                  </div>
                </div>
                
                <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                  selectedPlatform === platform.id 
                    ? 'bg-white/20 text-white' 
                    : isDarkMode
                      ? 'bg-slate-600 text-slate-300'
                      : 'bg-gray-100 text-gray-600'
                }`}>
                  {platform.limit}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector;