import { createContext, useContext, useState, ReactNode } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  monthlyIncome: number;
  budgetCategories: Record<string, number>;
  workType: string;
  whatIfConditions: string[];
  profileCompleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const stored = localStorage.getItem('hugh_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId) {
        throw new Error('Google Client ID not configured');
      }

      const redirectUri = window.location.origin;
      const scope = 'openid email profile';
      const responseType = 'token';

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
        client_id: clientId,
        redirect_uri: redirectUri,
        response_type: responseType,
        scope: scope,
        access_type: 'offline',
      }).toString()}`;

      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        authUrl,
        'google-login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        throw new Error('Failed to open login window');
      }

      const handleMessage = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          const { user: googleUser } = event.data;
          const newUser: UserProfile = {
            id: googleUser.id || Date.now().toString(),
            name: googleUser.name || '',
            email: googleUser.email || '',
            avatar: googleUser.picture || '',
            monthlyIncome: 0,
            budgetCategories: {},
            workType: '',
            whatIfConditions: [],
            profileCompleted: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };
          setUser(newUser);
          localStorage.setItem('hugh_user', JSON.stringify(newUser));
          window.removeEventListener('message', handleMessage);
          setLoading(false);
        }
      };

      window.addEventListener('message', handleMessage);

      const checkPopup = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopup);
          window.removeEventListener('message', handleMessage);
          setLoading(false);
        }
      }, 1000);
    } catch (error) {
      console.error('Google login error:', error);
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hugh_user');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    setUser(updatedUser);
    localStorage.setItem('hugh_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
