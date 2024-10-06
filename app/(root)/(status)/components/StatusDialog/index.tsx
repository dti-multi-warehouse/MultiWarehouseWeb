import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import picture from "@/public/product.png";
import Buttons from "@/components/Buttons";

const StatusDialog: React.FC = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger className="py-1 px-5 bg-red-600 text-white rounded-xl flex justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500">
          Bayar Sekarang
        </DialogTrigger>
        <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="p-5 font-bold text-center">
              Detail Transaksi
            </DialogTitle>
            <hr className="border-dashed border-gray-800" />
            <div
              className="flex flex-col
             gap-5 p-5"
            >
              <div className="flex justify-between items-center">
                <h2 className="font-semibold">Kirim ke</h2>
                <p className="text-red-600 py-1 px-3 border border-red-600 rounded-full w-fit text-xs">
                  Menunggu Pembayaran
                </p>
              </div>
              <div className="flex gap-16 text-gray-500 font-medium">
                <h3>Toko Pengirim</h3>
                <p>Jl. Sini Sana Suka</p>
              </div>
              <div className="flex gap-14 text-gray-500 font-medium">
                <h3 className="whitespace-nowrap">Alamat Pembeli</h3>
                <div>
                  <p>Amalia</p>
                  <p>082233445566</p>
                  <p className="text-gray-600">
                    Jl. Soekarno, Sudirman Kota A, 33333, Indonesia
                  </p>
                </div>
              </div>
            </div>
            <hr className="border-dashed border-gray-800" />
            <div
              className="flex flex-col
             gap-2 p-5 text-gray-500 font-medium"
            >
              <p className="text-black font-semibold mb-3">Detail Pesanan</p>
              <p>No Invoice: S-344232-fsdfsdf</p>
              <p>Dikirim pada 24 Agustus 2024</p>
              <div className="flex gap-5 items-end">
                <Image
                  alt="product"
                  src={picture}
                  width={150}
                  height={150}
                  className=""
                />
                <div className="flex flex-col gap-5 font-semibold">
                  <p className="text-gray-500">Chiki</p>
                  <p className="text-lg">Rp 5.000</p>
                  <div className="flex items-center justify-between">
                    <p className="text-gray-500">Jumlah beli 4</p>
                    <p className="text-red-600">Rp 10.000</p>
                  </div>
                </div>
              </div>
            </div>
            <hr className="border-dashed border-gray-800" />
            <div
              className="flex flex-col
             gap-5 p-5 font-medium text-sm"
            >
              <p className="font-semibold">Detail Pembayaran</p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2 text-gray-500">
                  <p>Metode Pembayaran: BCA</p>
                  <div>
                    <p>Nomor VA:</p>
                    <h3 className="text-lg">56421321564564</h3>
                  </div>
                </div>
                <div className="flex flex-col items-end text-gray-500 ">
                  <p>Total Pembayaran</p>
                  <p>Rp 20.000</p>
                  <Buttons
                    className="mt5
                    "
                  >
                    Bayar Sekarang
                  </Buttons>
                </div>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusDialog;