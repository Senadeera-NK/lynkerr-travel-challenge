'use server'

import { listingService } from "@/services/listingService";
import { revalidatePath } from "next/cache";

//function to save favorites
export async function handleToggleFavorite(listingId: string, userId: string) {
  try {
    await listingService.toggleFavorite(listingId, userId);
    revalidatePath('/'); 
    revalidatePath(`/listings/${listingId}`);
  } catch (error) {
    console.error("Favorite Action Error:", error);
  }
}