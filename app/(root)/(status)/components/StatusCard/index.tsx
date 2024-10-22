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
    <div className="p-3 border-2 rounded-xl flex flex-col md:flex-row gap-5 md:gap-10 justify-between items-center text-gray-500">
      <div className="flex justify-between md:justify-start w-full md:gap-5 items-center">
        {firstItem && (
          <Image
            src={firstItem.thumbnail || "/product.png"} 
            width={120}
            height={120}
            alt="product"
            className="min-w-[80px] min-h-[80px] max-w-[150px] max-h-[150px] object-cover object-center rounded-xl border-2"
          />
        )}
        <div className="flex flex-col gap-1">
          <div className="flex gap-3 items-center text-sm md:text-lg mb-3 w-full">
            <TbCalendarTime />
            <p className="text-sm text-black">{new Date(order.shippingDate).toLocaleDateString()}</p>
          </div>
          <h4 className="text-gray-600 flex items-center gap-3 font-semibold md:text-lg whitespace-nowrap">
            {order.buyerName} - {order.buyerPhoneNumber}
          </h4>
          <p className="md:text-sm">Invoice: #{order.invoiceNumber}</p>
        </div>
      </div>
      <hr className="border-dashed border-gray-700 w-full md:hidden" />
      <div className="w-full flex flex-col items-start md:items-end text-right text-gray-600">
        <p className="font-bold">Total Belanja</p>
        {firstItem && (
          <p className="font-semibold">{firstItem.quantity} Produk</p> 
        )}
        <h3 className="font-semibold text-lg text-red-600">Rp {order.price}</h3>
        <StatusDialog order={order} />
      </div>
    </div>
  );
};

export default StatusCard;
