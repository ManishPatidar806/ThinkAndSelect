import { useState, useRef, useEffect } from "react";
import Navbar from "../Home/Navbar";
import Prevent from "../Auth/Prevent";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  MessageCircle, 
  Bot, 
  User, 
  Sparkles, 
  Code2, 
  BookOpen, 
  Lightbulb,
  RotateCcw,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Download,
  Mic,
  MicOff,
  Settings,
  Zap,
  Brain,
  Clock,
  ChevronDown,
  Trash2,
  Star
} from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hello! I'm your AI programming assistant. I'm here to help you with:

• **Programming Questions** - Get help with code, debugging, algorithms
• **Concept Explanations** - Understand programming concepts clearly  
• **Quiz Preparation** - Practice questions and review topics
• **Code Reviews** - Get feedback on your code
• **Learning Paths** - Get personalized learning recommendations

What would you like to learn about today?`,
      timestamp: new Date(),
      suggestions: [
        "Explain JavaScript closures",
        "Help me debug Python code",
        "What is machine learning?",
        "Show me React examples"
      ]
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { 
      icon: Code2, 
      title: "Code Help", 
      description: "Debug and improve code",
      color: "bg-blue-100 text-blue-600"
    },
    { 
      icon: BookOpen, 
      title: "Learning", 
      description: "Explain concepts",
      color: "bg-green-100 text-green-600"
    },
    { 
      icon: Lightbulb, 
      title: "Problem Solving", 
      description: "Algorithm help",
      color: "bg-yellow-100 text-yellow-600"
    },
    { 
      icon: Brain, 
      title: "Quiz Prep", 
      description: "Practice questions",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const handleSendMessage = async (messageText = inputMessage) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: generateBotResponse(messageText),
        timestamp: new Date(),
        suggestions: generateSuggestions(messageText)
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('javascript') || lowerMessage.includes('js')) {
      return `Great question about JavaScript! 

**JavaScript** is a versatile programming language that's essential for web development. Here are some key points:

• **Dynamic Language**: Variables don't need explicit type declarations
• **Event-Driven**: Responds to user interactions like clicks and form submissions
• **Asynchronous**: Handles operations like API calls without blocking the UI
• **Object-Oriented**: Supports classes, objects, and inheritance

Would you like me to explain any specific JavaScript concept like closures, promises, or DOM manipulation?`;
    }
    
    if (lowerMessage.includes('python')) {
      return `Python is an excellent choice for learning programming! 🐍

**Why Python is Popular:**
• **Simple Syntax**: Easy to read and write
• **Versatile**: Web development, data science, AI, automation
• **Rich Libraries**: NumPy, Pandas, Django, Flask, and more
• **Community**: Large, supportive developer community

