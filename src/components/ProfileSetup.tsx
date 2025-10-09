import { useState } from 'react';
import { Sparkles, DollarSign, Target, ShoppingBag, BarChart3, Briefcase, Bell, Calendar, MessageSquare, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface ProfileSetupProps {
  onComplete: () => void;
}

const spendingOptions = [
  { id: 'food', label: 'Food & Dining', icon: '🍜' },
  { id: 'travel', label: 'Travel', icon: '✈️' },
  { id: 'rent', label: 'Rent & Housing', icon: '🏠' },
  { id: 'shopping', label: 'Shopping', icon: '🛍️' },
  { id: 'investments', label: 'Investments', icon: '📈' },
  { id: 'entertainment', label: 'Entertainment', icon: '🎬' },
];

const riskOptions = [
  { id: 'conservative', label: 'Conservative', color: 'blue', icon: '🔵' },
  { id: 'balanced', label: 'Balanced', color: 'green', icon: '🟢' },
  { id: 'adventurous', label: 'Adventurous', color: 'red', icon: '🔴' },
];

const financeTypeOptions = [
  { id: 'personal', label: 'Personal', icon: '🤝' },
  { id: 'business', label: 'Business', icon: '💼' },
  { id: 'hybrid', label: 'Hybrid', icon: '🔄' },
];

const toneOptions = [
  { id: 'friendly', label: 'Friendly', icon: '🤝' },
  { id: 'professional', label: 'Professional', icon: '💼' },
  { id: 'analytical', label: 'Analytical', icon: '🧮' },
];

export default function ProfileSetup({ onComplete }: ProfileSetupProps) {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    monthly_income: 0,
    savings_goal_percentage: 20,
    spending_priorities: [] as string[],
    risk_tolerance: 'balanced' as 'conservative' | 'balanced' | 'adventurous',
    finance_type: 'personal' as 'personal' | 'business' | 'hybrid',
    fraud_alerts_enabled: true,
    summary_frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    ai_tone: 'friendly' as 'friendly' | 'professional' | 'analytical',
  });

  const totalSteps = 8;

  const togglePriority = (id: string) => {
    setFormData(prev => ({
      ...prev,
      spending_priorities: prev.spending_priorities.includes(id)
        ? prev.spending_priorities.filter(p => p !== id)
        : [...prev.spending_priorities, id].slice(0, 3)
    }));
  };

  const handleComplete = async () => {
    setSaving(true);
    try {
      await updateProfile({
        ...formData,
        profile_completed: true,
      });
      onComplete();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <DollarSign className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Let's start with the basics</h3>
              <p className="text-gray-400">What's your monthly income or salary range?</p>
            </div>
            <div className="space-y-4">
              <input
                type="number"
                value={formData.monthly_income || ''}
                onChange={(e) => setFormData({ ...formData, monthly_income: parseFloat(e.target.value) || 0 })}
                placeholder="Enter amount"
                className="w-full px-6 py-4 text-2xl text-center bg-white bg-opacity-5 border border-cyan-400 border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-cyan-400 focus:border-opacity-60 transition-all"
              />
              <p className="text-sm text-gray-500 text-center">Your data is private and encrypted</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <Target className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Got it!</h3>
              <p className="text-gray-400">What percentage would you like to save every month?</p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={formData.savings_goal_percentage}
                  onChange={(e) => setFormData({ ...formData, savings_goal_percentage: parseInt(e.target.value) })}
                  className="w-full h-2 bg-white bg-opacity-10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-cyan-400 mb-2">{formData.savings_goal_percentage}%</div>
                <p className="text-gray-400">of ${formData.monthly_income.toLocaleString()} = ${(formData.monthly_income * formData.savings_goal_percentage / 100).toLocaleString()}/month</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <ShoppingBag className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">What are your top 3 priorities?</h3>
              <p className="text-gray-400">Select up to 3 spending categories</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {spendingOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => togglePriority(option.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.spending_priorities.includes(option.id)
                      ? 'border-cyan-400 bg-cyan-400 bg-opacity-10 shadow-cyan-400/50 shadow-lg scale-105'
                      : 'border-white border-opacity-10 bg-white bg-opacity-5 hover:border-opacity-30'
                  }`}
                >
                  <div className="text-4xl mb-2">{option.icon}</div>
                  <div className="text-sm font-medium">{option.label}</div>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 text-center">
              {formData.spending_priorities.length}/3 selected
            </p>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <BarChart3 className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">How risky do you like investments?</h3>
              <p className="text-gray-400">Choose your investment style</p>
            </div>
            <div className="space-y-4">
              {riskOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({ ...formData, risk_tolerance: option.id as any })}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.risk_tolerance === option.id
                      ? 'border-cyan-400 bg-cyan-400 bg-opacity-10 shadow-cyan-400/50 shadow-lg'
                      : 'border-white border-opacity-10 bg-white bg-opacity-5 hover:border-opacity-30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">{option.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <Briefcase className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">What finances do you want to optimize?</h3>
              <p className="text-gray-400">Personal, business, or both?</p>
            </div>
            <div className="space-y-4">
              {financeTypeOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({ ...formData, finance_type: option.id as any })}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.finance_type === option.id
                      ? 'border-cyan-400 bg-cyan-400 bg-opacity-10 shadow-cyan-400/50 shadow-lg'
                      : 'border-white border-opacity-10 bg-white bg-opacity-5 hover:border-opacity-30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">{option.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <Bell className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Real-time fraud alerts?</h3>
              <p className="text-gray-400">Get notified of suspicious activity</p>
            </div>
            <button
              onClick={() => setFormData({ ...formData, fraud_alerts_enabled: !formData.fraud_alerts_enabled })}
              className="w-full p-8 rounded-xl border-2 border-cyan-400 border-opacity-30 bg-white bg-opacity-5 hover:border-opacity-60 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-lg font-medium">Fraud Detection Alerts</span>
                <div className="relative">
                  <div className={`w-16 h-8 rounded-full transition-all ${formData.fraud_alerts_enabled ? 'bg-cyan-400' : 'bg-white bg-opacity-20'}`} />
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${formData.fraud_alerts_enabled ? 'left-9' : 'left-1'}`} />
                </div>
              </div>
            </button>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent">
                <Calendar className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Financial summary frequency?</h3>
              <p className="text-gray-400">How often should Hugh send updates?</p>
            </div>
            <div className="space-y-4">
              {['daily', 'weekly', 'monthly'].map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFormData({ ...formData, summary_frequency: freq as any })}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.summary_frequency === freq
                      ? 'border-cyan-400 bg-cyan-400 bg-opacity-10 shadow-cyan-400/50 shadow-lg'
                      : 'border-white border-opacity-10 bg-white bg-opacity-5 hover:border-opacity-30'
                  }`}
                >
                  <div className="font-bold text-lg capitalize">{freq}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6 animate-fade-in">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-4 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-lg backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent animate-pulse-slow">
                <MessageSquare className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Finally — Hugh's personality</h3>
              <p className="text-gray-400">What tone should Hugh use?</p>
            </div>
            <div className="space-y-4">
              {toneOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFormData({ ...formData, ai_tone: option.id as any })}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 ${
                    formData.ai_tone === option.id
                      ? 'border-cyan-400 bg-cyan-400 bg-opacity-10 shadow-cyan-400/50 shadow-lg'
                      : 'border-white border-opacity-10 bg-white bg-opacity-5 hover:border-opacity-30'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-3xl">{option.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-bold text-lg">{option.label}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-indigo-950 opacity-80" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400 rounded-full opacity-10 blur-3xl animate-pulse-slow" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span className="font-semibold">Profile Setup</span>
          </div>
          <div className="text-sm text-gray-400">Step {step} of {totalSteps}</div>
        </div>

        <div className="mb-8">
          <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-8 shadow-2xl mb-6">
          {renderStep()}
        </div>

        <div className="flex space-x-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center space-x-2 px-6 py-3 border border-white border-opacity-20 rounded-xl backdrop-blur-xl hover:border-opacity-40 transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
          )}
          <button
            onClick={() => step < totalSteps ? setStep(step + 1) : handleComplete()}
            disabled={saving || (step === 3 && formData.spending_priorities.length === 0)}
            className="flex-1 group px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            <span>{saving ? 'Saving...' : step < totalSteps ? 'Continue' : 'Launch Hugh'}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {step === totalSteps && (
          <p className="mt-6 text-center text-sm text-gray-400 animate-fade-in">
            Profile calibrated. Welcome aboard, Commander of your finances.
          </p>
        )}
      </div>
    </div>
  );
}
