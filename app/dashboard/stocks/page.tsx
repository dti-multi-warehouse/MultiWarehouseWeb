'use client'
import {FC} from "react";
import StockTable from "./components/StockTable";
import StockHeader from "./components/header";
import StockDetailsView from "@/app/dashboard/stocks/components/StockDetailsView";

const StocksDashboardPage: FC = () => {
    return (
        <main className={"grid grid-cols-2 gap-4"}>
            <div className={"col-span-1 border-r"}>
                <StockHeader />
                <StockTable/>
            </div>
            <StockDetailsView />
        </main>
    )
}

export default StocksDashboardPage