"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-green-500">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-3xl font-bold text-green-400"
        >
          Verde
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-white hover:text-green-400"
          >
            Shop
          </Link>

          <Link
            href="/wishlist"
            className="text-white hover:text-green-400"
          >
            Wishlist
          </Link>

          <Link
            href="/profile"
            className="text-white hover:text-green-400"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
