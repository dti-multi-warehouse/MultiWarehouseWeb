'use client'
import {Dispatch, FC, SetStateAction} from "react";

import { Button } from "@/components/ui/button"
import {Minus, Plus} from "lucide-react";

interface Props {
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
}

const CartQuantity: FC<Props> = ({quantity, setQuantity}) => {
    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity( prev => prev - 1)
        }
    }
    return <div className={"flex items-center justify-center gap-2.5"}>
        <p>Quantity: </p>
        <Button variant={"ghost"} size={"icon"} onClick={handleDecrement}>
            <Minus />
        </Button>
        <p>{quantity}</p>
        <Button variant={"ghost"} size={"icon"} onClick={handleIncrement}>
            <Plus />
        </Button>
    </div>
}

export default CartQuantity