import Image from "next/image";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import AddToCartButton from "@/components/AddToCartButton";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Truck, RotateCcw } from "lucide-react";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="py-8">
      <Link href="/products" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white mb-8 transition-colors">
        <ArrowLeft size={16} /> Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Product Image */}
        <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <div className="mb-2">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-4">{product.name}</h1>
          <p className="text-2xl font-medium mb-6">${product.price}</p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-10">
            <h3 className="font-semibold mb-4 text-lg">Key Features</h3>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-zinc-700 dark:text-zinc-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-auto">
            <AddToCartButton product={product} />

            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex flex-col items-center text-center gap-2 text-zinc-500">
                <Truck size={24} className="text-zinc-400" />
                <span className="text-xs">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-zinc-500">
                <ShieldCheck size={24} className="text-zinc-400" />
                <span className="text-xs">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-zinc-500">
                <RotateCcw size={24} className="text-zinc-400" />
                <span className="text-xs">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
