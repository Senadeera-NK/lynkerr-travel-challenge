import { createClient } from '@/lib/supabase/server';
import {Listing} from '@/types';

export const listingService = {
  // CREATE: Post a new travel experience
  async createListing(data: { 
    title: string; 
    location: string; 
    description: string; 
    price: number; 
    image_url: string; 
    user_id: string 
  }) {
    const supabase = await createClient();
    const { data: listing, error } = await supabase
      .from('listings')
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return listing;
  },

  // READ: Get all listings (Newest First) and search listing
async getAllListings(searchTerm?: string): Promise<Listing[]> {
  const supabase = await createClient();
  let query = supabase
    .from('listings')
    .select('*, profiles(display_name)')
    .order('created_at', { ascending: false });

  // Only apply filtering if searchTerm is NOT empty/undefined
  if (searchTerm && searchTerm.trim() !== "") {
    query = query.or(`title.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
},

  // READ: Get a single listing by ID (For Detail Page)
  async getListingById(id: string):Promise<Listing> {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('listings')
      .select('*, profiles(display_name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  },

  async toggleFavorite(listingId: string, userId: string) {
  const supabase = await createClient();
  
  // Check if already liked
  const { data } = await supabase
    .from('favorites')
    .select()
    .eq('listing_id', listingId)
    .eq('user_id', userId)
    .single();

  if (data) {
    // Unlike
    return await supabase.from('favorites').delete().eq('id', data.id);
  } else {
    // Like
    return await supabase.from('favorites').insert({ listing_id: listingId, user_id: userId });
  }
 },


 async checkIfFavorited(listingId: string, userId: string): Promise<boolean> {
  const supabase = await createClient();
  const { data } = await supabase
    .from('favorites')
    .select('id')
    .eq('listing_id', listingId)
    .eq('user_id', userId)
    .single();
    
  return !!data;
},

};


