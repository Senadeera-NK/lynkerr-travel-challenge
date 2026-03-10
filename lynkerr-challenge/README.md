### Lynkerr Travel Experience Platform
# A full-stack marketplace where local experience providers can list unique travel activities, and travelers can discover them through a real-time public feed.

- Live Demo: [Link to your Vercel deployment]

Built for: Lynkerr Full-Stack Technical Challenge

🚀 Tech Stack
Framework: Next.js 15 (App Router)

Language: TypeScript

Database & Auth: Supabase (PostgreSQL)

Styling: Tailwind CSS

Deployment: Vercel

✨ Features Implemented
Core Requirements
User Authentication: Secure Sign Up, Login, and Logout using Supabase Auth.

Create Listing: Logged-in users can publish experiences with images, titles, locations, and pricing.

Public Feed: A responsive grid showing all listings sorted by newest first.

Relative Timestamps: Listings show "Posted X hours ago" for better context.

Detail Pages: Dynamic routing for full experience descriptions and creator info.

Optional Features (Bonus)
Search & Filtering: Real-time search by Title or Location.

Save/Like Listings: A persistent "Favorite" system saved to the database.

Delete Functionality: Owners can remove their own listings.

Responsive UI: Fully optimized for mobile, tablet, and desktop views.

Optimistic UI Updates: Heart icons toggle instantly for a snappy user experience.

🛠️ Setup Instructions
Clone the repository:

Bash

git clone [your-repo-link]
cd lynkerr-challenge
Install dependencies:

Bash

npm install
Environment Variables:
Create a .env.local file and add your Supabase credentials:

Code snippet

NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
Run locally:

Bash

npm run dev
🏗️ Architecture & Key Decisions
Technology Choice
I chose Next.js 15 and Supabase for their speed of development and type safety. Using a BaaS (Backend-as-a-Service) allowed me to focus on high-quality UI and complex features like search and favoriting within the 48-hour window.

Authentication
Authentication is handled via Supabase Auth with server-side session management. I implemented a robust middleware layer to protect "Create Listing" routes. A key challenge I solved was managing cookie mutations within Next.js Server Components, ensuring the session remains stable during navigation.

Database Schema
I utilized PostgreSQL with three primary tables:

profiles: Linked to Auth metadata to store display names.

listings: Stores experience data with a foreign key to profiles.

favorites: A join table handling the many-to-many relationship between users and saved experiences.

Future Improvements
If I had more time, I would implement Image Uploads directly to Supabase Storage (currently using URLs) and add Image Optimization using Next.js Image components to improve Largest Contentful Paint (LCP) scores.

🧠 Product Thinking: Scaling to 10,000 Listings
To maintain performance and a high-quality UX at a scale of 10,000+ listings, I would implement the following:

Database Indexing: I would add B-tree indexes to the location and title columns in PostgreSQL to ensure the search functionality stays fast as the row count grows.

Pagination & Infinite Scroll: Instead of loading all listings, I would implement cursor-based pagination to fetch data in small batches (e.g., 20 at a time) as the user scrolls.

Caching Strategy: I would use Redis (FlashGuard style) or Next.js Incremental Static Regeneration (ISR) to cache the public feed, reducing the load on the database for frequent visitors.

Search Optimization: For complex queries, I would move from basic SQL ILike to Full-Text Search or a dedicated engine like Algolia to handle typos and relevance ranking.

Edge Computing: Deploying database queries at the Edge would reduce latency for global users, ensuring the "Time Posted" and "Favorite" status load instantly regardless of the user's location.

