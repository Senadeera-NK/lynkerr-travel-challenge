// src/app/listings/[id]/page.tsx
import { listingService } from "@/services/listingService";
import { authService } from "@/services/authService"; // To check if user is logged in
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { id } = await params;
  const listing = await listingService.getListingById(id);
  const user = await authService.getUser();

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
              <div>
                <span className="text-blue-600 font-bold text-xs tracking-widest uppercase bg-blue-50 px-3 py-1 rounded-full">
                  {listing.location}
                </span>
                <h1 className="text-5xl font-black text-gray-900 mt-4 leading-tight">{listing.title}</h1>
              </div>
              
              {/* Optional "Like" Button logic would go here */}
              <button className="p-3 rounded-full border hover:bg-red-50 hover:border-red-200 transition group">
                <span className="text-2xl group-hover:scale-110 inline-block transition">🤍</span>
              </button>
            </div>
            
            <div className="flex items-center gap-3 mt-6 pb-6 border-b">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {listing.profiles?.display_name?.charAt(0) || 'T'}
              </div>
              <div>
                <p className="text-sm text-gray-400">Experience Hosted by</p>
                <p className="font-bold text-gray-900">{listing.profiles?.display_name || 'Anonymous traveler'}</p>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4 text-gray-800">The Experience</h3>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>

          <div className="mt-auto p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Price per person</p>
              <p className="text-3xl font-black text-gray-900">${listing.price || 'Free'}</p>
            </div>
            {user ? (
              <button className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg">
                Save Experience
              </button>
            ) : (
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