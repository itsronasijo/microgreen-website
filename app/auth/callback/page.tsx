"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleAuth = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("User:", user);

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("profile_completed")
        .eq("id", user.id)
        .single();

      console.log("Profile:", profile);
      console.log("Error:", error);

      if (!profile || !profile.profile_completed) {
        router.push("/complete-profile");
      } else {
        router.push("/");
      }
    };

    handleAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Signing you in...</p>
    </div>
  );
}
