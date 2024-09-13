'use client'
import {FC} from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Pencil, Trash2} from "lucide-react";
import CategoryDrawerDialog from "@/app/dashboard/categories/components/CategoryDrawerDialog";
import useCategories from "@/hooks/useCategories";
import axios from "axios";
import {config} from "@/constants/url";
import useDashboardProducts from "@/hooks/useDashboardProducts";
import {DashboardProducts} from "@/types/product";
import Image from "next/image";

const ProductTable: FC = () => {
    const { data, isLoading, error } = useDashboardProducts()

    console.log(data)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right w-60">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map( (product, index) => (
                    <ProductRow key={index} {...product} />
                ))}
            </TableBody>
        </Table>

    )
}

const ProductRow: FC<DashboardProducts> = ({id, name, price, thumbnail, category}) => {
    const handleDelete = () => {
        // axios.delete(config.BASE_URL + config.API_VER + config.endpoints.category + `/${id}`)
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>
                <Image src={thumbnail} alt={`image of ${name}`} width={60} height={60} />
            </TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{category}</TableCell>
            <TableCell>{price}</TableCell>
            <TableCell className="flex gap-4 justify-end">
                <Trash2 onClick={handleDelete}/>
            </TableCell>
        </TableRow>
    )
}

export default ProductTable