import {FC} from "react";
import {TableCell, TableRow} from "@/components/ui/table";
import {Skeleton} from "@/components/ui/skeleton";


const SkeletonTableRow: FC<{col: number}> = ({col}) => {
    return (
        <>
            {[...Array(10)].map((_, index) => (
                <SkeletonRow col={col} key={index} />
            ))}
        </>
    )
}

export default SkeletonTableRow

const SkeletonRow: FC<{col : number}> = ({col}) => {
    return (
        <TableRow>
            {[...Array(col)].map((_, index) => (
                <TableCell key={index}><Skeleton  className={"w-full h-full p-2"}/></TableCell>
            ))}
        </TableRow>
    )
}