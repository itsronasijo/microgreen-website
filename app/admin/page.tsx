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
  
  if (!loggedIn) {
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

  return (
    <main className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold text-green-400">
        Verde Admin Dashboard
      </h1>

      <p className="mt-4 text-gray-400">
        Login successful 🎉
      </p>

    </main>
  );
}
