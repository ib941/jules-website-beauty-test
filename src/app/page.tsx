import Link from "next/link";
import { products } from "@/data/products";
import { ArrowRight, Sparkles } from "lucide-react";
import HeroSection from "@/components/hero/HeroSection";
import HeroBanner from "@/components/HeroBanner";
import TrustBadges from "@/components/TrustBadges";
import CategoryGrid from "@/components/CategoryGrid";
import FlashDeals from "@/components/FlashDeals";
import PromoBanners from "@/components/PromoBanners";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import NewsletterBanner from "@/components/NewsletterBanner";

export default function Home() {
  const featuredProducts = products.filter((p) => p.isFeatured || p.badge?.includes("Best")).slice(0, 8);
  const trendingProducts = products.filter((p) => p.rating && p.rating >= 4.8).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-20 pb-16">
      {/* 1. 3D Procedural Interactive Laptop Hero Section */}
      <HeroSection />

      {/* 2. Highlights Carousel Banner */}
      <HeroBanner />

      {/* 3. Trust Badges & Guarantee Strip */}
      <TrustBadges />

      {/* 4. Hardware Category Grid */}
      <CategoryGrid />

      {/* 5. Live Flash Deals Banner with Countdown Timer */}
      <FlashDeals />

      {/* 6. Featured Flagships Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles size={14} /> Curated Hardware Selection
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Featured Flagships
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Engineered with zero compromises for creators, gamers, and software developers.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 transition-all"
          >
            Explore all 20 products <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. Promotional Bento Banners & Trade-In Section */}
      <PromoBanners />

      {/* 8. Trending Hardware Highlights */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Community Favorites
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Trending &amp; Top-Rated Hardware
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Consistently rated 4.8★ and above by verified hardware enthusiasts.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-purple-600 dark:text-purple-400 hover:gap-2 transition-all"
          >
            View Top Picks <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 9. Customer Testimonials & Reviews */}
      <Testimonials />

      {/* 10. VIP Newsletter Sign-Up Banner with instant voucher code */}
      <NewsletterBanner />
    </div>
  );
}
