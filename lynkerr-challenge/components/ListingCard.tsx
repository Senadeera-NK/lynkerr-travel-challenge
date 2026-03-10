import { Listing } from "@/types";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { authService } from "@/services/authService";
import { listingService } from "@/services/listingService";

// Helper function to format the relative time
function formatTimeAgo(dateString: string) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInMs = now.getTime() - past.getTime();
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  return `${diffInDays} days ago`;
}

export default async function ListingCard({ listing }: { listing : Listing }) {
  const user = await authService.getUser();
  const isFavorited = user ? await listingService.checkIfFavorited(listing.id, user.id) : false;
    console.log("debuging listing data: ", listing);
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

      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg leading-tight text-gray-900 line-clamp-1">
            {listing.title}
          </h3>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded shrink-0">
            ${listing.price}
          </span>
        </div>
        
        {/* Location & Time Posted */}
        <div className="flex justify-between items-center mb-3">
          <p className="text-gray-500 text-xs flex items-center gap-1">
            📍 {listing.location}
          </p>
          <p className="text-gray-400 text-[10px] font-medium uppercase tracking-tight">
            {formatTimeAgo(listing.created_at)}
          </p>
        </div>

        {/* Short Description (Required by instructions) */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 h-10">
          {listing.description}
        </p>

        <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <FavoriteButton 
              listingId={listing.id}
              initialIsFavorited={isFavorited}
              isLoggedIn={!!user}
              userId={user?.id}
            />
            {/* Added "By [Name]" here to satisfy the requirement */}
            <span className="text-[11px] text-gray-400 font-medium">
              By {listing.profiles?.display_name || "Traveler"}
            </span>
          </div>
          
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