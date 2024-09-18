'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {FC} from "react";
import {Pencil, Trash2} from "lucide-react";
import {Stock} from "@/types/datatypes";
import useAllStocks from "@/hooks/useAllStocks";
import {ID} from "postcss-selector-parser";
import Image from "next/image";

const StockTable: FC = () => {
    const {data, isLoading, error} = useAllStocks()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Warehouse</TableHead>
                    <TableHead>In Stock</TableHead>
                    <TableHead className={"text-right"}>Action</TableHead>
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
            <TableCell>{warehouseId}</TableCell>
            <TableCell>{stock}</TableCell>
            <TableCell className="flex gap-4 justify-end">
                <Trash2 onClick={() => {}}/>
            </TableCell>
        </TableRow>
    )
}