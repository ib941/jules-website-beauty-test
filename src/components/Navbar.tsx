import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";
import CartButton from "./CartButton";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-bold text-xl tracking-tight">
              Tech Haven
            </Link>
            <nav className="hidden md:flex gap-4">
              <Link href="/products" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                All Products
              </Link>
              <Link href="/products?category=laptops" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                Laptops
              </Link>
              <Link href="/products?category=accessories" className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors">
                Accessories
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-1.5 rounded-full text-sm bg-zinc-100 dark:bg-zinc-900 border-none focus:ring-2 focus:ring-zinc-300 dark:focus:ring-zinc-700 outline-none w-48 transition-all focus:w-64"
              />
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            </div>
            <ThemeToggle />
            <CartButton />
          </div>
        </div>
      </div>
    </header>
  );
}
