import { notFound } from "next/navigation";
import { products } from "@/data/products";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import ProductDetailClient from "@/components/ProductDetailClient";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return { title: "Product Not Found | Tech Haven" };
  }

  return {
    title: `${product.name} | Tech Haven`,
    description: product.description,
  };
}

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

  // Related products from same category, excluding current product
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // If not enough in same category, top up with other featured products
  const displayRelated = relatedProducts.length >= 2
    ? relatedProducts
    : [
        ...relatedProducts,
        ...products.filter((p) => p.id !== product.id && !relatedProducts.includes(p)).slice(0, 4 - relatedProducts.length),
      ];

  return (
    <div className="py-4">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-zinc-500 mb-8 overflow-x-auto whitespace-nowrap">
        <Link href="/" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
          Home
        </Link>
        <ChevronRight size={14} className="shrink-0" />
        <Link href="/products" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
          Catalog
        </Link>
        <ChevronRight size={14} className="shrink-0" />
        <Link
          href={`/products?category=${product.category}`}
          className="hover:text-zinc-900 dark:hover:text-white transition-colors capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight size={14} className="shrink-0" />
        <span className="font-semibold text-zinc-900 dark:text-white truncate max-w-xs">
          {product.name}
        </span>
      </nav>

      {/* Main Product Details */}
      <ProductDetailClient product={product} />

      {/* Related Hardware Section */}
      {displayRelated.length > 0 && (
        <section className="mt-20 pt-16 border-t border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                You Might Also Like
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                Frequently Paired Hardware
              </h2>
            </div>
            <Link
              href="/products"
              className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Browse complete catalog
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayRelated.map((related) => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
