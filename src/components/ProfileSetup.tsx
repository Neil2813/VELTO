import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { ArrowRight, Plus, X } from 'lucide-react';

const WORK_TYPES = [
  'Student',
  'Employed (Full-time)',
  'Employed (Part-time)',
  'Self-employed',
  'Freelancer',
  'Business Owner',
  'Retired',
  'Other'
];

const DEFAULT_CATEGORIES = ['Housing', 'Food', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare'];

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [workType, setWorkType] = useState('');
  const [budgetCategories, setBudgetCategories] = useState<Record<string, number>>({});
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryBudget, setNewCategoryBudget] = useState('');
  const [whatIfConditions, setWhatIfConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState('');

  const handleAddCategory = () => {
    if (newCategory && newCategoryBudget) {
      setBudgetCategories({
        ...budgetCategories,
        [newCategory]: parseFloat(newCategoryBudget),
      });
      setNewCategory('');
      setNewCategoryBudget('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    const updated = { ...budgetCategories };
    delete updated[category];
    setBudgetCategories(updated);
  };

  const handleAddCondition = () => {
    if (newCondition.trim()) {
      setWhatIfConditions([...whatIfConditions, newCondition]);
      setNewCondition('');
    }
  };

  const handleRemoveCondition = (index: number) => {
    setWhatIfConditions(whatIfConditions.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (step === 1 && monthlyIncome && workType) {
      setStep(2);
    } else if (step === 2 && Object.keys(budgetCategories).length > 0) {
      setStep(3);
    } else if (step === 3 && whatIfConditions.length > 0) {
      completeProfile();
    }
  };

  const completeProfile = () => {
    updateProfile({
      monthlyIncome: parseFloat(monthlyIncome),
      workType,
      budgetCategories,
      whatIfConditions,
      profileCompleted: true,
    });
  };

  const canProceed =
    (step === 1 && monthlyIncome && workType) ||
    (step === 2 && Object.keys(budgetCategories).length > 0) ||
    (step === 3 && whatIfConditions.length > 0);

  const totalBudget = Object.values(budgetCategories).reduce((sum, val) => sum + val, 0);
  const income = parseFloat(monthlyIncome) || 0;
  const remaining = income - totalBudget;

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tighter mb-2">Complete Your Profile</h1>
            <p className="text-opacity-70">Step {step} of 3</p>
          </div>

          <div className="space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium mb-2">What's your monthly income?</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3 text-emerald-400">$</span>
                    <input
                      type="number"
                      value={monthlyIncome}
                      onChange={(e) => setMonthlyIncome(e.target.value)}
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 bg-white bg-opacity-10 border border-emerald-400 border-opacity-30 rounded-lg text-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-3">What kind of work do you do?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {WORK_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setWorkType(type)}
                        className={`px-4 py-3 rounded-lg border transition-all ${
                          workType === type
                            ? 'border-emerald-400 bg-emerald-400 bg-opacity-20'
                            : 'border-white border-opacity-20 hover:border-opacity-40'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-medium">Set monthly budget per category</label>
                    <div className="text-sm text-opacity-70">
                      <span className="text-emerald-400">Budget: ${totalBudget.toFixed(2)}</span>
                      <span className="text-opacity-70 ml-4">Remaining: ${remaining.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                    {Object.entries(budgetCategories).map(([category, amount]) => (
                      <div key={category} className="flex items-center justify-between bg-white bg-opacity-5 p-3 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{category}</p>
                          <p className="text-sm opacity-70">${amount.toFixed(2)}</p>
                        </div>
                        <button
                          onClick={() => handleRemoveCategory(category)}
                          className="p-2 hover:bg-red-400 hover:bg-opacity-20 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category name</label>
                      <input
                        type="text"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="e.g., Dining Out"
                        className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Monthly budget</label>
                      <div className="relative">
                        <span className="absolute left-4 top-2 text-emerald-400">$</span>
                        <input
                          type="number"
                          value={newCategoryBudget}
                          onChange={(e) => setNewCategoryBudget(e.target.value)}
                          placeholder="0"
                          className="w-full pl-8 pr-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all"
                        />
                      </div>
                    </div>
                    <button
                      onClick={handleAddCategory}
                      disabled={!newCategory || !newCategoryBudget}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Category</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <label className="block text-sm font-medium mb-3">
                    What scenarios would you like to analyze? (for what-if simulations)
                  </label>
                  <p className="text-sm opacity-70 mb-4">
                    Examples: "What if I spend 20% less on food?", "What if my income increases by 30%?"
                  </p>

                  <div className="space-y-2 mb-4 max-h-60 overflow-y-auto">
                    {whatIfConditions.map((condition, index) => (
                      <div key={index} className="flex items-center justify-between bg-white bg-opacity-5 p-3 rounded-lg">
                        <p className="flex-1">{condition}</p>
                        <button
                          onClick={() => handleRemoveCondition(index)}
                          className="p-2 hover:bg-red-400 hover:bg-opacity-20 rounded-lg transition-all"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 p-4 bg-white bg-opacity-5 rounded-lg border border-white border-opacity-10">
                    <textarea
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      placeholder="Describe a scenario you'd like to analyze..."
                      rows={3}
                      className="w-full px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-opacity-50 focus:outline-none focus:border-opacity-100 transition-all resize-none"
                    />
                    <button
                      onClick={handleAddCondition}
                      disabled={!newCondition.trim()}
                      className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all disabled:opacity-50"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Scenario</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-white border-opacity-10">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 border border-white border-opacity-30 rounded-lg hover:border-opacity-60 transition-all disabled:opacity-50"
            >
              Back
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center space-x-2 px-6 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all disabled:opacity-50"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={completeProfile}
                disabled={!canProceed}
                className="flex items-center space-x-2 px-6 py-2 bg-emerald-400 bg-opacity-20 border border-emerald-400 rounded-lg hover:bg-opacity-30 transition-all disabled:opacity-50"
              >
                <span>Complete Setup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
