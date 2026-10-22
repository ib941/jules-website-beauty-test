"use client";

import Image from "next/image";
import Link from "next/link";
import { Product, useStore } from "@/store/useStore";
import { Star, ShoppingCart, Check, Zap } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);
  const [justAdded, setJustAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const discountAmount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col justify-between rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 p-3 sm:p-4 transition-all duration-300 hover:shadow-xl hover:border-zinc-300 dark:hover:border-zinc-700">
      <Link href={`/products/${product.id}`} className="flex flex-col flex-1">
        {/* Image Container */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-950 mb-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
            {product.badge && (
              <span className="inline-flex items-center gap-1 bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-900 text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm">
                {product.isFlashDeal && <Zap size={11} className="text-yellow-400 fill-yellow-400" />}
                {product.badge}
              </span>
            )}
            {discountAmount > 0 && !product.badge?.includes("%") && (
              <span className="bg-rose-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                -{discountAmount}%
              </span>
            )}
          </div>

          {/* Low Stock Indicator */}
          {product.stockCount && product.stockCount <= 8 && (
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-amber-500/90 backdrop-blur-sm text-zinc-950 text-[10px] font-bold px-2 py-0.5 rounded-md text-center">
              Only {product.stockCount} units remaining
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1.5">
            <span className="capitalize font-medium">{product.category}</span>
            {product.rating && (
              <div className="flex items-center gap-1 text-amber-500 font-semibold">
                <Star size={13} className="fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-zinc-400 text-[11px]">({product.reviewsCount})</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-base sm:text-lg text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1 mb-1">
            {product.name}
          </h3>

          {/* Tagline / Subtitle */}
          {!compact && product.tagline && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-3">
              {product.tagline}
            </p>
          )}

          {/* Price & Action */}
          <div className="mt-auto pt-3 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-zinc-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium block">
                Free 2-Day Shipping
              </span>
            </div>

            <button
              onClick={handleQuickAdd}
              aria-label={`Add ${product.name} to cart`}
              className={`p-3 rounded-2xl transition-all duration-200 flex items-center justify-center shrink-0 ${
                justAdded
                  ? "bg-emerald-600 text-white scale-105"
                  : "bg-zinc-100 hover:bg-zinc-900 text-zinc-900 hover:text-white dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-white dark:hover:text-zinc-900"
              }`}
            >
              {justAdded ? <Check size={18} /> : <ShoppingCart size={18} />}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
