
export const explainCode = (code: string): string => {
  const codeLength = code.length;
  const isComplex = codeLength > 50;
  const preview = code.substring(0, 15).trim();
  
  if (code.includes('function')) {
    return `AI Explanation: This ${isComplex ? 'complex' : 'simple'} function "${preview}..." defines a reusable block of code that can be called with parameters. Functions help organize code and avoid repetition.`;
  }
  
  if (code.includes('const') || code.includes('let') || code.includes('var')) {
    return `AI Explanation: This ${isComplex ? 'complex' : 'simple'} code "${preview}..." declares variables to store data values. Variables are containers that hold information that can be used throughout your program.`;
  }
  
  if (code.includes('for') || code.includes('while')) {
    return `AI Explanation: This ${isComplex ? 'complex' : 'simple'} code "${preview}..." uses loops to repeat code execution. Loops are essential for iterating over data or performing repetitive tasks efficiently.`;
  }
  
  return `AI Explanation: This ${isComplex ? 'complex' : 'simple'} code "${preview}..." performs specific operations. The code structure suggests it's designed to solve a particular programming problem or implement functionality.`;
};

export const getChatResponse = (message: string, isDeveloperMode: boolean): string => {
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return isDeveloperMode 
      ? "👨‍💻 Ready to code. What do you need?"
      : "👋 Hello! I'm your AI coding tutor. How can I help you learn programming today?";
  }
  
  if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
    return isDeveloperMode
      ? "```javascript\n// JS fundamentals:\nconst arr = [1,2,3];\narr.map(x => x*2); // [2,4,6]\n```"
      : "Great question! JavaScript is a versatile programming language used for web development. It runs in browsers and servers, making it perfect for full-stack development!";
  }
  
  if (lowerMessage.includes('function')) {
    return isDeveloperMode
      ? "```javascript\n// Function syntax:\nconst fn = (param) => { return param * 2; };\n// Arrow functions are concise\n```"
      : "Functions are reusable blocks of code! Think of them as recipes - you write them once and use them whenever needed. They help keep your code organized and avoid repetition.";
  }
  
  if (lowerMessage.includes('loop') || lowerMessage.includes('for')) {
    return isDeveloperMode
      ? "```javascript\n// Loop patterns:\nfor(let i=0; i<arr.length; i++) { /* code */ }\narr.forEach(item => { /* code */ });\n```"
      : "Loops are fantastic for repetitive tasks! Instead of writing the same code multiple times, loops let you repeat actions efficiently. It's like telling the computer 'do this 10 times'.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('learn')) {
    return isDeveloperMode
      ? "Available commands: /explain <code>, /debug, /optimize. What specific concept?"
      : "I'm here to help you master coding! Ask me about JavaScript, functions, loops, or any programming concept. We can also practice with coding challenges!";
  }
  
  return isDeveloperMode
    ? "Specify your question. Use /help for commands."
    : "That's an interesting question! Could you provide more details so I can give you the best explanation? I'm here to help you understand coding concepts step by step.";
};

export const reviewCode = (code: string): string => {
  const issues: string[] = [];
  
  if (code.includes('var ')) {
    issues.push("• Use 'const' or 'let' instead of 'var'");
  }
  
  if (code.includes('==') && !code.includes('===')) {
    issues.push("• Use '===' for strict equality comparison");
  }
  
  if (!code.includes(';') && code.length > 20) {
    issues.push("• Consider adding semicolons for clarity");
  }
  
  if (code.split('\n').some(line => line.length > 100)) {
    issues.push("• Some lines are too long (>100 chars)");
  }
  
  const score = Math.max(10 - issues.length * 2, 3);
  
  return `🔍 Code Review Score: ${score}/10

${issues.length > 0 ? 'Suggestions:\n' + issues.join('\n') : '✅ Code looks good!'}

Performance: ${code.length < 100 ? 'Optimal' : code.length < 500 ? 'Good' : 'Consider refactoring'}
Readability: ${code.includes('//') || code.includes('/*') ? 'Well documented' : 'Add comments'}`;
};
