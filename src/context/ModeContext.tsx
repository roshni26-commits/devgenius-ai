
import React, { createContext, useContext, useState, useEffect } from 'react';

type Mode = 'normal' | 'developer';

interface ModeContextType {
  mode: Mode;
  toggleMode: () => void;
  isNormalMode: boolean;
  isDeveloperMode: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(() => {
    const saved = localStorage.getItem('devgenius-mode');
    return (saved as Mode) || 'normal';
  });

  useEffect(() => {
    localStorage.setItem('devgenius-mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'normal' ? 'developer' : 'normal');
  };

  const value = {
    mode,
    toggleMode,
    isNormalMode: mode === 'normal',
    isDeveloperMode: mode === 'developer',
  };

  return (
    <ModeContext.Provider value={value}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
};
