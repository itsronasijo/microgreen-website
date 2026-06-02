# app/page.tsx

```tsx
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Benefits from "../components/Benefits";
import Products from "../components/Products";
import Recipes from "../components/Recipes";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

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
import type { Metadata } from "next";

export const metadata: Metadata = {
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
  background: black;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

.glass {
  background: rgba(255,255,255,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.1);
}
```

# tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

# postcss.config.js

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

# next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
```

# components/Navbar.tsx

```tsx
"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
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

          <a href="#recipes" className="hover:text-green-400 transition">
            Recipes
          </a>

          <a href="#about" className="hover:text-green-400 transition">
            About
          </a>

          <a href="#contact" className="hover:text-green-400 transition">
            Contact
          </a>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col gap-4 p-6 bg-black border-t border-green-900">
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
