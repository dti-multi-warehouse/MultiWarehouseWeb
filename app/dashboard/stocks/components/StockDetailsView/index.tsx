'use client'
import {FC} from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import useStockDetails from "@/hooks/useStockDetails";
import {ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon} from "lucide-react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {StockDetails} from "@/types/datatypes";
import useDashboardStore from "@/hooks/useDashboardStore";
import StockMovementsChart from "@/app/dashboard/stocks/components/StockDetailsView/StockChart";
import useMediaQuery from "@/hooks/useMediaQuery";


const StockDetailsView: FC = () => {
    const warehouse = useDashboardStore( state => state.warehouse)
    const product = useDashboardStore( state => state.product)
    const date = useDashboardStore(state => state.date)
    const {data, isLoading, error} = useStockDetails(warehouse.id, product.id, date)
    const isDesktop = useMediaQuery("(min-width: 1024px)")
    const isStockDrawerOpen = useDashboardStore(state => state.isStockDrawerOpen)
    const setIsStockDrawerOpen = useDashboardStore(state => state.setIsStockDrawerOpen)

    if (!isDesktop) {
        return (
            <Drawer open={isStockDrawerOpen} onOpenChange={setIsStockDrawerOpen}>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle className={"hidden"}>{product.name} Stock Movements</DrawerTitle>
                        <DrawerDescription className={"hidden"}>The movements of {product.name} stock</DrawerDescription>
                        <StockMovementsChart chartData={data?.stockMovementChartData} />
                    </DrawerHeader>
                    <ScrollArea className="h-[40vh] px-4">
                        {data?.stockMovements && data.stockMovements.length > 0
                            ? data.stockMovements.map((details, index) => <StockDetailsCard key={index} {...details} />)
                            : <h1>This is product has no movement during this time period!</h1>
                        }
                    </ScrollArea>
                </DrawerContent>
            </Drawer>
        )
    }

    return (
        <section className={"col-span-1 space-y-2"}>
            <StockMovementsChart chartData={data?.stockMovementChartData} />
            <div className={"flex flex-col gap-2"}>
                {data?.stockMovements && data.stockMovements.length > 0
                    ? data.stockMovements.map((details, index) => <StockDetailsCard key={index} {...details} />)
                    : <h1>This is product has no movement during this time period!</h1>
                }
            </div>
        </section>
    )
}

export default StockDetailsView

const StockDetailsCard: FC<StockDetails> = ({date, source, note , quantity}) => {
    const color = {
        order: 'bg-red-500',
        restock: 'bg-green-500',
        mutation_in: 'bg-blue-500',
        mutation_out: 'bg-yellow-500',
    }[source]

    const Icon = {
        order: ArrowDownIcon,
        restock: ArrowUpIcon,
        mutation_in: ArrowRightIcon,
        mutation_out: ArrowLeftIcon,
    }[source]

    const addendum = {
        order: 'Order Id',
        restock: '',
        mutation_in: 'From warehouse',
        mutation_out: 'To warehouse'
    }[source]

    return (
        <Card className={"relative w-full"}>
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${color}`} />
            <CardHeader className={"flex flex-row items-center space-x-4 pb-2"}>
                <div className={`p-2 rounded-full ${color}`}>
                    <Icon className={"h-4 w-4 text-white"} />
                </div>
                <div>
                    <CardTitle className={"text-lg"}>
                        {source.charAt(0).toUpperCase() + source.slice(1).replace('_', ' ')}
                    </CardTitle>
                    <p className={"text-sm text-muted-foreground"}>
                        {date.toLocaleString().split('T')[0]}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <div className={"flex justify-between items-center"}>
                    <div>
                        <p className={"text-lg font-semibold"}>
                            Quantity: {quantity}
                        </p>
                        <p className={"text-sm text-muted-foreground"}>{addendum}: {note}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}