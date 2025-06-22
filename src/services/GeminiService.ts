
const GEMINI_API_BASE_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

let apiKey: string | null = null;

export const setGeminiApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('gemini-api-key', key);
};

export const getGeminiApiKey = (): string | null => {
  if (apiKey) return apiKey;
  apiKey = localStorage.getItem('gemini-api-key');
  return apiKey;
};

const callGeminiAPI = async (prompt: string): Promise<string> => {
  const key = getGeminiApiKey();
  if (!key) {
    return "Please enter your Gemini API key to use AI features.";
  }

  try {
    const response = await fetch(`${GEMINI_API_BASE_URL}?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI";
  } catch (error) {
    console.error('Gemini API Error:', error);
    return `Error: ${error.message}. Please check your API key.`;
  }
};

export const explainCode = async (code: string): Promise<string> => {
  const prompt = `Explain this code in a friendly, educational way for someone learning programming:

${code}

Focus on:
- What the code does
- Key concepts used
- How it works step by step`;

  return await callGeminiAPI(prompt);
};

export const getChatResponse = async (message: string, isDeveloperMode: boolean): Promise<string> => {
  const context = isDeveloperMode 
    ? "You are a technical AI assistant for experienced developers. Be concise and include code examples when relevant."
    : "You are a friendly AI coding tutor. Explain concepts clearly and encourage learning. Use simple language and provide examples.";

  const prompt = `${context}

User question: ${message}

Provide a helpful response.`;

  return await callGeminiAPI(prompt);
};

export const reviewCode = async (code: string): Promise<string> => {
  const prompt = `Please review this code and provide:
1. Code quality score (1-10)
2. Specific suggestions for improvement
3. Performance considerations
4. Best practices recommendations

Code to review:
${code}`;

  return await callGeminiAPI(prompt);
};
