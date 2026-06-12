"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const updateCart = (updated: any[]) => {
    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const increaseQty = (index: number) => {
    const updated = [...cart];
    updated[index].quantity += 1;

    updateCart(updated);
  };

  const decreaseQty = (index: number) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }

    updateCart(updated);
  };

  const removeItem = (index: number) => {
    const updated = [...cart];

    updated.splice(index, 1);

    updateCart(updated);
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-green-400 mb-10">
          My Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">
              🛒
            </div>

            <h2 className="text-4xl font-bold">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-400 mt-4">
              Add some fresh microgreens to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white/[0.03]
                    border
                    border-green-500/20
                    rounded-3xl
                    p-6
                    hover:border-green-500/50
                    transition
                  "
                >
                  <div className="flex items-center justify-between">

                    {/* LEFT SIDE */}
                    <div className="flex items-center gap-5">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-28
                          h-28
                          object-cover
                          rounded-2xl
                        "
                      />

                      <div>
                        <h3 className="text-2xl font-bold text-green-400">
                          {item.name}
                        </h3>

                        <p className="text-gray-400 mt-1">
                          {item.pack}
                        </p>

                        <p className="font-bold text-xl mt-2">
                          ₹{item.price}
                        </p>
                      </div>

                    </div>

                    {/* RIGHT SIDE */}
                    <div className="flex items-center gap-8">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            decreaseQty(index)
                          }
                          className="
                            bg-red-500
                            hover:bg-red-600
                            w-10
                            h-10
                            rounded-xl
                            font-bold
                          "
                        >
                          −
                        </button>

                        <span className="text-xl font-bold min-w-[20px] text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            increaseQty(index)
                          }
                          className="
                            bg-green-500
                            hover:bg-green-600
                            text-black
                            w-10
                            h-10
                            rounded-xl
                            font-bold
                          "
                        >
                          +
                        </button>

                      </div>

                      <div className="text-right min-w-[120px]">

                        <p className="text-sm text-gray-400">
                          Subtotal
                        </p>

                        <p className="text-2xl font-bold text-green-400">
                          ₹
                          {item.price *
                            item.quantity}
                        </p>

                      </div>

                      <button
                        onClick={() =>
                          removeItem(index)
                        }
                        className="
                          bg-red-500
                          hover:bg-red-600
                          px-4
                          py-3
                          rounded-xl
                          font-bold
                        "
                      >
                        ✕
                      </button>

                    </div>

                  </div>
                </div>
              ))}

            </div>

            {/* TOTAL SECTION */}

            <div
              className="
                mt-10
                border
                border-green-500/30
                rounded-3xl
                p-8
                bg-white/[0.03]
              "
            >
              <div className="flex justify-between items-center">

                <div>
                  <p className="text-gray-400">
                    Cart Total
                  </p>

                  <h2 className="text-4xl font-bold text-green-400 mt-2">
                    ₹{total}
                  </h2>
                </div>

                <button
                  className="
                    bg-green-500
                    hover:bg-green-600
                    text-black
                    px-10
                    py-4
                    rounded-2xl
                    font-bold
                    text-xl
                    transition
                  "
                >
                  Proceed to Checkout →
                </button>

              </div>
            </div>

          </>
        )}

      </div>

    </main>
  );
}
