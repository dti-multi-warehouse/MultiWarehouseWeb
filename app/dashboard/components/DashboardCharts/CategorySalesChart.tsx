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
import {CategorySales} from "@/types/dashboard";

const chartConfig = {
    Drinks: {
        label: "Drinks",
        color: "hsl(var(--chart-1))",
    },
    Food: {
        label: "Food",
        color: "hsl(var(--chart-2))",
    },
    Spices: {
        label: "Spices",
        color: "hsl(var(--chart-3))",
    },
    Seasonings: {
        label: "Seasonings",
        color: "hsl(var(--chart-3))",
    },
    Organics: {
        label: "Organics",
        color: "hsl(var(--chart-4))",
    },

} satisfies ChartConfig

interface CategorySalesChartProps {
    categorySales: CategorySales[]
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
                            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center text-lg"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default CategorySalesChart