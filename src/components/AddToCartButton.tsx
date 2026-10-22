"use client";

import { useStore } from "@/store/useStore";
import { Product } from "@/store/useStore";
import { ShoppingCart, Check, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function AddToCartButton({
  product,
  quantity = 1,
}: {
  product: Product;
  quantity?: number;
}) {
  const addToCart = useStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleAdd}
        className={`flex-1 py-4 px-8 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] ${
          added
            ? "bg-emerald-600 text-white"
            : "bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
        }`}
      >
        {added ? (
          <>
            <Check size={20} /> Added {quantity > 1 ? `(${quantity})` : ""} to Cart!
          </>
        ) : (
          <>
            <ShoppingCart size={20} /> Add to Cart • ${(product.price * quantity).toFixed(2)}
          </>
        )}
      </button>

      {added && (
        <Link
          href="/cart"
          className="inline-flex items-center justify-center gap-1.5 py-4 px-6 rounded-full font-semibold text-sm bg-blue-600 hover:bg-blue-500 text-white transition-all animate-in fade-in zoom-in-95 duration-200"
        >
          View Cart <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
