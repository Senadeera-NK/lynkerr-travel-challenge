'use client'

import { handleCreateListing } from "@/actions/listingActions";
import { useState } from "react";

export default function CreateListingPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-6">Post a New Experience</h1>
      
      <form action={async (formData) => {
        setLoading(true);
        await handleCreateListing(formData);
        setLoading(false);
      }} className="space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold mb-2">Title</label>
            <input name="title" placeholder="Hiking in Ella" required className="w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input name="title" placeholder="Ella, Sri Lanka" required className="w-full p-3 border rounded-xl" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Image URL</label>
          <input name="image_url" placeholder="https://images.unsplash.com/..." required className="w-full p-3 border rounded-xl" />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2">Description</label>
          <textarea name="description" rows={4} placeholder="Describe the experience..." required className="w-full p-3 border rounded-xl"></textarea>
        </div>

        <div className="w-full md:w-1/3">
          <label className="block text-sm font-semibold mb-2">Price (USD)</label>
          <input name="price" type="number" placeholder="50" required className="w-full p-3 border rounded-xl" />
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Experience"}
        </button>
      </form>
    </div>
  );
}