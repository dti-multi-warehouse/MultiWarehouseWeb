import {Dispatch, FC, SetStateAction} from "react";
import {Button} from "@/components/ui/button";
import RequestSheet from "./RequestSheet";
import StockDrawerDialog from "./StockDrawerDialog";
import MonthPicker from "@/app/dashboard/components/MonthPicker";
import WarehousePicker from "@/app/dashboard/components/WarehousePicker";
import * as React from "react";
import {Input} from "@/components/ui/input";

interface StockHeaderProps {
    query: string
    setQuery: (query: string) => void
}

const StockHeader: FC<StockHeaderProps> = ({query, setQuery}) => {
    const isSuper= true

    return (
        <div className={"flex flex-col lg:flex-row justify-between gap-4 px-8 pt-4 pb-2 border-b"}>
            <div>
                <h1 className={"text-3xl font-semibold"}>Stocks</h1>
                <div className={"flex gap-1"}>
                    <p className={"font-semibold"}>Warehouse:</p>
                    {isSuper ? <WarehousePicker/> : <p>Warehouse Name</p>}
                </div>
            </div>
            <div className={"space-y-4"}>
                <div className={"flex space-x-4 justify-between"}>
                    <RequestSheet />
                    <StockDrawerDialog>
                        <Button>Manage Stock</Button>
                    </StockDrawerDialog>
                </div>
                <MonthPicker />
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={"Search for products..."}
                    className={"focus-visible:border-white"}
                />
            </div>
        </div>
    )
}

export default StockHeader;