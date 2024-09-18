"use client";

import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import { useRemoveFromCart, useIncrementQuantity, useDecrementQuantity, useCart } from "@/hooks/useCart";

const CartItems: React.FC = () => {
  const { cart, error, isLoading } = useCart();
  const removeFromCart = useRemoveFromCart();
  const incrementQuantity = useIncrementQuantity();
  const decrementQuantity = useDecrementQuantity();

  if (isLoading) return <div>Loading cart...</div>;
  if (error) return <div>Error loading cart</div>;

  return (
    <div className="flex flex-col gap-5">
      {cart?.cartItems?.map((item, index) => (
        <div key={index} className="flex gap-10 w-full">
          <Image src={item.imageUrl} alt={item.name} width={150} height={150} /> 
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
                  onClick={() => decrementQuantity.mutate(item.productId)}
                >
                  -
                </button>
                <p className="">{item.quantity}</p>
                <button
                  className="bg-white border border-red-600 py-0 text-red-600 px-5 rounded-lg"
                  onClick={() => incrementQuantity.mutate(item.productId)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="font-semibold">Total {item.name}</p>
              <p className="font-semibold text-lg text-red-600">Rp {item.price * item.quantity}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;
