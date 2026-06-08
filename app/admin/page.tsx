"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const handleLogin = () => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setLoggedIn(true);
    } else {
      alert("Invalid Username or Password");
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id");

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);
  };

  useEffect(() => {
    if (loggedIn) {
      loadProducts();
    }
  }, [loggedIn]);

  // LOGIN PAGE
  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-white/5 border border-green-500/20 rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-4xl font-bold text-green-400 mb-8 text-center">
            Admin Login
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="w-full bg-black border border-green-500 rounded-xl px-4 py-3 mb-4 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={handleKeyDown}
            className="w-full bg-black border border-green-500 rounded-xl px-4 py-3 mb-6 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl"
          >
            Login
          </button>

        </div>
      </main>
    );
  }

  // DASHBOARD
  return (
    <main className="min-h-screen bg-black text-white p-10">

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold text-green-400">
          Verde Admin Dashboard
        </h1>

        <button
          onClick={loadProducts}
          className="bg-green-500 text-black px-4 py-2 rounded-xl font-bold"
        >
          Refresh
        </button>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full border border-white/10">

          <thead className="bg-white/5">

            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">50g</th>
              <th className="p-3 text-left">100g</th>
              <th className="p-3 text-left">250g</th>
              <th className="p-3 text-left">Featured</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (

              <tr
                key={product.id}
                className="border-t border-white/10"
              >

                <td className="p-3">
                  {product.name}
                </td>

                <td className="p-3">
                  {product.stock}
                </td>

                <td className="p-3">
                  ₹{product.price50}
                </td>

                <td className="p-3">
                  ₹{product.price100}
                </td>

                <td className="p-3">
                  ₹{product.price250}
                </td>

                <td className="p-3">
                  {product.featured ? "⭐" : "-"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
