
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMode } from '@/context/ModeContext';
import ModeToggle from './ModeToggle';

const Navbar: React.FC = () => {
  const { isNormalMode } = useMode();
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/chat', label: 'Chat Tutor' },
    { path: '/editor', label: 'Code Editor' },
    { path: '/challenges', label: 'Challenges' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`
      ${isNormalMode ? 'bg-blue-600' : 'bg-purple-600'} 
      text-white shadow-lg
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold gradient-text">
              🧠 DevGeniusAI
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-3 py-2 text-sm font-medium transition-colors duration-200
                  ${isActive(item.path)
                    ? 'text-white border-b-2 border-white'
                    : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10 rounded-md'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mode Toggle */}
          <div className="flex items-center space-x-4">
            <ModeToggle />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${isActive(item.path)
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-blue-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
