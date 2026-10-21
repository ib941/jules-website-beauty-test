"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export default function CartButton() {
  const cartItems = useStore((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalItems = mounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  return (
    <Link href="/cart" className="relative p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
      <ShoppingCart size={20} />
      {totalItems > 0 && (
        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
          {totalItems}
        </span>
      )}
    </Link>
  );
}
