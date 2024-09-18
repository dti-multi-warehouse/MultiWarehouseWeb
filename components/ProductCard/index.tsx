"use client";

import { FC, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Buttons from "@/components/Buttons";
import Image from "next/image";
import { ProductSummary } from "@/types/product";
import { useSession } from "next-auth/react"; 
import { useGetProfile } from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";
import { useAddToCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: ProductSummary;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { data: session, status } = useSession(); 
  const { profile, isLoading: isProfileLoading } = useGetProfile();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const addToCart = useAddToCart();

  const isAuthenticated = status === "authenticated";
  const isVerified = profile?.verified;

  const handleBuy = () => {
    if (!isAuthenticated) {
      setDialogMessage("You need to login to buy this product.");
      setDialogOpen(true);
    } else if (!isVerified) {
      setDialogMessage("Please verify your email to buy this product.");
      setDialogOpen(true);
    } else {
      addToCart.mutate({
        productId: product.id, 
        quantity: 1,
      });
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <Card className={"w-[175px] lg:w-[200px] border-0 flex flex-col justify-between"}>
      <CardContent>
        <Image src={"/product.png"} alt={"Product image"} width={200} height={200} />
        <div className={'flex flex-col gap-2.5 mt-6'}>
          <p>{product.name}</p>
          <p>Rp{product.price.toLocaleString()}</p>
        </div>
      </CardContent>
      <CardFooter className={"self-center"}>
        <Buttons
          className={`bg-red-500 px-14 py-2 rounded-2xl text-white`}
          onClick={handleBuy} 
        >
          Buy
        </Buttons>
      </CardFooter>
      <AlertDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage}
        onAction={handleDialogClose}
        cancelVisibility="hidden"
      />
    </Card>
  );
};

export default ProductCard;
