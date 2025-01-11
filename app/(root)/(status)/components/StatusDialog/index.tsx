"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import Buttons from "@/components/Buttons";
import { useRouter } from "next/navigation";
import { Order } from "@/types/datatypes";
import { useCancelOrder, useUploadPaymentProof, useFinalizeOrder } from "@/hooks/useOrder";
import AlertDialog from "@/components/AlertDialog";

interface StatusDialogProps {
  order: Order;
}

const StatusDialog: React.FC<StatusDialogProps> = ({ order }) => {
  const [cancelDialogOpen, setCancelDialogOpen] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string | null>(null);
  const [alertDialogOpen, setAlertDialogOpen] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [isExpired, setIsExpired] = useState<boolean>(false);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const uploadPaymentProof = useUploadPaymentProof();
  const cancelOrder = useCancelOrder();
  const confirmPayment = useFinalizeOrder();
  const router = useRouter();

  useEffect(() => {
    if (order.status === "AWAITING_PAYMENT" && order.paymentExpiredAt) {
      const expiryTime = new Date(order.paymentExpiredAt).getTime();
      const countdown = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDiff = expiryTime - currentTime;
        if (timeDiff <= 0) {
          clearInterval(countdown);
          setTimeLeft("Expired");
          setIsExpired(true);
          cancelOrder.mutate(order.id);
        } else {
          const hoursLeft = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
          const minutesLeft = Math.floor((timeDiff / (1000 * 60)) % 60);
          const secondsLeft = Math.floor((timeDiff / 1000) % 60);
          setTimeLeft(`${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`);
        }
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [order, cancelOrder]);

  const handleCancelOrder = () => {
    setCancelDialogOpen(true);
  };

  const confirmCancelOrder = () => {
    cancelOrder.mutate(order.id);
    setCancelDialogOpen(false);
    router.push("/cancel-order")
  };

  const handlePaymentProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setPaymentProof(file);
  };

  const handleSendProof = () => {
    if (paymentProof) {
      uploadPaymentProof.mutate(
        { orderId: order.id, paymentProof },
        {
          onSuccess: () => {
            setAlertMessage("Payment proof uploaded successfully!"); 
            setAlertDialogOpen(true); 
            router.push("/waiting-confirmation"); 
          },
          onError: () => {
            setAlertMessage("Failed to upload payment proof. Please try again.");
            setAlertDialogOpen(true);
          },
        }
      );
    } else {
      setAlertMessage("Please select a file before sending proof."); 
      setAlertDialogOpen(true);
    }
  };

  const handleCopyVirtualAccount = () => {
    if (order.virtualAccountNumber) {
      navigator.clipboard.writeText(order.virtualAccountNumber)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), 2000);
        })
        .catch((error) => {
          console.error("Failed to copy VA number:", error);
        });
    }
  };

  const handleConfirmPayment = () => {
    confirmPayment.mutate(order.id); 
    router.push('/order-confirmation')
  };

  return (
    <Dialog>
      <DialogTrigger className="py-1 px-5 bg-red-600 text-white rounded-xl flex md:justify-center items-center gap-3 hover:scale-105 hover:shadow-antiMetal transition-all duration-500 w-fit md:self-end">
        {order.status === "AWAITING_PAYMENT" ? "Bayar Sekarang" : "Lihat Detail"}
      </DialogTrigger>
      <DialogContent className="address-box max-h-[80vh] !p-0 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="p-5 font-bold text-center">Detail Transaksi</DialogTitle>
          <hr className="border-dashed border-gray-800" />

          <div className="w-full flex flex-col gap-5 p-5">
            <div className="flex w-full justify-between md:items-center">
              <h2 className="font-semibold">Kirim ke</h2>
              <p className="text-red-600 py-1 px-3 border border-red-600 font-bold rounded-full w-fit text-xs">
                {order.status || "N/A"}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-start md:gap-16 text-gray-500 font-medium w-full">
              <h3 className="whitespace-nowrap">Toko Pengirim</h3>
              <div className="w-full flex flex-col items-start self-start">
                <p className="text-gray-800 font-bold capitalize">{order.warehouseName || "N/A"} </p>
                <p className="text-gray-600 self-start text-left">{order.warehouseAddress.street +
                    ", " +
                    order.warehouseAddress.city +
                    ", " +
                    order.warehouseAddress.province || "Address not available"}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:gap-14 text-gray-500 font-medium w-full">
              <h3 className="whitespace-nowrap">Alamat Pembeli</h3>
              <div className="w-full flex flex-col items-start self-start">
                <p className="text-gray-800 font-bold capitalize">{order.buyerName || "N/A"}</p>
                <p>{order.buyerPhoneNumber || "N/A"}</p>
                <p className="text-gray-600 self-start text-left">
                  {order.buyerAddress.street +
                    ", " +
                    order.buyerAddress.city +
                    ", " +
                    order.buyerAddress.province || "Address not available"}
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:gap-16 text-gray-500 font-medium w-full">
              <h3 className="whitespace-nowrap">Shipping Cost</h3>
              <p className="text-red-600 font-bold text-lg">Rp {order.shippingCost || 0}</p>
            </div>
          </div>

          <hr className="border-dashed border-gray-800" />

          <div className="flex flex-col md:gap-2 p-5 text-gray-500 font-medium">
            <p className="text-black font-semibold mb-1 md:mb-3">Detail Pesanan</p>
            <p>No Invoice: # {order.invoiceNumber || "N/A"}</p>
            <p className="mb-3">
              Dikirim pada{" "}
              {order.shippingDate
                ? new Date(order.shippingDate).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="flex flex-col gap-5 rounded-xl p-2 border bg-gray-100">
              {order.items.map((item, index) => (
                <div key={index} className="flex gap-5 items-center w-full">
                  <div className=" w-[150px] h-[150px] rounded-xl border-2 overflow-hidden">
                    <Image alt="product" src={item.thumbnail || "/default-product.png"} width={150} height={150} className="w-[150px] h-[150px] object-cover object-center rounded-xl" />
                  </div>
                  <div className="flex flex-col gap-2 font-semibold items-start text-left w-full">
                    <p className="text-gray-500">{item.name || "N/A"}</p>
                    <p className="text-lg text-red-600">Rp {item.price || 0}</p>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-gray-500">Jumlah beli {item.quantity || 0}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-dashed border-gray-800" />

          <div className="flex flex-col md:gap-5 p-5 font-medium w-full">
            <p className="font-semibold">Detail Pembayaran</p>
            <div className="flex flex-col md:flex-row items-center justify-between w-full gap-10">
              <div className="flex flex-col items-center md:items-start w-full gap-2 text-gray-500">
                <p>Metode Pembayaran: {order.paymentMethod || "N/A"} {" "} {order.paymentMethod === "MANUAL" ? "BANK TRANSFER" : order.bank}</p>
                {order.paymentMethod === "MANUAL" ? (
                  <div className={`${order.status === "AWAITING_PAYMENT" ? "block" : "hidden"}`}>
                    <p>Upload Bukti Pembayaran:</p>
                    <input type="file" accept="image/*" onChange={handlePaymentProofUpload} className="max-w-40 w-full" />
                    <Buttons onClick={handleSendProof} className="bg-blue-500 mt-2">
                      Send Proof
                    </Buttons>
                  </div>
                ) : (
                  <div>
                    <p>Nomor VA:</p>
                    <h3 className="text-lg w-full max-w-36 md:whitespace-normal">{order.virtualAccountNumber || "N/A"}</h3>
                    <Buttons onClick={handleCopyVirtualAccount} className={`${order.status === "AWAITING_PAYMENT" ? "block" : "hidden"}`}>
                      {isCopied ? "Nomor VA Disalin!" : "Salin Nomor VA"}
                    </Buttons>
                  </div>
                )}
              </div>
              <div className="flex flex-col items-center md:items-end text-gray-500 w-full">
                <p>Total Pembayaran</p>
                <p className="font-bold text-xl text-red-600">Rp {order.price || 0}</p>

                {order.status === "AWAITING_PAYMENT" && !isExpired && (
                  <>
                    <Buttons onClick={handleCancelOrder} className="bg-red-500">
                      Batalkan Pesanan
                    </Buttons>
                    {timeLeft && <p className="text-gray-400">Sisa Waktu Pembayaran: {timeLeft}</p>}
                  </>
                )}

                {order.status === "DELIVERING" && (
                  <Buttons onClick={handleConfirmPayment} className="bg-blue-500">
                    Pesanan Diterima
                  </Buttons>
                )}

                {isExpired && <p className="text-red-500">Waktu pembayaran telah habis. Pesanan dibatalkan.</p>}
              </div>
            </div>
          </div>

          <AlertDialog
            open={alertDialogOpen}
            onOpenChange={setAlertDialogOpen}
            title="Upload Status"
            description={alertMessage}
            actionLabel="OK"
            onAction={() => setAlertDialogOpen(false)}
          />

          <AlertDialog
            open={cancelDialogOpen}
            onOpenChange={setCancelDialogOpen}
            title="Cancel Your Order"
            description="Are you sure wants to cancel this order?"
            actionLabel="Yes, Cancel"
            onAction={confirmCancelOrder}
            cancelLabel="No"
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StatusDialog;