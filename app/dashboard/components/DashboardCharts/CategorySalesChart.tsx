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
import {CategorySalesResponse} from "@/types/dashboard";

const chartConfig = {
    Beverages: {
        label: "Beverages",
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig

interface CategorySalesChartProps {
    categorySales: CategorySalesResponse[]
    month: string
}

const CategorySalesChart: FC<CategorySalesChartProps> = ({categorySales, month}) => {
    return (
        <Card className="col-span-1 flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Category Sales</CardTitle>
                <CardDescription>{month}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[450px]"
                >
                    <PieChart>
                        <Pie data={categorySales} dataKey="revenue" />
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