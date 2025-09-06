import { useState, useEffect } from 'react';
import { Platform } from '../utils/formatters';

export const useClipboard = () => {
  const [copiedStates, setCopiedStates] = useState<Record<Platform, boolean>>({
    linkedin: false,
    twitter: false,
    email: false,
    whatsapp: false,
    instagram: false,
  });
  
  const [copyCount, setCopyCount] = useState<Record<Platform, number>>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('copyCount');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // Fall back to default if parsing fails
        }
      }
    }
    return {
      linkedin: 0,
      twitter: 0,
      email: 0,
      whatsapp: 0,
      instagram: 0,
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('copyCount', JSON.stringify(copyCount));
    }
  }, [copyCount]);

  const copyToClipboard = async (text: string, platform: Platform) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [platform]: true }));
      setCopyCount(prev => ({ ...prev, [platform]: prev[platform] + 1 }));
      
      // Reset after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [platform]: false }));
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return {
    copyToClipboard,
    copiedStates,
    copyCount,
  };
};