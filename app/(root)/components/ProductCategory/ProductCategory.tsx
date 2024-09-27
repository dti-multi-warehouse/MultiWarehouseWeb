"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "../../../../components/ProductCard";
import useFeaturedProducts from "@/hooks/useFeaturedProducts";
import { BiDrink } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { GiShop, GiInnerSelf, GiMeat } from "react-icons/gi";

const iconMap: { [key: string]: JSX.Element } = {
  BiDrink: <BiDrink />,
  IoFastFood: <IoFastFood />,
  FaKitchenSet: <FaKitchenSet />,
  MdOutlinePets: <MdOutlinePets />,
  GiShop: <GiShop />,
  GiInnerSelf: <GiInnerSelf />,
  GiMeat: <GiMeat />,
};

interface ProductCategoryProps {
  categoriesToShow?: string[];
}

const ProductCategory: React.FC<ProductCategoryProps> = ({ categoriesToShow }) => {
  const params = useSearchParams();
  const { data, isLoading, error } = useFeaturedProducts();

  return (
    <div className="flex flex-col gap-[60px] h-full">
      {data?.featuredProducts.map((featured, index) => (
        <div key={index} className={` ${index > 2 ? " hidden" : "flex"} flex-col gap-5 h-full`}>
          <div className="flex items-center gap-2 text-xl font-semibold">
            <h1>{featured.group_key}</h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
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
