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

interface StockDrawerDialogProps {
    children: ReactNode
}

const StockDrawerDialog: FC<StockDrawerDialogProps> = ({children}) => {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className={"sm:max-w-[425px]"}>
                    <DialogHeader>
                        <DialogTitle>Restock</DialogTitle>
                    </DialogHeader>
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
                    <DrawerTitle>Restock</DrawerTitle>
                    <DrawerFooter className={"pt-2"}>
                        <DrawerClose asChild>
                            <Button variant={"outline"}>Cancel</Button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerHeader>
            </DrawerContent>
        </Drawer>
    )
}

export default StockDrawerDialog