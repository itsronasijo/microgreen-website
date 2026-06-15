  "use client";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Link from "next/link";
import { analyzeGoals } from "../lib/healthAnalyzer";
import HealthAnalyzerQuestions from "../components/HealthAnalyzerQuestions";


export default function Home() {

  const [cart, setCart] = useState<any[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [showSafetyModal, setShowSafetyModal] =
  useState(false);
  const [showAnalyzer, setShowAnalyzer] = useState(false);
  const [currentView, setCurrentView] =
  useState<"goals" | "questions" | "results">(
    "goals"
  );

 
  useEffect(() => {
  const savedCart = localStorage.getItem("cart");

  if (savedCart) {
    setCart(JSON.parse(savedCart));
  }
}, []);

  
 useEffect(() => {
  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );
 
}, [cart]);

  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  
  useEffect(() => {
  loadWishlistCount();
}, []);

const loadWishlistCount = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const { count } = await supabase
    .from("wishlist")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  setWishlistCount(count || 0);
};
  const [ingredients, setIngredients] =
  useState("");
  const [search, setSearch] = useState("");
  const [recipe, setRecipe] =
  useState("");
  const [loading, setLoading] =
  useState(false);
 const [products, setProducts] = useState<any[]>([]);
 const [user, setUser] = useState<any>(null);
 const [profileOpen, setProfileOpen] = useState(false);
 const [profileRef, setProfileRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef &&
      !profileRef.contains(event.target as Node)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, [profileRef]);

  
  
useEffect(() => {
  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log("SESSION:", session);

    setUser(session?.user ?? null);
  };

  getUser();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log("AUTH CHANGE:", session);
    setUser(session?.user ?? null);
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
  
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
    // TOAST
  setShowToast(true);

  setTimeout(() => {
    setShowToast(false);
  }, 2500);

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
 const handleGoogleLogin = async () => {
  await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo:
        "https://verdemicrogreens.vercel.app/auth/callback",
    },
  });
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
  const toggleGoal = (goal: string) => {

  if (selectedGoals.includes(goal)) {

    setSelectedGoals(
      selectedGoals.filter((g) => g !== goal)
    );

  } else {

    if (selectedGoals.length >= 3) return;

    setSelectedGoals([
      ...selectedGoals,
      goal
    ]);

  }

};
  const handleAnalysis = async () => {
  const recommendations =
    await analyzeGoals(selectedGoals);

  setResults(recommendations);
};

