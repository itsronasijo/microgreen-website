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
      <div className="max-w-6xl mx-auto">

        <h1 className="text-5xl font-bold text-green-400 mb-8">
          Ckeckout 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-8xl mb-6">🛒</div>

            <h2 className="text-4xl font-bold">
              Your Cart Is Empty
            </h2>

            <p className="text-gray-400 mt-4">
              Add some fresh microgreens to get started.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-3">

              {cart.map((item, index) => (
                <div
                  key={index}
                  className="
                    bg-white/[0.03]
                    border
                    border-green-500/20
                    rounded-2xl
                    p-4
                    hover:border-green-500/50
                    transition
                  "
                >
                  <div className="flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-4">

                      <img
                        src={item.image}
                        alt={item.name}
                        className="
                          w-20
                          h-20
                          object-cover
                          rounded-xl
                        "
                      />

                      <div>
                        <h3 className="text-xl font-bold text-green-400">
                          {item.name}
                        </h3>

                        <p className="text-gray-400 text-sm">
                          {item.pack}
                        </p>

                        <p className="font-bold mt-1">
                          ₹{item.price}
                        </p>
                      </div>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-5">

                      <div className="flex items-center gap-2">

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

                        <span className="font-bold min-w-[20px] text-center">
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

                      <div className="text-right min-w-[90px]">

                        <p className="text-xs text-gray-400">
                          Subtotal
                        </p>

                        <p className="font-bold text-green-400">
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
                          w-12
                          h-12
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

            {/* ORDER SUMMARY */}
            <div
              className="
                border
                border-green-500/30
                rounded-3xl
                p-6
                bg-white/[0.03]
                h-fit
                sticky
                top-24
              "
            >

              <img
                src="harvestTray.png"
                alt="Fresh Microgreens"
                className="
                  w-full
                  h-52
                  object-cover
                  rounded-2xl
                  mb-5
                "
              />

              <h2 className="text-2xl font-bold text-green-400 mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between mb-3">
                <span>Total Products</span>
                <span>{cart.length}</span>
              </div>

              <div className="flex justify-between mb-3">
                <span>Delivery</span>
                <span className="text-green-400">
                  FREE
                </span>
              </div>

              <hr className="border-green-900 my-4" />

              <div className="flex justify-between text-xl font-bold mb-5">
                <span>Total</span>

                <span className="text-green-400">
                  ₹{total}
                </span>
              </div>

              <button
                className="
                  w-full
                  bg-green-500
                  hover:bg-green-600
                  text-black
                  py-4
                  rounded-2xl
                  font-bold
                  transition
                "
              >
                Proceed to Checkout →
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Freshly harvested & packed 🌱
              </p>

            </div>

          </div>
        )}

      </div>
    </main>
  );
}
