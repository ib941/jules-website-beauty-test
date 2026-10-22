"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search, Cpu, Menu, X, ArrowRight } from "lucide-react";
import CartButton from "./CartButton";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { products } from "@/data/products";
import Image from "next/image";

export default function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const searchResults = searchQuery.trim() === ""
    ? []
    : products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearchOpen(false);
    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 gap-4">
          {/* Logo & Mobile Menu Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <Link href="/" className="flex items-center gap-2.5 font-black text-xl tracking-tight text-zinc-900 dark:text-white">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Cpu size={18} />
              </div>
              <span className="bg-gradient-to-r from-zinc-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent">
                Tech Haven
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <Link
              href="/products"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              All Catalog
            </Link>
            <Link
              href="/products?category=laptops"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Laptops &amp; PCs
            </Link>
            <Link
              href="/products?category=smartphones"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Smartphones
            </Link>
            <Link
              href="/products?category=audio"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Audio
            </Link>
            <Link
              href="/products?category=wearables"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Wearables &amp; VR
            </Link>
            <Link
              href="/products?category=gaming"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Gaming
            </Link>
            <Link
              href="/products?category=accessories"
              className="px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors"
            >
              Peripherals
            </Link>
          </nav>

          {/* Right Action Icons: Search + Theme + Cart */}
          <div className="flex items-center gap-3">
            {/* Live Autocomplete Search Bar */}
            <div ref={searchRef} className="relative">
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search laptops, headphones, VR..."
                  className="pl-9 pr-4 py-1.5 rounded-full text-xs sm:text-sm bg-zinc-100 dark:bg-zinc-900 border border-transparent focus:border-blue-500 dark:focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-950 outline-none w-36 sm:w-60 md:w-72 transition-all"
                />
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
              </form>

              {/* Autocomplete Dropdown */}
              {isSearchOpen && searchQuery.trim() !== "" && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-96 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-2 z-50 overflow-hidden">
                  <div className="px-3 py-2 text-[11px] font-semibold text-zinc-400 uppercase tracking-wider flex justify-between items-center">
                    <span>Products ({searchResults.length})</span>
                    <button
                      onClick={() => setIsSearchOpen(false)}
                      className="text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
                    >
                      Close
                    </button>
                  </div>

                  {searchResults.length > 0 ? (
                    <div className="space-y-1">
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/products/${product.id}`}
                          onClick={() => {
                            setIsSearchOpen(false);
                            setSearchQuery("");
                          }}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                          <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-zinc-100 shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold truncate text-zinc-900 dark:text-white">
                              {product.name}
                            </h4>
                            <p className="text-[11px] text-zinc-400 capitalize">{product.category}</p>
                          </div>
                          <span className="text-xs font-bold text-zinc-900 dark:text-white shrink-0">
                            ${product.price.toFixed(2)}
                          </span>
                        </Link>
                      ))}

                      <button
                        onClick={handleSearchSubmit}
                        className="w-full mt-2 p-2 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 text-xs font-semibold flex items-center justify-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-950/70 transition-colors"
                      >
                        View all results for &quot;{searchQuery}&quot; <ArrowRight size={13} />
                      </button>
                    </div>
                  ) : (
                    <div className="py-6 text-center text-xs text-zinc-500">
                      No tech hardware found matching &quot;{searchQuery}&quot;.
                    </div>
                  )}
                </div>
              )}
            </div>

            <ThemeToggle />
            <CartButton />
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-4 space-y-1">
          <Link
            href="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            All Products (20)
          </Link>
          <Link
            href="/products?category=laptops"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Laptops &amp; Workstations
          </Link>
          <Link
            href="/products?category=smartphones"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Smartphones &amp; Foldables
          </Link>
          <Link
            href="/products?category=audio"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Audio &amp; Headphones
          </Link>
          <Link
            href="/products?category=wearables"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Wearables &amp; Spatial VR
          </Link>
          <Link
            href="/products?category=gaming"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Gaming Consoles &amp; Gear
          </Link>
          <Link
            href="/products?category=accessories"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            Peripherals &amp; Docks
          </Link>
        </div>
      )}
    </header>
  );
}
