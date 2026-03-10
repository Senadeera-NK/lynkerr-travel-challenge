'use server'

import { authService } from '@/services/authService';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function handleSignUp(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const displayName = formData.get('displayName') as string;

  try {
    await authService.signUp(email, password, displayName);
  } catch (error) {
    return { error: 'Could not authenticate user' };
  }

  revalidatePath('/', 'layout');
  redirect('/'); // Redirect to main feed after signup
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