"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { Flame, Clock, ArrowRight } from "lucide-react";

export default function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 7,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 8, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.filter((p) => p.isFlashDeal).slice(0, 4);

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-rose-500/10 via-amber-500/5 to-transparent border border-rose-500/20 dark:border-rose-500/30">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-rose-500/15 text-rose-600 dark:text-rose-400 px-3 py-1 rounded-full text-xs font-bold tracking-wide mb-2 uppercase">
            <Flame size={14} className="fill-rose-500" /> Limited Time Flash Sale
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Deals of the Day
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Top tier hardware at steep discounts. Stock is strictly limited per customer.
          </p>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-4 py-2.5 rounded-2xl shadow-sm">
          <Clock size={18} className="text-rose-500 animate-pulse" />
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">Ends in:</span>
          <div className="flex items-center gap-1 font-mono font-bold text-sm text-zinc-900 dark:text-white">
            <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
              {String(timeLeft.hours).padStart(2, "0")}h
            </span>
            <span>:</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
              {String(timeLeft.minutes).padStart(2, "0")}m
            </span>
            <span>:</span>
            <span className="bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded text-rose-600 dark:text-rose-400">
              {String(timeLeft.seconds).padStart(2, "0")}s
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Flash Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {flashProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
        >
          View all 20 hardware deals <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
