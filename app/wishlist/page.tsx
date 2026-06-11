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
        products(*)
      `)
      .eq("user_id", user.id);

    if (!error && data) {
      setWishlist(data);
    }

    setLoading(false);
  };

  const addToCart = (product: any) => {
    const existingCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItem = existingCart.find(
      (item: any) =>
        item.name === product.name &&
        item.pack === "50g"
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push({
        name: product.name,
        image: product.image,
        pack: "50g",
        quantity: 1,
        price: product.price50,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );
    alert(`${product.name} added to cart! 🛒`);
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
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-5xl font-bold text-green-400 mb-10">
        My Wishlist ❤️ ({wishlist.length})
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-4">💔</div>

          <h2 className="text-3xl font-bold">
            Wishlist Empty
          </h2>

          <p className="text-gray-400 mt-2">
            Save your favorite microgreens here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="
                bg-white/5
                border
                border-green-500/40
                rounded-3xl
                p-5
                text-center
                hover:border-green-400
                hover:-translate-y-1
                transition-all
              "
            >
              <img
                src={item.products?.image}
                alt={item.products?.name}
                className="
                  w-28
                  h-28
                  object-contain
                  mx-auto
                "
              />

              <h2 className="text-xl font-bold text-green-400 mt-4">
                {item.products?.name}
              </h2>

              <p className="text-xl font-bold text-white mt-2">
                ₹{item.products?.price50}
              </p>

              <p className="text-gray-400 text-sm mt-2">
                Fresh Organic Microgreens
              </p>

              <span
                className="
                  inline-block
                  mt-3
                  bg-green-500
                  text-black
                  text-xs
                  px-3
                  py-1
                  rounded-full
                  font-bold
                "
              >
                Organic
              </span>

              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  onClick={() => addToCart(item.products)}
                  className="
                    bg-green-500
                    hover:bg-green-600
                    text-black
                    px-4
                    py-2
                    rounded-xl
                    font-semibold
                    transition
                  "
                >
                  🛒 Add
                </button>

                <button
                  onClick={() =>
                    removeWishlist(item.product_id)
                  }
                  className="
                    border
                    border-red-500
                    text-red-400
                    hover:bg-red-500
                    hover:text-white
                    px-4
                    py-2
                    rounded-xl
                    transition
                  "
                >
                  ❤️ Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
