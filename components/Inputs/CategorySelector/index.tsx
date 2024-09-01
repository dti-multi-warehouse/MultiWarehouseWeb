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

const frameworks = [
    {
        value: 1,
        label: "Next.js",
    },
    {
        value: 2,
        label: "SvelteKit",
    },
    {
        value: 3,
        label: "Nuxt.js",
    },
    {
        value: 4,
        label: "Remix",
    },
    {
        value: 5,
        label: "Astro",
    },
]

const CategorySelector: FC = () => {
    // TODO: fetch all categories
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState<number>(0)

    return (
        <Field name={"descriptionId"} id={"descriptionId"}>
            {({ field, form }: FieldProps<any, FormikValues>) => (
                <>
                    <Label htmlFor={"descriptionId"}>Framework</Label>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={open}
                                className="w-[200px] justify-between"
                            >
                                {value
                                    ? frameworks.find((framework) => framework.value === value)?.label
                                    : "Select category..."}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput placeholder="Search framework..." />
                                <CommandList>
                                    <CommandEmpty>No framework found.</CommandEmpty>
                                    <CommandGroup>
                                        {frameworks.map((framework) => (
                                            <CommandItem
                                                key={framework.value}
                                                value={framework.value.toString()}
                                                onSelect={(currentValue) => {
                                                    setValue(currentValue === value.toString() ? 0 : parseInt(currentValue, 10));
                                                    form.setFieldValue("categoryId", parseInt(currentValue, 10));
                                                    setOpen(false)
                                                }}
                                            >
                                                <Check
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === framework.value ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                                {framework.label}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </>
            )}
        </Field>
    )
}

export default CategorySelector
