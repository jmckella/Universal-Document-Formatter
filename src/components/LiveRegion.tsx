import React, { useEffect, useRef } from 'react';

interface LiveRegionProps {
  message: string;
  politeness?: 'polite' | 'assertive';
  clearAfter?: number; // Clear message after X milliseconds
}

const LiveRegion: React.FC<LiveRegionProps> = ({ 
  message, 
  politeness = 'polite',
  clearAfter = 5000 
}) => {
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (message && clearAfter > 0) {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Set new timeout to clear message
      timeoutRef.current = setTimeout(() => {
        // This will trigger a re-render with empty message
        // Parent component should handle clearing the message
      }, clearAfter);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message, clearAfter]);

  // Don't render if no message
  if (!message) return null;

  return (
    <div
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {message}
    </div>
  );
};

export default LiveRegion;