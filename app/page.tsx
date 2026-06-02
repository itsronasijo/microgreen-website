export default function Home() {
return ( <main className="min-h-screen bg-black text-white">

```
  {/* Navbar */}
  <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-green-900">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

      {/* Logo */}
      <div className="bg-black p-2 rounded-2xl">

        <img
          src="/logo1.png"
          alt="Verde Logo"
          className="h-20 md:h-24 w-auto object-contain"
        />

      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-300">

        <a href="#home" className="hover:text-green-400 transition">
          Home
        </a>

        <a href="#benefits" className="hover:text-green-400 transition">
          Benefits
        </a>

        <a href="#products" className="hover:text-green-400 transition">
          Products
        </a>

        <a href="#contact" className="hover:text-green-400 transition">
          Contact
        </a>

      </nav>

      {/* Shop Button */}
      <button className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl text-black font-bold shadow-lg shadow-green-500/30">
        Shop Now
      </button>

    </div>

  </header>

  {/* Hero */}
  <section
    id="home"
    className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-40"
  >

    {/* Left Side */}
    <div>

      <p className="text-green-400 mb-4 tracking-widest">
        Fresh • Organic • Nutrient Rich
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
        Premium
        <span className="text-green-400"> Microgreens </span>
        For Healthy Living
      </h1>

      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        Fresh organic microgreens packed with vitamins,
        minerals, and freshness delivered directly to your table.
      </p>

      <div className="flex gap-5">

        <button className="bg-green-500 hover:bg-green-600 transition px-7 py-3 rounded-2xl text-black font-bold">
          Shop Now
        </button>

        <button className="border border-green-500 hover:bg-green-500 hover:text-black transition px-7 py-3 rounded-2xl">
          Learn More
        </button>

      </div>

    </div>

    {/* Right Side */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        alt="Microgreens"
        className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
      />

      {/* Overlay Image */}
      <img
        src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
        alt="Healthy Food"
        className="absolute -bottom-10 -left-10 w-48 rounded-3xl border-4 border-green-500 shadow-2xl hover:scale-105 transition duration-700"
      />

      {/* Floating Badge */}
      <div className="absolute top-5 right-5 bg-green-500 text-black px-4 py-2 rounded-2xl font-bold animate-bounce">
        100% Organic
      </div>

    </div>

  </section>

  {/* Benefits */}
  <section
    id="benefits"
    className="px-8 md:px-16 py-24"
  >

    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
      Why Choose
      <span className="text-green-400"> MicroGreen?</span>
    </h2>

    <div className="grid md:grid-cols-4 gap-8">

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
        <div className="text-5xl mb-5">🌱</div>

        <h3 className="text-2xl font-bold text-green-400 mb-4">
          Rich Nutrition
        </h3>

        <p className="text-gray-400">
          Packed with essential vitamins and antioxidants.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
        <div className="text-5xl mb-5">🌿</div>

        <h3 className="text-2xl font-bold text-green-400 mb-4">
          Organic Farming
        </h3>

        <p className="text-gray-400">
          Naturally grown without harmful chemicals.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
        <div className="text-5xl mb-5">🚚</div>

        <h3 className="text-2xl font-bold text-green-400 mb-4">
          Fresh Delivery
        </h3>

        <p className="text-gray-400">
          Harvested fresh and delivered quickly.
        </p>
      </div>

      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
        <div className="text-5xl mb-5">♻️</div>

        <h3 className="text-2xl font-bold text-green-400 mb-4">
          Sustainable
        </h3>

        <p className="text-gray-400">
          Eco-friendly and sustainable growing practices.
        </p>
      </div>

    </div>

  </section>

</main>
```

);
}
