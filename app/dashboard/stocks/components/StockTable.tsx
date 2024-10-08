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
import {Stock} from "@/types/datatypes";
import useAllStocks from "@/hooks/useAllStocks";
import Image from "next/image";
import useDashboardStore from "@/hooks/useDashboardStore";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const StockTable: FC<{query: string}> = ({query}) => {
    const [page, setPage] = useState(0);
    const warehouse = useDashboardStore(state => state.warehouse)
    const date = useDashboardStore(state => state.date)
    const {data, isLoading, error} = useAllStocks(warehouse.id, date, query, page, 10)

    if (!data) {
        return <></>
    }
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
                {data.stocks.map((stock, index) => <StockRow key={index} {...stock}/>)}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={7}>
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                                    />
                                </PaginationItem>
                                {Array.from({ length: data.totalPage }).map((_, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href="#"
                                            onClick={() => setPage(index)}
                                        >
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}
                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={() =>
                                            setPage((prev) => Math.min(prev + 1, data?.totalPage - 1))
                                        }
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default StockTable;

const StockRow: FC<Stock> = ({id, thumbnail, name, incoming, outgoing, stock}) => {
    const setProductId = useDashboardStore(state => state.setProduct)
    const  setIsStockDrawerOpen = useDashboardStore(state => state.setIsStockDrawerOpen)

    const handleClick = () => {
        setProductId({id, name, stock})
        setIsStockDrawerOpen(true)
    }
    return (
        <TableRow onClick={handleClick} className={"hover:cursor-pointer"}>
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