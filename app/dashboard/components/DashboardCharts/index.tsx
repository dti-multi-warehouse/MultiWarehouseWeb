import {FC} from "react";
import TotalSalesChart from "@/app/dashboard/components/DashboardCharts/TotalSalesChart";
import CategorySalesChart from "@/app/dashboard/components/DashboardCharts/CategorySalesChart";
import ProductSalesChart from "@/app/dashboard/components/DashboardCharts/ProductSalesChart";


const DashboardCharts: FC = () => {
    return (
        <div>
            <TotalSalesChart />
            <CategorySalesChart />
            <ProductSalesChart />
        </div>
    )
}

export default DashboardCharts;