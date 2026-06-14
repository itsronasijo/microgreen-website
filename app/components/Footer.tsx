      
      {/* FOOTER */}
      <footer className="border-t border-white/10 px-8 md:px-16 py-16 bg-black">

        <div className="grid md:grid-cols-4 gap-10">

          {/* Logo */}
          <div>

           {/* LOGO */}
<Link
  href="/"
  onClick={(e) => {
    if (window.location.pathname === "/") {
      e.preventDefault();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }}
  className="w-28 block"
>
  <img
    src="/logo1.png"
    alt="Logo"
    className="h-20 w-auto object-contain hover:scale-105 transition"
  />
</Link>

            <p className="text-gray-400 leading-relaxed">
              Premium organic microgreens grown fresh
              for healthy living and sustainable nutrition.
            </p>

          </div>

          {/* Quick Links */}
          <div>

            <h3 className="text-2xl font-bold text-green-400 mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-gray-400">

              <a href="#home" className="hover:text-green-400 transition">
                Home
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

            </div>

          </div>this is my footer suggest improvenmts and i want footer in every newly created forems
