"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("wishlist")
      .select(
        `
        *,
        products (*)
      `
      )
      .eq("user_id", user.id);

    if (!error && data) {
      setWishlist(data);
    }

    setLoading(false);
  };

  const removeWishlist = async (productId: number) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    setWishlist(
      wishlist.filter(
        (item) => item.product_id !== productId
      )
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Wishlist...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-bold text-green-400 mb-8">
        My Wishlist ❤️ ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400 text-lg">
          No products in wishlist.
        </p>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4">

          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-white/5 border border-green-500 rounded-2xl p-4 hover:border-green-400 transition"
            >
              <img
                src={item.products?.image}
                alt={item.products?.name}
                className="w-24 h-24 object-contain flex-shrink-0"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-bold text-green-400">
                  {item.products?.name}
                </h2>

                <p className="text-xl font-bold text-white mt-1">
                  ₹{item.products?.price50}
                </p>

                <p className="text-gray-400 text-sm mt-1">
                  Fresh Organic Microgreens
                </p>

                <span className="inline-block mt-2 bg-green-500 text-black text-xs px-3 py-1 rounded-full font-bold">
                  Organic
                </span>

                <div className="flex gap-2 mt-3">

                  <button
                    className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-bold transition"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      removeWishlist(item.product_id)
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}
