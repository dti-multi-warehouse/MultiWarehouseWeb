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

const StockTable: FC = () => {
    const {data, isLoading, error} = useAllStocks()

    return (
        <Table className={"w-full overflow-hidden"}>
            <TableHeader>
                <TableRow>
                    <TableHead className={"max-md:hidden"}>#</TableHead>
                    <TableHead className={"max-md:hidden"}>Image</TableHead>
                    <TableHead className={"max-w-24"}>Name</TableHead>
                    <TableHead>In</TableHead>
                    <TableHead>Out</TableHead>
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
    return (
        <TableRow>
            <TableCell className={"max-md:hidden font-medium"}>{index}</TableCell>
            <TableCell className={"max-md:hidden"}>
                <Image src={thumbnail} alt={`thumbnail of ${name}`} width={60} height={60} />
            </TableCell>
            <TableCell className={"max-w-24"}>{name}</TableCell>
            <TableCell>{incoming}</TableCell>
            <TableCell>{outgoing}</TableCell>
            <TableCell>{stock}</TableCell>
        </TableRow>
    )
}