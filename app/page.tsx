"use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function Home() {

  const [cart, setCart] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [ingredients, setIngredients] =
  useState("");
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] =
  useState("");
  const [loading, setLoading] =
  useState(false);
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
  async function loadProducts() {
    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setProducts(data || []);
  }

  loadProducts();
}, []);
  const addToCart = (
    product: any,
    pack: string
  ) => {

    const existing = cart.find(
      (item) =>
        item.name === product.name &&
        item.pack === pack
    );

    if (existing) {

      setCart(
        cart.map((item) =>
          item.name === product.name &&
          item.pack === pack
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );

    } else {

      setCart([
        ...cart,
        {
          name: product.name,
          image: product.image,
          pack,
          quantity: 1,
          price:
  pack === "50g"
    ? product.price50
    : pack === "100g"
    ? product.price100
    : product.price250,
        },
      ]);

    }

  };



  
const generateRecipe = async () => {

  try {

    // Clear previous recipe
    setRecipe("");

    setLoading(true);

    const response = await fetch(
      "/api/recipe",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ingredients,
        }),
      }
    );

    const data = await response.json();

    setRecipe(data.recipe);

  } catch (error) {

    console.log(error);

  } finally {

    setLoading(false);

  }

};    
  
 
  const increaseQty = (index: number) => {

    const updated = [...cart];
    updated[index].quantity += 1;
    setCart(updated);

  };

  const decreaseQty = (index: number) => {

    const updated = [...cart];

    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1);
    }

    setCart(updated);

  };

  const removeItem = (index: number) => {

    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);

  };

  const total = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );
  const recipeName =
  recipe.match(/Recipe Name:\s*([\s\S]*?)\nIngredients:/)?.[1]?.trim() || "";

const ingredientsSection =
  recipe.match(/Ingredients:\s*([\s\S]*?)\nSteps:/)?.[1]?.trim() || "";

const stepsSection =
  recipe.match(/Steps:\s*([\s\S]*?)\nNutrition:/)?.[1]?.trim() || "";

const nutritionSection =
  recipe.match(/Nutrition:\s*([\s\S]*?)\nRecommended Microgreen:/)?.[1]?.trim() || "";

const microgreenSection =
  recipe.match(/Recommended Microgreen:\s*([\s\S]*)/)?.[1]?.trim() || "";
  


  const filteredProducts = products.filter(
  (product) =>
    product.name
      .toLowerCase()
      .includes(search.toLowerCase())
);
  
 return (

  <main className="min-h-screen bg-black text-white">

 {/* COMPLETE HEADER */}
<div className="fixed top-0 left-0 w-full z-50">

  {/* SOCIAL BAR */}
  <div className="bg-green-800 text-white">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-2 text-sm">

      <div className="flex gap-5">
        <a href="#">📷 Instagram</a>
        <a href="#">📘 Facebook</a>
        <a href="#">📞 WhatsApp</a>
      </div>

      <div className="flex gap-5">
        <span>🚚 Fresh Delivery</span>
        <span>📱 App Coming Soon</span>
      </div>

    </div>

  </div>

 <header className="bg-black border-b border-green-900">
  <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">

    {/* LOGO */}
    <div className="w-36">
      <img
        src="/logo1.png"
        alt="Logo"
        className="h-24 w-auto object-contain"
      />

      
    </div>

    {/* SEARCH */}
  <div className="hidden lg:block mr-4">
<input
  type="text"
  placeholder="🔍 Search Products"
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);

    document
      .getElementById("products")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }}
  className="w-64 bg-white/10 border border-green-800 rounded-xl px-4 py-3 text-white outline-none"
/>
</div>

    {/* NAVIGATION */}
    <nav className="hidden lg:flex items-center gap-4 text-gray-300">
      <a href="#home" className="hover:text-green-400 transition">
        Home
      </a>

      <a href="#benefits" className="hover:text-green-400 transition">
        Benefits
      </a>

      <a href="#recipes" className="hover:text-green-400 transition">
        AI Kitchen
      </a>

      <a href="#grow-guide" className="hover:text-green-400 transition">
        Grow Guide
      </a>

      <a href="#about" className="hover:text-green-400 transition">
        About Us
      </a>

      <a href="#contact" className="hover:text-green-400 transition">
        Contact
      </a>

    </nav>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-5">

      <button className="text-2xl">
        👤
      </button>

      <button className="text-2xl">
        ❤️
      </button>

      <button
        onClick={() => setCartOpen(true)}
        className="relative text-3xl"
      >
        🛒

        <span className="absolute -top-2 -right-3 bg-green-500 text-black text-sm px-2 rounded-full font-bold">
          {cart.reduce((sum, item) => sum + item.quantity, 0)}
        </span>

      </button>

      <a
        href="#products"
        className="bg-green-500 hover:bg-green-600 transition px-6 py-3 rounded-xl text-black font-bold"
      >
        Shop Now
      </a>

    </div>

  </div>
