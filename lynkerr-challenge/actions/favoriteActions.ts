'use server'

import { listingService } from "@/services/listingService";
import { revalidatePath } from "next/cache";

export async function handleToggleFavorite(listingId: string, userId: string) {
  try {
    await listingService.toggleFavorite(listingId, userId);
    
    // This is the magic: it clears the cache so the "checkIfFavorited" 
    // runs again and returns TRUE next time the page loads.
    revalidatePath('/'); 
    revalidatePath(`/listings/${listingId}`);
  } catch (error) {
    console.error("Favorite Action Error:", error);
  }
}