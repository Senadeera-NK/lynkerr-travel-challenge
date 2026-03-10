'use server'

import { listingService } from '@/services/listingService';
import { authService } from '@/services/authService';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { storageService } from '@/services/storageService';
import { createClient } from '@/lib/supabase/server';

export async function handleCreateListing(formData: FormData) {
  const user = await authService.getUser();
  if (!user) return { error: "Login required" };

  const imageFile = formData.get('image_file') as File;
  let publicUrl = '';

  try {
    //uploading the files to supabase bucket
    if (imageFile && imageFile.size > 0) {
      publicUrl = await storageService.uploadImage(imageFile);
    }

    const rawData = {
      title: formData.get('title') as string,
      location: formData.get('location') as string,
      description: formData.get('description') as string,
      price: Number(formData.get('price')),
      image_url: publicUrl, 
      user_id: user.id
    };

    await listingService.createListing(rawData);
  } catch (error) {
    // console.error("DEBUG ERROR:", error);
    return { error: "Failed to upload image or save listing" };
  }

  revalidatePath('/');
  redirect('/');
}


export async function handleDeleteListing(listingId: string) {
  const user = await authService.getUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', listingId)
      .eq('user_id', user.id);

    if (error) {
      console.error("Supabase Delete Error:", error);
      return { error: error.message };
    }

    //claening the cache of next.js
    revalidatePath('/');
    
  } catch (err) {
    console.error("Delete Action Crash:", err);
    return { error: "An unexpected error occurred" };
  }

  redirect('/');
}