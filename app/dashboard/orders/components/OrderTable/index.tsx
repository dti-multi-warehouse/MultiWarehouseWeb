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
import {useAdminOrder} from "@/hooks/useOrder";
import EmptyTableRow from "app/dashboard/components/EmptyTableRow";
import SkeletonTableRow from "app/dashboard/components/SkeletonTableRow";
import TablePagination from "@/app/dashboard/components/TablePagination";

const OrderTable: React.FC = () => {
  const warehouse = useDashboardStore(state => state.warehouse)
  const [page, setPage] = useState<number>(0)
  const {data, isLoading, error} = useAdminOrder(warehouse.id, page)

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
          {isLoading && <SkeletonTableRow col={7} />}
          {!data && !isLoading && <EmptyTableRow col={7} />}
          {data && data.orders.map( order => <OrderTableRow key={order.id} {...order} />)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
              {data && <TablePagination totalPage={data.totalPage} setPage={setPage} page={page} />}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderTable;
