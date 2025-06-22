import React, { useState } from 'react';
import { useMode } from '@/context/ModeContext';
import MonacoWrapper from '@/components/MonacoWrapper';
import ApiKeyInput from '@/components/ApiKeyInput';
import { explainCode, reviewCode } from '@/services/GeminiService';

const Editor: React.FC = () => {
  const { isNormalMode, isDeveloperMode } = useMode();
  const [code, setCode] = useState(`// Welcome to DevGeniusAI Code Editor!
// Try writing some JavaScript code below

function greetUser(name) {
  return \`Hello, \${name}! Ready to code?\`;
}

console.log(greetUser("Developer"));

// Click "Run Code" to execute your code
// Click "Explain Code" to get AI insights`);
  
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [aiExplanation, setAiExplanation] = useState('');
  const [codeReview, setCodeReview] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
  ];

  const runCode = async () => {
    setIsRunning(true);
    setOutput('');

    try {
      if (language === 'javascript') {
        // Capture console.log output
        const logs: string[] = [];
        const originalLog = console.log;
        console.log = (...args) => {
          logs.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
          ).join(' '));
        };

        // Execute the code
        // Note: In production, this should use a sandboxed environment
        try {
          const result = eval(code);
          if (result !== undefined) {
            logs.push(`Return value: ${result}`);
          }
        } catch (error) {
          logs.push(`Error: ${error.message}`);
        }

        // Restore console.log
        console.log = originalLog;
        
        setOutput(logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)');
      } else if (language === 'python') {
        // Mock Python execution
        setOutput('Python execution not implemented in this demo.\nThis would connect to a Python runtime in production.');
      }
    } catch (error) {
      setOutput(`Execution Error: ${error.message}`);
    }

    setIsRunning(false);
  };

  const explainCodeHandler = async () => {
    setAiExplanation('Loading explanation...');
    try {
      const explanation = await explainCode(code);
      setAiExplanation(explanation);
    } catch (error) {
      setAiExplanation('Error getting explanation. Please check your API key.');
    }
  };

  const reviewCodeHandler = async () => {
    if (isDeveloperMode) {
      setCodeReview('Loading review...');
      try {
        const review = await reviewCode(code);
        setCodeReview(review);
      } catch (error) {
        setCodeReview('Error getting code review. Please check your API key.');
      }
    }
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
            💻 Code Editor
          </h1>
          <p className="text-gray-600">
            {isNormalMode 
              ? 'Write, run, and learn from your code with AI assistance!'
              : 'Professional development environment with advanced AI analysis tools.'
            }
          </p>
        </div>

        {/* API Key Input */}
        <ApiKeyInput />

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex flex-wrap items-center gap-4">
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">Language:</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {languages.map((lang) => (
                      <option key={lang.value} value={lang.value}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={runCode}
                    disabled={isRunning}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50
                      ${isNormalMode
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-700 hover:bg-green-800 text-white'
                      }
                    `}
                  >
                    {isRunning ? '⏳ Running...' : '▶️ Run Code'}
                  </button>

                  <button
                    onClick={explainCodeHandler}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-colors
                      ${isNormalMode
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }
                    `}
                  >
                    🧠 Explain Code
                  </button>

                  {isDeveloperMode && (
                    <button
                      onClick={reviewCodeHandler}
                      className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                    >
                      🔍 AI Review
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <MonacoWrapper
                value={code}
                onChange={setCode}
                language={language}
                height="500px"
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-4">
            {/* Console Output */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Console Output</h3>
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg min-h-32 font-mono text-sm">
                <pre className="whitespace-pre-wrap">
                  {output || '// Output will appear here when you run your code'}
                </pre>
              </div>
            </div>

            {/* AI Explanation */}
            {aiExplanation && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">🧠 AI Explanation</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700 leading-relaxed">{aiExplanation}</p>
                </div>
              </div>
            )}

            {/* Code Review (Developer Mode) */}
            {isDeveloperMode && codeReview && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">🔍 Code Review</h3>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <pre className="text-gray-700 whitespace-pre-wrap text-sm">{codeReview}</pre>
                </div>
              </div>
            )}

            {/* Performance Metrics (Developer Mode) */}
            {isDeveloperMode && (
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="text-lg font-semibold mb-3 text-gray-800">📊 Performance Metrics</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-600">Lines of Code</div>
                    <div className="text-2xl font-bold text-purple-600">{code.split('\n').length}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-600">Characters</div>
                    <div className="text-2xl font-bold text-purple-600">{code.length}</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-600">Complexity</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {code.length < 100 ? 'Low' : code.length < 500 ? 'Medium' : 'High'}
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="font-medium text-gray-600">Readability</div>
                    <div className="text-2xl font-bold text-purple-600">
                      {code.includes('//') || code.includes('/*') ? 'Good' : 'Fair'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
