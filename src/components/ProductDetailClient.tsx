"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/store/useStore";
import AddToCartButton from "./AddToCartButton";
import { Star, ShieldCheck, Truck, RotateCcw, Headphones, Minus, Plus, Zap, Check } from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colors && product.colors.length > 0 ? product.colors[0].name : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"features" | "specs" | "warranty">("features");

  const discountAmount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
      {/* Product Image Column */}
      <div className="lg:col-span-6 flex flex-col gap-4">
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Badge */}
          {product.badge && (
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1 bg-zinc-900/90 dark:bg-white/95 text-white dark:text-zinc-900 text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-md">
                {product.isFlashDeal && <Zap size={13} className="text-yellow-400 fill-yellow-400" />}
                {product.badge}
              </span>
            </div>
          )}
        </div>

        {/* Small Trust Micro-strip */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center">
          <div className="flex flex-col items-center">
            <Truck size={18} className="text-blue-500 mb-1" />
            <span className="text-xs font-semibold">Free Express Shipping</span>
            <span className="text-[10px] text-zinc-500">Delivered in 2 business days</span>
          </div>
          <div className="flex flex-col items-center border-x border-zinc-200 dark:border-zinc-800 px-2">
            <ShieldCheck size={18} className="text-blue-500 mb-1" />
            <span className="text-xs font-semibold">2-Year Warranty</span>
            <span className="text-[10px] text-zinc-500">Full hardware replacement</span>
          </div>
          <div className="flex flex-col items-center">
            <RotateCcw size={18} className="text-blue-500 mb-1" />
            <span className="text-xs font-semibold">30-Day Returns</span>
            <span className="text-[10px] text-zinc-500">100% money back guarantee</span>
          </div>
        </div>
      </div>

      {/* Product Info Column */}
      <div className="lg:col-span-6 flex flex-col justify-start">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-4 mb-3">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 px-3 py-1 rounded-full">
            {product.category}
          </span>
          {product.rating && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} className="fill-amber-400" />
                ))}
              </div>
              <span className="font-bold">{product.rating}</span>
              <span className="text-zinc-400">({product.reviewsCount} verified reviews)</span>
            </div>
          )}
        </div>

        {/* Title & Tagline */}
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
          {product.name}
        </h1>
        {product.tagline && (
          <p className="text-base text-zinc-500 dark:text-zinc-400 mb-4 font-medium">
            {product.tagline}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-3 mb-6 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <div className="flex items-center gap-2">
              <span className="text-lg text-zinc-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
              <span className="bg-rose-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                Save ${(product.originalPrice - product.price).toFixed(2)} ({discountAmount}%)
              </span>
            </div>
          )}
        </div>

        {/* Colorway Selection */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-semibold mb-3">
              <span>Finish: <strong className="text-zinc-900 dark:text-white">{selectedColor}</strong></span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? "border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 text-zinc-900 dark:text-white ring-2 ring-blue-600/20"
                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shadow-sm shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span>{color.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Quantity Selector & Add To Cart Button */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-zinc-200 dark:border-zinc-800 rounded-full px-2 py-1 bg-zinc-50 dark:bg-zinc-900">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-300"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-bold text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors text-zinc-600 dark:text-zinc-300"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="text-xs text-zinc-500">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              In Stock: Ships tomorrow from central distribution hub
            </div>
          </div>

          <AddToCartButton product={product} quantity={quantity} />
        </div>

        {/* Tabbed Info Section */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <div className="flex gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-3 mb-4 text-sm font-semibold">
            <button
              onClick={() => setActiveTab("features")}
              className={`pb-1 transition-colors ${
                activeTab === "features"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Key Features
            </button>
            {product.specs && (
              <button
                onClick={() => setActiveTab("specs")}
                className={`pb-1 transition-colors ${
                  activeTab === "specs"
                    ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Technical Specs
              </button>
            )}
            <button
              onClick={() => setActiveTab("warranty")}
              className={`pb-1 transition-colors ${
                activeTab === "warranty"
                  ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                  : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Warranty &amp; Care
            </button>
          </div>

          {activeTab === "features" && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>
              <ul className="space-y-2.5">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                    <div className="p-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mt-0.5">
                      <Check size={12} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "specs" && product.specs && (
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800 text-xs sm:text-sm">
              {Object.entries(product.specs).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3 bg-zinc-50/50 dark:bg-zinc-900/30">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">{key}</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "warranty" && (
            <div className="space-y-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Every hardware device purchased directly through Tech Haven includes our full <strong>2-Year Tech Haven Care Warranty</strong> covering manufacturing defects, battery degradation below 80%, and internal component failure.
              </p>
              <p>
                <strong>30-Day Risk-Free Returns:</strong> If you are not completely satisfied with your setup, return it within 30 days for a complete refund without any restocking penalties.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
