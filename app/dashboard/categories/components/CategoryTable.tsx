'use client'
import React, {FC} from "react";
import {
    Table,
    TableBody, TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import CategoryDrawerDialog from "@/app/dashboard/categories/components/CategoryDrawerDialog";
import {useCategories} from "@/hooks/useCategories";
import SkeletonTableRow from "@/components/SkeletonTableRow";
import EmptyTableRow from "@/components/EmptyTableRow";

const CategoryTable: FC = () => {
    const { data, isLoading, error } = useCategories()

    return (
        <Table>
            <TableCaption>Click on the category row to edit a category</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">#</TableHead>
                    <TableHead>Name</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading && <SkeletonTableRow col={2} />}
                {!data && !isLoading && <EmptyTableRow col={2} />}
                {data && data.map( category => (
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
            <TableRow className={"hover:cursor-pointer"}>
                <TableCell className="font-medium">{id}</TableCell>
                <TableCell>{name}</TableCell>
            </TableRow>
        </CategoryDrawerDialog>
    )
}

export default CategoryTable