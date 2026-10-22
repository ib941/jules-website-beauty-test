"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight, ShieldCheck, Tag, Check, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { products } from "@/data/products";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [mounted, setMounted] = useState(false);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  // Calculate discount if promo applied
  let discount = 0;
  if (appliedPromo === "TECH2025") {
    discount = subtotal * 0.15; // 15% off
  } else if (appliedPromo === "WELCOME50") {
    discount = Math.min(50, subtotal);
  }

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const tax = discountedSubtotal * 0.08; // 8% dummy tax
  const total = discountedSubtotal + tax;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    if (code === "TECH2025" || code === "WELCOME50") {
      setAppliedPromo(code);
      setPromoInput("");
    } else {
      setPromoError("Invalid promo code. Try TECH2025 or WELCOME50");
    }
  };

  if (cart.length === 0) {
    const recommended = products.slice(0, 4);

    return (
      <div className="py-12 flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mb-6">
          <Sparkles size={36} />
        </div>
        <h1 className="text-3xl font-extrabold mb-3">Your Cart is Empty</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-md">
          Explore our new 2025 flagship catalog to find laptops, noise-canceling headphones, and creator monitors.
        </p>
        <Link
          href="/products"
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-3.5 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all mb-16 shadow-lg"
        >
          Explore All Products
        </Link>

        {/* Quick Picks for empty state */}
        <div className="w-full text-left pt-12 border-t border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-bold mb-6">Popular Right Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recommended.map((prod) => (
              <Link
                key={prod.id}
                href={`/products/${prod.id}`}
                className="group flex flex-col p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 mb-3">
                  <Image src={prod.image} alt={prod.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {prod.name}
                </h3>
                <span className="font-bold text-sm mt-1">${prod.price.toFixed(2)}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Shopping Cart</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} items in your cart
          </p>
        </div>
        <Link
          href="/products"
          className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          &larr; Continue Shopping
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 transition-all"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900"
              >
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </Link>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-bold text-base sm:text-lg hover:text-blue-600 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <span className="font-extrabold text-base sm:text-lg whitespace-nowrap">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-500 capitalize mb-2">
                    {item.product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full px-2 py-1 shadow-sm">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:text-black dark:hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:text-black dark:hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={15} />
                    <span className="hidden sm:inline">Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Column */}
        <div className="lg:col-span-4">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 sticky top-24 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>

            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="mb-6">
              <label className="block text-xs font-semibold text-zinc-500 mb-2">
                Promotional Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder="e.g. TECH2025"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-zinc-200 dark:bg-zinc-800 text-xs font-bold hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedPromo && (
                <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <Check size={14} />
                  <span>Promo code &quot;{appliedPromo}&quot; applied!</span>
                </div>
              )}
              {promoError && (
                <p className="text-xs text-rose-500 mt-2">{promoError}</p>
              )}
            </form>

            <div className="space-y-3 mb-6 text-sm border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Express Shipping</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">FREE</span>
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-bold text-base">Total</span>
                <span className="text-2xl font-black">${total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-4 px-8 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99]"
            >
              Proceed to Checkout <ArrowRight size={18} />
            </Link>

            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-zinc-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Simulated SSL 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
