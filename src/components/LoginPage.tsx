import { useAuth } from '../contexts/AuthContext';
import { Sparkles, Loader } from 'lucide-react';

export default function LoginPage() {
  const { loginWithGoogle, loading } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-md w-full">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-lg border border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-400/50 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black">
              <Sparkles className="w-8 h-8 text-emerald-400" />
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold tracking-tighter mb-4">Hugh Level</h1>
            <p className="text-xl opacity-80">Budget Buddy</p>
          </div>

          <p className="text-base opacity-70 leading-relaxed">
            Your AI co-pilot for intelligent spending, fraud detection, and what-if simulations. Experience finance like never before.
          </p>

          <div className="space-y-4 pt-8">
            <button
              onClick={loginWithGoogle}
              disabled={loading}
              className="w-full group px-6 py-3 border border-emerald-400 rounded-xl shadow-lg shadow-emerald-400/50 hover:shadow-2xl transition-all duration-300 backdrop-blur-xl bg-gradient-to-r from-emerald-400/20 to-black hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 font-semibold"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  <span>Continue with Google</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs opacity-60 pt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
