import { useAuth } from '../contexts/AuthContext';
import { User, Mail, Briefcase, DollarSign, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    monthlyIncome: user?.monthlyIncome || 0,
    workType: user?.workType || '',
  });

  if (!user) return null;

  const handleSave = () => {
    updateProfile({
      monthlyIncome: parseFloat(formData.monthlyIncome.toString()),
      workType: formData.workType,
    });
    setIsEditing(false);
  };

  const totalBudget = Object.values(user.budgetCategories || {}).reduce((sum, val) => sum + val, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Profile</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-400 bg-opacity-20 border border-red-400 rounded-lg hover:bg-opacity-30 transition-all"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg bg-emerald-400 bg-opacity-20 border border-emerald-400 flex items-center justify-center">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <User className="w-8 h-8 text-emerald-400" />
              )}
            </div>
            <div>
              <p className="text-sm opacity-70">Name</p>
              <p className="text-lg font-semibold">{user.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-400 flex items-center justify-center">
              <Mail className="w-8 h-8 text-blue-400" />
            </div>
            <div>
              <p className="text-sm opacity-70">Email</p>
              <p className="text-lg font-semibold">{user.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Financial Profile</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit</span>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Monthly Income</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-emerald-400">$</span>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ ...formData, monthlyIncome: parseFloat(e.target.value) })}
                  className="w-full pl-8 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:border-opacity-100 transition-all"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-4 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center space-x-2 px-4 py-2 border border-white border-opacity-20 rounded-lg hover:border-opacity-40 transition-all"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-emerald-400 bg-opacity-20 border border-emerald-400 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm opacity-70">Monthly Income</p>
                <p className="text-2xl font-bold">${user.monthlyIncome.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-lg bg-blue-400 bg-opacity-20 border border-blue-400 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm opacity-70">Work Type</p>
                <p className="text-lg font-semibold">{user.workType}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold">Budget Allocation</h3>
        <div className="space-y-3">
          {Object.entries(user.budgetCategories || {}).map(([category, amount]) => {
            const percentage = totalBudget > 0 ? (amount / totalBudget) * 100 : 0;
            return (
              <div key={category}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{category}</span>
                  <span className="text-sm opacity-70">${amount.toFixed(2)} ({percentage.toFixed(0)}%)</span>
                </div>
                <div className="w-full h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-400 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="pt-4 border-t border-white border-opacity-10">
          <p className="flex items-center justify-between">
            <span className="opacity-70">Total Monthly Budget</span>
            <span className="text-xl font-bold">${totalBudget.toFixed(2)}</span>
          </p>
        </div>
      </div>

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold">What-If Scenarios</h3>
        <div className="space-y-2">
          {user.whatIfConditions && user.whatIfConditions.length > 0 ? (
            user.whatIfConditions.map((condition, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white bg-opacity-5 rounded-lg">
                <div className="w-6 h-6 rounded-full bg-emerald-400 bg-opacity-20 border border-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                <p className="flex-1">{condition}</p>
              </div>
            ))
          ) : (
            <p className="opacity-70">No scenarios added yet</p>
          )}
        </div>
      </div>

      <div className="bg-white bg-opacity-5 border border-white border-opacity-10 rounded-lg p-6">
        <h3 className="text-lg font-bold mb-2">Account Created</h3>
        <p className="opacity-70">{new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
    </div>
  );
}
