'use client'
import {FC} from "react";
import TotalSalesChart from "@/app/dashboard/components/DashboardCharts/TotalSalesChart";
import CategorySalesChart from "@/app/dashboard/components/DashboardCharts/CategorySalesChart";
import ProductSalesChart from "@/app/dashboard/components/DashboardCharts/ProductSalesChart";
import useDashboardStore from "@/hooks/useDashboardStore";
import useSalesReport from "@/hooks/useSalesReport";
import ChartSkeleton from "@/app/dashboard/components/DashboardCharts/ChartSkeleton";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";


const DashboardCharts: FC = () => {
    const warehouse = useDashboardStore(state => state.warehouse)
    const date = useDashboardStore(state => state.date)
    const {data, isLoading, error} = useSalesReport(warehouse.id, date)
    const month = `${date.toLocaleString('default', {month: "long"})} ${date.toLocaleString('default', {year: "numeric"})}`

    if (isLoading) {
        return (
            <div className={"lg:grid lg:grid-cols-2 max-lg:space-y-4 lg:gap-4"}>
                <ChartSkeleton className={"col-span-1"} />
                <ChartSkeleton className={"col-span-1"}/>
                <ChartSkeleton className={"col-span-2"}/>
            </div>
        )
    }

    if (!data
        || data.productSales.length <= 0
        || data.categorySales.length <= 0
        || data.totalSales.sales.length <= 0
    ) {
        const title = date < new Date() ? "We didn't make any sales" : "We haven't made any sales"
        const description = date < new Date() ? "Well, what's in the past is in the past!" : "Let's pray that it will be a bountiful month!"
        return (
            <Card className={"flex flex-col justify-center items-center h-96"}>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{description}</CardDescription>
                </CardContent>
            </Card>
        )
    }

    if (error) {
        return <p>error</p>
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