'use client'
import React, {FC, useState} from "react";
import {
    Table,
    TableBody, TableCaption,
    TableCell, TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {DashboardProducts} from "@/types/product";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useDashboardProducts} from "@/hooks/useProducts";
import SkeletonTableRow from "app/dashboard/components/SkeletonTableRow";
import EmptyTableRow from "app/dashboard/components/EmptyTableRow";
import TablePagination from "@/app/dashboard/components/TablePagination";
import useDashboardStore from "@/stores/useDashboardStore";

const ProductTable: FC<{query: string}> = ({query}) => {
    const [page, setPage] = useState(0)
    const { data, isLoading, error } = useDashboardProducts(query, page)
    const isAdmin = useDashboardStore(state => state.isAdmin)

    return (
        <Table>
            {isAdmin && <TableCaption>Click on the product row to edit a product</TableCaption>}
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
                {isLoading && <SkeletonTableRow col={5} />}
                {!data && !isLoading && <EmptyTableRow col={5} />}
                {data && data.products.map( (product, index) => (
                    <ProductRow key={index} {...product} />
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5}>
                        {data && <TablePagination totalPage={data.totalPage} page={page} setPage={setPage} />}
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>

    )
}

const ProductRow: FC<DashboardProducts> = ({id, name, price, thumbnail, category}) => {
    const router = useRouter()
    const isAdmin = useDashboardStore(state => state.isAdmin)

    const handleEdit = () => {
        if (isAdmin) {
            router.push("/dashboard/products/edit/" + id)
        }
    }
    return (
        <TableRow onClick={handleEdit} className={isAdmin ? "hover:cursor-pointer" : ""}>
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