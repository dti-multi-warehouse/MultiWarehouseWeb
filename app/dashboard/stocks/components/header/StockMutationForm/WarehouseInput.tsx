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
import useWarehouseAndStockAvailability from "@/hooks/useWarehouseAndStockAvailability";
import {useFormikContext} from "formik";

interface WarehouseFormValue {
    productId: number
    warehouseFromId: number
    warehouseToId: number
    maxQuantity: number
    quantity: number
}

const WarehouseInput: FC = () => {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<string>("")
    const { values, setFieldValue } = useFormikContext<WarehouseFormValue>()
    const { data, isLoading, error } = useWarehouseAndStockAvailability(values.warehouseToId, values.productId)


    console.log(data)
    return (
        <Popover open={open} onOpenChange={setOpen} modal={true}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                    disabled={values.productId === 0}
                >
                    {value
                        ? data?.find((warehouse) => warehouse.warehouseName === value)?.warehouseName
                        : "Select warehouse..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent align={"start"} className="p-0">
                <Command>
                    <CommandInput placeholder="Search warehouse..." />
                    <CommandList className={"no-scrollbar"}>
                        <CommandEmpty>No warehouse found.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((warehouse) => (
                                <CommandItem
                                    key={warehouse.warehouseId}
                                    value={warehouse.warehouseName}
                                    onSelect={(currentValue) => {
                                        setFieldValue("warehouseFromId", warehouse.warehouseId)
                                        setFieldValue("maxQuantity", warehouse.stock)
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                    className={"flex justify-between h-16"}
                                >
                                    <div className={"flex flex-col gap-1"}>
                                        <p>{warehouse.warehouseName}</p>
                                        <p className={cn(
                                            "text-gray-500 text-xs",
                                            warehouse.stock < 50 && "text-red-600",
                                            warehouse.stock >= 50 && "text-yellow-600",
                                            warehouse.stock >= 100 && "text-green-600",
                                        )}>In stock: {warehouse.stock}</p>
                                    </div>
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === warehouse.warehouseName ? "opacity-100" : "opacity-0"
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

export default WarehouseInput;