</header>
</div> {/* <-- CLOSE COMPLETE HEADER HERE */}   
{/* HERO*/}
      <section
        id="home"
        className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-32"  >

        {/* LEFT */}
        <div>

          <p className="text-green-400 tracking-widest mb-4">
            Fresh • Organic • Nutrient Rich
          </p>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">

            Premium
            <span className="text-green-400">
              {" "}Microgreens{" "}
            </span>

            For Healthy Living

          </h1>

          <p className="text-gray-400 text-lg mb-8 max-w-xl">

            Fresh organic microgreens packed with vitamins,
            minerals, antioxidants, and freshness delivered
            directly to your doorstep.

          </p>

          <div className="flex gap-5">

            <a
              href="#products"
              className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl text-black font-bold"
            >
              Shop Now
            </a>

           <a
  href="#recipes"
  className="border border-green-500 hover:bg-green-500 hover:text-black transition px-8 py-4 rounded-2xl"
>
  AI Kitchen
</a>

          </div>

        </div>

        {/* RIGH */}
        <div className="relative">

          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            alt="Microgreens"
            className="rounded-3xl shadow-2xl"
          />

          {/* OVERLAY */}
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt="Healthy Food"
            className="absolute -bottom-10 -left-10 w-48 rounded-3xl border-4 border-green-500"
          />

        </div>

      </section>
    {/* TRUST STRIP */}
<section className="px-8 md:px-16 py-10">

  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

    <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6 text-center hover:border-green-500 transition">

      <div className="text-4xl mb-3">💪</div>

      <h3 className="font-bold text-lg mb-2">
        High Protein
      </h3>

      <p className="text-gray-400 text-sm">
        Perfect for fitness and healthy diets.
      </p>

    </div>

    <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6 text-center hover:border-green-500 transition">

      <div className="text-4xl mb-3">🌱</div>

      <h3 className="font-bold text-lg mb-2">
        100% Organic
      </h3>

      <p className="text-gray-400 text-sm">
        Grown naturally without chemicals.
      </p>

    </div>

    <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6 text-center hover:border-green-500 transition">

      <div className="text-4xl mb-3">❤️</div>

      <h3 className="font-bold text-lg mb-2">
        Nutrient Rich
      </h3>

      <p className="text-gray-400 text-sm">
        Packed with vitamins and minerals.
      </p>

    </div>

    <div className="bg-white/5 border border-green-500/20 rounded-2xl p-6 text-center hover:border-green-500 transition">

      <div className="text-4xl mb-3">🚚</div>

      <h3 className="font-bold text-lg mb-2">
        Fresh Delivery
      </h3>

      <p className="text-gray-400 text-sm">
        Harvested fresh and delivered fast.
      </p>

    </div>

  </div>

</section>

      {/* PRODUCTS */}
      <section
        id="products"
        className="px-8 md:px-16 py-24"
      >

        <h2 className="text-5xl font-bold text-center mb-16">
        <div className="text-center mb-12">

  <p className="text-gray-400 text-lg">
    Available Varieties:
  </p>

  <p className="text-green-400 text-xl mt-3 font-semibold">
    🌻 Sunflower • 🌱 Chia • ❤️ Beetroot • 🥬 Turnip • 💛 Mustard Green • 🍃 Amaranthus Red
  </p>

</div>  
          Featured
          <span className="text-green-400">
            {" "}Products
          </span>

        </h2>
        {search.trim() !== "" && (
  <p className="text-center text-gray-400 mb-6">
    {filteredProducts.length} product(s) found
  </p>
)}

       {search.trim() !== "" && filteredProducts.length === 0 ? (

  <div className="text-center py-20">
    <h3 className="text-2xl text-red-400">
      No products found
    </h3>

    <p className="text-gray-400 mt-2">
      Try another search term
    </p>
  </div>

) : (

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

    {filteredProducts.map((product) => (

      <ProductCard
        key={product.name}
        product={product}
        addToCart={addToCart}
      />

    ))}

  </div>

)}

      </section>

   {/* RECIPES */}
