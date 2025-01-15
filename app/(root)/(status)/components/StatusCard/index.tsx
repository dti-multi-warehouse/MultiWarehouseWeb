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

  const totalQuantity = order.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(order.shippingDate));  

  return (
    <div className=" p-2 sm:p-3 border-2 rounded-xl flex flex-col md:flex-row gap-5 md:gap-10 justify-between items-center text-gray-500">
      <div className="flex justify-start w-full h-full gap-3 md:gap-5 items-center ">
        <div className="rounded-xl border-2 p-2">  
          {firstItem && (
            <Image
              src={firstItem.thumbnail || "/product.png"} 
              width={120}
              height={120}
              alt="product"
              className=" w-[80px] h-[80px] sm:w-[150px] sm:h-[150px] object-cover object-center "
            />
          )}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-2 items-center text-sm md:text-lg mb-3 w-full">
            <TbCalendarTime />
            <p className="text-xs sm:text-sm text-gray-700 font-medium">{formattedDateTime}</p>
          </div>
          <h4 className="text-gray-600 flex items-center gap-3 font-semibold text-sm sm:text-base md:text-lg whitespace-nowrap">
            {order.buyerName} - {order.buyerPhoneNumber}
          </h4>
          <p className="md:text-sm">Invoice: #{order.invoiceNumber}</p>
        </div>
      </div>
      <hr className="border-dashed border-gray-700 w-full md:hidden" />
      <div className="w-full flex flex-col items-start md:items-end text-right text-gray-600 max-sm:text-sm">
        <p className="font-bold ">Total Belanja</p>
        <p className="font-semibold">{totalQuantity} Produk</p> 
        <h3 className="font-semibold text-lg text-red-600">Rp {order.price}</h3>
        <StatusDialog order={order} />
      </div>
    </div>
  );
};

export default StatusCard;
