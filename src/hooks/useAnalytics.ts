import { useState, useEffect, useCallback } from 'react';
import { Platform } from '../utils/formatters';

interface PlatformStats {
  copies: number;
  totalCharacters: number;
}

interface DailyStats {
  [date: string]: number; // date string -> copy count
}

interface AnalyticsData {
  totalFormattedCount: number;
  platformStats: Record<Platform, PlatformStats>;
  dailyStats: DailyStats;
  lastUpdated: string;
}

interface AnalyticsSummary {
  totalFormattedCount: number;
  platformUsage: Array<{
    platform: Platform;
    copies: number;
    percentage: number;
    avgCharacters: number;
  }>;
  dailyActivity: Array<{
    date: string;
    copies: number;
    dayOfWeek: string;
  }>;
  mostActiveDay: string;
  totalCharacters: number;
}

const defaultAnalyticsData: AnalyticsData = {
  totalFormattedCount: 0,
  platformStats: {
    linkedin: { copies: 0, totalCharacters: 0 },
    twitter: { copies: 0, totalCharacters: 0 },
    email: { copies: 0, totalCharacters: 0 },
    whatsapp: { copies: 0, totalCharacters: 0 },
    instagram: { copies: 0, totalCharacters: 0 },
  },
  dailyStats: {},
  lastUpdated: new Date().toISOString(),
};

export const useAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('documentFormatterAnalytics');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Merge with defaults to handle new fields
          return {
            ...defaultAnalyticsData,
            ...parsed,
            platformStats: {
              ...defaultAnalyticsData.platformStats,
              ...parsed.platformStats,
            },
          };
        } catch {
          return defaultAnalyticsData;
        }
      }
    }
    return defaultAnalyticsData;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('documentFormatterAnalytics', JSON.stringify(analyticsData));
    }
  }, [analyticsData]);

  const recordCopy = useCallback((platform: Platform, characterCount: number) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

    setAnalyticsData(prev => ({
      ...prev,
      totalFormattedCount: prev.totalFormattedCount + 1,
      platformStats: {
        ...prev.platformStats,
        [platform]: {
          copies: prev.platformStats[platform].copies + 1,
          totalCharacters: prev.platformStats[platform].totalCharacters + characterCount,
        },
      },
      dailyStats: {
        ...prev.dailyStats,
        [today]: (prev.dailyStats[today] || 0) + 1,
      },
      lastUpdated: new Date().toISOString(),
    }));
  }, []);

  const getAnalyticsSummary = useCallback((): AnalyticsSummary => {
    const platformUsage = Object.entries(analyticsData.platformStats).map(([platform, stats]) => ({
      platform: platform as Platform,
      copies: stats.copies,
      percentage: analyticsData.totalFormattedCount > 0 
        ? Math.round((stats.copies / analyticsData.totalFormattedCount) * 100) 
        : 0,
      avgCharacters: stats.copies > 0 
        ? Math.round(stats.totalCharacters / stats.copies) 
        : 0,
    })).sort((a, b) => b.copies - a.copies);

    const dailyActivity = Object.entries(analyticsData.dailyStats)
      .map(([date, copies]) => ({
        date,
        copies,
        dayOfWeek: new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' }),
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30); // Last 30 days

    const mostActiveDay = dailyActivity.length > 0 
      ? dailyActivity.reduce((max, day) => day.copies > max.copies ? day : max)
      : null;

    const totalCharacters = Object.values(analyticsData.platformStats)
      .reduce((sum, stats) => sum + stats.totalCharacters, 0);

    return {
      totalFormattedCount: analyticsData.totalFormattedCount,
      platformUsage,
      dailyActivity,
      mostActiveDay: mostActiveDay ? `${mostActiveDay.date} (${mostActiveDay.copies} copies)` : 'No data yet',
      totalCharacters,
    };
  }, [analyticsData]);

  const clearAnalytics = useCallback(() => {
    setAnalyticsData(defaultAnalyticsData);
  }, []);

  // For backward compatibility with existing components
  const copyCount = Object.fromEntries(
    Object.entries(analyticsData.platformStats).map(([platform, stats]) => [platform, stats.copies])
  ) as Record<Platform, number>;

  return {
    analyticsData,
    recordCopy,
    getAnalyticsSummary,
    clearAnalytics,
    copyCount, // For backward compatibility
  };
};