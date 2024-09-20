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
import useDashboardProducts from "@/hooks/useDashboardProducts";
import {DashboardProducts} from "@/types/product";
import Image from "next/image";
import {useRouter} from "next/navigation";

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
    const router = useRouter()

    const handleDelete = () => {
        // axios.delete(config.BASE_URL + config.API_VER + config.endpoints.category + `/${id}`)
    }

    const handleEdit = () => {
        router.push("/dashboard/products/edit/" + id)
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
                <Pencil onClick={handleEdit}/>
                <Trash2 onClick={handleDelete}/>
            </TableCell>
        </TableRow>
    )
}

export default ProductTable