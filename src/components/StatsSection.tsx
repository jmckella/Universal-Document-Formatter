import React from 'react';
import { BarChart3, TrendingUp, Calendar, Target, Zap, FileText } from 'lucide-react';
import { Platform } from '../utils/formatters';

interface PlatformUsageData {
  platform: Platform;
  copies: number;
  percentage: number;
  avgCharacters: number;
}

interface DailyActivityData {
  date: string;
  copies: number;
  dayOfWeek: string;
}

interface StatsSectionProps {
  totalFormattedCount: number;
  platformUsage: PlatformUsageData[];
  dailyActivity: DailyActivityData[];
  mostActiveDay: string;
  totalCharacters: number;
  isDarkMode: boolean;
  onClearStats: () => void;
}

const platformConfig = {
  linkedin: { name: 'LinkedIn', icon: '💼', color: 'blue' },
  twitter: { name: 'Twitter/X', icon: '🔷', color: 'gray' },
  email: { name: 'Email', icon: '📧', color: 'red' },
  whatsapp: { name: 'WhatsApp', icon: '💬', color: 'green' },
  instagram: { name: 'Instagram', icon: '📸', color: 'pink' },
};

const StatsSection: React.FC<StatsSectionProps> = ({
  totalFormattedCount,
  platformUsage,
  dailyActivity,
  mostActiveDay,
  totalCharacters,
  isDarkMode,
  onClearStats,
}) => {
  const maxPercentage = Math.max(...platformUsage.map(p => p.percentage), 1);
  const recentActivity = dailyActivity.slice(0, 7); // Last 7 days

  if (totalFormattedCount === 0) {
    return (
      <div className={`rounded-2xl shadow-xl p-8 border text-center transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className={`mb-4 transition-all duration-300 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-400'
        }`}>
          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-30" />
        </div>
        <h3 className={`text-lg font-medium mb-2 transition-all duration-300 ${
          isDarkMode ? 'text-slate-400' : 'text-gray-600'
        }`}>No Data Yet</h3>
        <p className={`transition-all duration-300 ${
          isDarkMode ? 'text-slate-500' : 'text-gray-500'
        }`}>
          Start formatting content to see your usage analytics here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`rounded-2xl shadow-lg p-6 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <FileText className={`w-5 h-5 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Total Formatted
            </h3>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
            {totalFormattedCount.toLocaleString()}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Documents processed
          </p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <Target className={`w-5 h-5 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Total Characters
            </h3>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
            {totalCharacters.toLocaleString()}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Characters formatted
          </p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Most Active Day
            </h3>
          </div>
          <p className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
            {mostActiveDay}
          </p>
        </div>

        <div className={`rounded-2xl shadow-lg p-6 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <Zap className={`w-5 h-5 ${isDarkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
            <h3 className={`font-semibold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
              Avg per Copy
            </h3>
          </div>
          <p className={`text-2xl font-bold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
            {Math.round(totalCharacters / totalFormattedCount)}
          </p>
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            Characters per document
          </p>
        </div>
      </div>

      {/* Platform Usage Chart */}
      <div className={`rounded-2xl shadow-xl p-6 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-slate-800 border-slate-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className={`w-6 h-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
          <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
            Platform Usage
          </h3>
        </div>

        <div className="space-y-4">
          {platformUsage.map((platform) => {
            const config = platformConfig[platform.platform];
            const widthPercentage = maxPercentage > 0 ? (platform.percentage / maxPercentage) * 100 : 0;

            return (
              <div key={platform.platform} className="flex items-center gap-4">
                <div className="flex items-center gap-3 w-32 flex-shrink-0">
                  <span className="text-xl">{config.icon}</span>
                  <span className={`font-medium text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-800'}`}>
                    {config.name}
                  </span>
                </div>

                <div className="flex-1 relative">
                  <div className={`h-6 rounded-full transition-all duration-300 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-gray-200'
                  }`}>
                    <div
                      className={`h-6 rounded-full transition-all duration-500 bg-gradient-to-r ${
                        config.color === 'blue' ? 'from-blue-500 to-blue-600' :
                        config.color === 'gray' ? 'from-gray-600 to-gray-700' :
                        config.color === 'red' ? 'from-red-500 to-red-600' :
                        config.color === 'green' ? 'from-green-500 to-green-600' :
                        'from-pink-500 to-purple-600'
                      }`}
                      style={{ width: `${widthPercentage}%` }}
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">
                      {platform.percentage}%
                    </span>
                  </div>
                </div>

                <div className="flex gap-4 text-sm">
                  <span className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {platform.copies} copies
                  </span>
                  <span className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    {platform.avgCharacters} avg chars
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div className={`rounded-2xl shadow-xl p-6 border transition-all duration-300 ${
          isDarkMode 
            ? 'bg-slate-800 border-slate-700' 
            : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className={`w-6 h-6 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-slate-100' : 'text-gray-900'}`}>
                Recent Activity (Last 7 Days)
              </h3>
            </div>
            <button
              onClick={onClearStats}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${
                isDarkMode
                  ? 'bg-slate-700 hover:bg-slate-600 text-slate-300 focus:ring-2 focus:ring-slate-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-2 focus:ring-gray-400'
              }`}
            >
              Clear Data
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
            {recentActivity.map((day) => (
              <div
                key={day.date}
                className={`p-3 rounded-xl border text-center transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-700 border-slate-600' 
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className={`text-xs font-medium mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                  {day.dayOfWeek}
                </div>
                <div className={`text-sm mb-1 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                  {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
                <div className={`text-lg font-bold ${
                  day.copies > 0 
                    ? isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    : isDarkMode ? 'text-slate-500' : 'text-gray-400'
                }`}>
                  {day.copies}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsSection;