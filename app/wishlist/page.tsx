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
      .select(`
        *,
        products (*)
      `)
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
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold text-green-400 mb-8">
        My Wishlist ❤️ ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <p className="text-gray-400 text-lg">
          No products in wishlist.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">

          {wishlist.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 bg-white/5 border border-green-500 rounded-2xl p-5 hover:border-green-400 transition"
            >
              <img
                src={item.products?.image}
                alt={item.products?.name}
                className="w-32 h-32 object-contain"
              />

              <div className="flex-1">

                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  {item.products?.name}
                </h2>

                <p className="text-xl font-bold text-white mb-2">
                  ₹{item.products?.price50}
                </p>

                <p className="text-gray-400 text-sm">
                  Fresh Organic Microgreens
                </p>

                <div className="flex gap-3 mt-4">

                  <button
                    className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded-lg font-bold"
                  >
                    Add to Cart
                  </button>

                  <button
                    onClick={() =>
                      removeWishlist(item.product_id)
                    }
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
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
