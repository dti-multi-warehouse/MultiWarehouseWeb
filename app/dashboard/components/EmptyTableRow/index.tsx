import {FC} from "react";
import {TableCell, TableRow} from "@/components/ui/table";


const EmptyTableRow: FC<{col: number}> = ({col}) => {
    return (
        <TableRow>
            <TableCell className={"text-center text-red-500"} colSpan={col}>There is no data to be displayed</TableCell>
        </TableRow>
    )
}

export default EmptyTableRow