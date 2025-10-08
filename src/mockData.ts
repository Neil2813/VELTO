import { Transaction, BudgetCategory, TimelineEvent } from './types';

export const mockTransactions: Transaction[] = [
  { id: '1', date: '2025-10-07', description: 'Grocery Store', amount: -127.45, category: 'Food' },
  { id: '2', date: '2025-10-07', description: 'Salary Deposit', amount: 5000, category: 'Income' },
  { id: '3', date: '2025-10-06', description: 'Gas Station', amount: -65.00, category: 'Transport' },
  { id: '4', date: '2025-10-05', description: 'Online Shopping', amount: -245.99, category: 'Shopping', isFraud: true, confidence: 87 },
  { id: '5', date: '2025-10-05', description: 'Restaurant', amount: -89.50, category: 'Food' },
  { id: '6', date: '2025-10-04', description: 'Electricity Bill', amount: -134.00, category: 'Utilities' },
  { id: '7', date: '2025-10-03', description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment' },
  { id: '8', date: '2025-10-02', description: 'Coffee Shop', amount: -12.50, category: 'Food' },
];

export const mockBudgetCategories: BudgetCategory[] = [
  { name: 'Food & Dining', spent: 1240, limit: 1500, icon: 'utensils' },
  { name: 'Transportation', spent: 380, limit: 400, icon: 'car' },
  { name: 'Shopping', spent: 890, limit: 800, icon: 'shopping-bag' },
  { name: 'Entertainment', spent: 215, limit: 300, icon: 'film' },
  { name: 'Utilities', spent: 420, limit: 500, icon: 'zap' },
  { name: 'Healthcare', spent: 150, limit: 400, icon: 'heart' },
];

export const mockTimelineEvents: TimelineEvent[] = [
  { id: '1', date: '2025-10', type: 'income', amount: 5000, description: 'Monthly Salary' },
  { id: '2', date: '2025-11', type: 'income', amount: 5000, description: 'Monthly Salary' },
  { id: '3', date: '2025-12', type: 'income', amount: 5200, description: 'Salary + Bonus' },
  { id: '4', date: '2026-01', type: 'income', amount: 5000, description: 'Monthly Salary' },
  { id: '5', date: '2026-02', type: 'expense', amount: -2000, description: 'Vacation' },
  { id: '6', date: '2026-03', type: 'investment', amount: -1000, description: 'Stock Investment' },
];

export const financialSummary = {
  totalIncome: 5000,
  totalExpenses: 3145,
  savings: 1855,
  savingsRate: 37,
  budgetUtilization: 78,
};
