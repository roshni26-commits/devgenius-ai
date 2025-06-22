
import React, { useState, useRef, useEffect } from 'react';
import { useMode } from '@/context/ModeContext';
import ChatBubble from '@/components/ChatBubble';
import ApiKeyInput from '@/components/ApiKeyInput';
import { getChatResponse } from '@/services/GeminiService';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const Chat: React.FC = () => {
  const { isNormalMode } = useMode();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: isNormalMode 
        ? "Hi there! 👋 I'm your AI coding tutor. I'm here to help you learn programming in a fun and easy way. What would you like to learn about today?"
        : "👨‍💻 Dev mode active. Ready for technical discussion. Ask about algorithms, optimization, or paste code for review.",
      isUser: false,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isUser: true,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const aiResponse = await getChatResponse(inputMessage, !isNormalMode);
      const aiMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error. Please check your API key and try again.",
        isUser: false,
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleVoiceInput = () => {
    console.log('🎙️ Voice input activated (mock implementation)');
    // Mock voice input
    setInputMessage('Hello, can you explain JavaScript functions?');
  };

  return (
    <div className={`min-h-screen ${isNormalMode ? 'bg-blue-50' : 'bg-purple-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`
            text-3xl md:text-4xl font-bold mb-4
            ${isNormalMode ? 'text-blue-900' : 'text-purple-900'}
          `}>
            {isNormalMode ? '🤖 AI Coding Tutor' : '👨‍💻 Developer AI Assistant'}
          </h1>
          <p className="text-gray-600">
            {isNormalMode 
              ? 'Ask me anything about programming! I\'ll explain concepts in a friendly, easy-to-understand way.'
              : 'Technical AI assistant for advanced development queries, code review, and optimization.'
            }
          </p>
        </div>

        {/* API Key Input */}
        <ApiKeyInput />

        {/* Chat Container */}
        <div className="bg-white rounded-xl shadow-lg flex flex-col h-96 md:h-[500px]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-gray-100 rounded-lg px-4 py-2 border">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <button
                onClick={handleVoiceInput}
                className={`
                  px-4 py-2 rounded-lg font-medium transition-colors
                  ${isNormalMode
                    ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }
                `}
                title="Voice Input (Mock)"
              >
                🎙️
              </button>
              
              <div className="flex-1 flex gap-2">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={isNormalMode 
                    ? "Ask me about coding concepts, like 'What is a function?'"
                    : "Enter technical query or paste code for review..."
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isTyping}
                  className={`
                    px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                    ${isNormalMode
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-purple-600 hover:bg-purple-700 text-white'
                    }
                  `}
                >
                  Send
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[
                isNormalMode ? "What is JavaScript?" : "Optimize this algorithm",
                isNormalMode ? "How do functions work?" : "Code review request",
                isNormalMode ? "Explain loops to me" : "Performance analysis"
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setInputMessage(suggestion)}
                  className={`
                    px-3 py-1 text-sm rounded-full border transition-colors
                    ${isNormalMode
                      ? 'border-blue-200 text-blue-700 hover:bg-blue-50'
                      : 'border-purple-200 text-purple-700 hover:bg-purple-50'
                    }
                  `}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
