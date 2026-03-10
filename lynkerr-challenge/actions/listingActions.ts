'use server'

import { listingService } from '@/services/listingService';
import { authService } from '@/services/authService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleCreateListing(formData: FormData) {
  // 1. Get current user
  const user = await authService.getUser();
  if (!user) throw new Error("You must be logged in to post.");

  // 2. Extract and format data
  const rawData = {
    title: formData.get('title') as string,
    location: formData.get('location') as string,
    description: formData.get('description') as string,
    price: Number(formData.get('price')),
    image_url: formData.get('image_url') as string,
    user_id: user.id
  };

  // 3. Save to DB
  try {
    await listingService.createListing(rawData);
  } catch (error) {
    console.error(error);
    return { error: "Failed to create listing" };
  }

  // 4. Update UI and Redirect
  revalidatePath('/');
  redirect('/');
}