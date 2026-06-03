export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {

  return (

    <main className="min-h-screen bg-black text-white flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-6xl font-bold text-green-400 mb-6">

          {params.slug}

        </h1>

        <p className="text-gray-400 text-xl">

          Dynamic Product Page Working ✅

        </p>

      </div>

    </main>

  );

}
