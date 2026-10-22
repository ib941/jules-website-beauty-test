import Link from "next/link";
import { Cpu, ShieldCheck, Truck, Headphones, Globe, MessageSquare, Share2, Radio } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 text-sm mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2 font-black text-2xl tracking-tight text-zinc-900 dark:text-white">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md">
                <Cpu size={20} />
              </div>
              Tech Haven
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-sm leading-relaxed">
              Curating high-performance computing, spatial audio, and next-generation smart hardware for engineers, creators, and discerning enthusiasts worldwide.
            </p>
            <div className="flex items-center gap-3 pt-2 text-zinc-500">
              <a href="#" className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label="Global Community">
                <Globe size={18} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label="Developer Forums">
                <MessageSquare size={18} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label="Live Broadcasts">
                <Radio size={18} />
              </a>
              <a href="#" className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors" aria-label="Social Share">
                <Share2 size={18} />
              </a>
            </div>
          </div>

          {/* Department Links */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm tracking-wide mb-4 uppercase">
              Departments
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/products?category=laptops" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Laptops &amp; PCs
                </Link>
              </li>
              <li>
                <Link href="/products?category=smartphones" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Smartphones &amp; Tablets
                </Link>
              </li>
              <li>
                <Link href="/products?category=audio" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Audio &amp; Sound
                </Link>
              </li>
              <li>
                <Link href="/products?category=wearables" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Wearables &amp; VR
                </Link>
              </li>
              <li>
                <Link href="/products?category=gaming" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Gaming Gear
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Peripherals &amp; Docks
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm tracking-wide mb-4 uppercase">
              Support &amp; Care
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link href="/cart" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  2-Year Warranty Portal
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  30-Day Hassle-Free Returns
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  Official Trade-In Program
                </span>
              </li>
              <li>
                <span className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer">
                  Device Firmware Updates
                </span>
              </li>
            </ul>
          </div>

          {/* Guarantees */}
          <div>
            <h4 className="font-semibold text-zinc-900 dark:text-white text-sm tracking-wide mb-4 uppercase">
              Tech Haven Promise
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-blue-500 shrink-0" />
                <span>Free 2-Day Air on orders $99+</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-500 shrink-0" />
                <span>2-Year Comprehensive Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones size={16} className="text-blue-500 shrink-0" />
                <span>24/7 Expert Hardware Concierge</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Tech Haven Demo Store. Engineered with Next.js &amp; Tailwind CSS.</p>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">Simulated E-Commerce Demo</span>
            <span>•</span>
            <Link href="/products" className="hover:underline">Catalog</Link>
            <span>•</span>
            <Link href="/cart" className="hover:underline">Cart</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
