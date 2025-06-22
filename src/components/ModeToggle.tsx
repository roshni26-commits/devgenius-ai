
import React from 'react';
import { useMode } from '@/context/ModeContext';

const ModeToggle: React.FC = () => {
  const { mode, toggleMode } = useMode();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleMode}
        className={`
          relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          ${mode === 'normal' 
            ? 'bg-blue-600 focus:ring-blue-500' 
            : 'bg-purple-600 focus:ring-purple-500'
          }
        `}
      >
        <div
          className={`
            inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200
            ${mode === 'normal' ? 'translate-x-1' : 'translate-x-9'}
          `}
        />
      </button>
      <span className={`text-sm font-medium ${mode === 'normal' ? 'text-blue-600' : 'text-purple-600'}`}>
        {mode === 'normal' ? '👩‍🏫 Normal Mode' : '👩‍💻 Developer Mode'}
      </span>
    </div>
  );
};

export default ModeToggle;
