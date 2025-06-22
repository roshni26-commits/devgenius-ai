
import React from 'react';
import { useMode } from '@/context/ModeContext';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isUser, timestamp }) => {
  const { isNormalMode } = useMode();

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`
        max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-sm
        ${isUser 
          ? `${isNormalMode ? 'bg-blue-500' : 'bg-purple-500'} text-white` 
          : 'bg-gray-100 text-gray-800 border'
        }
      `}>
        {!isUser && (
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium">
              {isNormalMode ? '🤖 AI Tutor' : '👨‍💻 DevAI'}
            </span>
          </div>
        )}
        <div className="text-sm whitespace-pre-wrap">
          {message.includes('```') ? (
            <div>
              {message.split('```').map((part, index) => (
                index % 2 === 0 ? (
                  <span key={index}>{part}</span>
                ) : (
                  <pre key={index} className="bg-gray-800 text-green-400 p-2 rounded mt-1 text-xs overflow-x-auto">
                    <code>{part}</code>
                  </pre>
                )
              ))}
            </div>
          ) : (
            message
          )}
        </div>
        {timestamp && (
          <div className="text-xs opacity-70 mt-1">
            {timestamp}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBubble;
