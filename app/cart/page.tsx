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

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const increaseQty = (index: number) => {
    const updated = [...cart];
    updated[index].quantity += 1;

    setCart(updated);
    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
    window.dispatchEvent(
  new Event("cartUpdated")
);
  };

  const decreaseQty = (index: number) => {
    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const removeItem = (index: number) => {
    const updated = [...cart];

    updated.splice(index, 1);

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">

      <h1 className="text-5xl font-bold text-green-400 mb-10">
        My Cart 🛒
      </h1>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">
            Your cart is empty
          </h2>
        </div>
      ) : (
        <>
          <div className="space-y-6">

            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <div className="flex gap-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-xl"
                  />

                  <div className="flex-1">

                    <h3 className="text-xl font-bold text-green-400">
                      {item.name}
                    </h3>

                    <p>{item.pack}</p>

                    <p className="font-bold">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-3 mt-4">

                      <button
                        onClick={() =>
                          decreaseQty(index)
                        }
                        className="bg-red-500 w-8 h-8 rounded-lg"
                      >
                        -
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          increaseQty(index)
                        }
                        className="bg-green-500 text-black w-8 h-8 rounded-lg"
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      removeItem(index)
                    }
                    className="bg-red-500 px-3 py-2 rounded-xl h-fit"
                  >
                    ✕
                  </button>

                </div>
              </div>
            ))}

          </div>

          <div className="border-t border-white/10 mt-10 pt-6">

            <div className="flex justify-between items-center mb-8">

              <h3 className="text-3xl font-bold">
                Total
              </h3>

              <span className="text-3xl font-bold text-green-400">
                ₹{total}
              </span>

            </div>

            <button
              className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-bold text-xl"
            >
              Checkout
            </button>

          </div>
        </>
      )}

    </main>
  );
}
