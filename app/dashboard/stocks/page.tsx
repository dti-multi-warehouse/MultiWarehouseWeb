import {FC} from "react";
import StockTable from "@/app/dashboard/stocks/components/StockTable";
import StockHeader from "@/app/dashboard/stocks/components/StockHeader";

const StocksDashboardPage: FC = () => {
    return (
        <main>
            <StockHeader />
            <StockTable />
        </main>
    )
}

export default StocksDashboardPage