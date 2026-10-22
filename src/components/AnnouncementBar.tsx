"use client";

import { useState, useEffect } from "react";
import { Sparkles, ChevronRight, X, ArrowRight } from "lucide-react";
import Link from "next/link";

const announcements = [
  {
    tag: "SPRING FLASH SALE",
    text: "Up to 35% OFF flagship laptops & spatial audio gear with code",
    code: "TECH2025",
    link: "/products",
  },
  {
    tag: "FREE EXPRESS SHIPPING",
    text: "Complimentary 2-day delivery on all orders over $99 this week",
    code: "",
    link: "/products",
  },
  {
    tag: "TRADE-IN BONUS",
    text: "Get up to $500 instant store credit when trading in your old device",
    code: "TRADEIN",
    link: "/products",
  },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (!visible) return null;

  const current = announcements[index];

  return (
    <aside
      aria-label="Promotional announcements"
      className="bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white text-xs sm:text-sm font-medium py-2 px-4 transition-all duration-300 relative z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center truncate">
          <span className="hidden sm:inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide uppercase">
            <Sparkles size={12} className="text-yellow-300" /> {current.tag}
          </span>
          <span className="truncate">{current.text}</span>
          {current.code && (
            <span className="bg-yellow-400 text-black px-1.5 py-0.5 rounded text-[11px] font-bold tracking-wider">
              {current.code}
            </span>
          )}
          <Link
            href={current.link}
            className="hidden md:inline-flex items-center gap-0.5 underline font-semibold hover:text-yellow-200 transition-colors ml-1"
          >
            Shop Deals <ChevronRight size={14} />
          </Link>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors ml-2"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
      </div>
    </aside>
  );
}
