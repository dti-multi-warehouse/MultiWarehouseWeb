import {FC} from "react";
import TotalSalesChart from "@/app/dashboard/components/DashboardCharts/TotalSalesChart";
import CategorySalesChart from "@/app/dashboard/components/DashboardCharts/CategorySalesChart";
import ProductSalesChart from "@/app/dashboard/components/DashboardCharts/ProductSalesChart";
import useDashboardStore from "@/hooks/useDashboardStore";
import useSalesReport from "@/hooks/useSalesReport";


const DashboardCharts: FC = () => {
    const warehouse = useDashboardStore(state => state.warehouse)
    const date = useDashboardStore(state => state.date)
    const {data, isLoading, error} = useSalesReport(warehouse.id, date)
    const month = `${date.toLocaleString('default', {month: "long"})} ${date.toLocaleString('default', {year: "numeric"})}`

    if (!data) {
        return <></>
    }

    return (
        <div className={"lg:grid lg:grid-cols-2 max-lg:space-y-4 lg:gap-4"}>
            <TotalSalesChart totalSales={data.totalSales} month={month}/>
            <CategorySalesChart categorySales={data.categorySales} month={month}/>
            <ProductSalesChart productSales={data.productSales} month={month} />
        </div>
    )
}

export default DashboardCharts;