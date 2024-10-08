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

const ProductTable: FC<{query: string}> = ({query}) => {
    const { data, isLoading, error } = useDashboardProducts()

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
                {data?.map( (product, index) => (
                    <ProductRow key={index} {...product} />
                ))}
            </TableBody>
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