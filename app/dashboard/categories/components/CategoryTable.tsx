'use client'
import {FC} from "react";
import {
    Table,
    TableBody, TableCaption,
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

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
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
    return (
        <CategoryDrawerDialog mode={'update'} id={id}>
            <TableCaption>Click on the category row to edit a category</TableCaption>
            <TableRow className={"hover:cursor-pointer"}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{name}</TableCell>
            </TableRow>
        </CategoryDrawerDialog>
    )
}

export default CategoryTable