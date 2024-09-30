"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Buttons from "@/components/Buttons";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { useGetUserAddresses } from "@/hooks/useAddress";
import { useCreateOrder } from "@/hooks/useOrder";
import { PaymentMethod, BankTransfer, CreateOrderRequestDto } from '@/types/datatypes';
import apiClient from "@/lib/apiClient";

const Checkout: React.FC = () => {
  const { cart, isLoading: isCartLoading } = useCart();
  const { addresses, isLoading: isAddressLoading } = useGetUserAddresses();
  const [subtotal, setSubtotal] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("MIDTRANS");
  const [selectedBank, setSelectedBank] = useState("BCA");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [shippingCost, setShippingCost] = useState(0);
  const router = useRouter();
  const createOrder = useCreateOrder();

  useEffect(() => {
    if (cart) {
      const calculatedSubtotal = cart.data.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      setSubtotal(calculatedSubtotal);
    }
  }, [cart]);

  const fetchShippingCost = async (shippingMethod: string) => {
    const primaryAddress = addresses?.data.find((address) => address.primary);

    if (!primaryAddress) {
      console.error("No primary address found.");
      return;
    }

    try {
      const response = await apiClient.post("/api/v1/order/shipping-cost", {
        destinationCityId: primaryAddress.id, 
        weight: 100,
        courier: shippingMethod
      });

      const costData = response.data?.data?.rajaongkir?.results?.[0]?.costs?.[0]?.cost?.[0]?.value;
      if (costData) {
        setShippingCost(costData);
      } else {
        setShippingCost(0);
      }
    } catch (error) {
      console.error("Error fetching shipping cost:", error);
    }
  };

  useEffect(() => {
    if (selectedShippingMethod) {
      fetchShippingCost(selectedShippingMethod);
    }
  }, [fetchShippingCost, selectedShippingMethod]);

  const handleCheckout = () => {
    const primaryAddress = addresses?.data.find((address) => address.primary === true);

    if (!primaryAddress) {
      alert("No primary address found.");
      return;
    }

    const [courier, service] = selectedShippingMethod.split('-');

    const productIds = cart?.data.cartItems.map(item => item.productId) || [];

    if (productIds.length === 0) {
      alert("No products found in the cart.");
      return;
    }

    const orderPayload: CreateOrderRequestDto = {
      paymentMethod: PaymentMethod[selectedPaymentMethod as keyof typeof PaymentMethod],
      bankTransfer: BankTransfer[selectedBank as keyof typeof BankTransfer],
      shippingMethod: courier,
      shippingService: service,
      shippingAddressId: primaryAddress.id,
      productIds: productIds,
    };

    createOrder.mutate(orderPayload, {
      onSuccess: () => {
        router.push("/in-process");
      },
      onError: (error) => {
        console.error("Order creation failed:", error);
      },
    });
  };

  if (isCartLoading || isAddressLoading) return <div>Loading...</div>;

  const primaryAddress = Array.isArray(addresses?.data)
    ? addresses.data.find((address) => address.primary === true)
    : null;

  return (
    <>
      <div className="w-full p-10 flex flex-col gap-5">
        <h1 className="font-bold text-xl">Checkout Pesanan</h1>

        <div className="flex gap-10">
          <div className="w-[60%] flex flex-col gap-5">
          <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
            <div className="flex flex-col gap-5 py-3">
              <h3 className="font-semibold">Detail Pembeli</h3>
              {primaryAddress ? (
                <div className="flex flex-col gap-2 font-medium">
                  <p>{primaryAddress.name}</p>
                  <p>{primaryAddress.phoneNumber}</p>
                  <p>{primaryAddress.address.street}, {primaryAddress.address.city}</p>
                  <p className="font-bold text-sm text-gray-600">Alamat Utama</p>
                </div>
              ) : (
                <p>No primary address available.</p>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <h3 className="font-semibold">Stok Barang</h3>
              {cart?.data?.cartItems.map((item, index) => (
                <div key={index} className="flex gap-10 w-full">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    width={150}
                    height={150}
                  />
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

          <div className="w-[40%] flex flex-col gap-10 mx-10 p-10 bg-gray-100 h-fit rounded-xl shadow-boxedSoft">
            <div className="flex flex-col gap-3">
              <h2 className="font-semibold text-lg">Pesanan</h2>
              <div className="flex items-center justify-between">
                <p>Subtotal</p>
                <p className="font-semibold text-lg">
                  Rp {subtotal.toLocaleString()}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Ongkos Kirim</p>
                <p className="font-semibold text-lg">
                  Rp {shippingCost.toLocaleString()} {/* Display dynamic shipping cost */}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>Total</p>
                <p className="font-semibold text-lg">
                  Rp {(subtotal + shippingCost).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold">Metode Pembayaran</h3>
              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={setSelectedPaymentMethod}
                className="font-semibold text-xl flex flex-col gap-5"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MIDTRANS" id="midtrans" />
                  <Label htmlFor="midtrans">Midtrans (Virtual Account)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="MANUAL" id="manual" />
                  <Label htmlFor="manual">Manual Transfer</Label>
                </div>
              </RadioGroup>

              {/* Bank Transfer Options */}
              {selectedPaymentMethod === "MIDTRANS" && (
                <div className="flex flex-col gap-5">
                  <h3 className="font-semibold">Pilih Bank Transfer</h3>
                  <RadioGroup
                    value={selectedBank}
                    onValueChange={setSelectedBank}
                    className="font-semibold text-xl flex flex-col gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BCA" id="bca" />
                      <Label htmlFor="bca">BCA</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BRI" id="bri" />
                      <Label htmlFor="bri">BRI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="BNI" id="bni" />
                      <Label htmlFor="bni">BNI</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="CIMB" id="cimb" />
                      <Label htmlFor="cimb">CIMB</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              <div className="flex flex-col gap-5">
                <h3 className="font-semibold">Pilih Ongkos Kirim</h3>
                <RadioGroup
                  value={selectedShippingMethod}
                  onValueChange={setSelectedShippingMethod}
                  className="font-semibold text-xl flex flex-col gap-5"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="jne" id="jne" />
                    <Label htmlFor="jne">JNE Regular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="tiki" id="tiki" />
                    <Label htmlFor="tiki">TIKI Express</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pos" id="pos" />
                    <Label htmlFor="pos">POS Kilat</Label>
                  </div>
                </RadioGroup>
              </div>

              <Buttons
                className="w-fit self-center font-semibold !px-10 !py-2"
                onClick={handleCheckout}
              >
                Checkout Now
              </Buttons>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
