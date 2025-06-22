
import React from 'react';
import { Link } from 'react-router-dom';
import { useMode } from '@/context/ModeContext';

const Home: React.FC = () => {
  const { isNormalMode } = useMode();

  const features = [
    {
      icon: '🤖',
      title: 'AI Tutor',
      description: isNormalMode 
        ? 'Get personalized coding help with friendly explanations tailored to your learning pace.'
        : 'Advanced AI assistance with code analysis, optimization tips, and technical insights.',
      link: '/chat'
    },
    {
      icon: '💾',
      title: 'Code Editor',
      description: isNormalMode
        ? 'Practice coding in a safe environment with instant feedback and guidance.'
        : 'Professional Monaco editor with debugging tools, performance metrics, and code review.',
      link: '/editor'
    },
    {
      icon: '🏆',
      title: 'Challenges',
      description: isNormalMode
        ? 'Solve fun coding puzzles that build your skills step by step.'
        : 'Advanced programming challenges with algorithmic complexity analysis.',
      link: '/challenges'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className={`
            text-4xl md:text-6xl font-bold mb-6
            ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
          `}>
            AI-Powered Coding Mastery
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {isNormalMode 
              ? 'Learn programming with your personal AI tutor. From beginner to expert, we make coding fun and accessible!'
              : 'Advanced development environment with AI-powered code analysis, optimization, and professional tooling.'
            }
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className={`
                inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105
                ${isNormalMode 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white'
                }
              `}
            >
              🚀 Start Learning
            </Link>
            <Link
              to="/editor"
              className={`
                inline-flex items-center px-8 py-4 text-lg font-semibold rounded-lg border-2 transition-all duration-200 transform hover:scale-105
                ${isNormalMode
                  ? 'border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  : 'border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white'
                }
              `}
            >
              💻 Try Editor
            </Link>
          </div>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute top-20 left-10 opacity-20 text-4xl">{'{ }'}</div>
        <div className="absolute top-32 right-16 opacity-20 text-3xl">const</div>
        <div className="absolute bottom-20 left-20 opacity-20 text-2xl">function()</div>
        <div className="absolute bottom-32 right-10 opacity-20 text-3xl">=&gt;</div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className={`
          text-3xl md:text-4xl font-bold text-center mb-12
          ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
        `}>
          Everything You Need to Master Coding
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className={`
                text-2xl font-bold mb-4
                ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
              `}>
                {feature.title}
              </h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              <Link
                to={feature.link}
                className={`
                  inline-flex items-center px-6 py-3 font-semibold rounded-lg transition-all duration-200
                  ${isNormalMode
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-600 hover:text-white'
                  }
                `}
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className={`
        ${isNormalMode ? 'bg-blue-600' : 'bg-purple-600'}
        text-white py-16
      `}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Students Learning</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Coding Challenges</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
