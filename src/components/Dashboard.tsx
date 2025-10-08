import { TrendingUp, TrendingDown, DollarSign, PiggyBank, AlertTriangle } from 'lucide-react';
import { Theme } from '../types';
import { financialSummary, mockBudgetCategories } from '../mockData';

interface DashboardProps {
  theme: Theme;
  status: string;
}

export default function Dashboard({ theme }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl group`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg group-hover:scale-110 transition-transform`}>
              <DollarSign className="w-6 h-6" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Income</span>
          </div>
          <div className="text-3xl font-bold mb-1">${financialSummary.totalIncome.toLocaleString()}</div>
          <div className="flex items-center text-sm opacity-70">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>+12% from last month</span>
          </div>
        </div>

        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl group`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg group-hover:scale-110 transition-transform`}>
              <TrendingDown className="w-6 h-6" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Expenses</span>
          </div>
          <div className="text-3xl font-bold mb-1">${financialSummary.totalExpenses.toLocaleString()}</div>
          <div className="flex items-center text-sm opacity-70">
            <TrendingDown className="w-4 h-4 mr-1" />
            <span>-8% from last month</span>
          </div>
        </div>

        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl group`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg group-hover:scale-110 transition-transform`}>
              <PiggyBank className="w-6 h-6" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Savings</span>
          </div>
          <div className="text-3xl font-bold mb-1">${financialSummary.savings.toLocaleString()}</div>
          <div className="flex items-center text-sm opacity-70">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span>{financialSummary.savingsRate}% saved</span>
          </div>
        </div>

        <div className={`p-6 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl group`}>
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg group-hover:scale-110 transition-transform`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="text-xs opacity-60 uppercase tracking-wider">Budget</span>
          </div>
          <div className="text-3xl font-bold mb-1">{financialSummary.budgetUtilization}%</div>
          <div className="flex items-center text-sm opacity-70">
            <span>Utilized this month</span>
          </div>
        </div>
      </div>

      <div className={`p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
        <h2 className="text-2xl font-bold mb-6">Budget Categories</h2>
        <div className="space-y-6">
          {mockBudgetCategories.map((category) => {
            const percentage = (category.spent / category.limit) * 100;
            const isOverBudget = percentage > 100;
            const isNearLimit = percentage > 80 && percentage <= 100;

            return (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-sm opacity-70">
                    ${category.spent} / ${category.limit}
                  </span>
                </div>
                <div className="relative h-3 bg-white bg-opacity-5 rounded-full overflow-hidden">
                  <div
                    className={`absolute h-full rounded-full transition-all duration-500 ${
                      isOverBudget ? 'bg-red-400' : isNearLimit ? 'bg-orange-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs opacity-60">
                  <span>{percentage.toFixed(0)}% used</span>
                  <span>${category.limit - category.spent} remaining</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className={`p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <h2 className="text-2xl font-bold mb-6">Spending Trend</h2>
          <div className="h-64 flex items-end justify-around gap-2">
            {[65, 72, 58, 81, 69, 75, 63].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gradient-to-t from-emerald-400/50 to-emerald-400/20 rounded-t-lg transition-all duration-500 hover:from-emerald-400/70 hover:to-emerald-400/30" style={{ height: `${height}%` }} />
                <span className="text-xs opacity-60">W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl`}>
          <h2 className="text-2xl font-bold mb-6">Financial Health Score</h2>
          <div className="flex items-center justify-center h-64">
            <div className="relative">
              <svg className="w-48 h-48 transform -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  className="opacity-10"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 88}`}
                  strokeDashoffset={`${2 * Math.PI * 88 * (1 - 0.82)}`}
                  className={`${theme.text} transition-all duration-1000`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">82</span>
                <span className="text-sm opacity-60 mt-1">Excellent</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
