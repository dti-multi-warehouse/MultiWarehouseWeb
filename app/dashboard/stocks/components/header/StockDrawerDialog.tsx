'use client'
import {FC, ReactNode, useState} from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "@/components/ui/drawer";
import {Button} from "@/components/ui/button";
import StockMutationForm from "./StockMutationForm";
import useDashboardStore from "@/hooks/useDashboardStore";

interface StockDrawerDialogProps {
    children: ReactNode
}

const StockDrawerDialog: FC<StockDrawerDialogProps> = ({children}) => {
    const [open, setOpen] = useState(false)
    const warehouse = useDashboardStore(state => state.warehouse)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className={"sm:max-w-[425px]"}>
                    <DialogHeader>
                        <DialogTitle>Manage Stock</DialogTitle>
                        <p className={"text-gray-500 text-sm"}>{warehouse.name}</p>
                    </DialogHeader>
                    <StockMutationForm setOpen={setOpen} warehouseId={warehouse.id} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className={"text-left"}>
                    <DrawerTitle>Manage Stock</DrawerTitle>
                </DrawerHeader>
                <StockMutationForm setOpen={setOpen} warehouseId={warehouse.id}/>
                    <DrawerFooter className={"pt-2"}>
                        <DrawerClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default StockDrawerDialog

