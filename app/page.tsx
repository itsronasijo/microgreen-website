
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-6 border-b border-green-900 bg-black sticky top-0 z-50">
        <h1 className="text-3xl font-bold text-green-400">
          MicroGreen
        </h1>

        <nav className="flex gap-6 text-gray-300">
          <a href="#" className="hover:text-green-400 transition">
            Home
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Benefits
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Recipes
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Shop
          </a>

          <a href="#" className="hover:text-green-400 transition">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-14 px-10 py-20 items-center">
        
        {/* Left Side */}
        <div>
          <p className="text-green-400 text-lg mb-4">
            Fresh • Organic • Healthy
          </p>

          <h2 className="text-6xl font-bold leading-tight mb-6">
            Premium
            <span className="text-green-400"> Microgreens </span>
            For Everyday Health
          </h2>

          <p className="text-gray-400 text-lg mb-8 max-w-xl">
            Nutrient-rich microgreens grown naturally and delivered fresh.
            Perfect for salads, smoothies, sandwiches, and healthy living.
          </p>

          <div className="flex gap-5">
            <button className="bg-green-500 hover:bg-green-600 px-7 py-3 rounded-2xl text-black font-semibold transition">
              Shop Now
            </button>

            <button className="border border-green-500 text-green-400 hover:bg-green-500 hover:text-black px-7 py-3 rounded-2xl transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            alt="Microgreens"
            className="rounded-3xl shadow-2xl border border-green-900"
          />

          <div className="absolute -bottom-5 -left-5 bg-green-500 text-black px-5 py-3 rounded-2xl font-bold shadow-xl">
            100% Organic
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="px-10 pb-20">
        <h3 className="text-4xl font-bold text-center mb-14">
          Why Choose Microgreens?
        </h3>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-green-500 transition">
            <h4 className="text-2xl font-semibold text-green-400 mb-4">
              Rich Nutrition
            </h4>

            <p className="text-gray-400">
              Loaded with vitamins, minerals, and antioxidants that support a healthy lifestyle.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-green-500 transition">
            <h4 className="text-2xl font-semibold text-green-400 mb-4">
              Freshly Harvested
            </h4>

            <p className="text-gray-400">
              Grown naturally and harvested fresh to maintain maximum flavor and nutrition.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 hover:border-green-500 transition">
            <h4 className="text-2xl font-semibold text-green-400 mb-4">
              Easy to Add
            </h4>

            <p className="text-gray-400">
              Perfect addition to salads, burgers, wraps, smoothies, and healthy recipes.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
