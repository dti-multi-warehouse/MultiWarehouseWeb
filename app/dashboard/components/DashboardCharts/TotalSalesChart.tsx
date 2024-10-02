import {FC} from "react";
import { TrendingUp, Loader2 } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import useDashboardStore from "@/hooks/useDashboardStore";
import useTotalSales from "@/hooks/useTotalSales";

const chartConfig = {
    revenue: {
        label: "Revenue",
        color: "hsl(var(--chart-1))",
    }
} satisfies ChartConfig

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const TotalSalesChart: FC = () => {
    const warehouse = useDashboardStore(state => state.warehouse)
    const date = useDashboardStore(state => state.date)
    const {data, isLoading, error} = useTotalSales(warehouse.id, date)

    if (isLoading) return (
        <Card>
            <CardContent className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </CardContent>
        </Card>
    )

    if (error) return (
        <Card>
            <CardContent className="flex items-center justify-center h-64 text-red-500">
                Error loading data
            </CardContent>
        </Card>
    )

    if (!data) return null;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={data.sales}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis
                                dataKey="saleDate"
                                tickFormatter={formatDate}
                                tickMargin={8}
                            />
                            <YAxis />
                            <ChartTooltip
                                content={<ChartTooltipContent />}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke={chartConfig.revenue.color}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    Total Revenue: Rp.{data.totalRevenue.toLocaleString()}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total sales for the selected period
                </div>
            </CardFooter>
        </Card>
    )
}

export default TotalSalesChart