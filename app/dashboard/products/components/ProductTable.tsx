'use client'
import React, {FC, useState} from "react";
import {
    Table,
    TableBody,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Pencil, Trash2} from "lucide-react";
import useDashboardProducts from "@/hooks/useDashboardProducts";
import {DashboardProducts} from "@/types/product";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

const ProductTable: FC<{query: string}> = ({query}) => {
    const [page, setPage] = useState(0)
    const { data, isLoading, error } = useDashboardProducts(query, page)

    if (!data) {
        return <></>
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead className={"max-md:hidden"}>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.products.map( (product, index) => (
                    <ProductRow key={index} {...product} />
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>
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
                                            setPage((prev) => Math.min(prev + 1, data.totalPage - 1))
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

const ProductRow: FC<DashboardProducts> = ({id, name, price, thumbnail, category}) => {
    const router = useRouter()

    const handleEdit = () => {
        router.push("/dashboard/products/edit/" + id)
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell className={"max-md:hidden"}>
                <Image src={thumbnail} alt={`image of ${name}`} width={60} height={60} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{price}</TableCell>
        </TableRow>
    )
}

export default ProductTable