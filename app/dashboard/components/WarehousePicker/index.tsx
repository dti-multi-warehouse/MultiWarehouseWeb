"use client"

import * as React from "react"
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
import useWarehouseList from "@/hooks/useWarehouseList";
import useDashboardStore from "@/hooks/useDashboardStore";

const WarehousePicker = () => {
    const selectedWarehouse = useDashboardStore((state) => state.warehouse)
    const setWarehouse = useDashboardStore((state) => state.setWarehouse)
    const [open, setOpen] = React.useState(false)
    const {data, isLoading, error} = useWarehouseList()

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className={"flex justify-between items-center hover:cursor-pointer"}>
                    <p>
                        {selectedWarehouse.name}
                    </p>
                    <span>
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search warehouse..." />
                    <CommandList>
                        <CommandEmpty>No warehouse found.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((warehouse) => (
                                <CommandItem
                                    key={warehouse.name}
                                    value={warehouse.name}
                                    onSelect={() => {
                                        setWarehouse(warehouse)
                                        setOpen(false)
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedWarehouse.name === warehouse.name ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {warehouse.name}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default WarehousePicker