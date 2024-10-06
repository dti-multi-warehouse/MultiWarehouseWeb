import React from "react";
import productimg from "@/public/product.png";
import Image from "next/image";
import { TbCalendarTime } from "react-icons/tb";
import Buttons from "@/components/Buttons";
import StatusDialog from "../StatusDialog";

const StatusCard: React.FC = () => {
  return (
    <>
      <div className="p-3 border-2 rounded-xl flex justify-between  items-center text-gray-500">
        <div className="flex gap-5 items-center">
          <Image
            src={productimg}
            width={150}
            height={150}
            alt="product"
            className="max-w-[150px] max-h-[150px]"
          />
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center text-lg mb-3">
                <TbCalendarTime />
                <p className="text-sm">23 Agustus 2024</p>
            </div>
            <h4 className="text-gray-600">Amalia - 081234567890</h4>
            <p className="text-sm">Invoice: PM 23424-sdsfsdfadf</p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-end text-right text-gray-600">
            <p>Total Belanja</p>
            <p>2 Produk</p>
            <h3 className="font-semibold text-lg text-red-600">Rp 25.000</h3>
            <StatusDialog />
        </div>
      </div>
    </>
  );
};

export default StatusCard;
