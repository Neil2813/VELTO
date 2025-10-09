import { useState } from 'react';
import { LayoutDashboard, MessageSquare, GitBranch, Shield, Sparkles, Menu, X } from 'lucide-react';
import { FinancialStatus, Theme } from './types';
import Dashboard from './components/Dashboard';
import ChatInterface from './components/ChatInterface';
import WhatIfSimulator from './components/WhatIfSimulator';
import FraudDetector from './components/FraudDetector';
import { financialSummary } from './mockData';

type View = 'landing' | 'dashboard' | 'chat' | 'simulator' | 'fraud';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const calculateStatus = (): FinancialStatus => {
    const utilization = financialSummary.budgetUtilization;
    if (utilization > 100) return 'over';
    if (utilization >= 80) return 'near';
    return 'normal';
  };

  const [status] = useState<FinancialStatus>(calculateStatus());

  const themes: Record<FinancialStatus, Theme> = {
    under: {
      bg: 'bg-black',
      text: 'text-emerald-400',
      accent: 'border-emerald-400',
      glow: 'shadow-emerald-400/50',
      gradient: 'from-emerald-400/20 to-black'
    },
    normal: {
      bg: 'bg-black',
      text: 'text-emerald-400',
      accent: 'border-emerald-400',
      glow: 'shadow-emerald-400/50',
      gradient: 'from-emerald-400/20 to-black'
    },
    near: {
      bg: 'bg-black',
      text: 'text-orange-400',
      accent: 'border-orange-400',
      glow: 'shadow-orange-400/50',
      gradient: 'from-orange-400/20 to-black'
    },
    over: {
      bg: 'bg-black',
      text: 'text-red-400',
      accent: 'border-red-400',
      glow: 'shadow-red-400/50',
      gradient: 'from-red-400/20 to-black'
    }
  };

  const theme = themes[status];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', label: 'AI Co-Pilot', icon: MessageSquare },
    { id: 'simulator', label: 'What-If', icon: GitBranch },
    { id: 'fraud', label: 'Fraud Monitor', icon: Shield },
  ];

  const handleViewChange = (view: View) => {
    setCurrentView(view);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard theme={theme} status={status} />;
      case 'chat':
        return <ChatInterface theme={theme} />;
      case 'simulator':
        return <WhatIfSimulator theme={theme} />;
      case 'fraud':
        return <FraudDetector theme={theme} />;
      default:
        return (
          <div className="relative flex-1 flex items-center justify-center px-6 py-20">
            <div className="max-w-6xl w-full">
              <div className="text-center space-y-8 animate-fade-in">
                <div className={`inline-block border ${theme.accent} rounded-full px-6 py-2 ${theme.glow} shadow-2xl backdrop-blur-xl bg-gradient-to-r ${theme.gradient}`}>
                  <span className="text-sm font-medium tracking-wide">AI-POWERED FINANCIAL INTELLIGENCE</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
                  <span className="block">Finance Meets</span>
                  <span className={`block bg-gradient-to-r ${theme.gradient} bg-clip-text text-transparent animate-pulse-slow`}>
                    The Future
                  </span>
                </h1>

                <p className="text-xl md:text-2xl opacity-80 max-w-3xl mx-auto leading-relaxed">
                  Hugh Level Budget Buddy — Your AI co-pilot for intelligent spending,
                  fraud detection, and what-if simulations. Experience finance like never before.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
                  <button
                    onClick={() => handleViewChange('dashboard')}
                    className={`group px-8 py-4 border ${theme.accent} rounded-xl ${theme.glow} shadow-2xl hover:shadow-3xl transition-all duration-300 backdrop-blur-xl bg-gradient-to-r ${theme.gradient} hover:scale-105`}
                  >
                    <span className="flex items-center space-x-2 font-semibold">
                      <span>Launch Dashboard</span>
                      <LayoutDashboard className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
                {navItems.slice(1).map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleViewChange(item.id as View)}
                      className={`group text-left p-8 border ${theme.accent} border-opacity-20 rounded-2xl backdrop-blur-xl hover:border-opacity-60 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className={`w-12 h-12 rounded-lg border ${theme.accent} flex items-center justify-center mb-6 ${theme.glow} shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.label}</h3>
                      <p className="opacity-70 leading-relaxed">
                        {item.id === 'chat' && 'Ask anything. Hugh AI explains complex financial insights in plain English with visual reasoning.'}
                        {item.id === 'simulator' && 'Drag events into your timeline and watch your financial future unfold in real-time visualization.'}
                        {item.id === 'fraud' && 'Neural networks analyze patterns and alert you to suspicious activity before it becomes a problem.'}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} flex flex-col`}>
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <header className={`relative z-20 border-b ${theme.accent} border-opacity-20 backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className={`w-10 h-10 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg`}>
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">Hugh Level</span>
            </button>

            <div className="hidden lg:flex items-center space-x-2">
              {currentView !== 'landing' && navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleViewChange(item.id as View)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? `border ${theme.accent} ${theme.glow} shadow-lg backdrop-blur-xl bg-gradient-to-r ${theme.gradient}`
                        : 'border border-transparent hover:border-white hover:border-opacity-20 backdrop-blur-xl'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center space-x-3">
              <div className={`hidden sm:flex items-center space-x-2 px-4 py-2 border ${theme.accent} rounded-lg ${theme.glow} shadow-lg backdrop-blur-xl bg-gradient-to-r ${theme.gradient}`}>
                <div className={`w-2 h-2 rounded-full ${theme.text.replace('text-', 'bg-')} animate-pulse`} />
                <span className="text-sm font-medium">
                  {status === 'over' && 'Over Budget'}
                  {status === 'near' && 'Near Limit'}
                  {status === 'normal' && 'On Track'}
                  {status === 'under' && 'Under Budget'}
                </span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2 border ${theme.accent} border-opacity-30 rounded-lg backdrop-blur-xl hover:border-opacity-60 transition-all`}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 space-y-2 animate-fade-in">
              {currentView !== 'landing' && navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleViewChange(item.id as View)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? `border ${theme.accent} ${theme.glow} shadow-lg backdrop-blur-xl bg-gradient-to-r ${theme.gradient}`
                        : 'border border-white border-opacity-10 hover:border-opacity-30 backdrop-blur-xl'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </header>

      <main className="relative flex-1 overflow-auto">
        {currentView !== 'landing' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            {renderContent()}
          </div>
        ) : (
          renderContent()
        )}
      </main>

      <footer className={`relative z-10 border-t ${theme.accent} border-opacity-20 backdrop-blur-xl`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg border ${theme.accent} flex items-center justify-center ${theme.glow} shadow-lg`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-semibold text-sm">Hugh Level Budget Buddy</span>
            </div>

            <div className="flex items-center space-x-6 text-sm opacity-70">
              <a href="#" className="hover:opacity-100 transition-opacity">Privacy</a>
              <a href="#" className="hover:opacity-100 transition-opacity">Terms</a>
              <a href="#" className="hover:opacity-100 transition-opacity">GitHub</a>
            </div>

            <div className="text-sm opacity-70">
              Built with AI Intelligence • 2025
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
