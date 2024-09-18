"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Buttons from "@/components/Buttons";
import CartItems from "./components/CartItems";
import { useEffect, useState } from "react";
import { useGetProfile } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";
import { useCart } from "@/hooks/useCart";

const Cart: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { profile, isLoading: isProfileLoading, error } = useGetProfile();
  
  const { cart, isLoading: isCartLoading, error: cartError } = useCart();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const isAuthenticated = status === "authenticated";
  const isVerified = profile?.verified;

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (isAuthenticated && !isProfileLoading && !isVerified) {
      setDialogMessage("Please verify your email to access the cart.");
      setDialogOpen(true);
    }
  }, [isAuthenticated, isProfileLoading, isVerified]);

  if (status === "loading" || isProfileLoading || isCartLoading) {
    return <div>Loading...</div>; 
  }

  if (cartError) {
    return <div>Error loading cart data</div>; 
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    router.push("/");
  };

  return (
    <>
      <div className="m-10 w-full flex flex-col gap-5">
        <h1 className="font-bold text-xl">Keranjang</h1>
        <div className="flex gap-5 items-start">
          <div className="flex w-[60%] flex-col gap-5">
            <div className="h-2 w-full bg-gray-200 rounded-lg "></div>
            <h2 className="font-semibold">Daftar Stok dari Gudang</h2>
            <CartItems /> 
          </div>
          <div className="flex w-[40%] px-20">
            <div className="p-5 w-full rounded-xl shadow-boxedSoft shadow-gray-400 bg-gray-200 h-fit flex flex-col gap-5">
              <h2 className="text-lg font-semibold">Pesanan</h2>
              <hr className="border-gray-900 border-dashed" />
              <div className="flex items-center justify-between">
                <p className="text-gray-700 font-semibold">Subtotal</p>
                <p className="text-xl font-semibold">
                  Rp {cart?.totalPrice || 0} 
                </p>
              </div>
              <Buttons
                className={`py-2 text-sm font-semibold mt-2 ${!isVerified ? "!bg-gray-300 !text-gray-800" : ""}`}
                disabled={!isVerified}
              >
                Checkout Sekarang
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

export default Cart;
