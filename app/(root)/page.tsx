"use client"

import React from "react";
import CategoryComponent from "./components/Category";
import Hero from "./components/Hero";
import ProductCategory from "./components/ProductCategory/ProductCategory";

export default function Home() {
  return (
    <main className="p-5 md:p-10 bg-transparent">
      <Hero />
      <CategoryComponent />
      <ProductCategory categoriesToShow={["Beverages", "Tea"]} />
    </main>
  );
}
