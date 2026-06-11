"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
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

      setEmail(user.email || "");
      setAvatarUrl(user.user_metadata?.avatar_url || "");

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setPhone(data.phone || "");
        setAlternatePhone(data.alternate_phone || "");
        setAddress(data.address || "");
        setLandmark(data.landmark || "");
        setCity(data.city || "");
        setState(data.state || "");
        setPincode(data.pincode || "");
      }
    };

    loadProfile();
  }, [router]);

  const saveProfile = async () => {
  setLoading(true);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login again.");
    setLoading(false);
    return;
  }

  const { error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      email: user.email,
      full_name: fullName,
      avatar_url: avatarUrl,

      phone,
      alternate_phone: alternatePhone,
      address,
      landmark,
      city,
      state,
      pincode,

      profile_completed: true,
      updated_at: new Date().toISOString(),
    });

  setLoading(false);

  if (error) {
    alert(error.message);
    return;
  }

  alert("✅ Profile updated successfully");

  setTimeout(() => {
    router.push("/");
  }, 1000);
};
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-white text-black rounded-2xl p-8 shadow-lg">

          <div className="flex items-center gap-4 mb-8">
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-20 h-20 rounded-full"
            />

            <div>
              <h2 className="text-2xl font-bold">
                {fullName}
              </h2>

              <p className="text-gray-500">
                Connected with Google
              </p>
            </div>
          </div>

          <h3 className="font-bold text-lg mb-4">
            Account Information
          </h3>

          <input
            value={fullName}
            disabled
            className="w-full border p-3 rounded mb-3 bg-gray-100"
          />

          <input
            value={email}
            disabled
            className="w-full border p-3 rounded mb-6 bg-gray-100"
          />

          <h3 className="font-bold text-lg mb-4">
            Contact Information
          </h3>

          <input
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            placeholder="Enter alternate phone number"
            value={alternatePhone}
            onChange={(e) =>
              setAlternatePhone(e.target.value)
            }
            className="w-full border p-3 rounded mb-6"
          />

          <h3 className="font-bold text-lg mb-4">
            Delivery Address
          </h3>

          <textarea
            placeholder="House No, Street, Area"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-3 rounded mb-3"
            rows={4}
          />

          <input
            placeholder="Near temple, school, mall etc."
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full border p-3 rounded mb-3"
          />

          <input
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full border p-3 rounded mb-6"
          />

          <button
            onClick={saveProfile}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>

        </div>
      </div>
    </div>
  );
}
