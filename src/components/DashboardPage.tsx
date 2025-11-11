import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useBudget } from '../contexts/BudgetContext';
import { Plus, Trash2 } from 'lucide-react';
import { BudgetCharts } from './Charts';

export default function DashboardPage() {
  const { user } = useAuth();
  const { transactions, addTransaction, removeTransaction, getTotalSpent, getMonthlyAnalysis } = useBudget();
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    description: '',
    type: 'expense' as const,
  });

  if (!user?.profileCompleted) {
    return <div className="text-center py-12 opacity-70">Complete your profile first</div>;
  }

  const handleAddTransaction = () => {
    if (formData.category && formData.amount) {
      addTransaction({
        category: formData.category,
        amount: parseFloat(formData.amount),
        description: formData.description,
        type: formData.type,
        date: new Date().toISOString(),
      });
      setFormData({ category: '', amount: '', description: '', type: 'expense' });
      setShowAddTransaction(false);
    }
  };

  const monthlyAnalysis = getMonthlyAnalysis();
  const totalSpent = getTotalSpent();
  const totalBudget = Object.values(user.budgetCategories).reduce((sum, val) => sum + val, 0);
  const remaining = user.monthlyIncome - totalSpent;
  const percentageUsed = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white bg-opacity-5 border border-emerald-400 border-opacity-30 rounded-lg p-4 space-y-2">
          <p className="text-sm opacity-70">Monthly Income</p>
          <p className="text-2xl font-bold">${user.monthlyIncome.toFixed(2)}</p>
        </div>

        <div className="bg-white bg-opacity-5 border border-blue-400 border-opacity-30 rounded-lg p-4 space-y-2">
          <p className="text-sm opacity-70">Total Budget</p>
          <p className="text-2xl font-bold">${totalBudget.toFixed(2)}</p>
        </div>

        <div className="bg-white bg-opacity-5 border border-orange-400 border-opacity-30 rounded-lg p-4 space-y-2">
          <p className="text-sm opacity-70">Spent This Month</p>
          <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
        </div>

        <div className={`bg-white bg-opacity-5 rounded-lg p-4 space-y-2 ${remaining >= 0 ? 'border border-emerald-400 border-opacity-30' : 'border border-red-400 border-opacity-30'}`}>
          <p className="text-sm opacity-70">Remaining</p>
          <p className={`text-2xl font-bold ${remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            ${remaining.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Budget Usage</h3>
          <span className="text-sm opacity-70">{percentageUsed.toFixed(0)}% used</span>
        </div>
        <div className="w-full h-3 bg-white bg-opacity-10 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${percentageUsed > 100 ? 'bg-red-400' : percentageUsed > 80 ? 'bg-orange-400' : 'bg-emerald-400'}`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
      </div>

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold">Category Breakdown</h3>
        <div className="space-y-3">
          {Object.entries(user.budgetCategories).map(([category, budgetAmount]) => {
            const spent = monthlyAnalysis[category] || 0;
            const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
            const status = percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'normal';

            return (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category}</span>
                  <span className="text-sm opacity-70">
                    ${spent.toFixed(2)} / ${budgetAmount.toFixed(2)}
                  </span>
                </div>
                <div className="w-full h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      status === 'over' ? 'bg-red-400' : status === 'warning' ? 'bg-orange-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BudgetCharts />

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Recent Transactions</h3>
          <button
            onClick={() => setShowAddTransaction(!showAddTransaction)}
            className="flex items-center space-x-2 px-4 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>

        {showAddTransaction && (
          <div className="space-y-3 p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-opacity-100 transition-all"
            >
              <option value="">Select Category</option>
              {Object.keys(user.budgetCategories).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="relative">
              <span className="absolute left-4 top-2 text-emerald-400">$</span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Amount"
                className="w-full pl-8 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
              />
            </div>

            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Description (optional)"
              className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
            />

            <button
              onClick={handleAddTransaction}
              className="w-full px-4 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all"
            >
              Add
            </button>
          </div>
        )}

        <div className="space-y-2 max-h-96 overflow-y-auto">
          {transactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10)
            .map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{transaction.category}</p>
                  <p className="text-sm opacity-70">{transaction.description || new Date(transaction.date).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`font-semibold ${transaction.type === 'income' ? 'text-emerald-400' : ''}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removeTransaction(transaction.id)}
                    className="p-2 hover:bg-red-400 hover:bg-opacity-20 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
