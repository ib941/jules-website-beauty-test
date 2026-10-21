"use client";

import { useStore } from "@/store/useStore";
import { Product } from "@/store/useStore";
import { ShoppingCart, Check } from "lucide-react";
import { useState } from "react";

export default function AddToCartButton({ product }: { product: Product }) {
  const addToCart = useStore((state) => state.addToCart);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`w-full py-4 px-8 rounded-full font-semibold flex items-center justify-center gap-2 transition-all ${
        added
          ? "bg-green-500 text-white"
          : "bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200"
      }`}
    >
      {added ? (
        <>
          <Check size={20} /> Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart size={20} /> Add to Cart
        </>
      )}
    </button>
  );
}
