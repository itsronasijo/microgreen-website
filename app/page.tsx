export default function Home() {
return ( <main className="min-h-screen bg-black text-white">


  {/* Navbar */}
  <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-green-900">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

      {/* Logo */}
      <div className="flex items-center gap-3">

        <img
          src="/logo.png"
          alt="Verde Logo"
          className="h-14 w-auto"
        />

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

      {/* Shop Button */}
      <button className="bg-green-500 hover:bg-green-600 transition px-5 py-2 rounded-xl text-black font-bold">
        Shop Now
      </button>

    </div>

  </header>

  {/* Hero Section */}
  <section className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-32">

    {/* Left Side */}
    <div>

      <p className="text-green-400 tracking-widest mb-4">
        FRESH • ORGANIC • NUTRITIOUS
      </p>

      <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">

        Microgreens
        <br />

        <span className="text-green-400">
          For A Better You
        </span>

      </h1>

      <p className="text-gray-400 text-lg mb-8 max-w-xl">
        Grown naturally with care and packed with nutrients
        to support your healthy and active lifestyle.
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

    {/* Right Side Image */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        alt="Microgreens"
        className="rounded-3xl shadow-2xl hover:scale-105 transition duration-500"
      />

      <div className="absolute top-5 right-5 bg-green-500 text-black px-4 py-2 rounded-2xl font-bold animate-bounce">
        100% Organic
      </div>

    </div>

  </section>

</main>


);
}
