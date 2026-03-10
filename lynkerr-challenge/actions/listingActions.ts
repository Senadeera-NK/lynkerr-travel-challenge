'use server'

import { listingService } from '@/services/listingService';
import { authService } from '@/services/authService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { storageService } from '@/services/storageService';

export async function handleCreateListing(formData: FormData) {
  const user = await authService.getUser();
  if (!user) return { error: "Login required" };

  const imageFile = formData.get('image_file') as File; // Get the file object
  let publicUrl = '';

  try {
    // 1. Upload the file first
    if (imageFile && imageFile.size > 0) {
      publicUrl = await storageService.uploadImage(imageFile);
    }

    // 2. Save listing with the new URL
    const rawData = {
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      image_url: publicUrl, // Use the URL from Supabase Storage
      user_id: user.id
    };

    await listingService.createListing(rawData);
  } catch (error) {
    return { error: "Failed to upload image or save listing" };
  }

  revalidatePath('/');
  redirect('/');
}