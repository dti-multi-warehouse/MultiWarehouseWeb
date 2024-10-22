"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../../../components/ProductCard";
import { useFeaturedProducts } from "@/hooks/useProducts";
import ProductCategorySkeleton from "./ProductCategorySkeleton";

const ProductCategory: React.FC = () => {
  const params = useSearchParams();
  const { data, isLoading, error } = useFeaturedProducts();

  if (isLoading) {
    return <ProductCategorySkeleton />;
  }

  if (error) {
    return <div className="text-xl font-semibold text-gray-700">There is no product to show.</div>;
  }

  return (
    <div className="flex flex-col gap-[60px] h-full">
      {data?.featuredProducts.map((featured, index) => (
        <div key={index} className={` ${index > 2 ? " hidden" : "flex"} flex-col gap-5 h-full`}>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <h1>{featured.group_key}</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {featured.hits.map((product, productIndex) => (
              <ProductCard
                key={productIndex}
                id={product.document.id} 
                thumbnail={product.document.thumbnail}
                name={product.document.name}
                price={product.document.price}
                stock={product.document.stock}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCategory;