<section
  id="recipes"
  className="relative px-8 md:px-16 py-24 overflow-hidden"
>

  {/* BACKGROUND IMAGE */}
  <div className="absolute inset-0 pointer-events-none">

    <img
      src="https://images.unsplash.com/photo-1490645935967-10de6ba17061"
      alt=""
      className="w-full h-full object-cover opacity-60"
    />

    <div className="absolute inset-0 bg-black/20"></div>

  </div>

  {/* CONTENT */}
  <div className="relative z-10">

    <h2 className="text-6xl font-bold text-center mb-6">

      ✨ AI Kitchen Studio

    </h2>

    <p className="text-center text-gray-300 text-xl max-w-3xl mx-auto mb-16">

      Tell us what ingredients you have and our AI chef will create
      a healthy recipe instantly.

    </p>

    <div className="grid lg:grid-cols-2 gap-10">

      {/* LEFT PANEL */}
      <div className="bg-black/40 backdrop-blur-md border border-green-500/20 rounded-3xl p-8">

        <h4 className="text-2xl font-bold text-green-400 mb-6">

          Your Ingredients

        </h4>

        <textarea
          value={ingredients}
          onChange={(e) =>
            setIngredients(e.target.value)
          }
          placeholder="Example: bread, egg, tomato, cheese"
          className="w-full bg-black/80 text-white border-2 border-green-500 rounded-2xl px-6 py-5 min-h-[220px] mb-8 focus:outline-none focus:border-green-400"
        />

        <div className="flex flex-wrap gap-3 mb-8">

          <button
            onClick={() => setIngredients(ingredients + ", egg")}
            className="bg-green-800 px-4 py-2 rounded-full"
          >
            🥚 Egg
          </button>

          <button
            onClick={() => setIngredients(ingredients + ", tomato")}
            className="bg-green-800 px-4 py-2 rounded-full"
          >
            🍅 Tomato
          </button>

          <button
            onClick={() => setIngredients(ingredients + ", cheese")}
            className="bg-green-800 px-4 py-2 rounded-full"
          >
            🧀 Cheese
          </button>

          <button
            onClick={() => setIngredients(ingredients + ", bread")}
            className="bg-green-800 px-4 py-2 rounded-full"
          >
            🍞 Bread
          </button>

          <button
            onClick={() => setIngredients(ingredients + ", microgreens")}
            className="bg-green-800 px-4 py-2 rounded-full"
          >
            🥬 Microgreens
          </button>

        </div>

        <button
          onClick={generateRecipe}
          className="w-full bg-green-600 hover:bg-green-700 transition text-black py-5 rounded-2xl font-bold text-lg"
        >

          {loading
            ? "Generating..."
            : "✨ Generate Healthy Recipe"}

        </button>

      </div>

      {/* RIGHT PANEL */}
      <div className="bg-black/40 backdrop-blur-md border border-green-500/20 rounded-3xl p-8">

        {loading ? (

          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="text-7xl animate-pulse mb-6">
              ✨
            </div>

            <h4 className="text-3xl font-bold text-green-400 mb-4">

              Creating Your Recipe...

            </h4>

            <p className="text-gray-400">

              AI is preparing something delicious.

            </p>

          </div>

        ) : !recipe ? (

          <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="text-7xl mb-6">
              👨‍🍳
            </div>

            <h4 className="text-3xl font-bold mb-4">

              Your AI Chef Is Ready

            </h4>

            <p className="text-gray-400">

              Enter ingredients and click Generate Recipe.

            </p>

          </div>

        ) : (

          <div className="space-y-6">

            <div className="bg-green-900/20 border border-green-500 rounded-2xl p-6">

              <p className="text-sm uppercase tracking-widest text-green-400 mb-2">

                AI Generated Recipe

              </p>

             <h3 className="text-4xl font-extrabold text-yellow-300">
  {recipeName}
</h3>

            </div>

            {/* INGREDIENTS + STEPS */}
<div className="grid md:grid-cols-2 gap-6">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

    <h4 className="text-green-400 text-xl font-bold mb-4">
      🥬 Ingredients
    </h4>

    <div className="text-gray-300 whitespace-pre-line">
      {ingredientsSection}
    </div>

  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

    <h4 className="text-green-400 text-xl font-bold mb-4">
      👨‍🍳 Cooking Steps
    </h4>

    <div className="text-gray-300 whitespace-pre-line">
      {stepsSection}
    </div>

  </div>

</div>

{/* NUTRITION + MICROGREEN */}
<div className="grid md:grid-cols-2 gap-6">

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

    <h4 className="text-green-400 text-xl font-bold mb-4">
      💪 Nutrition
    </h4>

    <div className="text-gray-300 whitespace-pre-line">
      {nutritionSection}
    </div>

  </div>

  <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

    <h4 className="text-green-400 text-xl font-bold mb-4">
      🌱 Recommended Microgreen
    </h4>

    <span className="bg-green-500 text-black px-4 py-2 rounded-full font-bold">
      {microgreenSection}
    </span>

  </div>

</div>          </div>

        )}

      </div>

    </div>

  </div>

