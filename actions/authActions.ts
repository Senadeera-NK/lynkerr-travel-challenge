'use server'

import { authService } from '@/services/authService';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function handleSignUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const displayName = formData.get('displayName') as string;

  // SIMPLE VALIDATION
  if (!email.includes('@')) {
    return { error: "Invalid email format" };
  }
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters" };
  }

  try {
    await authService.signUp(email, password, displayName);
  } catch (error) {
    return { error: 'Could not authenticate user' };
  }

  revalidatePath('/', 'layout');
  redirect('/auth/login'); // Redirect to the signin
}

export async function handleLogin(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await authService.login(email, password);
  } catch (error) {
    return { error: 'Invalid login credentials' };
  }

  revalidatePath('/', 'layout');
  redirect('/'); 
}

export async function handleLogout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath('/', 'layout');
  redirect('/');
}