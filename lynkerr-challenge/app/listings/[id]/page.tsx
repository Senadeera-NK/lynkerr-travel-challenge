import { listingService } from "@/services/listingService";
import { authService } from "@/services/authService";
import FavoriteButton from "@/components/FavoriteButton";
import { handleDeleteListing } from "@/actions/listingActions"; // 1. ADD THIS IMPORT
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await listingService.getListingById(id);
  const user = await authService.getUser();
  
  const isFavorited = user ? await listingService.checkIfFavorited(id, user.id) : false;

  if (!listing) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 mb-6 inline-block font-medium">
        ← Back to all experiences
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-3xl overflow-hidden bg-gray-100 shadow-xl h-[400px] lg:h-[600px] sticky top-24">
          <img 
            src={listing.image_url || 'https://placehold.co/800x600'} 
            alt={listing.title} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="text-blue-600 font-bold text-xs tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
                  {listing.location}
                </span>
                <h1 className="text-5xl font-black text-gray-900 mt-4 leading-tight">{listing.title}</h1>
              </div>
              <FavoriteButton 
                listingId={id} 
                initialIsFavorited={isFavorited} 
                isLoggedIn={!!user} 
              />
            </div>
            
            <div className="flex items-center gap-3 mt-6 pb-6 border-b">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold uppercase">
                {listing.profiles?.display_name?.charAt(0) || 'T'}
              </div>
              <div>
                <p className="text-sm text-gray-400">Experience Hosted by</p>
                <p className="font-bold text-gray-900">{listing.profiles?.display_name || 'Traveler'}</p>
              </div>
            </div>
          </div>

          <div className="mb-8 flex-1">
            <h3 className="text-xl font-bold mb-4 text-gray-800">The Experience</h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>

          {/* 2. ADD THE OWNER ACTIONS HERE */}
          {user && user.id === listing.user_id && (
            <div className="mb-8 p-6 bg-red-50/50 rounded-3xl border border-red-100">
              <h4 className="text-xs font-bold text-red-600 uppercase tracking-widest mb-3">Owner Settings</h4>
              <form action={async () => {
                'use server';
                await handleDeleteListing(listing.id);
              }}>
                <button className="text-sm text-red-600 font-bold hover:bg-red-600 hover:text-white border border-red-200 px-4 py-2 rounded-xl transition-all">
                  Delete Experience Permanently
                </button>
              </form>
            </div>
          )}

          <div className="p-6 bg-white rounded-3xl border shadow-sm flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Price per person</p>
              <p className="text-3xl font-black text-gray-900">${listing.price || 'Free'}</p>
            </div>
            {!user && (
               <Link href="/login" className="text-blue-600 font-bold hover:underline text-sm">
                Log in to save this →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}