**Getting Started:**
\`\`\`python
# Hello World in Python
print("Hello, World!")

# Variables and basic operations
name = "Programmer"
age = 25
print(f"Hi {name}, you are {age} years old!")
\`\`\`

What specific area of Python interests you most?`;
    }

    if (lowerMessage.includes('react')) {
      return `React is a powerful library for building user interfaces! ⚛️

**Core Concepts:**
• **Components**: Reusable pieces of UI
• **JSX**: JavaScript syntax extension for HTML-like code
• **State**: Managing dynamic data in components
• **Props**: Passing data between components
• **Hooks**: useState, useEffect for component logic

**Simple Example:**
\`\`\`jsx
function Welcome({ name }) {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}
\`\`\`

Would you like help with a specific React concept or problem?`;
    }

    // Default response
    return `I understand you're asking about: "${userMessage}"

I'm here to help with programming questions! I can assist you with:

• **Code explanations and debugging**
• **Algorithm and data structure concepts** 
• **Programming language syntax and best practices**
• **Project planning and architecture advice**
• **Quiz preparation and practice problems**

Could you provide more specific details about what you'd like to learn? For example:
- Share code you need help with
- Ask about a specific programming concept  
- Request practice problems for a topic
- Get study guidance for your next quiz

I'm ready to help you become a better programmer! 🚀`;
  };

  const generateSuggestions = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('javascript')) {
      return [
        "Explain JavaScript closures",
        "Show async/await examples", 
        "Help with DOM manipulation",
        "Array methods tutorial"
      ];
    }
    
    if (lowerMessage.includes('python')) {
      return [
        "Python data structures",
        "Object-oriented programming in Python",
        "Python web frameworks",
        "Machine learning with Python"
      ];
    }
    
    return [
      "Show me code examples",
      "Explain this concept step by step", 
      "Give me practice problems",
      "What should I learn next?"
    ];
  };

  const clearChat = () => {
    setMessages([messages[0]]); // Keep welcome message
  };

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action) => {
    const prompts = {
      "Code Help": "I need help debugging my code. Can you help me review and fix issues?",
      "Learning": "Can you explain programming concepts in simple terms?", 
      "Problem Solving": "I need help with algorithms and problem-solving strategies.",
      "Quiz Prep": "Help me prepare for programming quizzes with practice questions."
    };
    
    handleSendMessage(prompts[action.title]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      <Prevent />
      
      {/* Navigation */}
      <div className="py-4 lg:py-6">
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-blue-100 rounded-full border border-emerald-200">
            <Bot className="w-4 h-4 text-emerald-600" />
            <span className="text-sm font-medium text-emerald-700">AI Assistant</span>
          </div>
        </div>

        {/* Main Chat Interface */}
        <div className="max-w-4xl mx-auto">
          <div className="glass-card rounded-3xl overflow-hidden shadow-2xl">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-blue-600 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg">AI Programming Assistant</h2>
                    <p className="text-emerald-100 text-sm flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      Online & Ready to Help
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={clearChat}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    title="Clear Chat"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors">
                    <Settings className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-96 lg:h-[500px] overflow-y-auto p-6 space-y-6 bg-gray-50/50">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-4 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-600'
                  }`}>
                    {message.type === 'user' ? (
                      <User className="w-4 h-4 text-white" />
                    ) : (
                      <Bot className="w-4 h-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex-1 max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-xl ${message.type === 'user' ? 'text-right' : ''}`}>
                    <div className={`inline-block p-4 rounded-2xl shadow-sm ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-white border border-gray-200'
                    }`}>
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                      {/* Message Actions */}
                      {message.type === 'bot' && (
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                          <button 
                            onClick={() => copyMessage(message.content)}
                            className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-gray-700 transition-colors"
                            title="Copy message"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-green-600 transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 rounded text-gray-500 hover:text-red-600 transition-colors">
                            <ThumbsDown className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Timestamp */}
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <p className="text-xs text-gray-600 font-medium px-2">Suggestions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendMessage(suggestion)}
                              className="text-xs bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-3 py-1 rounded-full transition-colors"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-200 bg-white p-4">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about programming..."
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all duration-200 resize-none max-h-32"
                    rows="1"
                    style={{ minHeight: '44px' }}
                  />
                  
                  {/* Character counter */}
                  <div className="absolute bottom-2 right-2 text-xs text-gray-400">
                    {inputMessage.length}/1000
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsListening(!isListening)}
                    className={`p-3 rounded-xl transition-all duration-200 ${
                      isListening 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title={isListening ? "Stop listening" : "Start voice input"}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputMessage.trim() || isTyping}
                    className="bg-gradient-to-r from-emerald-500 to-blue-600 hover:from-emerald-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white p-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">
                {quickActions.map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handleQuickAction(action)}
                      className="flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-xl transition-colors group"
                    >
                      <div className={`p-2 rounded-lg ${action.color} group-hover:scale-110 transition-transform`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 text-sm truncate">{action.title}</div>
                        <div className="text-xs text-gray-600 truncate">{action.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        
        </div>
      </div>
    </div>
  );
};

export default Chatbot;