
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMode } from '@/context/ModeContext';
import { challenges, Challenge } from '@/data/challenges';

const Challenges: React.FC = () => {
  const { isNormalMode } = useMode();
  const navigate = useNavigate();
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return isNormalMode ? 'text-green-600 bg-green-100' : 'text-green-400 bg-green-900';
      case 'Intermediate': return isNormalMode ? 'text-yellow-600 bg-yellow-100' : 'text-yellow-400 bg-yellow-900';
      case 'Advanced': return isNormalMode ? 'text-red-600 bg-red-100' : 'text-red-400 bg-red-900';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '🌱';
      case 'Intermediate': return '🔥';
      case 'Advanced': return '⚡';
      default: return '📝';
    }
  };

  const handleSolveChallenge = (challenge: Challenge) => {
    // In a real app, this would pass the challenge data to the editor
    // For now, we'll navigate to the editor with the starter code in localStorage
    localStorage.setItem('editor-challenge', JSON.stringify(challenge));
    navigate('/editor');
  };

  return (
    <div className={`min-h-screen ${isNormalMode ? 'bg-blue-50' : 'bg-purple-50'}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`
            text-3xl md:text-4xl font-bold mb-4
            ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
          `}>
            🏆 Coding Challenges
          </h1>
          <p className="text-gray-600">
            {isNormalMode 
              ? 'Test your skills with fun coding puzzles! Each challenge builds your programming knowledge step by step.'
              : 'Advanced programming challenges to sharpen your algorithmic thinking and problem-solving skills.'
            }
          </p>
        </div>

        {!selectedChallenge ? (
          /* Challenge List */
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Challenge Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getDifficultyIcon(challenge.difficulty)}</span>
                    <div>
                      <h3 className={`
                        text-xl font-bold
                        ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
                      `}>
                        {challenge.title}
                      </h3>
                      <span className={`
                        inline-block px-2 py-1 text-xs font-semibold rounded-full
                        ${getDifficultyColor(challenge.difficulty)}
                      `}>
                        {challenge.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Challenge Description */}
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {challenge.description}
                </p>

                {/* Challenge Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <span>Language: {challenge.language}</span>
                  <span>⭐ {challenge.difficulty === 'Beginner' ? '1-2' : challenge.difficulty === 'Intermediate' ? '3-4' : '5'}/5</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedChallenge(challenge)}
                    className={`
                      flex-1 px-4 py-2 rounded-lg font-medium transition-colors
                      ${isNormalMode
                        ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                      }
                    `}
                  >
                    👀 Preview
                  </button>
                  <button
                    onClick={() => handleSolveChallenge(challenge)}
                    className={`
                      flex-1 px-4 py-2 rounded-lg font-medium transition-colors text-white
                      ${isNormalMode
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-purple-600 hover:bg-purple-700'
                      }
                    `}
                  >
                    🚀 Solve Challenge
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Challenge Detail View */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {/* Back Button */}
              <button
                onClick={() => setSelectedChallenge(null)}
                className={`
                  mb-6 px-4 py-2 rounded-lg font-medium transition-colors
                  ${isNormalMode
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }
                `}
              >
                ← Back to Challenges
              </button>

              {/* Challenge Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{getDifficultyIcon(selectedChallenge.difficulty)}</span>
                  <div>
                    <h1 className={`
                      text-3xl font-bold
                      ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
                    `}>
                      {selectedChallenge.title}
                    </h1>
                    <span className={`
                      inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2
                      ${getDifficultyColor(selectedChallenge.difficulty)}
                    `}>
                      {selectedChallenge.difficulty} Level
                    </span>
                  </div>
                </div>
              </div>

              {/* Challenge Description */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">📋 Challenge Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedChallenge.description}
                </p>
              </div>

              {/* Starter Code Preview */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-3 text-gray-800">💻 Starter Code</h2>
                <div className="bg-gray-900 text-green-400 p-6 rounded-lg overflow-x-auto">
                  <pre className="font-mono text-sm">
                    <code>{selectedChallenge.starterCode}</code>
                  </pre>
                </div>
              </div>

              {/* Challenge Info */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">📚 Language</h3>
                  <p className="text-gray-600 capitalize">{selectedChallenge.language}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">⭐ Difficulty</h3>
                  <p className="text-gray-600">{selectedChallenge.difficulty}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">⏱️ Est. Time</h3>
                  <p className="text-gray-600">
                    {selectedChallenge.difficulty === 'Beginner' ? '10-15 min' : 
                     selectedChallenge.difficulty === 'Intermediate' ? '20-30 min' : '30-60 min'}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="text-center">
                <button
                  onClick={() => handleSolveChallenge(selectedChallenge)}
                  className={`
                    px-8 py-4 text-lg font-semibold rounded-lg shadow-lg transition-all duration-200 transform hover:scale-105 text-white
                    ${isNormalMode
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                    }
                  `}
                >
                  🚀 Start Solving This Challenge
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Progress Section */}
        {!selectedChallenge && (
          <div className="mt-16 text-center">
            <div className={`
              ${isNormalMode ? 'bg-blue-600' : 'bg-purple-600'}
              text-white rounded-xl p-8
            `}>
              <h2 className="text-2xl font-bold mb-4">🎯 Your Progress</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-2">0/3</div>
                  <div className="opacity-90">Challenges Completed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">0</div>
                  <div className="opacity-90">Points Earned</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">🥉</div>
                  <div className="opacity-90">Current Rank</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Challenges;
