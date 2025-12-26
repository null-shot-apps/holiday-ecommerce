'use client';

import Link from 'next/link';
import { useAuth } from './AuthProvider';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-red-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          🎄 Holiday Shop
        </Link>
        
        <div className="flex items-center gap-6">
          <Link href="/shop" className="hover:text-red-200 transition">
            Shop
          </Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm">Welcome, {user.name}!</span>
              <button
                onClick={logout}
                className="bg-white text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-white text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

