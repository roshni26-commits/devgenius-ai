
export interface Challenge {
  id: number;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  starterCode: string;
  language: 'javascript' | 'python';
}

export const challenges: Challenge[] = [
  {
    id: 1,
    title: "Reverse a string",
    difficulty: "Beginner",
    description: "Write a function that takes a string as input and returns the string reversed.",
    starterCode: `function reverseString(str) {
  // Your code here
  return '';
}

// Test your function
console.log(reverseString("hello")); // Should return "olleh"`,
    language: "javascript"
  },
  {
    id: 2,
    title: "Fetch API data",
    difficulty: "Intermediate", 
    description: "Create an async function that fetches data from a REST API and handles errors properly.",
    starterCode: `async function fetchUserData(userId) {
  // Your code here
  // Use: https://jsonplaceholder.typicode.com/users/\${userId}
}

// Test your function
fetchUserData(1).then(console.log);`,
    language: "javascript"
  },
  {
    id: 3,
    title: "Build todo list",
    difficulty: "Advanced",
    description: "Create a complete todo list with add, remove, and toggle functionality using DOM manipulation.",
    starterCode: `class TodoList {
  constructor() {
    this.todos = [];
    this.init();
  }
  
  init() {
    // Your initialization code here
  }
  
  addTodo(text) {
    // Your code here
  }
  
  removeTodo(id) {
    // Your code here
  }
  
  toggleTodo(id) {
    // Your code here
  }
}

// Initialize the todo list
const todoApp = new TodoList();`,
    language: "javascript"
  }
];
