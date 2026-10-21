"use client";

import { useStore } from "@/store/useStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08; // 8% dummy tax
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-zinc-500 mb-8 max-w-md">
          Looks like you haven&apos;t added anything to your cart yet. Browse our products and find something you love.
        </p>
        <Link
          href="/products"
          className="bg-black text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <div key={item.product.id} className="flex gap-6 py-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0">
              <Link href={`/products/${item.product.id}`} className="shrink-0 relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={item.product.image}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                />
              </Link>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <Link href={`/products/${item.product.id}`} className="font-semibold text-lg hover:underline">
                    {item.product.name}
                  </Link>
                  <span className="font-medium whitespace-nowrap ml-4">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-zinc-500 mb-4">{item.product.category}</p>

                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-3 bg-zinc-100 dark:bg-zinc-900 rounded-full px-3 py-1">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:text-black dark:hover:text-white transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-4 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:text-black dark:hover:text-white transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-red-500 hover:text-red-600 p-2 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="bg-zinc-50 dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Estimated Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
            </div>
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mb-8">
              <div className="flex justify-between items-end">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-black text-white dark:bg-white dark:text-black py-4 px-8 rounded-full font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Proceed to Checkout <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
