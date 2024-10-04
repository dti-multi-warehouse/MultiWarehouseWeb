"use client"
import {FC} from "react";
import {Loader2, TrendingUp} from "lucide-react"
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import useProductSales from "@/hooks/useProductSales";
import {DashboardChartProps} from "@/app/dashboard/components/DashboardCharts/type";

const ProductSalesChart: FC<DashboardChartProps> = ({warehouse, date}) => {
    const {data, isLoading, error} = useProductSales(warehouse.id, date)

    const month = `${date.toLocaleString('default', {month: "long"})} ${date.toLocaleString('default', {year: "numeric"})}`

    if (isLoading) return (
        <Card className={"h-64"}>
            <CardContent className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
        </Card>
    )

    if (error || !data) return (
        <Card className={"h-64"}>
            <CardContent className="flex items-center justify-center h-64 text-red-500">
                Error loading total sales data for {month}
            </CardContent>
        </Card>
    )

    if (data.length <= 0) return (
        <Card className={"flex items-center justify-center h-64"}>
            <CardContent>
                We haven&apos;t made any sales in {month} :(
            </CardContent>
        </Card>
    );

    return (
        <Card className={"col-span-2"}>
            <CardHeader>
                <CardTitle>Product Sales</CardTitle>
                <CardDescription>{date.toLocaleString('default', {month: "long"})} {date.toLocaleString('default', {year: "numeric"})}</CardDescription>
            </CardHeader>
            <CardContent className={"h-96"}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="revenue" fill="hsl(var(--chart-1))" activeBar={<Rectangle fill="hsl(var(--chart-2))"/>} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for {date.toLocaleString('default', {month: "long"})} {date.toLocaleString('default', {year: "numeric"})}
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductSalesChart