'use client'
import React, {useState} from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useDashboardStore from "@/stores/useDashboardStore";
import OrderTableRow from "@/app/dashboard/orders/components/OrderTable/OrderTableRow";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink, PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {useAdminOrder} from "@/hooks/useOrder";

const OrderTable: React.FC = () => {
  const warehouse = useDashboardStore(state => state.warehouse)
  const [page, setPage] = useState<number>(0)
  const {data, isLoading, error} = useAdminOrder(warehouse.id, page)

  if (!data) return null;

  return (
    <>
      <Table className="border rounded-xl">
        <TableCaption>Click on an order row to view the details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px] text-center">ID</TableHead>
            <TableHead className={"max-md:hidden text-center"}>Email</TableHead>
            <TableHead className={"max-lg:hidden text-center"}>Phone</TableHead>
            <TableHead className={"max-md:hidden text-center"}>Shipping Address</TableHead>
            <TableHead className={"w-[250px] text-center"}>Time</TableHead>
            <TableHead className={"max-lg:hidden text-center"}>Value</TableHead>
            <TableHead className={"text-center"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map( order => <OrderTableRow key={order.id} {...order} />)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                        href="#"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    />
                  </PaginationItem>
                  {Array.from({ length: data.totalPage }).map((_, index) => (
                      <PaginationItem key={index}>
                        <PaginationLink
                            href="#"
                            onClick={() => setPage(index)}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                        href="#"
                        onClick={() =>
                            setPage((prev) => Math.min(prev + 1, data.totalPage - 1))
                        }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderTable;
