export default function Home() {
return (



  {/* Navbar */}
  <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-green-900">
    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

      <h1 className="text-3xl font-bold text-green-400">
        MicroGreen
      </h1>

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

    </div>
  </header>

  {/* Hero */}
  <section
    id="home"
    className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-32"
  >

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

  {/* Products */}
  <section
    id="products"
    className="px-8 md:px-16 py-24"
  >

    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
      Featured
      <span className="text-green-400"> Products</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-10">

      {[
        "Sunflower",
        "Mustard Yellow",
        "Radish",
        "Chia",
        "Fenugreek",
        "Beetroot"
      ].map((item) => (

        <div
          key={item}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-green-500 transition duration-500"
        >

          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            alt={item}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">

            <h3 className="text-2xl font-bold text-green-400 mb-3">
              {item} Microgreens
            </h3>

            <p className="text-gray-400 mb-5">
              Fresh organic microgreens packed with nutrients and flavor.
            </p>

            <div className="flex justify-between items-center">

              <span className="text-xl font-bold">
                ₹199
              </span>

              <button className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-xl">
                Buy
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* Contact */}
  <section
    id="contact"
    className="px-8 md:px-16 py-24"
  >

    <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-10">

      <h2 className="text-4xl font-bold text-center mb-10">
        Contact
        <span className="text-green-400"> Us</span>
      </h2>

      <form className="space-y-6">

        <input
          type="text"
          placeholder="Your Name"
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4"
        />

        <input
          type="email"
          placeholder="Your Email"
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4"
        />

        <textarea
          placeholder="Your Message"
          rows={5}
          className="w-full bg-black border border-white/10 rounded-xl px-5 py-4"
        />

        <button className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-xl font-bold">
          Send Message
        </button>

      </form>

    </div>

  </section>

</main>

);
}
