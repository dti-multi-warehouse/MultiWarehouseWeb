"use client"

import {FC} from "react";
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
import useDashboardStore from "@/stores/useDashboardStore";
import {StockMovementChartData} from "@/types/datatypes";
import {Skeleton} from "@/components/ui/skeleton";

// const chartData = [
//     { date: '2023-01', restock: 100, mutationIn: 20, mutationOut: 30, order: 50 },
//     { date: '2023-02', restock: 80, mutationIn: 25, mutationOut: 20, order: 60 },
//     { date: '2023-03', restock: 120, mutationIn: 30, mutationOut: 25, order: 70 },
//     { date: '2023-04', restock: 90, mutationIn: 35, mutationOut: 35, order: 55 },
//     { date: '2023-05', restock: 110, mutationIn: 40, mutationOut: 30, order: 65 },
// ]

const chartConfig = {
    restock: {
        label: "Restock",
        color: "rgb(34, 197, 94)",
    },
    mutationIn: {
        label: "Mutation In",
        color: "rgb(59, 130, 246)",
    },
    mutationOut: {
        label: "Mutation Out",
        color: "rgb(234, 179, 8)",
    },
    order: {
        label: "Order",
        color: "rgb(239, 68, 68)",
    },
} satisfies ChartConfig

interface StockMovementsChartProps {
    chartData: StockMovementChartData[] | undefined;
    isLoading: boolean
}

const StockMovementsChart:FC<StockMovementsChartProps> = ({chartData, isLoading}) => {
    const product = useDashboardStore(state => state.product)

    if (isLoading) {
        return (
            <Card className={"shadow-none lg:border-none max-lg:max-h-80"}>
                <CardHeader className={"max-lg:px-0"}>
                    <Skeleton className={"w-48 lg:w-96 h-6"} />
                    <Skeleton className={"w-24 lg:w-48 h-4"} />
                </CardHeader>
                <Skeleton className={"w-full h-96 max-lg:h-40"} />
            </Card>
        )
    }

    if (!chartData) {
        return <></>
    }

    return (
        <Card className={"shadow-none lg:border-none max-lg:max-h-80"}>
            <CardHeader className={"max-lg:px-0"}>
                <CardTitle>{product.name} Movements</CardTitle>
                <p className={"text-gray-500"}>{product.stock} currently in stock</p>
            </CardHeader>
            {chartData.length > 0 && (
                <CardContent className={"max-lg:p-0"}>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="period"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={value => `Week ${value}`} // Show only month
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="dot" />}
                            />
                            <Area
                                dataKey="restock"
                                type="monotone"
                                fill="var(--color-restock)"
                                fillOpacity={0.4}
                                stroke="var(--color-restock)"
                                stackId="1"
                            />
                            <Area
                                dataKey="mutationIn"
                                type="monotone"
                                fill="var(--color-mutationIn)"
                                fillOpacity={0.4}
                                stroke="var(--color-mutationIn)"
                                stackId="1"
                            />
                            <Area
                                dataKey="mutationOut"
                                type="monotone"
                                fill="var(--color-mutationOut)"
                                fillOpacity={0.4}
                                stroke="var(--color-mutationOut)"
                                stackId="2"
                            />
                            <Area
                                dataKey="order"
                                type="monotone"
                                fill="var(--color-order)"
                                fillOpacity={0.4}
                                stroke="var(--color-order)"
                                stackId="2"
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            )}
        </Card>
    )
}

export default StockMovementsChart