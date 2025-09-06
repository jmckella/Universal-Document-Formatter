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

  const copyToClipboard = async (text: string, platform: Platform, onSuccess?: () => void) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [platform]: true }));
      
      // Call the success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
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
  };
};