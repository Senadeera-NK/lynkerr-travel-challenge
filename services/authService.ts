import { createClient } from '@/lib/supabase/server';
import {User} from '@supabase/supabase-js';
export const authService = {
  // Sign Up
  async signUp(email: string, password: string, displayName: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName, // Matches the DB trigger
        },
      },
    });
    if (error) throw error;
    return data;
  },

  // Login
  async login(email: string, password: string) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Get current user session
  async getUser():Promise<User | null> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  }
};