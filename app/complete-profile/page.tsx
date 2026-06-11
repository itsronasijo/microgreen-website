"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function CompleteProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      setFullName(
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        ""
      );
    };

    loadUser();
  }, [router]);

  const handleSave = async () => {
    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("User not found");
        return;
      }

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        full_name: fullName,
        phone,
        city,
        state,
        avatar_url: user.user_metadata?.avatar_url || "",
        profile_completed: true,
      });

      if (error) {
        console.error(error);
        alert(error.message);
        return;
      }

      alert("Profile saved successfully!");

      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white p-8 rounded-xl w-full max-w-md shadow-lg">

        <h1 className="text-2xl font-bold mb-6 text-black">
          Complete Your Profile
        </h1>

        <input
          className="w-full border p-3 mb-3 rounded text-black placeholder:text-gray-500"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-3 rounded text-black placeholder:text-gray-500"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-3 rounded text-black placeholder:text-gray-500"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="w-full border p-3 mb-4 rounded text-black placeholder:text-gray-500"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <button
          onClick={handleSave}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-semibold"
        >
          {loading ? "Saving..." : "Save Profile"}
        </button>

      </div>
    </div>
  );
}
