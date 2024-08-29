'use client'
import {FC, useState} from "react";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import CartQuantity from "@/components/CartQuantity";
import {Button} from "@/components/ui/button";


const CTA: FC = () => {
    const [quantity, setQuantity] = useState<number>(0)
    return <Card className={"col-span-1 border-0"}>
        <CardContent className={"flex flex-col gap-2.5"}>
            <CartQuantity quantity={quantity} setQuantity={setQuantity} />
            <Button className={"bg-red-500 items-center"}>Add to cart</Button>
        </CardContent>
    </Card>

}

export default CTA;