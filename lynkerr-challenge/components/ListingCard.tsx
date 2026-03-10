import { Listing } from "@/types";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { authService } from "@/services/authService";
import { listingService } from "@/services/listingService";

export default async function ListingCard({ listing }: { listing : Listing }) {
  // 1. Fetch user and check if this specific listing is favorited
  const user = await authService.getUser();
  const isFavorited = user ? await listingService.checkIfFavorited(listing.id, user.id) : false;

  return (
    <div className="group border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition-all duration-300">
      {/* Image Module */}
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={listing.image_url || 'https://placehold.co/600x400?text=No+Image'} 
          alt={listing.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content Module */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-1">
            {listing.title}
          </h3>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded">
            ${listing.price}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm flex items-center gap-1 mb-4">
          📍 {listing.location}
        </p>

        {/* Action Row: Heart and Link together at the bottom */}
        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <FavoriteButton 
            listingId={listing.id}
            initialIsFavorited={isFavorited}
            isLoggedIn={!!user}
            userId={user?.id}
          />
          
          <Link 
            href={`/listings/${listing.id}`}
            className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            View Details →
          </Link>
        </div>
      </div>
    </div>
  );
}