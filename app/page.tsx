export default function Home() {
return ( <main className="min-h-screen bg-black text-white">


  {/* Navbar */}
  <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-green-900">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

      {/* Logo */}
      <div className="flex items-center gap-4">

        <div className="bg-white p-3 rounded-2xl shadow-lg shadow-green-500/20">

          <img
            src="/logotransperant.png"
            alt="Verde Logo"
            className="h-20 md:h-24 w-auto object-contain"
          />

        </div>

      </div>

      {/* Navigation */}
      <nav className="hidden md:flex gap-8 text-gray-300">

        <a href="#" className="hover:text-green-400 transition">
          Home
        </a>

        <a href="#" className="hover:text-green-400 transition">
          Products
        </a>

        <a href="#" className="hover:text-green-400 transition">
          Benefits
        </a>

        <a href="#" className="hover:text-green-400 transition">
          Recipes
        </a>

        <a href="#" className="hover:text-green-400 transition">
          Contact
        </a>

      </nav>

      {/* Button */}
      <button className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl text-black font-bold shadow-lg shadow-green-500/30">
        Shop Now
      </button>

    </div>

  </header>

  {/* Hero Section */}
  <section className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-40">

    {/* Left Side */}
    <div>

      <p className="text-green-400 tracking-[0.3em] mb-4 text-sm">
        FRESH • ORGANIC • NUTRITIOUS
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">

        Microgreens
        <br />

        <span className="text-green-400">
          For A Better You
        </span>

      </h1>

      <p className="text-gray-400 text-lg mb-8 max-w-xl leading-relaxed">
        Grown naturally with care and packed with nutrients
        to support your healthy and active lifestyle.
        Freshly harvested organic microgreens delivered
        directly to your doorstep.
      </p>

      <div className="flex flex-wrap gap-5">

        <button className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl text-black font-bold shadow-lg shadow-green-500/30">
          Shop Now
        </button>

        <button className="border border-green-500 hover:bg-green-500 hover:text-black transition px-8 py-4 rounded-2xl">
          Learn More
        </button>

      </div>

    </div>

    {/* Right Side */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        alt="Microgreens"
        className="rounded-3xl shadow-2xl hover:scale-105 transition duration-700"
      />

      {/* Floating Badge */}
      <div className="absolute top-5 right-5 bg-green-500 text-black px-5 py-3 rounded-2xl font-bold animate-bounce shadow-lg shadow-green-500/40">
        100% Organic
      </div>

      {/* Small Overlay Image */}
      <img
        src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
        alt="Healthy Food"
        className="absolute -bottom-10 -left-10 w-48 rounded-3xl border-4 border-green-500 shadow-2xl hover:scale-105 transition duration-700"
      />

    </div>

  </section>

</main>


);
}
