'use client'

import React from "react";
import Image from "next/image";
import { TbCalendarTime } from "react-icons/tb";
import StatusDialog from "../StatusDialog";
import { Order, OrderItem } from "@/types/datatypes";

const getProductDetailsById = (productId: number): { name: string; thumbnail: string } => {
  return {
    name: "Sample Product", 
    thumbnail: "/default-product.png", 
  };
};

interface StatusCardProps {
  order: Order;
}

const StatusCard: React.FC<StatusCardProps> = ({ order }) => {
  return (
    <div className="p-3 border-2 rounded-xl flex flex-col md:flex-row gap-10 justify-between items-center text-gray-500">
      <div className="flex gap-5 items-center">
        <div className="flex flex-col gap-3">
          {order.items.map((item: OrderItem, index: number) => {
            const productDetails = getProductDetailsById(item.productId); 
            return (
              <div key={index} className="flex gap-5 items-center">
                <Image
                  src={productDetails.thumbnail || "/default-product.png"}
                  width={100}
                  height={100}
                  alt="product"
                  className="min-w-[100px] min-h-[100px] max-w-[100px] max-h-[100px] object-cover object-center rounded-xl"
                />
                <div className="flex flex-col gap-2">
                  <h4 className="text-gray-600">{productDetails.name}</h4>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center text-lg mb-3 w-full">
            <TbCalendarTime />
            <p className="text-sm">{new Date(order.shippingDate).toLocaleDateString()}</p>
          </div>
          <h4 className="text-gray-600 flex items-center gap-3  whitespace-nowrap">{order.buyerName} - {order.buyerPhoneNumber}</h4>
          <p className="text-sm">Invoice: #{order.invoiceNumber}</p>
        </div>
      </div>
      <hr className="border-dashed border-gray-700 w-full md:hidden" />
      <div className="w-full flex flex-col gap-3 items-center md:items-end text-right text-gray-600">
        <p>Total Products: {order.items.length}</p>
        <h3 className="font-semibold text-lg text-red-600">Rp {order.totalAmount}</h3>
        <StatusDialog order={order} />
      </div>
    </div>
  );
};

export default StatusCard;
