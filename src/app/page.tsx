import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-zinc-900 dark:bg-zinc-800 text-white min-h-[500px] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
            alt="Hero background"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>
        <div className="relative z-10 p-8 md:p-16 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            The Future of Tech is Here
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 mb-8">
            Discover the latest and greatest in technology. Upgrade your setup with our premium selection of laptops, accessories, and more.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-zinc-200 transition-colors"
          >
            Shop Now <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Products</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Our most popular tech essentials</p>
          </div>
          <Link href="/products" className="hidden sm:flex items-center gap-1 text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
            View all <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col gap-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <span className="font-medium">${product.price}</span>
                </div>
                <p className="text-sm text-zinc-500 line-clamp-2">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
