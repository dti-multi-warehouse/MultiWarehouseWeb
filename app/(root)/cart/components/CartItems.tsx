"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { useRemoveFromCart, useIncrementQuantity, useDecrementQuantity, useCart } from "@/hooks/useCart";
import { useState } from "react";
import { throttle } from "lodash";

const CartItems: React.FC = () => {
  const { cart, error, isLoading } = useCart();
  const removeFromCart = useRemoveFromCart();
  const incrementQuantity = useIncrementQuantity();
  const decrementQuantity = useDecrementQuantity();

  const [localQuantities, setLocalQuantities] = useState<{ [key: number]: number }>({});

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart</div>;

  const cartItems = cart?.data?.cartItems || [];
  const totalPrice = cart?.data?.totalPrice || 0;

  if (cartItems.length === 0) return <div>Your cart is empty</div>;

  const updateQuantityThrottled = throttle((productId: number, action: "increment" | "decrement") => {
    if (action === "increment") {
      incrementQuantity.mutate(productId);
    } else if (action === "decrement") {
      decrementQuantity.mutate(productId);
    }
  }, 300);

  const updateQuantity = (productId: number, newQuantity: number, action: "increment" | "decrement") => {
    if (newQuantity < 1) return;

    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));

    updateQuantityThrottled(productId, action);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {cartItems.map((item) => (
        <div key={item.productId} className="flex flex-col md:flex-row gap-5 md:gap-10 w-full">
          <Image src={item.imageUrl} alt={item.name} width={150} height={150} className="" />
          <div className="flex flex-col gap-3 w-full">
            <button
              className="bg-red-200 text-red-600 rounded-full p-2 w-fit self-end"
              onClick={() => removeFromCart.mutate(item.productId)}
            >
              <RiDeleteBin6Line />
            </button>
            <h2 className="font-semibold text-gray-600">{item.name}</h2>
            <div className="flex items-center justify-between gap-20">
              <p className="font-semibold text-lg">Rp {item.price}</p>
              <div className="flex items-center gap-5 text-lg font-semibold">
                <button
                  className="bg-white border border-red-600 py-0 text-red-600 px-5 rounded-lg"
                  onClick={() => updateQuantity(item.productId, (localQuantities[item.productId] || item.quantity) - 1, "decrement")}
                  disabled={localQuantities[item.productId] <= 1 || item.quantity <= 1} 
                >
                  -
                </button>
                <p className="">{localQuantities[item.productId] || item.quantity}</p>
                <button
                  className={`bg-white border border-red-600 py-0 text-red-600 px-5 rounded-lg ${
                    (localQuantities[item.productId] || item.quantity) >= item.stock ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => updateQuantity(item.productId, (localQuantities[item.productId] || item.quantity) + 1, "increment")}
                  disabled={(localQuantities[item.productId] || item.quantity) >= item.stock} 
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex gap-10 justify-between items-center mt-5">
              <p className="font-semibold">Total {item.name}</p>
              <p className="font-semibold text-lg text-red-600 whitespace-nowrap">
                Rp {item.price * (localQuantities[item.productId] || item.quantity)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
