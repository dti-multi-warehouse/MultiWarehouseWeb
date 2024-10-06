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
import {TotalSalesResponse} from "@/types/dashboard";

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

interface TotalSalesChartProps {
    totalSales: TotalSalesResponse;
    month: string
}

const TotalSalesChart: FC<TotalSalesChartProps> = ({totalSales, month}) => {
    return (
        <Card className={"col-span-1"}>
            <CardHeader>
                <CardTitle>Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart
                            data={totalSales.sales}
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
                    Total Revenue: Rp.{totalSales.totalRevenue.toLocaleString()}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total sales for {month}
                </div>
            </CardFooter>
        </Card>
    )
}

export default TotalSalesChart