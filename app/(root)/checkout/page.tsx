"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Buttons from "@/components/Buttons";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useGetUserAddresses } from "@/hooks/useAddress";
import { useCreateOrder } from "@/hooks/useOrder";
import {
  PaymentMethod,
  BankTransfer,
  CreateOrderRequestDto,
} from "@/types/datatypes";
import apiClient from "@/lib/apiClient";
import dynamic from "next/dynamic";
import {
  midtransPayment,
  shippingMethodList,
  selectPaymentMethod,
} from "@/data/data";
import AlertDialog from "@/components/AlertDialog";
import BuyerDetail from "./components/BuyerDetail";

const Checkout: React.FC = () => {
  const { cart, isLoading: isCartLoading } = useCart();
  const { addresses, isLoading: isAddressLoading } = useGetUserAddresses();
  const [subtotal, setSubtotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("MIDTRANS");
  const [selectedBank, setSelectedBank] = useState("BCA");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [isShippingLoading, setIsShippingLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [resultDialog, setResultDialog] = useState({
    open: false,
    title: "",
    description: "",
  });
  const router = useRouter();
  const createOrder = useCreateOrder();

  useEffect(() => {
    if (addresses && addresses.length > 0) {
      const primaryAddress = addresses.find((address) => address.primary);
      if (primaryAddress) {
        setSelectedAddressId(primaryAddress.id);
      }
    }
  }, [addresses]);

  useEffect(() => {
    if (cart) {
      const calculatedSubtotal = cart.data.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setSubtotal(calculatedSubtotal);
    }
  }, [cart]);

  const fetchShippingCost = async () => {
    if (!selectedAddressId || !selectedShippingMethod) {
      console.error("No shipping address or method selected.");
      return;
    }

    setIsShippingLoading(true);
    try {
      const response = await apiClient.post("/api/v1/order/shipping-cost", {
        destinationCityId: selectedAddressId,
        weight: 1,
        courier: selectedShippingMethod,
      });

      const costData =
        response.data?.data?.rajaongkir?.results?.[0]?.costs?.[0]?.cost?.[0]
          ?.value;
      setShippingCost(costData || 0);
    } catch (error) {
      console.error("Error fetching shipping cost:", error);
    } finally {
      setIsShippingLoading(false);
    }
  };

  useEffect(() => {
    if (selectedAddressId && selectedShippingMethod) {
      fetchShippingCost();
    }
  }, [selectedAddressId, selectedShippingMethod]);

  const handleCheckout = () => {
    setConfirmDialogOpen(true);
  };

  const confirmCheckout = () => {
    const selectedAddress = addresses?.find(
      (address) => address.id === selectedAddressId
    );
    if (!selectedAddress) {
      setResultDialog({
        open: true,
        title: "Error",
        description: "No shipping address selected.",
      });
      return;
    }

    const items =
      cart?.data.cartItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })) || [];

    if (items.length === 0) {
      setResultDialog({
        open: true,
        title: "Error",
        description: "Cart is empty.",
      });
      return;
    }

    if (!selectedShippingMethod) {
      setResultDialog({
        open: true,
        title: "Error",
        description: "Please select a shipping method.",
      });
      return;
    }

    setIsCheckoutLoading(true);
    const [courier] = selectedShippingMethod.split("-");

    const orderPayload: CreateOrderRequestDto = {
      productIds: items.map((item) => item.productId),
      items,
      paymentMethod:
        PaymentMethod[selectedPaymentMethod as keyof typeof PaymentMethod],
      bankTransfer:
        selectedPaymentMethod === "MIDTRANS"
          ? BankTransfer[selectedBank as keyof typeof BankTransfer]
          : undefined,
      shippingMethod: courier,
      shippingAddressId: selectedAddressId,
    };

    createOrder.mutate(orderPayload, {
      onSuccess: () => {
        setResultDialog({
          open: true,
          title: "Success",
          description: "Your order has been created successfully!",
        });
        router.push("/waiting-payment");
      },
      onError: (error) => {
        setResultDialog({
          open: true,
          title: "Failed",
          description: "Order creation failed. Please try again.",
        });
        console.error("Order creation failed:", error);
      },
      onSettled: () => {
        setIsCheckoutLoading(false);
        setConfirmDialogOpen(false);
      },
    });
  };

  if (isCartLoading || isAddressLoading) return <div className="p-5 md:p-10 flex h-screen w-screen items-center justify-center"><div className="loader"></div></div>;

  return (
    <>
      <div className="w-full p-5 md:p-10 flex flex-col gap-5">
        <h1 className="font-extrabold text-xl">Checkout Pesanan</h1>
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-[60%] flex flex-col gap-5">
            <div className="h-2 w-full bg-gray-200 rounded-lg"></div>
            <h3 className="font-bold">Alamat Terpilih</h3>
            <BuyerDetail
              selectedAddressId={selectedAddressId}
              onAddressSelect={setSelectedAddressId}
            />
            <hr className="border-dashed border-gray-700" />
            {/* <div className="h-2 w-full bg-gray-200 rounded-lg"></div> */}
            <div className="flex flex-col gap-5">
              <h3 className="font-bold">Stok Barang</h3>
              {cart?.data?.cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-10 w-full bg-gray-50 rounded-xl p-2 md:p-5 items-center border-2 border-gray-400"
                >
                  <div className="bg-white flex justify-center rounded-xl shadow-airbnbSoft shadow-gray-200 border-2 border-gray-300">  
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      width={200}
                      height={150}
                      className="rounded-xl max-w-[200px] max-h-[150px] object-contain mix-blend-multiply object-center"
                    />
                  </div>
                  <div className="flex flex-col gap-3 w-full">
                    <h2 className="font-semibold text-gray-600">{item.name}</h2>
                    <p className="font-semibold text-lg">
                      Rp {item.price.toLocaleString()}
                    </p>
                    <p className="font-semibold">Jumlah beli {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[40%] flex flex-col gap-10 lg:mx-10 p-5 border-2 border-gray-400 bg-gray-100 h-fit rounded-xl shadow-boxedSoft">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Pesanan</h2>
              <hr className="w-full border-dashed border-gray-700 " />
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-semibold text-lg">
                  Rp {subtotal.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Ongkos Kirim</p>
                {isShippingLoading ? (
                  <p className="font-semibold text-lg animate-pulse">
                    Loading...
                  </p>
                ) : (
                  <p className="font-semibold text-lg">
                    Rp {shippingCost.toLocaleString()}
                  </p>
                )}
              </div>
              <div className="flex items-center font-semibold justify-between">
                <p className="text-lg">Total</p>
                <p className="text-xl text-red-600">
                  Rp {(subtotal + shippingCost).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Metode Pembayaran</h3>
                <hr className="w-full border-dashed border-gray-700 " />
                <RadioGroup
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                  className="font-semibold text-xl flex flex-col gap-5"
                >
                  {selectPaymentMethod.map((method, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem value={method.value} id={method.id} />
                      <Label htmlFor={method.id}>{method.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex flex-col gap-3">
                {selectedPaymentMethod === "MIDTRANS" && (
                  <div className="flex flex-col gap-3">
                    <h3 className="font-semibold">Pilih Bank Transfer</h3>
                    <hr className="w-full border-dashed border-gray-700 " />
                    <RadioGroup
                      value={selectedBank}
                      onValueChange={setSelectedBank}
                      className="font-semibold text-xl flex flex-col gap-5"
                    >
                      {midtransPayment.map((payment, index) => (
                        <div className="flex items-center space-x-2" key={index}>
                          <RadioGroupItem value={payment.value} id={payment.id} />
                          <Label htmlFor={payment.id}>{payment.value}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold">Pilih Ongkos Kirim</h3>
                <hr className="w-full border-dashed border-gray-700 " />
                <RadioGroup
                  value={selectedShippingMethod}
                  onValueChange={setSelectedShippingMethod}
                  className="font-semibold text-xl flex flex-col gap-5"
                >
                  {shippingMethodList.map((shipping, index) => (
                    <div className="flex items-center space-x-2" key={index}>
                      <RadioGroupItem
                        value={shipping.value}
                        id={shipping.value}
                      />
                      <Label htmlFor={shipping.value}>{shipping.text}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Buttons
                className="w-fit self-center font-semibold !px-10 !py-2"
                onClick={handleCheckout}
              >
                {isCheckoutLoading ? " Checkout..." : "Checkout Now"}
              </Buttons>
            </div>
          </div>
        </div>
      </div>
      {/* Confirmation Dialog */}
      <AlertDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        title="Are you sure wants to proceed the checkout now?"
        actionLabel="Yes"
        cancelLabel="No"
        onAction={confirmCheckout}
      />
      {/* Result Dialog */}
      <AlertDialog
        open={resultDialog.open}
        onOpenChange={(open) => setResultDialog((prev) => ({ ...prev, open }))}
        title={resultDialog.title}
        cancelVisibility="hidden"
        description={resultDialog.description}
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
