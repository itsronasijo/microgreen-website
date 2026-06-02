# app/page.tsx

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Products from "@/components/Products";
import Recipes from "@/components/Recipes";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-black text-white overflow-hidden">
      <Navbar />
      <Hero />
      <Benefits />
      <Products />
      <Recipes />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
```

# app/layout.tsx

```tsx
import "./globals.css";

export const metadata = {
  title: "MicroGreen",
  description: "Premium Organic Microgreens",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

# app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  background: #000;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.1);
}
```

# components/Navbar.tsx

```tsx
"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-lg border-b border-green-900">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <h1 className="text-3xl font-bold text-green-400">
          MicroGreen
        </h1>

        <nav className="hidden md:flex gap-8 text-gray-300">
          <a href="#home" className="hover:text-green-400">Home</a>
          <a href="#benefits" className="hover:text-green-400">Benefits</a>
          <a href="#products" className="hover:text-green-400">Products</a>
          <a href="#recipes" className="hover:text-green-400">Recipes</a>
          <a href="#about" className="hover:text-green-400">About</a>
          <a href="#contact" className="hover:text-green-400">Contact</a>
        </nav>

        <button
          className="md:hidden text-3xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 p-5 bg-black">
          <a href="#home">Home</a>
          <a href="#benefits">Benefits</a>
          <a href="#products">Products</a>
          <a href="#recipes">Recipes</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      )}
    </header>
  );
}
```

# components/Hero.tsx

```tsx
export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen grid md:grid-cols-2 gap-10 items-center px-10 pt-32"
    >
      <div>
        <p className="text-green-400 mb-4">
          Fresh • Organic • Nutrient Rich
        </p>

        <h1 className="text-6xl font-bold leading-tight mb-6">
          Premium
          <span className="text-green-400"> Microgreens </span>
          For Healthy Living
        </h1>

        <p className="text-gray-400 mb-8 text-lg">
          Organic microgreens packed with nutrients and grown naturally.
        </p>

        <div className="flex gap-5">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-2xl text-black font-bold">
            Shop Now
          </button>

          <button className="border border-green-500 px-6 py-3 rounded-2xl hover:bg-green-500 hover:text-black">
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

        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
          alt="Healthy Food"
          className="absolute -bottom-10 -left-10 w-48 rounded-3xl border-4 border-green-500 hover:scale-105 transition"
        />

        <div className="absolute top-5 right-5 bg-green-500 text-black px-4 py-2 rounded-2xl font-bold animate-bounce">
          100% Organic
        </div>
      </div>
    </section>
  );
}
```
