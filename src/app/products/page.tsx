import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { Suspense } from "react";

function ProductsList({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  const category = searchParams?.category as string | undefined;

  const filteredProducts = category
    ? products.filter(p => p.category === category)
    : products;

  return (
    <>
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4">
          {category ? `${category.toString().charAt(0).toUpperCase() + category.toString().slice(1)}` : "All Products"}
        </h1>
        <div className="flex gap-2">
          <Link
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium ${!category ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'}`}
          >
            All
          </Link>
          <Link
            href="/products?category=laptops"
            className={`px-4 py-2 rounded-full text-sm font-medium ${category === 'laptops' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'}`}
          >
            Laptops
          </Link>
          <Link
            href="/products?category=accessories"
            className={`px-4 py-2 rounded-full text-sm font-medium ${category === 'accessories' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'}`}
          >
            Accessories
          </Link>
           <Link
            href="/products?category=smartphones"
            className={`px-4 py-2 rounded-full text-sm font-medium ${category === 'smartphones' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'}`}
          >
            Smartphones
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="group flex flex-col gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div>
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-base">{product.name}</h3>
                <span className="font-medium text-sm">${product.price}</span>
              </div>
              <p className="text-sm text-zinc-500 line-clamp-2">{product.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          No products found in this category.
        </div>
      )}
    </>
  );
}

export default async function ProductsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;

  return (
    <div className="py-8">
      <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
        <ProductsList searchParams={searchParams || {}} />
      </Suspense>
    </div>
  );
}
