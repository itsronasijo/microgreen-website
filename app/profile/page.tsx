"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProfilePage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    setProfile(data);
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold text-green-400 mb-8">
        My Profile
      </h1>

      <div className="max-w-xl bg-white/5 border border-green-500/30 rounded-3xl p-6">
        <p><strong>Name:</strong> {profile.full_name}</p>
        <p className="mt-3"><strong>Email:</strong> {profile.email}</p>
        <p className="mt-3"><strong>Phone:</strong> {profile.phone}</p>
        <p className="mt-3"><strong>City:</strong> {profile.city}</p>
        <p className="mt-3"><strong>State:</strong> {profile.state}</p>
      </div>
    </div>
  );
}
