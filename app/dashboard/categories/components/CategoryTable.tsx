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

const CategoryTable: FC = () => {
    const { data, isLoading, error } = useCategories()

    console.log(data)
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right w-60">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map( category => (
                    <CategoryRow
                        key={category.id}
                        id={category.id}
                        name={category.name}
                    />)
                )}
            </TableBody>
        </Table>

    )
}

interface CategoryRowProps {
    id: number,
    name: string
}

const CategoryRow: FC<CategoryRowProps> = ({ id, name }) => {
    const handleDelete = () => {
        axios.delete(config.BASE_URL + config.endpoints.category + `/${id}`)
    }
    return (
        <TableRow>
            <TableCell className="font-medium">{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell className="flex gap-4 justify-end">
                <CategoryDrawerDialog mode={'update'} id={id}>
                    <Pencil className={"cursor-pointer"} />
                </CategoryDrawerDialog>
                <Trash2 onClick={handleDelete}/>
            </TableCell>
        </TableRow>
    )
}

export default CategoryTable