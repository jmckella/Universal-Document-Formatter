import { useState, useCallback } from 'react';

export const useLiveRegion = () => {
  const [message, setMessage] = useState('');
  const [politeness, setPoliteness] = useState<'polite' | 'assertive'>('polite');

  const announce = useCallback((
    newMessage: string, 
    priority: 'polite' | 'assertive' = 'polite',
    clearAfter?: number
  ) => {
    setPoliteness(priority);
    setMessage(newMessage);

    if (clearAfter) {
      setTimeout(() => {
        setMessage('');
      }, clearAfter);
    }
  }, []);

  const clear = useCallback(() => {
    setMessage('');
  }, []);

  return {
    message,
    politeness,
    announce,
    clear,
  };
};