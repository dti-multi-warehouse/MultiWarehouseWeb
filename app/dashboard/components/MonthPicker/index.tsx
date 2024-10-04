"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react"
import { format, addYears, subYears } from "date-fns"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import useDashboardStore from "@/hooks/useDashboardStore";

const MonthPicker = () => {
    const date = useDashboardStore((state) => state.date)
    const setDate = useDashboardStore((state) => state.setDate)
    const [isOpen, setIsOpen] = useState(false)

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const handleYearChange = (next: boolean) => {
        const newDate = next ? addYears(date, 1) : subYears(date, 1)
        setDate(newDate)
    }

    const handleMonthSelect = (monthIndex: number) => {
        const newDate = new Date(date.getFullYear(), monthIndex, 15)
        setDate(newDate)
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={"w-full justify-start text-left font-normal"}
                >
                    <CalendarIcon className={"mr-2 h-4 w-4"} />
                    {format(date, "MMMM yyyy")}
                </Button>
            </PopoverTrigger>
            <PopoverContent className={"w-auto p-0"} align={"start"}>
                <div className={"p-2"}>
                    <div className={"flex items-center justify-between mb-2"}>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className={"h-7 w-7"}
                            onClick={() => handleYearChange(false)}
                        >
                            <ChevronLeft className={"h-4 w-4"} />
                        </Button>
                        <div className={"font-semibold"}>{date.getFullYear()}</div>
                        <Button
                            variant={"outline"}
                            size={"icon"}
                            className={"h-7 w-7"}
                            onClick={() => handleYearChange(true)}
                        >
                            <ChevronRight className={"h-4 w-4"} />
                        </Button>
                    </div>
                    <div className={"grid grid-cols-3 gap-2"}>
                        {months.map((month, index) => (
                            <Button
                                key={month}
                                variant={"outline"}
                                className={`h-9 ${
                                    index === date.getMonth() ? "bg-primary text-primary-foreground" : ""
                                }`}
                                onClick={() => handleMonthSelect(index)}
                            >
                                {month}
                            </Button>
                        ))}
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default MonthPicker