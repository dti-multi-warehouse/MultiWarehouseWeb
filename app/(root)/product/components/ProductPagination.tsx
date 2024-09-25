'use client'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {FC} from "react";
import {ReadonlyURLSearchParams} from "next/navigation";

interface ProductPaginationProps {
    currentPage: number
    totalPages: number
    params: ReadonlyURLSearchParams
}

const ProductPagination: FC<ProductPaginationProps> = ({currentPage, totalPages, params}) => {

    const query = Object.fromEntries(params.entries());
    return (
        <Pagination>
            <PaginationContent>
                {currentPage > 1 && (
                    <>
                        <PaginationItem>
                            <PaginationPrevious href={{
                                pathname: '/product',
                                query: {
                                    ...query,
                                    page: currentPage - 1
                                }
                            }} />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href={{
                                pathname: '/product',
                                query: {
                                    ...query,
                                    page: '1'
                                }
                            }}>
                                1
                            </PaginationLink>
                        </PaginationItem>
                    </>
                )}
                {currentPage > 2 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem>
                    <PaginationLink href="#" isActive>{currentPage}</PaginationLink>
                </PaginationItem>
                {
                    currentPage < totalPages - 1 && (
                        <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>
                    )
                }
                {
                    currentPage < totalPages && (
                        <>
                            <PaginationItem>
                                <PaginationLink href={{
                                    pathname: '/product',
                                    query: {
                                        page: totalPages
                                    }
                                }}>{totalPages}</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href={{
                                    pathname: '/product',
                                    query: {
                                        ...query,
                                        page: currentPage + 1
                                    }
                                }} />
                            </PaginationItem>
                        </>
                    )
                }
            </PaginationContent>
        </Pagination>
    )
}

export default ProductPagination;