'use client'

import { useState } from 'react';
import { handleToggleFavorite } from '@/actions/favoriteActions';

interface FavoriteButtonProps {
  listingId: string;
  initialIsFavorited: boolean;
  isLoggedIn: boolean;
  userId?: string; // Add this
}

export default function FavoriteButton({ 
  listingId, 
  initialIsFavorited, 
  isLoggedIn, 
  userId 
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);

  const toggle = async () => {
    if (!isLoggedIn || !userId) {
      alert("Please login to save experiences!");
      return;
    }

    // 1. Instant feedback for the user
    setIsFavorited(!isFavorited);
    
    // 2. Save to Supabase
    await handleToggleFavorite(listingId, userId);
  };

  return (
    <button 
      onClick={toggle} 
      className="p-2 rounded-full hover:bg-gray-50 transition-all active:scale-90"
    >
      <span className="text-2xl">
        {isFavorited ? '❤️' : '🤍'}
      </span>
    </button>
  );
}