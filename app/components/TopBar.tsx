"use client";

export default function TopBar() {
  return (
    <div className="bg-[#14532D] text-white text-sm">
      <div className="w-full px-8 h-10 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <span>Instagram</span>
          <span>Facebook</span>
          <span>WhatsApp</span>
        </div>

        <div className="flex items-center gap-6">
          <span>🚚 Fresh Delivery</span>
          <span>📱 App Coming Soon</span>
        </div>

      </div>
    </div>
  );
}
