import { listingService } from "@/services/listingService";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: { id: string };
}

export default async function ListingDetailPage({ params }: PageProps) {
  // 1. Fetch data from your service
  const listing = await listingService.getListingById(params.id);

  // 2. If ID doesn't exist in DB, show the 404 page
  if (!listing) {
    notFound();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href="/" className="text-sm text-gray-500 hover:text-blue-600 mb-6 inline-block">
        ← Back to all experiences
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image */}
        <div className="rounded-3xl overflow-hidden bg-gray-100 shadow-lg h-[400px] lg:h-[500px]">
          <img 
            src={listing.image_url || 'https://placehold.co/800x600?text=No+Image'} 
            alt={listing.title} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Column: Info & Booking Box */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="text-blue-600 font-bold text-sm tracking-widest uppercase">
              {listing.location}
            </span>
            <h1 className="text-4xl font-black text-gray-900 mt-2">{listing.title}</h1>
            <p className="text-gray-400 mt-2">Posted by {listing.profiles?.display_name || 'Anonymous'}</p>
          </div>

          <div className="bg-white border rounded-3xl p-6 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-3xl font-black">${listing.price}</span>
              <span className="text-gray-500">per person</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
              Book this experience
            </button>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-3 text-gray-800">About this experience</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {listing.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}