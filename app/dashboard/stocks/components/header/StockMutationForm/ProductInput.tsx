"use client"
import {FC, useState} from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image";
import useProductAndStockAvailability from "@/hooks/useProductAndStockAvailability";
import {useFormikContext} from "formik";


interface ProductInputValue {
    productId: number
}


const ProductInput: FC = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>("")
    const { values, setFieldValue } = useFormikContext<ProductInputValue>()
    const { data, isLoading, error } = useProductAndStockAvailability(3)

    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? data.find((product) => product.name === value)?.name
                        : "Select product..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align={"start"} className="min-w-full p-0">
                <Command>
                    <CommandInput placeholder="Search product..." />
                    <CommandList className={"no-scrollbar"}>
                        <CommandEmpty>No product found.</CommandEmpty>
                        <CommandGroup>
                                {data?.map( product => (
                                    <CommandItem
                                        key={product.name}
                                        value={product.name}
                                        onSelect={(currentValue) => {
                                            setFieldValue("productId", product.productId)
                                            setValue(currentValue === value ? null : currentValue)
                                            setOpen(false)
                                        }}
                                        className={"flex justify-between h-20"}
                                    >
                                        <div className={"flex gap-4 items-end"}>
                                            <Image src={product.thumbnail} alt={"pic"} width={50} height={50} />
                                            <div>
                                                <p className={"text-xs font-light"}>ID: {product.productId}</p>
                                                <p className={"font-semibold"}>{product.name}</p>
                                                <p className={"text-gray-500 text-xs"}>In stock: {product.stock}</p>
                                            </div>
                                        </div>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === product.name ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default ProductInput