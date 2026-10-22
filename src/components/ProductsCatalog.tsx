"use client";

import { useState, useMemo } from "react";
import { Product } from "@/store/useStore";
import ProductCard from "./ProductCard";
import { Search, SlidersHorizontal, X, ArrowUpDown, Sparkles } from "lucide-react";
import Link from "next/link";

interface CategoryMeta {
  id: string;
  name: string;
}

const categoriesList: CategoryMeta[] = [
  { id: "all", name: "All Products" },
  { id: "laptops", name: "Laptops & PCs" },
  { id: "smartphones", name: "Smartphones & Tablets" },
  { id: "audio", name: "Audio & Sound" },
  { id: "wearables", name: "Wearables & VR" },
  { id: "gaming", name: "Gaming Gear" },
  { id: "accessories", name: "Peripherals & Docks" },
];

interface ProductsCatalogProps {
  initialProducts: Product[];
  initialCategory?: string;
  initialSearch?: string;
}

export default function ProductsCatalog({
  initialProducts,
  initialCategory = "all",
  initialSearch = "",
}: ProductsCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || "all");
  const [searchTerm, setSearchTerm] = useState<string>(initialSearch || "");
  const [sortBy, setSortBy] = useState<string>("featured");

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: initialProducts.length };
    categoriesList.forEach((c) => {
      if (c.id !== "all") {
        counts[c.id] = initialProducts.filter((p) => p.category === c.id).length;
      }
    });
    return counts;
  }, [initialProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...initialProducts];

    // Filter by Category
    if (selectedCategory && selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.features.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "discount":
        result.sort((a, b) => {
          const discountA = a.originalPrice ? (a.originalPrice - a.price) : 0;
          const discountB = b.originalPrice ? (b.originalPrice - b.price) : 0;
          return discountB - discountA;
        });
        break;
      case "featured":
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [initialProducts, selectedCategory, searchTerm, sortBy]);

  return (
    <div>
      {/* Top Banner on Catalog */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zinc-900 via-indigo-950 to-blue-950 text-white p-8 sm:p-12 mb-10 border border-zinc-800 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles size={14} /> Official Tech Catalog
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Flagship Hardware Collection
          </h1>
          <p className="text-sm sm:text-base text-zinc-300">
            Explore 20 meticulously engineered computing devices, audio monitors, VR headsets, and precision desktop peripherals.
          </p>
        </div>
      </div>

      {/* Control Bar: Categories + Search + Sort */}
      <div className="flex flex-col gap-6 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categoriesList.map((cat) => {
            const isActive = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-md scale-[1.02]"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? "bg-white/25 text-white dark:bg-black/20 dark:text-black font-bold"
                      : "bg-zinc-200 dark:bg-zinc-700 text-zinc-500 dark:text-zinc-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Sort Filters */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, spec, or feature..."
              className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
              <ArrowUpDown size={15} />
              <span>Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="py-2 px-3 text-xs sm:text-sm rounded-xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Customer Rating</option>
              <option value="discount">Biggest Discount</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Indicator */}
      {(searchTerm || selectedCategory !== "all") && (
        <div className="flex items-center justify-between mb-6 text-xs text-zinc-500 dark:text-zinc-400">
          <span>
            Showing <strong className="text-zinc-900 dark:text-white">{filteredAndSortedProducts.length}</strong> matching products
            {selectedCategory !== "all" && ` in ${categoriesList.find(c => c.id === selectedCategory)?.name}`}
            {searchTerm && ` for "${searchTerm}"`}
          </span>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
            }}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-dashed border-zinc-300 dark:border-zinc-800">
          <div className="w-16 h-16 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-400">
            <Search size={28} />
          </div>
          <h3 className="text-lg font-bold mb-2">No hardware matches found</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto mb-6">
            We couldn&apos;t find any products matching your current filters. Try searching for &quot;laptop&quot;, &quot;audio&quot;, or &quot;titanium&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchTerm("");
            }}
            className="px-6 py-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
