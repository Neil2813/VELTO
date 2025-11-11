import { useState } from 'react';
import { Sparkles, Menu, X, User, LogOut } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BudgetProvider } from './contexts/BudgetContext';
import LoginPage from './components/LoginPage';
import ProfileSetup from './components/ProfileSetup';
import DashboardPage from './components/DashboardPage';
import ProfilePage from './components/ProfilePage';

type View = 'dashboard' | 'profile';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin-slow">
          <Sparkles className="w-12 h-12 text-emerald-400" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (!user.profileCompleted) {
    return <ProfileSetup />;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <header className="relative z-20 border-b border-emerald-400 border-opacity-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentView('dashboard')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 rounded-lg border border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="text-xl sm:text-2xl font-bold tracking-tight">Hugh Level</span>
            </button>

            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={() => setCurrentView('dashboard')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'dashboard'
                    ? 'border border-emerald-400 shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black'
                    : 'border border-transparent hover:border-white hover:border-opacity-20 backdrop-blur-xl'
                }`}
              >
                <span className="text-sm font-medium">Dashboard</span>
              </button>
              <button
                onClick={() => setCurrentView('profile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentView === 'profile'
                    ? 'border border-emerald-400 shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black'
                    : 'border border-transparent hover:border-white hover:border-opacity-20 backdrop-blur-xl'
                }`}
              >
                <span className="text-sm font-medium">Profile</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden sm:flex items-center space-x-2 px-4 py-2 border border-emerald-400 rounded-lg shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full" />
                ) : (
                  <User className="w-4 h-4" />
                )}
                <span className="text-sm font-medium truncate max-w-[100px]">{user.name}</span>
              </div>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 border border-emerald-400 border-opacity-30 rounded-lg backdrop-blur-xl hover:border-opacity-60 transition-all"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-2 animate-fade-in">
              <button
                onClick={() => {
                  setCurrentView('dashboard');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  currentView === 'dashboard'
                    ? 'border border-emerald-400 shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black'
                    : 'border border-white border-opacity-10 hover:border-opacity-30 backdrop-blur-xl'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  setCurrentView('profile');
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  currentView === 'profile'
                    ? 'border border-emerald-400 shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black'
                    : 'border border-white border-opacity-10 hover:border-opacity-30 backdrop-blur-xl'
                }`}
              >
                Profile
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="relative flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {currentView === 'dashboard' && <DashboardPage />}
          {currentView === 'profile' && <ProfilePage />}
        </div>
      </main>

      <footer className="relative z-10 border-t border-emerald-400 border-opacity-20 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg border border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/50">
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

function App() {
  return (
    <AuthProvider>
      <BudgetProvider>
        <AppContent />
      </BudgetProvider>
    </AuthProvider>
  );
}

export default App;
