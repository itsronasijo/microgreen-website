"use client";

import { useState } from "react";

export default function Home() {

const [cart, setCart] = useState<any[]>([]);
const [cartOpen, setCartOpen] = useState(false);

const products = [
{
name: "Sunflower",
price: 199,
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
},
{
name: "Mustard Yellow",
price: 249,
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
},
{
name: "Radish",
price: 179,
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
},
{
name: "Chia",
price: 229,
image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
},
];

const addToCart = (product: any, pack: string) => {


setCart((prev) => [...prev, { ...product, pack }]);


};

const removeFromCart = (index: number) => {


const updated = [...cart];
updated.splice(index, 1);
setCart(updated);


};

const total = cart.reduce((sum, item) => sum + item.price, 0);

return (


<main className="min-h-screen bg-black text-white scroll-smooth">

  {/* Navbar */}
  <header className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-lg border-b border-green-900">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-5">

      {/* Logo */}
      <img
        src="/logo.png"
        alt="Logo"
        className="h-20"
      />

      {/* Nav */}
      <nav className="hidden md:flex gap-8 text-gray-300">

        <a href="#home" className="hover:text-green-400">
          Home
        </a>

        <a href="#products" className="hover:text-green-400">
          Products
        </a>

        <a href="#recipes" className="hover:text-green-400">
          Recipes
        </a>

        <a href="#contact" className="hover:text-green-400">
          Contact
        </a>

      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        {/* Mobile Menu */}
        <button className="md:hidden text-3xl text-green-400">
          ☰
        </button>

        {/* Cart */}
        <button
          onClick={() => setCartOpen(true)}
          className="relative text-3xl"
        >

          

          <span className="absolute -top-2 -right-3 bg-green-500 text-black text-sm px-2 rounded-full font-bold">
            {cart.length}
          </span>

        </button>

        {/* Shop Now */}
        <a
          href="#products"
          className="bg-green-500 hover:bg-green-600 transition px-5 py-3 rounded-xl text-black font-bold"
        >
          Shop Now
        </a>

      </div>

    </div>

  </header>

  {/* Hero */}
  <section
    id="home"
    className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-8 md:px-16 pt-40"
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

        <a
          href="#products"
          className="bg-green-500 hover:bg-green-600 transition px-7 py-3 rounded-2xl text-black font-bold"
        >
          Shop Now
        </a>

        <button className="border border-green-500 hover:bg-green-500 hover:text-black transition px-7 py-3 rounded-2xl">
          Learn More
        </button>

      </div>

    </div>

    {/* Hero Image */}
    <div className="relative">

      <img
        src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
        alt="Microgreens"
        className="rounded-3xl shadow-2xl"
      />

      {/* Overlay Image */}
      <img
        src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
        alt="Healthy"
        className="absolute -bottom-10 -left-10 w-48 rounded-3xl border-4 border-green-500"
      />

    </div>

  </section>

  {/* Products */}
  <section
    id="products"
    className="px-8 md:px-16 py-24"
  >

    <h2 className="text-5xl font-bold text-center mb-16">
      Featured
      <span className="text-green-400"> Products</span>
    </h2>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

      {products.map((product) => (

        <div
          key={product.name}
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-green-500 transition duration-500"
        >

          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover"
          />

          <div className="p-6">

            <div className="flex justify-between items-center mb-4">

              <h3 className="text-2xl font-bold text-green-400">
                {product.name}
              </h3>

              <span className="bg-green-500 text-black text-sm px-3 py-1 rounded-full font-bold">
                Organic
              </span>

            </div>

            <p className="text-gray-400 mb-5">
              Fresh organic microgreens rich in nutrients.
            </p>

            {/* Pack Sizes */}
            <div className="flex gap-2 mb-5">

              {["50g", "100g", "250g"].map((pack) => (

                <button
                  key={pack}
                  onClick={() => addToCart(product, pack)}
                  className="border border-green-500 px-3 py-1 rounded-lg hover:bg-green-500 hover:text-black transition"
                >
                  {pack}
                </button>

              ))}

            </div>

            <div className="flex justify-between items-center">

              <span className="text-xl font-bold">
                ₹{product.price}
              </span>

              <button
                onClick={() => addToCart(product, "50g")}
                className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-xl font-bold"
              >
                Add
              </button>

            </div>

          </div>

        </div>

      ))}

    </div>

  </section>

  {/* Recipes */}
  <section
    id="recipes"
    className="px-8 md:px-16 py-24"
  >

    <h2 className="text-5xl font-bold text-center mb-16">
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
          className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden"
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

            <p className="text-gray-400">
              Healthy recipe using fresh organic microgreens.
            </p>

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
  <footer className="border-t border-white/10 px-8 md:px-16 py-10 text-center text-gray-500">

    © 2026 Verde Microgreens. All rights reserved.

  </footer>

  {/* Cart Sidebar */}
  {cartOpen && (

    <div className="fixed top-0 right-0 w-full md:w-[450px] h-full bg-black border-l border-green-500 z-50 p-8 overflow-y-auto">

      <div className="flex justify-between items-center mb-10">

        <h2 className="text-4xl font-bold">
          Your
          <span className="text-green-400"> Cart</span>
        </h2>

        <button
          onClick={() => setCartOpen(false)}
          className="text-3xl"
        >
          
        </button>

      </div>

      <div className="space-y-6">

        {cart.map((item, index) => (

          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl p-5"
          >

            <div className="flex justify-between items-start">

              <div>

                <h3 className="text-2xl font-bold text-green-400">
                  {item.name}
                </h3>

                <p className="text-gray-400">
                  Pack: {item.pack}
                </p>

                <p className="text-xl font-bold mt-2">
                  ₹{item.price}
                </p>

              </div>

              <button
                onClick={() => removeFromCart(index)}
                className="bg-red-500 px-4 py-2 rounded-xl font-bold"
              >
                Remove
              </button>

            </div>

          </div>

        ))}

      </div>

      <div className="border-t border-white/10 mt-10 pt-6">

        <div className="flex justify-between items-center mb-8">

          <h3 className="text-3xl font-bold">
            Total
          </h3>

          <span className="text-3xl font-bold text-green-400">
            ₹{total}
          </span>

        </div>

        {/* Razorpay */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-bold text-xl">
          Pay with Razorpay
        </button>

      </div>

    </div>

  )}

  {/* WhatsApp */}
  <a
    href="https://wa.me/919876543210"
    target="_blank"
    className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-2xl shadow-green-500/40 z-50"
  >
    
  </a>

</main>


);
}
