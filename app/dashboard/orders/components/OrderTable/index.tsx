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
import { orderlist } from "@/data/data";
import useDashboardStore from "@/hooks/useDashboardStore";
import useAdminOrder from "@/hooks/order/useAdminOrder";
import OrderTableRow from "@/app/dashboard/orders/components/OrderTable/OrderTableRow";

const OrderTable: React.FC = () => {
  const warehouse = useDashboardStore(state => state.warehouse)
  const [page, setPage] = useState(0);
  const {data, isLoading, error} = useAdminOrder(warehouse.id, page)

  if (!data) return null;

  return (
    <>
      <Table className="border rounded-xl">
        <TableCaption>Click on an order row to view the details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            {/*<TableHead>Name</TableHead>*/}
            {/*<TableHead>Address</TableHead>*/}
            <TableHead className={"w-[150px]"}>Date</TableHead>
            <TableHead className={"text-center"}>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.orders.map( order => <OrderTableRow key={order.id} {...order} />)}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={7}>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};

export default OrderTable;
