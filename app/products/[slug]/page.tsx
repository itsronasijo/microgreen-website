export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {

  const products: any = {

    sunflower: {
      name: "Sunflower Microgreens",
      image:
        "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
      description:
        "Fresh organic sunflower microgreens packed with nutrients and protein.",
      price: "₹199",
    },

    beetroot: {
      name: "Beetroot Microgreens",
      image:
        "https://images.unsplash.com/photo-1576045057995-568f588f82fb",
      description:
        "Colorful antioxidant-rich beetroot microgreens grown organically.",
      price: "₹229",
    },

    "chia-seed": {
      name: "Chia Seed Microgreens",
      image:
        "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38",
      description:
        "Healthy chia microgreens loaded with vitamins and fiber.",
      price: "₹219",
    },

  };

  const product = products[params.slug];

  if (!product) {

    return (

      <main className="min-h-screen bg-black text-white flex items-center justify-center">

        <h1 className="text-5xl font-bold">
          Product Not Found
        </h1>

      </main>

    );

  }

  return (

    <main className="min-h-screen bg-black text-white">

      {/* HERO */}
      <section className="min-h-screen grid md:grid-cols-2 gap-12 items-center px-8 md:px-16">

        {/* IMAGE */}
        <div>

          <img
            src={product.image}
            alt={product.name}
            className="rounded-3xl shadow-2xl"
          />

        </div>

        {/* CONTENT */}
        <div>

          <p className="text-green-400 tracking-widest mb-4">

            PREMIUM MICROGREENS

          </p>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">

            {product.name}

          </h1>

          <p className="text-gray-400 text-xl leading-relaxed mb-10">

            {product.description}

          </p>

          <div className="flex items-center gap-6 mb-10">

            <span className="text-4xl font-bold text-green-400">

              {product.price}

            </span>

            <button className="bg-green-500 hover:bg-green-600 transition px-8 py-4 rounded-2xl text-black font-bold">

              Add to Cart

            </button>

          </div>

          {/* BENEFITS */}
          <div className="grid grid-cols-2 gap-5">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-green-400 font-bold">
                ✓ Organic
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-green-400 font-bold">
                ✓ Fresh Daily
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-green-400 font-bold">
                ✓ Nutrient Rich
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5">

              <p className="text-green-400 font-bold">
                ✓ No Chemicals
              </p>

            </div>

          </div>

        </div>

      </section>

    </main>

  );

}
