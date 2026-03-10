import Link from 'next/link';
import { authService } from '@/services/authService';
import { handleLogout } from '@/actions/authActions';

export default async function Navbar() {
  const user = await authService.getUser();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/*Logo Section */}
        <Link href="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          LYNKERR
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">
            Explore
          </Link>
          
          {user ? (
            // AUTHENTICATED STATE
            <div className="flex items-center gap-4">
              <Link 
                href="/listings/create" 
                className="text-sm font-semibold bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                Post Experience
              </Link>
              
              <div className="flex items-center gap-3 pl-4 border-l">
                <span className="text-sm text-gray-500 font-medium">
                  Hi, {user.user_metadata?.display_name || 'Traveler'}
                </span>
                <form action={handleLogout}>
                  <button className="text-sm text-red-500 hover:underline">
                    Logout
                  </button>
                </form>
              </div>
            </div>
          ) : (
            // GUEST STATE
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">
                Login
              </Link>
              <Link 
                href="/auth/signup" 
                className="text-sm font-semibold border-2 border-blue-600 text-blue-600 px-4 py-1.5 rounded-full hover:bg-blue-50 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}