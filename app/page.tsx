import { listingService } from "@/services/listingService";
import ListingCard from "../components/ListingCard";
import { Listing } from "@/types";
import Link from "next/link"; 

export default async function Home({ searchParams }: { searchParams: Promise<{ search?: string }> }) {
  // searchParams to get the current query
  const params = await searchParams;
  const search = params.search;

  // fetch the data or uses for searching
  const listings: Listing[] = await listingService.getAllListings(search);
  
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Explore the World</h1>
          {search && (
            <div className="flex items-center gap-2 mt-2">
              <p className="text-blue-600 font-medium">
                Showing results for "{search}"
              </p>
              <Link href="/" className="text-xs text-gray-400 hover:text-red-500 underline">
                Clear search
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-xl mx-auto mb-12">
        <form action="/" method="GET" className="relative">
          <input 
            name="search"
            defaultValue={search || ''} 
            placeholder="Search by title or location..."
            className="w-full p-4 pl-12 rounded-2xl border shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <span className="absolute left-4 top-4 opacity-40">🔍</span>
        </form>
      </div>

      {/* Render logic */}
      {listings.length === 0 ? (
        <div className="text-center py-20 border-2 border-dashed rounded-xl">
          <p className="text-gray-400 text-lg">No experiences found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listings.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      )}
    </section>
  );
}