import {FC} from "react";
import TotalSalesChart from "@/app/dashboard/components/DashboardCharts/TotalSalesChart";
import CategorySalesChart from "@/app/dashboard/components/DashboardCharts/CategorySalesChart";
import ProductSalesChart from "@/app/dashboard/components/DashboardCharts/ProductSalesChart";
import useDashboardStore from "@/hooks/useDashboardStore";


const DashboardCharts: FC = () => {
    const warehouse = useDashboardStore(state => state.warehouse)
    const date = useDashboardStore(state => state.date)
    return (
        <div className={"lg:grid lg:grid-cols-2 max-lg:space-y-4 lg:gap-4"}>
            <TotalSalesChart warehouse={warehouse} date={date}/>
            <CategorySalesChart warehouse={warehouse} date={date}/>
            <ProductSalesChart warehouse={warehouse} date={date} />
        </div>
    )
}

export default DashboardCharts;