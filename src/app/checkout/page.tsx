"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight, ShieldCheck, Lock, Truck, CreditCard } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    const simulatedOrderId = "TH-" + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(simulatedOrderId);

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="py-16 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 shadow-lg animate-in zoom-in-75">
          <CheckCircle2 size={44} />
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full mb-3">
          Order #{orderNumber} Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
          Thank You for Testing Tech Haven!
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg leading-relaxed">
          Your simulated demo order has been logged successfully. Because this is an online demo store showcase, no real financial charges were made and no hardware will be shipped.
        </p>

        <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-left w-full mb-8 space-y-2 text-xs sm:text-sm">
          <div className="flex justify-between">
            <span className="text-zinc-500">Order Reference:</span>
            <span className="font-mono font-bold">{orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Delivery Method:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">Express Air 2-Day (Free)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-zinc-500">Warranty Registration:</span>
            <span className="font-semibold">Automatic 2-Year Full Coverage</span>
          </div>
        </div>

        <Link
          href="/"
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-3.5 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all shadow-md"
        >
          Return to Storefront
        </Link>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is currently empty</h1>
        <p className="text-sm text-zinc-500 mb-6">Select items from our catalog to proceed with checkout.</p>
        <Link
          href="/products"
          className="inline-flex px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-sm hover:opacity-90"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-8">
        <Link href="/cart" className="hover:text-zinc-900 dark:hover:text-white">
          Cart
        </Link>
        <ChevronRight size={14} />
        <span className="font-semibold text-zinc-900 dark:text-white">Checkout</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">Express Checkout</h1>
        <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
          <Lock size={12} />
          <span>Encrypted Demo Session</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Checkout Form */}
        <div className="lg:col-span-7">
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <Truck size={18} className="text-blue-500" /> Shipping Destination
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">First Name</label>
                    <input
                      required
                      type="text"
                      defaultValue="Alex"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">Last Name</label>
                    <input
                      required
                      type="text"
                      defaultValue="Morgan"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Email Address</label>
                  <input
                    required
                    type="email"
                    defaultValue="alex.morgan@techdemo.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">Street Address</label>
                  <input
                    required
                    type="text"
                    defaultValue="450 Silicon Boulevard, Suite 800"
                    className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">City</label>
                    <input
                      required
                      type="text"
                      defaultValue="San Francisco"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1.5">Postal Code</label>
                    <input
                      required
                      type="text"
                      defaultValue="94107"
                      className="w-full px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment (Simulated Demo) */}
            <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800">
              <h2 className="text-base font-bold mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-500" /> Payment Method
              </h2>
              <div className="bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 p-4 rounded-2xl text-xs leading-relaxed mb-4 border border-blue-200/50 dark:border-blue-800/40">
                <span className="font-bold block mb-1">Demo Environment Notice:</span>
                This is an interactive demonstration store. No credit card details are collected or processed. Clicking &quot;Authorize &amp; Complete Demo Order&quot; simulates a full checkout lifecycle.
              </div>

              <div className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-950 text-xs">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="font-semibold">Instant Simulated One-Click Payment</span>
                <span className="ml-auto text-zinc-400">Zero charges</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-8 rounded-full font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-xl hover:scale-[1.01] active:scale-[0.99]"
            >
              {isProcessing ? "Processing Secure Order..." : `Authorize & Complete Demo Order • $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Review Sidebar */}
        <div className="lg:col-span-5">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 sticky top-24 border border-zinc-200 dark:border-zinc-800 shadow-xl">
            <h2 className="text-lg font-bold mb-4">Order Items ({cart.length})</h2>
            <div className="space-y-3 mb-6 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 shrink-0">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-semibold line-clamp-1">{item.product.name}</p>
                      <p className="text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-sm whitespace-nowrap ml-2">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm border-t border-zinc-200 dark:border-zinc-800 pt-4">
              <div className="flex justify-between text-zinc-500">
                <span>Subtotal</span>
                <span className="font-medium text-zinc-900 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Tax (8%)</span>
                <span className="font-medium text-zinc-900 dark:text-white">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-zinc-500">
                <span>Shipping</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">FREE</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <span className="font-bold text-base">Total Due</span>
                <span className="font-black text-xl text-zinc-900 dark:text-white">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center gap-2 text-xs text-zinc-400">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>Full 2-Year Hardware Coverage Activated</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
