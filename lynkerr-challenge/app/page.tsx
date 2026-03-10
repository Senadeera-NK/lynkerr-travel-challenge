import { listingService } from "@/services/listingService";
import ListingCard from "../components/ListingCard";
import { Listing } from "@/types";

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  // 1. Fetch data from the Service Layer (Server-side)
  const listings: Listing[] = await listingService.getAllListings();
  const { search } = await searchParams;
  
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Explore the World</h1>
          <p className="text-gray-500 mt-2">Discover unique experiences shared by travelers.</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <form action="/" method="GET" className="relative">
          <input 
            name="search"
            defaultValue={search}
            placeholder="Search by title or location..."
            className="w-full p-4 pl-12 rounded-2xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="absolute left-4 top-4 opacity-40">🔍</span>
        </form>
      </div>

      {/* 2. Check if there are listings */}
      {listings.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-gray-400 text-lg">No experiences found. Be the first to post!</p>
        </div>
      ) : (
        /* 3. Render the Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      )}
    </section>
  );
}