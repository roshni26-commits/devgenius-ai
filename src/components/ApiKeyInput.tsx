
import React, { useState, useEffect } from 'react';
import { getGeminiApiKey, setGeminiApiKey } from '@/services/GeminiService';

const ApiKeyInput: React.FC = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  useEffect(() => {
    const existingKey = getGeminiApiKey();
    if (existingKey) {
      setHasKey(true);
      setApiKeyState(existingKey);
    }
  }, []);

  const handleSave = () => {
    if (apiKey.trim()) {
      setGeminiApiKey(apiKey.trim());
      setHasKey(true);
      setIsVisible(false);
    }
  };

  const handleClear = () => {
    setGeminiApiKey('');
    setApiKeyState('');
    setHasKey(false);
    localStorage.removeItem('gemini-api-key');
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-yellow-800">
            🔑 Gemini API Configuration
          </h3>
          <p className="text-xs text-yellow-700 mt-1">
            {hasKey ? 'API key configured' : 'Enter your Gemini API key to enable AI features'}
          </p>
        </div>
        <div className="flex gap-2">
          {!hasKey && (
            <button
              onClick={() => setIsVisible(!isVisible)}
              className="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              {isVisible ? 'Cancel' : 'Add Key'}
            </button>
          )}
          {hasKey && (
            <button
              onClick={handleClear}
              className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      
      {isVisible && (
        <div className="mt-3 flex gap-2">
          <input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="Enter your Gemini API key"
            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleSave}
            disabled={!apiKey.trim()}
            className="px-4 py-2 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default ApiKeyInput;