</section>
      
      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 md:px-16 py-16 bg-black">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

            <img
              src="/logo1.png"
              alt="Logo"
              className="h-24 mb-4"
            />

            <p className="text-gray-400 leading-relaxed">
              Premium organic microgreens grown fresh
              for healthy living and sustainable nutrition.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-bold text-green-400 mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <a href="#home" className="hover:text-green-400 transition">
                Home
              </a>

              <a href="#products" className="hover:text-green-400 transition">
                Products
              </a>

              <a href="#recipes" className="hover:text-green-400 transition">
                Recipes
              </a>

              <a href="#contact" className="hover:text-green-400 transition">
                Contact
              </a>

            </div>

          </div>

          {/* Products */}
          <div>

            <h3 className="text-2xl font-bold text-green-400 mb-5">
              Popular Greens
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <p>Sunflower</p>
              <p>Beetroot</p>
              <p>Mustard Green</p>
              <p>Amaranthus Red</p>

            </div>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-bold text-green-400 mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <p>hello@verdegreens.com</p>

              <p>+91 **********</p>

              <p>@verde.microgreens</p>

              <button className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl text-black font-bold mt-4">

                Subscribe

              </button>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500">

          © 2026 Verde Microgreens. All rights reserved.

        </div>

      </footer>
{/* BACKDROP */}
{cartOpen && (

  <div
    onClick={() => setCartOpen(false)}
    className="fixed inset-0 bg-black/70 z-40"
  ></div>

)}

{/* CART SIDEBAR */}
<div
className={`fixed top-0 right-0 h-full w-[65%] md:w-[360px] bg-black border-l border-green-500 z-50 p-6 overflow-y-auto transition-all duration-500 ease-in-out ${    cartOpen
      ? "translate-x-0"
      : "translate-x-full"
  }`}
>

  {/* TOP */}
  <div className="flex justify-between items-center mb-10">

    <h2 className="text-4xl font-bold">

      Your
      <span className="text-green-400">
        {" "}Cart
      </span>

    </h2>

    <button
      onClick={() => setCartOpen(false)}
      className="text-3xl"
    >
      ✕
    </button>

  </div>

  {/* EMPTY CART */}
  {cart.length === 0 && (

    <p className="text-gray-400">
      Your cart is empty.
    </p>

  )}

  {/* CART ITEMS */}
  <div className="space-y-6">

    {cart.map((item, index) => (

      <div
        key={index}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >

        <div className="flex gap-4">

          {/* IMAGE */}
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-xl"
          />

          {/* DETAILS */}
          <div className="flex-1">

            <h3 className="text-xl font-bold text-green-400">
              {item.name}
            </h3>

            <p className="text-gray-400">
              {item.pack}
            </p>

            <p className="text-xl font-bold mt-2">
              ₹{item.price}
            </p>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 mt-4">

              <button
                onClick={() => decreaseQty(index)}
                className="bg-red-500 w-8 h-8 rounded-lg"
              >
                -
              </button>

              <span className="font-bold">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQty(index)}
                className="bg-green-500 text-black w-8 h-8 rounded-lg"
              >
                +
              </button>

            </div>

          </div>

          {/* REMOVE */}
          <button
            onClick={() => removeItem(index)}
            className="bg-red-500 px-3 py-2 rounded-xl h-fit"
          >
            ✕
          </button>

        </div>

      </div>

    ))}

  </div>

  {/* TOTAL */}
  <div className="border-t border-white/10 mt-10 pt-6">

    <div className="flex justify-between items-center mb-8">

      <h3 className="text-3xl font-bold">
        Total
      </h3>

      <span className="text-3xl font-bold text-green-400">
        ₹{total}
      </span>

    </div>

    {/* PAYMENT BUTTON */}
    <button
      className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-bold text-xl"
      onClick={() =>
        alert("Razorpay Integration Coming Soon")
      }
    >

      Pay with Razorpay

    </button>

  </div>

