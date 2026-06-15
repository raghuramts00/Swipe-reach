import { createClient } from '@supabase/supabase-js';

// Setup Supabase Client
// This relies on environment variables that the user must provide.
// If not provided, it will gracefully fallback or show a setup warning.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
