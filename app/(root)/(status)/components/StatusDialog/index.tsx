import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Buttons from "@/components/Buttons";
import { Order } from "@/types/datatypes";

interface StatusDialogProps {
  order: Order;
}

const StatusDialog: React.FC<StatusDialogProps> = ({ order }) => {
  return (
    <Dialog>
      <DialogTrigger className="py-1 px-5 bg-red-600 text-white rounded-xl flex md:justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500 w-fit self-center md:self-end">
      {order.status === "AWAITING_PAYMENT" ? "Bayar Sekarang" : "Lihat Detail"}
      </DialogTrigger>
      <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="p-5 font-bold text-center">
            Detail Transaksi
          </DialogTitle>
          <hr className="border-dashed border-gray-800" />
          <div className="w-full flex flex-col gap-5 p-5">
            {/* Display buyer and warehouse details */}
            <div className="flex w-full justify-between md:items-center">
              <h2 className="font-semibold">Kirim ke</h2>
              <p className="text-red-600 py-1 px-3 border border-red-600 rounded-full w-fit text-xs">
                {order.status || 'N/A'}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:gap-16 text-gray-500 font-medium w-full">
              <h3>Toko Pengirim</h3>
              <p>{order.warehouseName || 'N/A'}</p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:gap-14 text-gray-500 font-medium w-full">
              <h3 className="whitespace-nowrap">Alamat Pembeli</h3>
              <div className="w-full flex flex-col items-start self-start">
                <p>{order.buyerName || 'N/A'}</p>
                <p>{order.buyerPhoneNumber || 'N/A'}</p>
                <p className="text-gray-600 self-start text-left">
                  {order.buyerAddress.street + ", " + order.buyerAddress.city + ", " + order.buyerAddress.province || 'Address not available'}
                </p>
              </div>
            </div>
          </div>
          <hr className="border-dashed border-gray-800" />
          <div className="flex flex-col gap-2 p-5 text-gray-500 font-medium">
            <p className="text-black font-semibold mb-3">Detail Pesanan</p>
            <p>No Invoice: {order.invoiceNumber || 'N/A'}</p>
            <p>Dikirim pada {order.shippingDate ? new Date(order.shippingDate).toLocaleDateString() : 'N/A'}</p>
            <div className="flex flex-col md:flex-row gap-5 md:items-end w-full">
              {/* Check for product image and display it */}
              <Image alt="product" src={order.productImages?.[0] || "/default-product.png"} width={150} height={150} />
              <div className="flex flex-col gap-5 font-semibold items-start w-full">
                {/* Display product details */}
                <p className="text-gray-500">{order.productName || 'N/A'}</p>
                <p className="text-lg">Rp {order.price || 0}</p>
                <div className="flex items-center justify-between w-full">
                  <p className="text-gray-500">Jumlah beli {order.quantity || 0}</p>
                  <p className="text-red-600">Rp {order.totalAmount || 0}</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="border-dashed border-gray-800" />
          <div className="flex flex-col gap-5 p-5 font-medium text-sm w-full">
            <p className="font-semibold">Detail Pembayaran</p>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
              <div className="flex flex-col w-full gap-2 text-gray-500">
                <p>Metode Pembayaran: {order.paymentMethod || 'N/A'}</p>
                <div>
                  <p>Nomor VA:</p>
                  <h3 className="text-lg">{order.virtualAccountNumber || 'N/A'}</h3>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end text-gray-500 w-full ">
                <p>Total Pembayaran</p>
                <p className="font-bold text-lg text-gray-700">Rp {order.totalAmount || 0}</p>
                <Buttons>{order.status === "AWAITING_PAYMENT" ? "Bayar Sekarang" : "Lihat Detail"}</Buttons>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;
