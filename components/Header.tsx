"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-bold text-green-600"
        >
          Verde
        </Link>

        <nav className="flex gap-6">
          <Link href="/">Shop</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/profile">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
