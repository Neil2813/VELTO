export type FinancialStatus = 'under' | 'normal' | 'near' | 'over';

export interface Theme {
  bg: string;
  text: string;
  accent: string;
  glow: string;
  gradient: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  isFraud?: boolean;
  confidence?: number;
}

export interface BudgetCategory {
  name: string;
  spent: number;
  limit: number;
  icon: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  type: 'income' | 'expense' | 'investment' | 'savings';
  amount: number;
  description: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
