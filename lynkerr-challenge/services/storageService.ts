import { createClient } from '@/lib/supabase/server';

export const storageService = {
  async uploadImage(file: File) {
    const supabase = await createClient();
    
    // Create a unique filename (e.g., 17152345-my-photo.jpg)
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}-${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error } = await supabase.storage
      .from('listing-images')
      .upload(filePath, file);

    if (error) throw error;

    // Get the Public URL to save in the Database
    const { data } = supabase.storage
      .from('listing-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  }
};