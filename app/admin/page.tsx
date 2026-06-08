
"use client";

import { useState } from "react";

export default function AdminPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (
      username === process.env.NEXT_PUBLIC_ADMIN_USERNAME &&
      password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD
    ) {
      setLoggedIn(true);
    } else {
      alert("Invalid Username or Password");
    }
  };

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-white/5 border border-green-500/20 rounded-3xl p-8 w-full max-w-md">

          <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
            Admin Login
          </h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-black border border-green-500 rounded-xl px-4 py-3 mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-black border border-green-500 rounded-xl px-4 py-3 mb-6"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded-xl"
          >
            Login
          </button>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold text-green-400">
        Verde Admin Dashboard
      </h1>

      <p className="mt-4 text-gray-400">
        Login successful 🎉
      </p>
    </main>
  );
}
