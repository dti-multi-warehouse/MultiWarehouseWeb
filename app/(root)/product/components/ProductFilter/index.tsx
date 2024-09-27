import { FC, useState} from "react";
import {Button} from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import {Drawer, DrawerContent, DrawerTrigger} from "@/components/ui/drawer";
import FilterForm from "./FilterForm";



const ProductFilter:FC = () => {
    const [Open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (!isDesktop) {
        return (
            <Drawer open={Open} onOpenChange={setOpen}>
                <DrawerTrigger asChild >
                    <Button variant={"outline"}>Filter</Button>
                </DrawerTrigger>
                <DrawerContent>
                    <FilterForm />
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <div className={"col-span-1 p-4 rounded-lg shadow border h-fit"}>
            <FilterForm />
        </div>
    )
}

export default ProductFilter;

