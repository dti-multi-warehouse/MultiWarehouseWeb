"use client";

import React, { useState } from "react";
import Image from "next/image";
import Buttons from "@/components/Buttons";
import { productCards } from "@/types/datatypes";
import { useSession } from "next-auth/react";
import { useGetProfile } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";
import { useAddToCart } from "@/hooks/useCart";
import {useRouter} from "next/navigation";

const Index: React.FC<productCards> = ({ thumbnail, name, price, stock, id }) => {
  const { data: session, status } = useSession(); 
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const router = useRouter();

  const addToCart = useAddToCart();

  const isAuthenticated = status === "authenticated";
  const isVerified = profile?.verified;

  const handleButtonClick = () => {
    if (!isAuthenticated) {
      setDialogMessage("You need to login to buy this product.");
      setDialogOpen(true);
    } else if (!isVerified) {
      setDialogMessage("Please verify your email to buy this product.");
      setDialogOpen(true);
    } else {
      if (id) {
        addToCart.mutate(
          { productId: id, quantity: 1 },
          {
            onSuccess: () => {
              setDialogMessage("Product added to cart!");
              setDialogOpen(true);
            },
            onError: () => {
              setDialogMessage("Failed to add product to cart. Please try again.");
              setDialogOpen(true);
            },
          }
        );
      } else {
        setDialogMessage("Invalid product. Please try again.");
        setDialogOpen(true);
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCardClick = () => {
    router.push("/product/" + id)
  }

  return (
<div className="flex flex-col gap-2 min-w-[150px] h-full max-w-[200px] hover:bg-white shadow-antiMetal shadow-transparent hover:scale-105 hover:shadow-gray-200 rounded-xl transition-all duration-500">
      <Image
        src={thumbnail}
        width={200}
        height={200}
        alt={name}
        onClick={handleCardClick}
        className={"hover: cursor-pointer"}
      />
      <div
          className="flex flex-col gap-2.5 p-5 h-full justify-end hover:cursor-pointer"
          onClick={handleCardClick}
      >
        <h2 className="font-medium line-clamp-2">{name}</h2>
        <p className="font-semibold text-gray-500">Stok dari toko</p>
        <p className="font-bold text-red-600">Rp {price.toLocaleString()}</p>
      </div>
      <div className={"p-5"}>
        <Buttons
            className={`w-full !py-2 !px-10 self-center text-sm font-semibold whitespace-nowrap ${
                stock < 1 || !isAuthenticated || !isVerified ? "!bg-gray-300 !text-gray-800" : "!bg-red-600"
            }`}
            onClick={handleButtonClick}
            disabled={stock < 1 }
        >
          {stock < 1 ? "Stock Kosong" : "Beli"}
        </Buttons>
      </div>

      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        onAction={handleDialogClose}
        cancelVisibility="hidden"
      />
    </div>
  );
};

export default Index;
