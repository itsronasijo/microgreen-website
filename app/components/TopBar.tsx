"use client";

export default function TopBar() {
  return (
   <div className="bg-[#14532D] text-white text-sm">
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        
        {/* Left */}
        <div className="flex items-center gap-4">
          <span>📱 Download App</span>
          <span>🚚 Fresh Home Delivery</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4 text-lg">
          <a href="#" className="hover:text-green-300">
            📸
          </a>

          <a href="#" className="hover:text-green-300">
            📘
          </a>

          <a href="#" className="hover:text-green-300">
            💬
          </a>
        </div>

      </div>
    </div>
  );
}
