'use client'
import React, {FC, useState} from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import CartQuantity from "@/components/CartQuantity";
import {Button} from "@/components/ui/button";
import {useAddToCart} from "@/hooks/useCart";
import {useSession} from "next-auth/react";
import {useGetProfile} from "@/hooks/useUser";
import AlertDialog from "@/components/AlertDialog";


const CTA: FC<{id: number | undefined, stock: number | undefined}> = ({id, stock}) => {
    const [quantity, setQuantity] = useState<number>(1)
    const { data: session, status } = useSession();
    const { profile, isLoading: isProfileLoading } = useGetProfile();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    const addToCart = useAddToCart()

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
                    { productId: id, quantity: quantity },
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

    return <Card className={"col-span-1 order-2 xl:order-3 border-0"}>
        <CardContent className={"flex flex-col gap-2.5"}>
            <CartQuantity quantity={quantity} setQuantity={setQuantity} />
            {stock ? (
                <Button
                    className={`w-full !py-2 !px-10 self-center text-sm font-semibold whitespace-nowrap ${
                        stock < 1 || !isAuthenticated || !isVerified ? "!bg-gray-300 !text-gray-800" : "!bg-red-600"
                    }`}
                    onClick={handleButtonClick}
                    disabled={stock < 1 }
                >
                    Add to cart
                </Button>
            ) : (
                <Button
                    className={'w-full !py-2 !px-10 self-center text-sm font-semibold whitespace-nowrap !bg-gray-300 !text-gray-800'}
                    disabled
                >
                    Stock habis
                </Button>
            )
            }

        </CardContent>

        <AlertDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            title={dialogMessage}
            onAction={handleDialogClose}
            cancelVisibility="hidden"
        />
    </Card>

}

export default CTA;