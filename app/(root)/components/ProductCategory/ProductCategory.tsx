"use client";

import React from "react";
import { productCategory } from "@/data/data";
import { useSearchParams } from "next/navigation";
import { BiDrink } from "react-icons/bi";
import { IoFastFood } from "react-icons/io5";
import { FaKitchenSet } from "react-icons/fa6";
import { MdOutlinePets } from "react-icons/md";
import { GiShop } from "react-icons/gi";
import { GiInnerSelf } from "react-icons/gi";
import { GiMeat } from "react-icons/gi";
import ProductList from "./ProductList";

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

  return (
    <div className="flex flex-col gap-[60px] h-full">
      {productCategory
        .filter(item => !categoriesToShow || categoriesToShow.includes(item.name))
        .map((item, index) => (
          <div key={index} className={` ${index > 2 ? " hidden" : "flex"} flex-col gap-5 h-full`}>
            <div className="flex items-center gap-2 text-xl font-semibold">
              <span>{iconMap[item.icon]}</span>
              <h1>{item.name}</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {item.content.slice(0, 6).map((product, productIndex) => (
                <ProductList key={productIndex} {...product} />
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductCategory;
