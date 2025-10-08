import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';
import { Theme, ChatMessage } from '../types';

interface ChatInterfaceProps {
  theme: Theme;
}

const initialMessages: ChatMessage[] = [
  {
    id: '1',
    role: 'assistant',
    content: "Hello! I'm Hugh, your AI financial co-pilot. Ask me anything about your finances, run what-if scenarios, or get personalized insights.",
    timestamp: new Date(),
  },
];

const predefinedResponses: Record<string, string> = {
  'budget': "Based on your current spending patterns, you're utilizing 78% of your monthly budget. Your highest expenses are in Shopping ($890) and Food & Dining ($1,240). I recommend reducing shopping expenses by 15% to stay comfortably under budget.",
  'savings': "Your current savings rate is 37%, which is excellent! You're saving $1,855 per month. To reach your goal of $25,000 by year-end, you're on track. Consider setting up an automatic transfer to maximize your savings.",
  'fraud': "I've detected 1 suspicious transaction: a $245.99 online shopping charge on Oct 5th. This transaction has an 87% fraud confidence score due to unusual timing and location. Would you like me to flag this for review?",
  'investment': "Based on your risk profile and savings rate, I recommend allocating 15% of your monthly savings to a diversified index fund. This could generate an estimated 8-10% annual return over the long term.",
  'quit job': "Running simulation: If you quit your job next month without replacement income, your current savings would last approximately 8 months at your current expense rate. I recommend building an emergency fund of at least 6 months before making this transition.",
};

export default function ChatInterface({ theme }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerInput = input.toLowerCase();
      let responseContent = "I understand your question. Let me analyze your financial data and provide insights based on your current situation.";

      for (const [key, value] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          responseContent = value;
          break;
        }
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickActions = [
    'How is my budget looking?',
    'Check for fraud',
    'Optimize my savings',
    'What if I quit my job?',
  ];

  return (
    <div className="h-full flex flex-col">
      <div className={`p-6 border-b ${theme.accent} border-opacity-20 backdrop-blur-xl`}>
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-xl border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg animate-pulse-slow`}>
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Hugh AI Co-Pilot</h2>
            <p className="text-sm opacity-60">Your intelligent financial assistant</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-2xl p-4 rounded-2xl ${
                message.role === 'user'
                  ? `${theme.accent} border border-opacity-40 backdrop-blur-xl`
                  : 'bg-white bg-opacity-5 backdrop-blur-xl'
              }`}
            >
              <p className="leading-relaxed">{message.content}</p>
              <span className="text-xs opacity-50 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <div className="max-w-2xl p-4 rounded-2xl bg-white bg-opacity-5 backdrop-blur-xl">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-current animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action) => (
            <button
              key={action}
              onClick={() => setInput(action)}
              className={`px-4 py-2 text-sm border ${theme.accent} border-opacity-30 rounded-lg backdrop-blur-xl hover:border-opacity-60 transition-all duration-300`}
            >
              {action}
            </button>
          ))}
        </div>

        <div className="flex space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask Hugh anything..."
            className={`flex-1 px-6 py-4 bg-white bg-opacity-5 border ${theme.accent} border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-opacity-60 transition-all`}
          />
          <button
            onClick={handleSend}
            className={`px-6 py-4 border ${theme.accent} rounded-xl ${theme.glow} shadow-lg hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${theme.gradient} hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={!input.trim()}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
