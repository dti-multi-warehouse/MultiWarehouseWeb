"use client";

import React, { useState, useEffect } from "react";
import CartHeader from "@/components/Header/CartHeader";

const CartLayout: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const header = document.getElementById("header");

    if (header) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsHeaderVisible(entry.isIntersecting); 
        },
        { threshold: 0.1 }
      );

      observer.observe(header);

      return () => observer.disconnect();
    }
  }, []);

  return !isHeaderVisible ? (
    <div className="fixed bottom-10 right-10 lg:scale-110 backdrop-blur-md p-3 bg-red-600 rounded-full border-4 border-white shadow-sketchSoft shadow-gray-400">
      <CartHeader className="text-white" qtyClassName="text-red-600" />
    </div>
  ) : null;
};

export default CartLayout;
