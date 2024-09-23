import {FC} from "react";
import StockTable from "./components/StockTable";
import StockHeader from "./components/header";

const StocksDashboardPage: FC = () => {
    return (
        <main>
            <StockHeader />
            <StockTable />
        </main>
    )
}

export default StocksDashboardPage