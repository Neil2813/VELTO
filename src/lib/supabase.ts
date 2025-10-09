import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface UserProfile {
  id: string;
  email: string;
  monthly_income: number;
  savings_goal_percentage: number;
  spending_priorities: string[];
  risk_tolerance: 'conservative' | 'balanced' | 'adventurous';
  finance_type: 'personal' | 'business' | 'hybrid';
  fraud_alerts_enabled: boolean;
  summary_frequency: 'daily' | 'weekly' | 'monthly';
  ai_tone: 'friendly' | 'professional' | 'analytical';
  chart_preference: 'bar' | 'pie';
  profile_completed: boolean;
  created_at: string;
  updated_at: string;
}
