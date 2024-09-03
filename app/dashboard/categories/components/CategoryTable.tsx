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


const CategoryTable: FC = () => {
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
                <CategoryRow />
            </TableBody>
        </Table>

    )
}

const CategoryRow: FC = () => {
    return (
        <TableRow>
            <TableCell className="font-medium">1</TableCell>
            <TableCell>Micin</TableCell>
            <TableCell className="flex gap-4 justify-end">
                <CategoryDrawerDialog mode={'update'}>
                    <Pencil className={"cursor-pointer"} />
                </CategoryDrawerDialog>
                <Trash2 />
            </TableCell>
        </TableRow>
    )
}

export default CategoryTable