if (currentView === "questions") {
  return (
    <HealthAnalyzerQuestions
      onBack={() => setCurrentView("goals")}
      onComplete={() => setCurrentView("results")}
    />
  );
}

  
 return (
   <>
  {showToast && (
    <div
      className="
        fixed
        top-24
        right-6
        z-50
        bg-green-500
        text-black
        px-6
        py-4
        rounded-2xl
        shadow-2xl
        font-bold
        animate-pulse
      "
    >
     🌱 Added to Cart Successfully
    </div>
  )}

 

  <main className="min-h-screen bg-black text-white">



    
    {/* HERO*/}
      <section
        id="home"
     className="grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-10 pb-20"
  >

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
    src="/homepage_hoverpic.png"
    alt="Microgreens"
    className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
  />
          {/* OVERLAY */}
          <img
            src="/homepagepic.png"
            alt="Healthy Food"
            className="absolute -bottom-16 -left-16 w-72 rounded-3xl shadow-2xl"
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

  {/* VARIETIES */}
  <div className="text-center mb-12">

    <p className="text-gray-400 text-lg">
      Available Varieties:
    </p>

    <p className="text-green-400 text-xl mt-3 font-semibold">
      🌻 Sunflower • 🌱 Chia • ❤️ Beetroot • 🥬 Turnip • 💛 Mustard • 🍃 Amaranthus Red • 🌽 Corn • 🍀 Fenugreek
    </p>

  </div>

  {/* HEADING + SEARCH */}
  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">

   <h2 className="text-5xl font-bold mb-4 lg:mb-0">
      Featured
      <span className="text-green-400">
        {" "}Products
      </span>
    </h2>

    <div className="mt-4 lg:mt-0">
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
        className="
          w-64
          bg-white/10
          border
          border-green-800
          rounded-xl
          px-4
          py-3
          text-white
          outline-none
        "
      />
    </div>

  </div>

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


    {/* HEALTH ANALYZER */}
<section
  id="analyzer"
  className="px-8 md:px-16 py-24"
>
  <div className="max-w-6xl mx-auto">
<div className="bg-white/5 border border-green-500/20 rounded-[40px] p-8 md:p-12 backdrop-blur-xl">

    <div className="text-center mb-14">
      <h2 className="text-5xl font-bold text-green-400 mb-4">
        🧠 Verde Health Analyzer
      </h2>

      <p className="text-gray-400 text-lg max-w-2xl mx-auto">
        Discover microgreens that align with your wellness interests
        and nutritional preferences.
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

      <div
  onClick={() => toggleGoal("Active Lifestyle")}
  className={`group backdrop-blur-md rounded-3xl p-6 cursor-pointer transition duration-300 hover:scale-105
  ${
   selectedGoals.includes("Active Lifestyle")
      ? "bg-green-500/20 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      : "bg-white/5 border border-green-500/20 hover:border-green-400"
  }`}
>
  <div className="flex justify-between items-start">

    <div>
      <div className="text-4xl mb-3">💪</div>

      <h3 className="font-bold text-lg text-white">
        Active Lifestyle
      </h3>
    </div>

    {selectedGoals.includes("Active Lifestyle") && (
      <div className="text-green-400 text-2xl">
        ✓
      </div>
    )}

  </div>
</div>

   <div
 onClick={() => toggleGoal("Weight Management")}
  className={`group backdrop-blur-md rounded-3xl p-6 cursor-pointer transition duration-300 hover:scale-105
  ${
    selectedGoals.includes ("Weight Management")
      ? "bg-green-500/20 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      : "bg-white/5 border border-green-500/20 hover:border-green-400"
  }`}
>
  <div className="flex justify-between items-start">

    <div>
      <div className="text-4xl mb-3">⚖️</div>

      <h3 className="font-bold text-lg text-white">
      Weight Management
      </h3>
    </div>

    {selectedGoals.includes( "Weight Management") && (
      <div className="text-green-400 text-2xl">
        ✓
      </div>
    )}

  </div>
</div>
      
      <div
  onClick={() => toggleGoal("Everyday Wellness")}
  className={`group backdrop-blur-md rounded-3xl p-6 cursor-pointer transition duration-300 hover:scale-105
  ${
    selectedGoals.includes("Everyday Wellness")
      ? "bg-green-500/20 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      : "bg-white/5 border border-green-500/20 hover:border-green-400"
  }`}
>
  <div className="flex justify-between items-start">

    <div>
      <div className="text-4xl mb-3">🛡️</div>

      <h3 className="font-bold text-lg text-white">
       Everyday Wellness
      </h3>
    </div>

    {selectedGoals.includes ("Everyday Wellness" )&& (
      <div className="text-green-400 text-2xl">
        ✓
      </div>
    )}

  </div>
</div>


       
               <div
  onClick={() => toggleGoal("Energy & Vitality")}
  className={`group backdrop-blur-md rounded-3xl p-6 cursor-pointer transition duration-300 hover:scale-105
  ${
   selectedGoals.includes("Energy & Vitality")
      ? "bg-green-500/20 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      : "bg-white/5 border border-green-500/20 hover:border-green-400"
  }`}
>
  <div className="flex justify-between items-start">

    <div>
      <div className="text-4xl mb-3">⚡</div>

      <h3 className="font-bold text-lg text-white">
       Energy & Vitality
      </h3>
    </div>

    {selectedGoals.includes( "Energy & Vitality") && (
      <div className="text-green-400 text-2xl">
        ✓
      </div>
    )}

  </div>
</div>



       
      <div
  onClick={() => toggleGoal("General Wellbeing")}
  className={`group backdrop-blur-md rounded-3xl p-6 cursor-pointer transition duration-300 hover:scale-105
  ${
   selectedGoals.includes("General Wellbeing")
      ? "bg-green-500/20 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      : "bg-white/5 border border-green-500/20 hover:border-green-400"
  }`}
>
  <div className="flex justify-between items-start">

    <div>
      <div className="text-4xl mb-3">🌿</div>

      <h3 className="font-bold text-lg text-white">
        General Wellbeing
      </h3>
    </div>

    {selectedGoals.includes( "General Wellbeing") && (
      <div className="text-green-400 text-2xl">
        ✓
      </div>
    )}

  </div>
</div>

            <div
  onClick={() => toggleGoal("Balanced Nutrition")}
  className={`group backdrop-blur-md rounded-3xl p-6 cursor-pointer transition duration-300 hover:scale-105
  ${
selectedGoals.includes("Balanced Nutrition")
      ? "bg-green-500/20 border-2 border-green-400 shadow-[0_0_30px_rgba(34,197,94,0.3)]"
      : "bg-white/5 border border-green-500/20 hover:border-green-400"
  }`}
>
  <div className="flex justify-between items-start">

    <div>
      <div className="text-4xl mb-3">🥗</div>

      <h3 className="font-bold text-lg text-white">
        Balanced Nutrition
      </h3>
    </div>

    {selectedGoals.includes("Balanced Nutrition") && (
      <div className="text-green-400 text-2xl">
        ✓
      </div>
    )}

  </div>
</div>

    </div>

{selectedGoals.length > 0 && (
  <div className="mt-10 max-w-2xl mx-auto bg-green-500/10 border border-green-500/30 rounded-3xl p-8 text-center">

    <p className="text-green-400 font-bold text-xl mb-5">
      🌱 Your Wellness Focus
    </p>

    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {selectedGoals.map((goal) => (
        <span
          key={goal}
          className="bg-green-500 text-black px-4 py-2 rounded-full font-bold"
        >
          {goal}
        </span>
      ))}
    </div>

    <div className="border-t border-green-500/20 pt-6">
      <p className="text-green-300 font-semibold text-lg">
        {selectedGoals.length}/3 Goals Selected
      </p>

      <p className="text-gray-400 mt-2 mb-6">
        Get your personalized microgreen recommendations
      </p>

      <button
        onClick={() => setShowAnalyzer(true)}
        className="
          px-10 py-4
          rounded-full
          bg-green-500
          hover:bg-green-400
          text-black
          font-bold
          transition
          hover:scale-105
        "
      >
        Start Analysis →
      </button>
    </div>

  </div>
)}
  

 </div> {/* Glass Container */}
  </div>
  {showAnalyzer && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 bg-black/70 z-40"
      onClick={() => setShowAnalyzer(false)}
    />

    {/* Slider Drawer */}
    <div
      className="
        fixed
        top-0
        right-0
        h-screen
        w-full
        md:w-[550px]
        bg-black
        border-l
        border-green-500/20
        z-50
        overflow-y-auto
        shadow-2xl
      "
    >
      <HealthAnalyzerQuestions
        onComplete={() => {
          console.log("Analysis complete");
        }}
        onBack={() => setShowAnalyzer(false)}
      />
    </div>
  </>
)}
</section>              
  
  
  
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
     </>

  );
}

/* PRODUCT CARD */
function ProductCard({
  product,
  addToCart,
}: any) {
   const [wishlisted, setWishlisted] = useState(false);
  const toggleWishlist = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login first");
    return;
  }

  if (!wishlisted) {
    const { error } = await supabase
      .from("wishlist")
      .insert({
        user_id: user.id,
        product_id: product.id,
      });

    if (!error) {
      setWishlisted(true);
    }
  } else {
    const { error } = await supabase
      .from("wishlist")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", product.id);

    if (!error) {
      setWishlisted(false);
    }
  }
};

  useEffect(() => {
  const loadWishlist = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("wishlist")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", product.id)
      .single();

    if (data) {
      setWishlisted(true);
    }
  };

  loadWishlist();
}, [product.id]);

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
<button
  onClick={toggleWishlist}
  className="absolute top-3 right-3 text-2xl hover:scale-110 transition z-10"
>
  {wishlisted ? "❤️" : "🤍"}
</button>
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
