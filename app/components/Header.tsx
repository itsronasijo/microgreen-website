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
  <>
    {/* COMPLETE HEADER */}
    <div className="fixed top-0 left-0 w-full z-50">

  {/* SOCIAL BAR */}
  
<header className="bg-black/95 backdrop-blur-sm border-b border-green-900">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">

    {/* LOGO */}
    <div className="w-28">
      <img
        src="/logo1.png"
        alt="Logo"
        className="h-20 w-auto object-contain"
        />

      
    </div>

   

    {/* NAVIGATION */}
    
   <nav className="hidden lg:flex items-center gap-8 mx-auto text-gray-300 font-medium">
      <a href="#home" className="hover:text-green-400 transition duration-300">
        Home
      </a>

      <a href="#benefits" className="hover:text-green-400 transition duration-300">
        Benefits
      </a>

      <a href="#recipes" className="hover:text-green-400 transition duration-300">
        AI Kitchen
      </a>

      <a href="#grow-guide" className="hover:text-green-400 transition duration-300">
        Grow Guide
      </a>

      <a href="#about" className="hover:text-green-400 transition duration-300">
        About Us
      </a>

      <a href="#contact" className="hover:text-green-400 transition duration-300">
        Contact
      </a>

    </nav>
{/* RIGHT SIDE */}
<div className="flex items-center gap-5">
   {/* WISHLIST */}
  <Link
  href="/wishlist"
  className="text-2xl hover:scale-110 transition block"
>
  ❤️
</Link>
  {/* CART */}
  <Link
  href="/cart"
  className="relative text-3xl block"
>
    🛒

    <span className="absolute -top-1 -right-2 bg-green-500 text-black text-[10px] px-1.5 rounded-full font-bold">
     {cartCount}
    </span>
 </Link>

 {/* SHOP BUTTON */}
  <a
    href="#products"
    className="bg-green-500 hover:bg-green-600 transition px-4 py-2 rounded-xl text-black font-bold"
  >
    Shop Now
  </a>
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
    className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 hover:scale-110 transition flex items-center justify-center">
      {user ? (
        user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-green-600 text-white font-bold text-sm">
            {(
              user.user_metadata?.full_name ||
              user.user_metadata?.name ||
              ""
            )
              .split(" ")
              .filter(Boolean)
              .map((word) => word[0])
              .join("")
              .slice(0, 2)
              .toUpperCase() || "👤"}
          </div>
        )
      ) : (
        <span className="text-2xl">👤</span>
      )}
    </button>

    {profileOpen && user && (
      <div className="absolute right-0 mt-3 w-64 bg-black border border-green-500 rounded-xl shadow-xl z-50">

        <div className="p-4 border-b border-gray-700">
          <p className="text-white font-bold">
            {user.user_metadata?.full_name ||
              user.user_metadata?.name}
          </p>

          <p className="text-gray-400 text-sm">
            {user.email}
          </p>
        </div>

        <Link href="/profile">
  <button className="w-full text-left px-4 py-3 hover:bg-white/5 transition">
    👤Profile
  </button>
</Link>

       <button
  onClick={() => {
    window.location.href = "/wishlist";
  }}
  className="w-full text-left px-4 py-3 hover:bg-green-600"
>
  ❤️Wishlist
</button>

        <button className="w-full text-left px-4 py-3 hover:bg-green-600">
          🛒 My Cart
        </button>

        <button className="w-full text-left px-4 py-3 hover:bg-green-600">
          📦Orders
        </button>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            setProfileOpen(false);
          }}
          className="w-full text-left px-4 py-3 text-red-400 hover:bg-red-900"
        >
          🚪Logout
        </button>

      </div>
    )}

  </div>

 

 

</div>
     </div>
</header>
</div>
  </>
);
}
