"use client";

export default function TopBar() {
  return (
    <div className="bg-[#14532D] text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">

        {/* Left Side */}
        <div className="flex items-center gap-6">
          <span>📸 Instagram</span>
          <span>📘 Facebook</span>
          <span>📞 WhatsApp</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          <span>🚚 Fresh Delivery</span>
          <span>📱 App Coming Soon</span>
        </div>

      </div>
    </div>
  );
}
