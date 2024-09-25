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
        <Table className={"w-full"}>
            <TableHeader>
                <TableRow>
                    <TableHead className="">#</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>In Stock</TableHead>
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

const StockRow: FC<StockRowProps> = ({id, thumbnail, name, warehouseId, stock, index}) => {
    return (
        <TableRow>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>
                <Image src={thumbnail} alt={`thumbnail of ${name}`} width={60} height={60} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{stock}</TableCell>
        </TableRow>
    )
}