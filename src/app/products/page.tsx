import { products } from "@/data/products";
import ProductsCatalog from "@/components/ProductsCatalog";
import { Suspense } from "react";

export const metadata = {
  title: "Products & Tech Hardware | Tech Haven",
  description: "Browse our complete catalog of premium laptops, smartphones, spatial audio, and peripherals.",
};

export default async function ProductsPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = (await props.searchParams) || {};
  const categoryParam = typeof searchParams.category === "string" ? searchParams.category : "all";
  const searchParam = typeof searchParams.search === "string" ? searchParams.search : "";

  return (
    <div className="py-4">
      <Suspense fallback={<div className="py-20 text-center font-medium">Loading hardware catalog...</div>}>
        <ProductsCatalog
          initialProducts={products}
          initialCategory={categoryParam}
          initialSearch={searchParam}
        />
      </Suspense>
    </div>
  );
}
