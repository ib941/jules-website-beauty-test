"use client";

import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function CheckoutPage() {
  const { cart, clearCart } = useStore();
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart();
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Order Confirmed!</h1>
        <p className="text-lg text-zinc-500 mb-8">
          Thank you for shopping at Tech Haven Demo. This was a simulated checkout, so no real transaction occurred and nothing will be shipped.
        </p>
        <Link
          href="/"
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty</h1>
        <Link href="/products" className="text-blue-600 hover:underline">
          Go back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-8">
        <Link href="/cart" className="hover:text-zinc-900 dark:hover:text-white">Cart</Link>
        <ChevronRight size={16} />
        <span className="font-medium text-zinc-900 dark:text-white">Checkout</span>
      </div>

      <h1 className="text-3xl font-bold tracking-tight mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Fake Form */}
        <div>
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
          <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input required type="email" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="123 Tech Street" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">City</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="San Francisco" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">ZIP Code</label>
                <input required type="text" className="w-full px-4 py-2.5 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-black dark:focus:ring-white outline-none" placeholder="94105" />
              </div>
            </div>

            <hr className="border-zinc-200 dark:border-zinc-800 my-8" />

            <h2 className="text-xl font-semibold mb-6">Payment (Demo)</h2>
            <div className="bg-blue-50 dark:bg-blue-950/30 text-blue-800 dark:text-blue-300 p-4 rounded-lg text-sm mb-6">
              This is a demo store. No real payment details are required or stored. Click "Place Order"quot;Place Order"Place Order"quot;quot;Place Order"Place Order"quot;Place Order"Place Order"quot;quot; to simulate the process.
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-8 rounded-full font-bold bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : `Place Order • $${total.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">In your cart</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                       <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-zinc-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr className="border-zinc-200 dark:border-zinc-800 my-6" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-zinc-200 dark:border-zinc-800">
                <span className="font-semibold text-base">Total</span>
                <span className="font-bold text-xl">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
