'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {FC} from "react";
import {Stock} from "@/types/datatypes";
import useAllStocks from "@/hooks/useAllStocks";
import Image from "next/image";
import useDashboardStore from "@/hooks/useDashboardStore";

const StockTable: FC = () => {
    const {data, isLoading, error} = useAllStocks()

    return (
        <Table className={"overflow-hidden"}>
            <TableHeader>
                <TableRow>
                    <TableHead className={"w-12 max-md:hidden"}>#</TableHead>
                    <TableHead className={"w-20 max-md:hidden"}>Image</TableHead>
                    <TableHead className={"max-w-24"}>Name</TableHead>
                    <TableHead className={"text-green-600"}>In</TableHead>
                    <TableHead className={"text-red-600"}>Out</TableHead>
                    <TableHead>Stock</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((stock, index) => <StockRow key={index} {...stock} index={index + 1} />)}
            </TableBody>
        </Table>
    )
}

export default StockTable;

interface StockRowProps extends Stock {
    index: number;
}

const StockRow: FC<StockRowProps> = ({id, thumbnail, name, incoming, outgoing, stock, index}) => {
    const setProductId = useDashboardStore(state => state.setProduct)
    return (
        <TableRow onClick={() => setProductId({id, name, stock})}>
            <TableCell className={"max-md:hidden w-12 font-medium"}>{index}</TableCell>
            <TableCell className={"max-md:hidden w-20"}>
                <Image src={thumbnail} alt={`thumbnail of ${name}`} width={60} height={60} />
            </TableCell>
            <TableCell className={"max-w-24"}>{name}</TableCell>
            <TableCell className={"text-green-600"}>{incoming}</TableCell>
            <TableCell className={"text-red-600"}>{outgoing}</TableCell>
            <TableCell>{stock}</TableCell>
        </TableRow>
    )
}