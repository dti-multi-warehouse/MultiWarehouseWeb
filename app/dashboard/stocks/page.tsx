'use client'
import {FC, useState} from "react";
import StockTable from "./components/StockTable";
import StockHeader from "./components/header";
import StockDetailsView from "@/app/dashboard/stocks/components/StockDetailsView";

const StocksDashboardPage: FC = () => {
    const [query, setQuery] = useState("")
    return (
        <main className={"lg:grid grid-cols-2 gap-2"}>
            <div className={"col-span-1 border-r"}>
                <StockHeader setQuery={setQuery}  query={query}/>
                <StockTable query={query}/>
            </div>
            <StockDetailsView />
        </main>
    )
}

export default StocksDashboardPage