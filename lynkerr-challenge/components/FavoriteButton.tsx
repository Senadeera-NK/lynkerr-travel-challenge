'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Props {
  listingId: string;
  initialIsFavorited: boolean;
  isLoggedIn: boolean;
}

export default function FavoriteButton({ listingId, initialIsFavorited, isLoggedIn }: Props) {
  const [isFavorited, setIsFavorited] = useState(initialIsFavorited);
  const router = useRouter();

  const handleToggle = async () => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Optimistic Update: Change the UI immediately
    setIsFavorited(!isFavorited);

    try {
      // We'll create this Server Action next
      // await toggleFavoriteAction(listingId); 
    } catch (error) {
      // Revert if it fails
      setIsFavorited(isFavorited);
    }
  };

return (
  <button
    onClick={handleToggle}
    className={`p-3 rounded-full border transition-all duration-300 group ${
      isFavorited ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50'
    }`}
  >
      <span className={`text-2xl transition-transform active:scale-125 inline-block ${
        isFavorited ? 'scale-110' : ''
      }`}>
        {isFavorited ? '❤️' : '🤍'}
      </span>
    </button>
  );
}