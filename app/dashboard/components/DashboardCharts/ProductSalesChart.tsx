import {FC} from "react";
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {ProductSalesResponse} from "@/types/dashboard";

interface ProductSalesChartProps {
    productSales: ProductSalesResponse[];
    month: string
}

const ProductSalesChart: FC<ProductSalesChartProps> = ({productSales, month}) => {
    return (
        <Card className={"col-span-2"}>
            <CardHeader>
                <CardTitle>Product Sales</CardTitle>
                <CardDescription>{month}</CardDescription>
            </CardHeader>
            <CardContent className={"h-96"}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={productSales}
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
                    Showing total visitors for {month}
                </div>
            </CardFooter>
        </Card>
    )
}

export default ProductSalesChart