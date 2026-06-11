"use client";

import { supabase } from "../../lib/supabase";

export default function LoginPage() {
  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
  provider: "google",
  options: {
    redirectTo:
       "https://verdemicrogreens.vercel.app/auth/callback",
  },
});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6">
          Login to Verde
        </h1>

        <button
          onClick={signInWithGoogle}
          className="bg-green-600 text-white px-6 py-3 rounded-lg"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
}
