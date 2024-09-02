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
import {FC} from "react";
import { Field, FieldProps, FormikValues} from "formik";
import {Label} from "@/components/ui/label";
import useCategories from "@/hooks/useCategories";


const CategorySelector: FC = () => {
    const {data, isLoading, error} = useCategories()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<string>("")

    return (
        <Field name={"descriptionId"} id={"descriptionId"}>
            {({ field, form }: FieldProps<any, FormikValues>) => (
                <div className={"flex flex-col gap-3 lg:grid lg:grid-cols-3"}>
                    <Label htmlFor={"descriptionId"} className={"col-span-1"}>Category</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between col-span-2"
                            >
                                {value
                                    ? data?.find((category) => category.name === value)?.name
                                    : "Select category..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search category..." />
                                <CommandList>
                                    <CommandEmpty>No category found.</CommandEmpty>
                                    <CommandGroup>
                                        {data?.map((category) => (
                                            <CommandItem
                                                key={category.id}
                                                value={category.name}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue);
                                                    form.setFieldValue("categoryId", category.id);
                                                    setOpen(false)
                                                    console.log(currentValue)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === category.name ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {category.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
            )}
        </Field>
    )
}

export default CategorySelector
