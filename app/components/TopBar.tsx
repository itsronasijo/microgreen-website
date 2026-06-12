"use client";

export default function TopBar() {
  return (
   <div className="sticky top-0 z-50 bg-[#14532D] text-white">
      <div className="px-8 py-2 flex justify-between items-center text-sm">

        <div className="flex gap-6">
          <span>📷 Instagram</span>
          <span>📘 Facebook</span>
          <span>🟢 WhatsApp</span>
        </div>

        <div className="flex gap-6">
          <span>🚚 Fresh Delivery</span>
          <span>📱 App Coming Soon</span>
        </div>

      </div>
    </div>
  );
}
