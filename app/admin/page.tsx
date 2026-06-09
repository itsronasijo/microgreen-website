"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

const [name, setName] = useState("");
const [image, setImage] = useState("");
const [description, setDescription] = useState("");
const [price50, setPrice50] = useState("");
const [price100, setPrice100] = useState("");
const [price250, setPrice250] = useState("");
const [stock50, setStock50] = useState("");
const [stock100, setStock100] = useState("");
const [stock250, setStock250] = useState("");
const [featured, setFeatured] = useState(false);
const [editingId, setEditingId] = useState<number | null>(null);
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
  const deleteProduct = async (id: number) => {
  const confirmed = confirm(
    "Delete this product?"
  );

  if (!confirmed) return;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  loadProducts();
};
const addProduct = async () => {

  const { error } = await supabase
    .from("products")
    .insert([
      {
        name,
        image,
        description,
        price50: Number(price50),
        price100: Number(price100),
        price250: Number(price250),
        stock50: Number(stock50),
        stock100: Number(stock100),
        stock250: Number(stock250),
        featured,
      },
    ]);

  if (error) {
    console.log(error);
    alert("Failed to add product");
    return;
  }

  setName("");
  setImage("");
  setDescription("");
  setPrice50("");
  setPrice100("");
  setPrice250("");
 setStock50("");
setStock100("");
setStock250("");

  setFeatured(false);

  loadProducts();
};

  const updateProduct = async () => {
  if (!editingId) return;

  const { error } = await supabase
    .from("products")
    .update({
      name,
      image,
      description,
      price50: Number(price50),
      price100: Number(price100),
      price250: Number(price250),
      stock50: Number(stock50),
      stock100: Number(stock100),
      stock250: Number(stock250),
      featured,
    })
    .eq("id", editingId);

  if (error) {
    console.log(error);
    alert("Failed to update product");
    return;
  }

  setEditingId(null);

  setName("");
  setImage("");
  setDescription("");
  setPrice50("");
  setPrice100("");
  setPrice250("");
  setStock50("");
setStock100("");
setStock250("");
  setFeatured(false);

  loadProducts();
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
        <button
  onClick={() => setLoggedIn(false)}
  className="bg-red-500 px-4 py-2 rounded-xl"
>
  Logout
</button>

      </div>

    <div
  id="product-form"
  className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8"
>

 <h2 className="text-2xl font-bold text-green-400 mb-6">
  {editingId ? "Edit Product" : "Add Product"}
</h2>

  <div className="grid md:grid-cols-2 gap-4">

    <input
      placeholder="Product Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      className="bg-black border border-green-500 rounded-xl px-4 py-3"
    />

    <input
      placeholder="Image Path (/sunflower.png)"
      value={image}
      onChange={(e) => setImage(e.target.value)}
      className="bg-black border border-green-500 rounded-xl px-4 py-3"
    />

    <input
      placeholder="50g Price"
      value={price50}
      onChange={(e) => setPrice50(e.target.value)}
      className="bg-black border border-green-500 rounded-xl px-4 py-3"
    />

    <input
      placeholder="100g Price"
      value={price100}
      onChange={(e) => setPrice100(e.target.value)}
      className="bg-black border border-green-500 rounded-xl px-4 py-3"
    />

    <input
      placeholder="250g Price"
      value={price250}
      onChange={(e) => setPrice250(e.target.value)}
      className="bg-black border border-green-500 rounded-xl px-4 py-3"
    />

   <input
  placeholder="50g Stock"
  value={stock50}
  onChange={(e) => setStock50(e.target.value)}
  className="bg-black border border-green-500 rounded-xl px-4 py-3"
/>

<input
  placeholder="100g Stock"
  value={stock100}
  onChange={(e) => setStock100(e.target.value)}
  className="bg-black border border-green-500 rounded-xl px-4 py-3"
/>

<input
  placeholder="250g Stock"
  value={stock250}
  onChange={(e) => setStock250(e.target.value)}
  className="bg-black border border-green-500 rounded-xl px-4 py-3"
/>
  </div>

  <textarea
    placeholder="Description"
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    className="w-full bg-black border border-green-500 rounded-xl px-4 py-3 mt-4"
  />

  <div className="flex items-center gap-3 mt-4">

    <input
      type="checkbox"
      checked={featured}
      onChange={(e) =>
        setFeatured(e.target.checked)
      }
    />

    <span>Featured Product</span>

  </div>

  <button
  onClick={
    editingId
      ? updateProduct
      : addProduct
  }
  className="mt-6 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-xl font-bold"
>
  {editingId
    ? "Update Product"
    : "Add Product"}
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
  {product.stock50} / {product.stock100} / {product.stock250}
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

<td className="p-3 flex gap-2">

  <button
    onClick={() => {
      setEditingId(product.id);
      setName(product.name);
      setImage(product.image);
      setDescription(product.description || "");
      setPrice50(product.price50.toString());
      setPrice100(product.price100.toString());
      setPrice250(product.price250.toString());
     setStock50(product.stock50?.toString() || "");
      setStock100(product.stock100?.toString() || "");
      setStock250(product.stock250?.toString() || "");
      setFeatured(product.featured);

      document
  .getElementById("product-form")
  ?.scrollIntoView({
    behavior: "smooth",
  });
    }}
    className="bg-blue-500 px-3 py-1 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={() => deleteProduct(product.id)}
    className="bg-red-500 px-3 py-1 rounded-lg"
  >
    Delete
  </button>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}
