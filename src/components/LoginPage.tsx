import { useState } from 'react';
import { Sparkles, Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginPageProps {
  onSuccess: () => void;
}

export default function LoginPage({ onSuccess }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (authError) {
        setError(authError.message);
      } else {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 via-black to-indigo-950 opacity-80" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: Math.random() * 0.5 + 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="mb-12 text-center animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-6 border-2 border-cyan-400 rounded-2xl shadow-cyan-400/50 shadow-2xl backdrop-blur-xl bg-gradient-to-br from-cyan-400/20 to-transparent animate-pulse-slow">
            <Sparkles className="w-10 h-10 text-cyan-400 animate-spin-slow" />
          </div>
          <h1 className="text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Hugh Level
          </h1>
          <p className="text-xl text-gray-400">Your AI Financial Co-Pilot</p>
        </div>

        <div className="backdrop-blur-xl bg-white bg-opacity-5 border border-white border-opacity-10 rounded-3xl p-8 shadow-2xl animate-fade-in hover:border-opacity-20 transition-all duration-500"
          style={{ animationDelay: '0.2s' }}>

          <h2 className="text-2xl font-bold mb-6 text-center">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>

          {error && (
            <div className="mb-4 p-4 bg-red-500 bg-opacity-10 border border-red-500 border-opacity-30 rounded-xl text-red-400 text-sm animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-cyan-400 border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-cyan-400 focus:border-opacity-60 transition-all text-white placeholder-gray-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white bg-opacity-5 border border-cyan-400 border-opacity-30 rounded-xl backdrop-blur-xl focus:outline-none focus:border-cyan-400 focus:border-opacity-60 transition-all text-white placeholder-gray-500"
              />
            </div>

            {!isSignUp && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 cursor-pointer group">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-11 h-6 bg-white bg-opacity-10 rounded-full peer peer-checked:bg-cyan-400 transition-all" />
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5" />
                  </div>
                  <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full group relative px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-semibold shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>{loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Create one"}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Built with AI Intelligence • Secured by Supabase
        </p>
      </div>
    </div>
  );
}
