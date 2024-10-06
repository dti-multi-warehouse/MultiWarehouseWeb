import React from "react";
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
import PaymentStatus from "../PaymentStatus";

const OrderTable: React.FC = () => {
  return (
    <>
      <Table className="border rounded-xl">
        <TableCaption>A list of warehouses.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Warehouse</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {orderlist.map((order, index) => (

          <TableRow key={order.id}>
            <TableCell className="font-medium">#{order.id}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>{order.Address}</TableCell>
            <TableCell>{order.date}</TableCell>
            <TableCell>{order.warehouse}</TableCell>
            <TableCell className="text-right">
              <PaymentStatus />
            </TableCell>
          </TableRow>
            ))}
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
