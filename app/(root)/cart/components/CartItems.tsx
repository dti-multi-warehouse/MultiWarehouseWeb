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
  const [loadingItems, setLoadingItems] = useState<{ [key: number]: boolean }>({}); // Loading state per item

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
    if (newQuantity < 1 || loadingItems[productId]) return;

    const product = cartItems.find((item) => item.productId === productId);
    if (!product) return;

    setLoadingItems((prev) => ({ ...prev, [productId]: true })); // Mark item as loading

    setLocalQuantities((prev) => ({
      ...prev,
      [productId]: newQuantity,
    }));

    // Optimistically update UI
    updateQuantityThrottled(productId, action);

    // Simulate server delay and remove loading state
    setTimeout(() => {
      setLoadingItems((prev) => ({ ...prev, [productId]: false }));
    }, 300);
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      {cartItems.map((item) => (
        <div key={item.productId} className="flex p-2 rounded-xl bg-gray-100 md:p-5 flex-col md:flex-row md:items-center gap-5 md:gap-10 w-full border-2 border-gray-300">
          <div className="bg-white flex justify-center rounded-xl shadow-airbnbSoft shadow-gray-200 border-2 border-gray-300">
            <Image src={item.imageUrl} alt={item.name} width={200} height={150} className="max-w-[200px] max-h-[150px] object-contain mix-blend-multiply object-center rounded-xl" />
          </div>
          <div className="flex flex-col gap-3 w-full">
            <button
              className="bg-red-200 text-red-600 rounded-full p-2 w-fit self-end"
              onClick={() => removeFromCart.mutate(item.productId)}
            >
              <RiDeleteBin6Line />
            </button>
            <h2 className="font-semibold text-xl">{item.name}</h2>
            <div className="flex items-center justify-between gap-20">
              <p className="font-semibold text-lg ">Rp {item.price}</p>
              <div className="flex items-center gap-5 text-lg font-semibold">
                <button
                  className={`bg-red-600 text-white border border-white shadow-airbnbSoft py-0 px-5 rounded-lg ${
                    loadingItems[item.productId] ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => updateQuantity(item.productId, (localQuantities[item.productId] || item.quantity) - 1, "decrement")}
                  disabled={loadingItems[item.productId] || (localQuantities[item.productId] || item.quantity) <= 1}
                >
                  -
                </button>
                <p className={`${loadingItems[item.productId] ? "animate-pulse" : ""}`}>
                  {localQuantities[item.productId] || item.quantity}
                </p>
                <button
                  className={`bg-red-600 border border-white py-0 text-white shadow-airbnbSoft px-5 rounded-lg ${
                    loadingItems[item.productId] || (localQuantities[item.productId] || item.quantity) >= item.stock
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => updateQuantity(item.productId, (localQuantities[item.productId] || item.quantity) + 1, "increment")}
                  disabled={loadingItems[item.productId] || (localQuantities[item.productId] || item.quantity) >= item.stock}
                >
                  +
                </button>
              </div>
            </div>
            <hr className="border-dashed border-gray-700" />
            <div className="flex gap-10 justify-between items-center">
              <p className="font-semibold text-gray-600">Total Per-barang</p>
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
