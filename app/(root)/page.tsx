import React from "react";
import CategoryComponent from "./components/Category";
import Hero from "./components/Hero";
import ProductCategory from "./components/ProductCategory/ProductCategory";
import OurBenefit from "./components/OurBenefit";

export default function Home() {
  return (
    <main className="p-5 md:p-10 bg-transparent overflow-x-hidden">
      <Hero />
      <CategoryComponent />
      <ProductCategory />
      <OurBenefit />
    </main>
  );
}
