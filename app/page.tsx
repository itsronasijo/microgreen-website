export default function Home() {
return ( <main className="min-h-screen bg-black text-white">


  {/* Navbar */}
  <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-green-900">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

      {/* Logo */}
      <div className="bg-black p-2 rounded-2xl">

        <img
          src="/logo.png"
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

        <a href="#recipes" className="hover:text-green-400 transition">
          Recipes
        </a>

        <a href="#contact" className="hover:text-green-400 transition">
          Contact
        </a>

      </nav>

      {/* Button */}
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

  {/* Products Section */}
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
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-green-500 transition duration-500 hover:scale-105"
        >

          <img
            src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            alt={item}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-2xl font-bold text-green-400">
                {item} Microgreens
              </h3>

              <span className="bg-green-500 text-black text-sm px-3 py-1 rounded-full font-bold">
                Organic
              </span>

            </div>

            <p className="text-gray-400 mb-5">
              Fresh organic microgreens packed with nutrients and flavor.
            </p>

            <div className="flex justify-between items-center">

              <span className="text-xl font-bold">
                ₹199
              </span>

              <button className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-xl font-bold">
                Buy
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* Recipes Section */}
  <section
    id="recipes"
    className="px-8 md:px-16 py-24"
  >

    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
      Healthy
      <span className="text-green-400"> Recipes</span>
    </h2>

    <div className="grid md:grid-cols-4 gap-8">

      {[
        "Salad Bowl",
        "Smoothie",
        "Healthy Wrap",
        "Sandwich"
      ].map((recipe) => (

        <div
          key={recipe}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-green-500 transition duration-500 hover:-translate-y-2"
        >

          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt={recipe}
            className="w-full h-56 object-cover"
          />

          <div className="p-6">

            <h3 className="text-2xl font-bold text-green-400 mb-3">
              {recipe}
            </h3>

            <p className="text-gray-400 mb-4">
              Healthy organic recipe made using fresh microgreens.
            </p>

            <span className="text-sm text-green-400">
              Prep Time: 10 mins
            </span>

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* Testimonials */}
  <section className="px-8 md:px-16 py-24">

    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
      What Our
      <span className="text-green-400"> Customers Say</span>
    </h2>

    <div className="grid md:grid-cols-3 gap-10">

      {[
        "Freshest microgreens I have ever tasted!",
        "Beautiful quality and very healthy.",
        "Perfect for salads and smoothies."
      ].map((review, index) => (

        <div
          key={index}
          className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:border-green-500 transition duration-500"
        >

          <div className="text-yellow-400 text-2xl mb-4">
            ★★★★★
          </div>

          <p className="text-gray-300 mb-6">
            "{review}"
          </p>

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-green-500"></div>

            <div>
              <h3 className="font-bold">
                Happy Customer
              </h3>

              <p className="text-gray-400 text-sm">
                Verified Buyer
              </p>
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

  {/* Footer */}
  <footer className="border-t border-white/10 px-8 md:px-16 py-10">

    <div className="grid md:grid-cols-3 gap-10">

      <div>

        <img
          src="/logo.png"
          alt="Logo"
          className="h-20 mb-4"
        />

        <p className="text-gray-400">
          Premium organic microgreens for a healthier lifestyle.
        </p>

      </div>

      <div>

        <h3 className="text-2xl font-bold text-green-400 mb-4">
          Quick Links
        </h3>

        <div className="flex flex-col gap-3 text-gray-400">

          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Recipes</a>
          <a href="#">Contact</a>

        </div>

      </div>

      <div>

        <h3 className="text-2xl font-bold text-green-400 mb-4">
          Contact
        </h3>

        <p className="text-gray-400 mb-2">
          hello@microgreen.com
        </p>

        <p className="text-gray-400 mb-2">
          +91 9876543210
        </p>

        <p className="text-gray-400">
          Instagram: @verde.microgreens
        </p>

      </div>

    </div>

    <div className="border-t border-white/10 mt-10 pt-6 text-center text-gray-500">
      © 2026 Verde Microgreens. All rights reserved.
    </div>

  </footer>

</main>


);
}
