"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/hooks/useCart';
import CartItems from './components/CartItems';
import Buttons from '@/components/Buttons';
import { useSession } from 'next-auth/react';
import { useGetProfile } from '@/hooks/useUser';
import AlertDialog from '@/components/AlertDialog';
import dynamic from 'next/dynamic';

const Cart: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const { cart, isLoading: isCartLoading, error: cartError } = useCart();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [isTotalLoading, setIsTotalLoading] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const isAuthenticated = status === "authenticated";
  const isVerified = profile?.verified;

  useEffect(() => {
    if (typeof window !== 'undefined' && status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== 'undefined' && isAuthenticated && !isProfileLoading && !isVerified) {
      setDialogMessage("Please verify your email to access the cart.");
      setDialogOpen(true);
    }
  }, [isAuthenticated, isProfileLoading, isVerified]);

  useEffect(() => {
    if (isCartLoading) {
      setIsTotalLoading(true);
    } else {
      setTimeout(() => {
        setIsTotalLoading(false);
      }, 300); // Smooth transition delay
    }
  }, [cart, isCartLoading]);

  if (status === "loading" || isProfileLoading || isCartLoading) {
    return (
      <div className="p-5 md:p-10 flex h-screen w-screen items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (cartError) {
    return <div>Error loading cart data</div>;
  }

  const handleCheckout = () => {
    if (isVerified) {
      setIsCheckoutLoading(true);
      setTimeout(() => {
        router.push("/checkout");
      }, 1000);
    } else {
      setDialogMessage("You need to verify your account before proceeding to checkout.");
      setDialogOpen(true);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/");
  };

  return (
    <>
      <div className="p-5 md:p-10 w-full flex flex-col gap-5">
        <h1 className="font-bold text-xl">Keranjang</h1>
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          <div className="flex w-full lg:w-[60%] flex-col gap-5">
            <div className="h-2 w-full bg-gray-200 rounded-lg"></div>
            <h2 className="font-semibold">Daftar Stok dari Gudang</h2>
            <CartItems />
          </div>
          <div className="flex w-full lg:w-[40%] lg:px-20">
            <div className="p-5 w-full rounded-xl shadow-boxedSoft border-2 border-gray-300 shadow-gray-400 bg-gray-200 h-fit flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Pesanan</h2>
              <hr className="border-gray-900 border-dashed" />
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-semibold">Subtotal</p>
                {isTotalLoading ? (
                  <p className="text-xl font-semibold animate-pulse opacity-50 transition-opacity">
                    Loading...
                  </p>
                ) : (
                  <p className="text-xl font-semibold">Rp {cart?.data?.totalPrice?.toLocaleString() || 0}</p>
                )}
              </div>
              <Buttons
                className={`py-2 text-sm font-semibold mt-2 ${!isVerified ? "!bg-gray-300 !text-gray-800" : ""}`}
                disabled={!isVerified || isCheckoutLoading}
                onClick={handleCheckout}
              >
                {isCheckoutLoading ? "Ke Checkout..." : "Checkout Sekarang"}
              </Buttons>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        onAction={handleDialogClose}
        cancelVisibility="hidden"
      />
    </>
  );
};

export default dynamic(() => Promise.resolve(Cart), { ssr: false });