</div>

{/* WHATSAPP BUTTON */}
<a
  href="https://wa.me/919876543210"
  target="_blank"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-green-500/40 z-50"
>
  💬
</a>

   {/* FLOATING AI RECIPE BUTTON */}
<a
  href="#recipes"
  className="fixed bottom-24 right-6 z-50 group"
>

  <div className="relative animate-pulse">

    {/* Glow */}
    <div className="absolute inset-0 bg-green-500 blur-2xl opacity-40 rounded-full"></div>

    {/* Button */}
    <div className="relative bg-black/80 backdrop-blur-xl border border-green-500 px-6 py-4 rounded-full flex items-center gap-3 shadow-2xl shadow-green-500/30 hover:scale-105 transition duration-300">

      {/* Spark Icon */}
      <span className="text-2xl animate-bounce">
        ✨
      </span>

      {/* Text */}
      <span className="text-green-400 font-bold hidden md:block">

        Cook With AI

      </span>

    </div>

  </div>

</a>

</main>

  );
}

/* PRODUCT CARD */
function ProductCard({
  product,
  addToCart,
}: any) {

 const packs = ["50g", "100g", "250g"];

  const [selectedPack, setSelectedPack] =
    useState(packs[0]);
const currentStock =
  selectedPack === "50g"
    ? product.stock50
    : selectedPack === "100g"
    ? product.stock100
    : product.stock250;
  return (

<div className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-green-500 hover:-translate-y-2 transition-all duration-500">
<div className="relative h-64 flex items-center justify-center p-4">
  {product.featured && (
    <span className="absolute top-3 left-3 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold z-10">
      ⭐ Featured
    </span>
  )}

 <img
  src={product.image}
  alt={product.name}
  className="max-w-full max-h-full object-contain transition-all duration-500 group-hover:scale-105"
/>

</div>

     <div className="p-6 flex flex-col flex-grow">

        <div className="flex justify-between items-center mb-4">

       <h3 className="text-2xl font-bold text-green-400 h-16 flex items-center">
            {product.name}
          </h3>

          <span className="bg-green-500 text-black text-sm px-3 py-1 rounded-full font-bold">

            Organic

          </span>

        </div>

        <p className="text-gray-400 mb-5 h-20">

          Fresh organic microgreens rich in nutrients and antioxidants.

        </p>
       <div className="mt-auto">
        {/* STOCK STATUS */}
<div className="mb-4">

  {currentStock > 0 ? (
  <span className="text-green-400 text-sm">
    ● {currentStock} in stock
  </span>
) : (
  <span className="text-red-400 text-sm">
    ● Out of Stock
  </span>
)}

</div>

        {/* DROPDOWN */}
        <select
          value={selectedPack}
          onChange={(e) =>
            setSelectedPack(e.target.value)
          }
          className="w-full bg-black border border-green-500 rounded-xl px-4 py-3 mb-5"
        >

          {packs.map((pack: string) => (

            <option key={pack} value={pack}>

              {pack} - ₹{
  pack === "50g"
    ? product.price50
    : pack === "100g"
    ? product.price100
    : product.price250
}

            </option>

          ))}

        </select>

        <div className="flex justify-between items-center">

          <span className="text-2xl font-bold text-green-400">

           ₹{
  selectedPack === "50g"
    ? product.price50
    : selectedPack === "100g"
    ? product.price100
    : product.price250
}

          </span>

         {currentStock > 0 ? (
  <button
    onClick={() =>
      addToCart(product, selectedPack)
    }
    className="bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-xl font-bold"
  >
    Add to Cart
  </button>
) : (
  <button
    disabled
    className="bg-gray-700 text-gray-400 px-5 py-3 rounded-xl font-bold cursor-not-allowed"
  >
    Out of Stock
  </button>
)}

        </div>

      </div>
</div>
    </div>

  );
}
