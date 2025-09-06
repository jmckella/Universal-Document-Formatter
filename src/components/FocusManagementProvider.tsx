import React, { createContext, useContext, ReactNode } from 'react';
import { useFocusManagement } from '../hooks/useFocusManagement';
import { useLiveRegion } from '../hooks/useLiveRegion';
import LiveRegion from './LiveRegion';

interface FocusManagementContextType {
  storeFocus: () => void;
  restoreFocus: () => void;
  moveFocusTo: (element: HTMLElement | string) => void;
  announce: (message: string, priority?: 'polite' | 'assertive', clearAfter?: number) => void;
}

const FocusManagementContext = createContext<FocusManagementContextType | null>(null);

interface FocusManagementProviderProps {
  children: ReactNode;
}

export const FocusManagementProvider: React.FC<FocusManagementProviderProps> = ({ children }) => {
  const focusManagement = useFocusManagement();
  const { message, politeness, announce, clear } = useLiveRegion();

  const contextValue: FocusManagementContextType = {
    storeFocus: focusManagement.storeFocus,
    restoreFocus: focusManagement.restoreFocus,
    moveFocusTo: focusManagement.moveFocusTo,
    announce,
  };

  return (
    <FocusManagementContext.Provider value={contextValue}>
      {children}
      <LiveRegion 
        message={message} 
        politeness={politeness}
        clearAfter={5000}
      />
    </FocusManagementContext.Provider>
  );
};

export const useFocusManagementContext = (): FocusManagementContextType => {
  const context = useContext(FocusManagementContext);
  if (!context) {
    throw new Error('useFocusManagementContext must be used within a FocusManagementProvider');
  }
  return context;
};