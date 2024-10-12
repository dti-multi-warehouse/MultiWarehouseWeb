'use client'
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
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
import {FC} from "react";
import AddCategoryForm from "@/app/dashboard/categories/components/AddCategoryForm";
import EditCategoryForm from "@/app/dashboard/categories/components/EditCategoryForm";

interface CategoryDrawerDialogProps {
    children: React.ReactNode,
    mode: 'create' | 'update',
    id?: number
}

const CategoryDrawerDialog: FC<CategoryDrawerDialogProps> = ({children, mode, id}) => {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    const title = mode === "create" ? "Add new category" : "Update category"

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                    </DialogHeader>
                    {mode === "create" && <AddCategoryForm setOpen={setOpen} className={"flex flex-col gap-2"} />}
                    {mode === "update" && id && <EditCategoryForm id={id} setOpen={setOpen} className={"flex flex-col gap-2"} />}
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
                <DrawerHeader className="text-left">
                    <DrawerTitle>{title}</DrawerTitle>
                </DrawerHeader>
                {mode === "create" && <AddCategoryForm setOpen={setOpen} className={"flex flex-col px-4 gap-2"} />}
                {mode === "update" && id && <EditCategoryForm id={id} setOpen={setOpen} className={"flex flex-col px-4 gap-2"} />}
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default CategoryDrawerDialog