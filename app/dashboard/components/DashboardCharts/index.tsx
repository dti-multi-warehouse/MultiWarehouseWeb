import {FC} from "react";
import TotalSalesChart from "@/app/dashboard/components/DashboardCharts/TotalSalesChart";
import CategorySalesChart from "@/app/dashboard/components/DashboardCharts/CategorySalesChart";


const DashboardCharts: FC = () => {
    return (
        <div>
            <TotalSalesChart />
            <CategorySalesChart />
        </div>
    )
}

export default DashboardCharts;