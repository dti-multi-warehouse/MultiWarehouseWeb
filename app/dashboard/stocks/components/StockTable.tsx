'use client'
import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import React, {FC, useState} from "react";
import Image from "next/image";
import useDashboardStore from "@/stores/useDashboardStore";
import {useAllStocks} from "@/hooks/useStock";
import SkeletonTableRow from "app/dashboard/components/SkeletonTableRow";
import EmptyTableRow from "app/dashboard/components/EmptyTableRow";
import TablePagination from "@/app/dashboard/components/TablePagination";
import {Stock} from "@/types/Stock";
import {clsx} from "clsx";

const StockTable: FC<{query: string}> = ({query}) => {
    const [page, setPage] = useState(0);
    const warehouse = useDashboardStore(state => state.warehouse)
    const date = useDashboardStore(state => state.date)
    const {data, isLoading, error} = useAllStocks(warehouse.id, date, query, page, 10)

    return (
        <Table className={"overflow-hidden"}>
            <TableHeader>
                <TableRow>
                    <TableHead className={"w-12 max-md:hidden"}>Id</TableHead>
                    <TableHead className={"w-20 max-md:hidden"}>Image</TableHead>
                    <TableHead className={"max-w-24"}>Name</TableHead>
                    <TableHead className={"text-green-600"}>In</TableHead>
                    <TableHead className={"text-red-600"}>Out</TableHead>
                    <TableHead>In Stock</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && <SkeletonTableRow col={6} />}
                {!data && !isLoading && <EmptyTableRow col={6} />}
                {data && data.stocks.map((stock, index) => <StockRow key={index} {...stock}/>)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={6}>
                        {data && <TablePagination totalPage={data.totalPage} page={page} setPage={setPage} />}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default StockTable;

const StockRow: FC<Stock> = ({id, thumbnail, name, incoming, outgoing, stock, deletedAt}) => {
    const setProductId = useDashboardStore(state => state.setProduct)
    const  setIsStockDrawerOpen = useDashboardStore(state => state.setIsStockDrawerOpen)

    const handleClick = () => {
        setProductId({id, name, stock})
        setIsStockDrawerOpen(true)
    }
    return (
        <TableRow onClick={handleClick} className={clsx("hover:cursor-pointer", deletedAt && "bg-gray-600/50")}>
            <TableCell className={"max-md:hidden w-12 font-medium"}>{id}</TableCell>
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