"use client"
import {FC} from "react";
import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
} from "@/components/ui/chart"
import useCategorySales from "@/hooks/useCategorySales";
import {DashboardChartProps} from "@/app/dashboard/components/DashboardCharts/type";

const chartConfig = {
    Beverages: {
        label: "Beverages",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

const CategorySalesChart: FC<DashboardChartProps> = ({warehouse, date}) => {
    const {data, isLoading, error} = useCategorySales(warehouse.id, date)
    return (
        <Card className="col-span-1 flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Category Sales</CardTitle>
                <CardDescription>{date.toLocaleString('default', {month: "long"})} {date.toLocaleString('default', {year: "numeric"})}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[300px]"
                >
                    <PieChart>
                        <Pie data={data} dataKey="revenue" />
                        <ChartLegend
                            content={<ChartLegendContent nameKey="name" />}
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default CategorySalesChart