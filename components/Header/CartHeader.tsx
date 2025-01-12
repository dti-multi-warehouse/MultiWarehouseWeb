"use client";

import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGetProfile } from "@/hooks/useUser";
import { useCart } from "@/hooks/useCart";
import AlertDialog from "@/components/AlertDialog";

interface CardHeaderProps{
  className?: string;
  qtyClassName?: string;
}

const CartHeader: React.FC<CardHeaderProps> = ({ className, qtyClassName }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const { cart } = useCart(); 

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [totalItems, setTotalItems] = useState(0);

  const isAuthenticated = status === "authenticated";
  const isVerified = profile?.verified;

  useEffect(() => {
    if (isAuthenticated && cart?.data?.cartItems) {
      const totalQuantity = cart.data.cartItems.reduce((total, item) => total + item.quantity, 0);
      setTotalItems(totalQuantity);
    } else {
      setTotalItems(0);
    }
  }, [cart, isAuthenticated]);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setDialogMessage("Please log in to view your cart.");
      setDialogOpen(true);
    } else if (!isVerified) {
      setDialogMessage("Please verify your email to access your cart.");
      setDialogOpen(true);
    } else {
      router.push("/cart");
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className={`${className} flex items-center text-red-600 gap-1 hover:scale-105 transition-all`}
          onClick={handleCartClick}
        >
          <IoCartOutline className="text-3xl" />
          {totalItems > 0 && (
            <span className={`${qtyClassName} absolute -top-1 -right-2 bg-red-200 px-2 rounded-full text-sm font-bold`}>
              {totalItems}
            </span>
          )}
        </button>
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

export default CartHeader;
