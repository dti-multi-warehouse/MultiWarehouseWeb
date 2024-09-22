import {FC} from "react";
import {Button} from "@/components/ui/button";


const StockHeader: FC = () => {
    return (
        <div className={"flex justify-between p-8 border-b"}>
            <h1 className={"text-3xl font-semibold"}>Stocks</h1>
            <Button>Restock</Button>
        </div>
    )
}

export default StockHeader;