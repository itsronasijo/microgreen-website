"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [alternatePhone, setAlternatePhone] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (!error && data) {
      setEmail(data.email || "");
      setFullName(data.full_name || "");
      setPhone(data.phone || "");
      setAlternatePhone(data.alternate_phone || "");
      setAddress(data.address || "");
      setLandmark(data.landmark || "");
      setCity(data.city || "");
      setStateName(data.state || "");
      setCountry(data.country || "India");
      setPincode(data.pincode || "");
    }

    setLoading(false);
  };

  const saveProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone,
        alternate_phone: alternatePhone,
        address,
        landmark,
        city,
        state: stateName,
        country,
        pincode,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      alert("Failed to update profile ❌");
      return;
    }

    alert("Profile updated successfully ✅");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading Profile...
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-black text-white px-6 py-10">
    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div
        className="
          bg-white/5
          border
          border-green-500/30
          rounded-3xl
          p-8
          mb-6
          flex
          items-center
          gap-5
        "
      >
        <div
          className="
            w-20
            h-20
            rounded-full
            bg-green-500
            text-black
            flex
            items-center
            justify-center
            text-3xl
            font-bold
          "
        >
          {fullName?.charAt(0)?.toUpperCase() || "U"}
        </div>

        <div>
          <h1 className="text-3xl font-bold text-green-400">
            {fullName || "User"}
          </h1>

          <p className="text-gray-400">
            {email}
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <div
        className="
          bg-white/5
          border
          border-green-500/30
          rounded-3xl
          p-6
          mb-5
        "
      >
        <h2 className="text-2xl font-bold text-green-400 mb-5">
          👤 Personal Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Full Name
            </label>

            <input
              type="text"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-green-500/30
                rounded-xl
                p-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Email
            </label>

            <input
              type="email"
              value={email}
              disabled
              className="
                w-full
                bg-gray-900
                border
                border-green-500/30
                rounded-xl
                p-3
                opacity-70
              "
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div
        className="
          bg-white/5
          border
          border-green-500/30
          rounded-3xl
          p-6
          mb-5
        "
      >
        <h2 className="text-2xl font-bold text-green-400 mb-5">
          📞 Contact Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Phone Number
            </label>

            <input
              type="text"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-green-500/30
                rounded-xl
                p-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Alternate Phone
            </label>

            <input
              type="text"
              value={alternatePhone}
              onChange={(e) =>
                setAlternatePhone(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-green-500/30
                rounded-xl
                p-3
              "
            />
          </div>
        </div>
      </div>

      {/* Delivery Address */}
      <div
        className="
          bg-white/5
          border
          border-green-500/30
          rounded-3xl
          p-6
        "
      >
        <h2 className="text-2xl font-bold text-green-400 mb-5">
          📍 Delivery Address
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Address
            </label>

            <textarea
              rows={4}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-green-500/30
                rounded-xl
                p-3
              "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Landmark
            </label>

            <input
              type="text"
              value={landmark}
              onChange={(e) =>
                setLandmark(e.target.value)
              }
              className="
                w-full
                bg-black
                border
                border-green-500/30
                rounded-xl
                p-3
              "
            />
          </div>

    <div className="grid md:grid-cols-4 gap-4">
            <div>
  <label className="block mb-2 text-sm text-gray-400">
    Country
  </label>

  <select
    value={country}
    onChange={(e) => setCountry(e.target.value)}
    className="
      w-full
      bg-black
      border
      border-green-500/30
      rounded-xl
      p-3
    "
  >
    <option value="India">India</option>
    <option value="United States">United States</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="Canada">Canada</option>
    <option value="Australia">Australia</option>
    <option value="Singapore">Singapore</option>
  </select>
</div>

<div>
  <label className="block mb-2 text-sm text-gray-400">
    Pincode
  </label>

  <input
    type="text"
    value={pincode}
    onChange={(e) => setPincode(e.target.value)}
    className="
      w-full
      bg-black
      border
      border-green-500/30
      rounded-xl
      p-3
    "
  />
</div>        
            <button
            onClick={saveProfile}
            className="
              w-full
              mt-4
              bg-green-500
              hover:bg-green-600
              text-black
              font-bold
              py-4
              rounded-xl 
              transition
            "
          >
            💾 Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
);
}
