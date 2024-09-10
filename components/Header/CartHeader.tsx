"use client";

import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useGetProfile } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";

const CartHeader: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { profile, isLoading: isProfileLoading } = useGetProfile();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const isAuthenticated = status === "authenticated";
  const isVerified = profile?.verified;

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
          className="flex items-center text-red-600 gap-1 hover:scale-105 transition-all"
          onClick={handleCartClick}
        >
          <IoCartOutline className=" text-3xl" />
          <span className="absolute -top-1 -right-2 bg-red-200 px-2 rounded-full text-sm font-bold">
            5
          </span>
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
