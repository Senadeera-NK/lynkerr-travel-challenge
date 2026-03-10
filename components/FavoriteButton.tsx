'use client'

import { useState } from 'react';
import { handleToggleFavorite } from '@/actions/favoriteActions';

interface FavoriteButtonProps {
  listingId: string;
  initialIsFavorited: boolean;
  isLoggedIn: boolean;
  userId?: string;
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

    //Instant feedback for the user
    setIsFavorited(!isFavorited);
    
    //saving to the db
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