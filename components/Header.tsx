"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUser(session?.user ?? null);
    };

    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const cart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const total = cart.reduce(
      (sum: number, item: any) =>
        sum + item.quantity,
      0
    );

    setCartCount(total);
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClick
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClick
      );
  }, []);

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo:
          "https://verdemicrogreens.vercel.app/auth/callback",
      },
    });
  };

  return (
    <div className="sticky top-0 z-50">

      {/* TOP BAR */}
      <div className="bg-green-800 text-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2 text-sm">
          <div className="flex gap-5">
            <span>📷 Instagram</span>
            <span>📘 Facebook</span>
            <span>📞 WhatsApp</span>
          </div>

          <div className="hidden md:flex gap-5">
            <span>🚚 Fresh Delivery</span>
            <span>📱 App Coming Soon</span>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="bg-black border-b border-green-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

          {/* LOGO */}
          <Link href="/">
            <img
              src="/logo1.png"
              alt="Verde"
              className="h-20 w-auto"
            />
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-8 text-gray-300">
            <Link href="/" className="hover:text-green-400">
              Home
            </Link>

            <Link
              href="/wishlist"
              className="hover:text-green-400"
            >
              Wishlist
            </Link>

            <Link
              href="/profile"
              className="hover:text-green-400"
            >
              Profile
            </Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            <Link href="/wishlist">
              <button className="text-2xl">
                ❤️
              </button>
            </Link>

            <div className="relative text-3xl">
              🛒

              <span className="absolute -top-2 -right-3 bg-green-500 text-black text-xs px-2 rounded-full font-bold">
                {cartCount}
              </span>
            </div>

            {/* PROFILE */}
            <div
              className="relative"
              ref={profileRef}
            >
              <button
                onClick={() => {
                  if (!user) {
                    handleGoogleLogin();
                  } else {
                    setProfileOpen(!profileOpen);
                  }
                }}
                className="w-9 h-9 rounded-full border border-green-500 overflow-hidden flex items-center justify-center"

              >
                {user ? (
                  user.user_metadata?.avatar_url ? (
                    <img
                      src={
                        user.user_metadata.avatar_url
                      }
                      alt="Profile"
                        className="w-8 h-8 rounded-full border border-green-500 overflow-hidden flex items-center justify-center"
                    />
                  ) : (
                    "👤"
                  )
                ) : (
                  "👤"
                )}
              </button>

              {profileOpen && user && (
                <div className="absolute right-0 mt-3 w-64 bg-black border border-green-500 rounded-xl">

                  <div className="p-4 border-b border-gray-700">
                    <p className="font-bold">
                      {user.user_metadata?.full_name ||
                        user.user_metadata?.name}
                    </p>

                    <p className="text-sm text-gray-400">
                      {user.email}
                    </p>
                  </div>

                  <Link href="/profile">
                    <button className="w-full text-left px-4 py-3 hover:bg-green-900">
                      👤 Profile
                    </button>
                  </Link>

                  <Link href="/wishlist">
                    <button className="w-full text-left px-4 py-3 hover:bg-green-900">
                      ❤️ Wishlist
                    </button>
                  </Link>

                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      setProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </header>
    </div>
  );
}
