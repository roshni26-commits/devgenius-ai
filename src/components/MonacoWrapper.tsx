
import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { useMode } from '@/context/ModeContext';

interface MonacoWrapperProps {
  value: string;
  onChange: (value: string) => void;
  language: string;
  height?: string;
}

const MonacoWrapper: React.FC<MonacoWrapperProps> = ({ 
  value, 
  onChange, 
  language, 
  height = "400px" 
}) => {
  const { isDeveloperMode } = useMode();
  const [isLoading, setIsLoading] = useState(true);

  const handleEditorDidMount = () => {
    setIsLoading(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <div className="relative border rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      )}
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        theme={isDeveloperMode ? 'vs-dark' : 'light'}
        options={{
          fontSize: 14,
          minimap: { enabled: isDeveloperMode },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          padding: { top: 10 },
        }}
      />
    </div>
  );
};

export default MonacoWrapper;
