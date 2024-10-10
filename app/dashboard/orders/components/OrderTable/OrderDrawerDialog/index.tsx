'use client'

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import useMediaQuery from "@/hooks/useMediaQuery";
import React, {FC, ReactNode, useState} from "react";
import {Order} from "@/types/order";
import StatusBadge from "app/dashboard/orders/components/OrderTable/StatusBadge";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import OrderActionButton from "@/app/dashboard/orders/components/OrderTable/OrderDrawerDialog/OrderActionButton";


interface OrderDrawerDialogProps extends Order{
    children: ReactNode;
}

const OrderDrawerDialog: FC<OrderDrawerDialogProps> = (props) => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {props.children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className={"flex justify-around"}>
                            <DialogTitle>Order Details <span className={"text-sm text-gray-500"}>#{props.id}</span></DialogTitle>
                            <StatusBadge status={props.status} />
                        </div>
                    </DialogHeader>
                    <OrderDrawerDialogContent {...props} />
                    <OrderActionButton status={props.status} id={props.id} setOpen={setOpen} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {props.children}
            </DrawerTrigger>
            <DrawerContent className={"max-h-96"}>
                <DrawerHeader className="flex justify-between">
                    <DrawerTitle>Order Details <span className={"text-sm text-gray-500"}>#{props.id}</span></DrawerTitle>
                    <StatusBadge status={props.status} />
                </DrawerHeader>
                <OrderDrawerDialogContent {...props}/>
                <DrawerFooter className="pt-2">
                    <OrderActionButton status={props.status} id={props.id} setOpen={setOpen} />
                    <DrawerClose asChild>
                        <Button variant="outline">Close</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default OrderDrawerDialog

const OrderDrawerDialogContent: FC<Order> = (props) => {
    return (
        <ScrollArea className={"h-[300px] w-full px-8 text-sm space-y-3"}>
            <div className={"mb-2"}>
                <div className={"flex gap-2 font-semibold"}>
                    <p>{props.createdAt.toLocaleString().split('T')[0]}</p>
                    <p>{props.createdAt.toLocaleString().split('T')[1].split(".")[0]}</p>
                </div>
                <TwoContent left={"Customer Id:"} right={"#" + props.userId.toString()} />
                <TwoContent left={"Customer"} right={props.userName} />
                <TwoContent left={"Email"} right={props.email} />
                <TwoContent left={"Phone"} right={props.phoneNumber} />
                <TwoContent left={"Street"} right={props.street} />
                <TwoContent left={"City"} right={props.city} />
                <TwoContent left={"Province"} right={props.province} />
                <TwoContent left={"Payment Method"} right={props.paymentMethod} />
                <TwoContent left={"Account Number"} right={props.accountNumber} />
                <TwoContent left={"Total Price"} right={props.price.toString()} />
            </div>
            <div className="h-0.5 w-full bg-gray-200 rounded-lg "></div>
            <div className={"space-y-0.5"}>
                {props.orderItems.map((item, index) => (
                    <div key={index} className={"flex justify-between items-center"}>
                        <div className={"flex items-center gap-1"}>
                            <Image src={item.thumbnail} alt={`${item.name} image`} width={50} height={50}/>
                            <p>{item.name}</p>
                        </div>
                        <p>x {item.quantity}</p>
                    </div>
                ))}
            </div>
            {props.paymentProof && (
                <Image src={props.paymentProof} alt={"Payment Proof"} width={500} height={500} />
            )}
        </ScrollArea>
    )
}

const TwoContent: FC<{left: string, right: string}> = ({left, right}) => {
    return (
        <div className={"flex justify-between"}>
            <p>{left}:</p>
            <p className={"max-w-48 text-right"}>{right}</p>
        </div>
    )
}
