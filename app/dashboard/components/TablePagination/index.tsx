import React, {Dispatch, FC} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";

interface TablePaginationProps {
    totalPage: number;
    page: number;
    setPage: Dispatch<React.SetStateAction<number>>;
}

const TablePagination: FC<TablePaginationProps> = ({totalPage, page , setPage}) => {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    />
                </PaginationItem>
                {Array.from({ length: totalPage }).map((_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            onClick={() => setPage(index)}
                            className={page === index ? "scale-110 font-bold" : ""}
                        >
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, totalPage - 1))
                        }
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}

export default TablePagination