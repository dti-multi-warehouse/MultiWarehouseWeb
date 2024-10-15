'use client'

import React from "react";
import Image from "next/image";
import { TbCalendarTime } from "react-icons/tb";
import StatusDialog from "../StatusDialog";
import { Order } from "@/types/datatypes";

interface StatusCardProps {
  order: Order;
}

const StatusCard: React.FC<StatusCardProps> = ({ order }) => {
  const firstItem = order.items && order.items.length > 0 ? order.items[0] : null;

  return (
    <div className="p-3 border-2 rounded-xl flex flex-col md:flex-row gap-10 justify-between items-center text-gray-500">
      <div className="flex gap-5 items-center">
        {firstItem && (
          <Image
            src={firstItem.thumbnail || "/product.png"} 
            width={150}
            height={150}
            alt="product"
            className="min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] object-cover object-center rounded-xl"
          />
        )}
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center text-lg mb-3 w-full">
            <TbCalendarTime />
            <p className="text-sm">{new Date(order.shippingDate).toLocaleDateString()}</p>
          </div>
          <h4 className="text-gray-600 flex items-center gap-3  whitespace-nowrap">
            {order.buyerName} - {order.buyerPhoneNumber}
          </h4>
          <p className="text-sm">Invoice: #{order.invoiceNumber}</p>
        </div>
      </div>
      <hr className="border-dashed border-gray-700 w-full md:hidden" />
      <div className="w-full flex flex-col gap-3 items-center md:items-end text-right text-gray-600">
        <p>Total Belanja</p>
        {firstItem && (
          <p>{firstItem.quantity} Produk</p> 
        )}
        <h3 className="font-semibold text-lg text-red-600">Rp {order.price}</h3>
        <StatusDialog order={order} />
      </div>
    </div>
  );
};

export default StatusCard;
