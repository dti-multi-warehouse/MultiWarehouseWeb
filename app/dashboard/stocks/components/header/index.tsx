import {FC} from "react";
import {Button} from "@/components/ui/button";
import RequestSheet from "./RequestSheet";
import StockDrawerDialog from "./StockDrawerDialog";


const StockHeader: FC = () => {
    return (
        <div className={"flex justify-between p-8 border-b"}>
            <h1 className={"text-3xl font-semibold"}>Stocks</h1>
            <div className={"space-x-4"}>
                <RequestSheet />
                <StockDrawerDialog>
                    <Button>Restock</Button>
                </StockDrawerDialog>
            </div>
        </div>
    )
}

export default StockHeader;