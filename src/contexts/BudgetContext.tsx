import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

export interface Transaction {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  type: 'expense' | 'income';
}

interface BudgetContextType {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  removeTransaction: (id: string) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  getTransactionsByCategory: (category: string) => Transaction[];
  getTotalSpent: (category?: string) => number;
  getMonthlyAnalysis: () => Record<string, number>;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within BudgetProvider');
  }
  return context;
};

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    if (!user) return [];
    const stored = localStorage.getItem(`hugh_transactions_${user.id}`);
    return stored ? JSON.parse(stored) : [];
  });

  const saveTransactions = (txns: Transaction[]) => {
    if (!user) return;
    setTransactions(txns);
    localStorage.setItem(`hugh_transactions_${user.id}`, JSON.stringify(txns));
  };

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    };
    saveTransactions([...transactions, newTransaction]);
  };

  const removeTransaction = (id: string) => {
    saveTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    saveTransactions(
      transactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t
      )
    );
  };

  const getTransactionsByCategory = (category: string) => {
    return transactions.filter((t) => t.category === category);
  };

  const getTotalSpent = (category?: string) => {
    return transactions
      .filter((t) => t.type === 'expense' && (!category || t.category === category))
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getMonthlyAnalysis = () => {
    const analysis: Record<string, number> = {};
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        const tDate = new Date(t.date);
        if (tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear) {
          analysis[t.category] = (analysis[t.category] || 0) + t.amount;
        }
      });

    return analysis;
  };

  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        removeTransaction,
        updateTransaction,
        getTransactionsByCategory,
        getTotalSpent,
        getMonthlyAnalysis,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
