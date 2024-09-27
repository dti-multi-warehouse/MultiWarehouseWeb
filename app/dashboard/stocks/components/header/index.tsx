import {FC} from "react";
import {Button} from "@/components/ui/button";
import RequestSheet from "./RequestSheet";
import StockDrawerDialog from "./StockDrawerDialog";


const StockHeader: FC = () => {
    return (
        <div className={"flex flex-col lg:flex-row justify-between gap-4 p-8 border-b"}>
            <h1 className={"text-3xl font-semibold"}>Stocks</h1>
            <div className={"flex space-x-4 justify-between"}>
                <RequestSheet />
                <StockDrawerDialog>
                    <Button>Manage Stock</Button>
                </StockDrawerDialog>
            </div>
        </div>
    )
}

export default StockHeader;