import React, {FC} from "react";
import OrderDrawerDialog from "@/app/dashboard/orders/components/OrderTable/OrderDrawerDialog";
import {TableCell, TableRow} from "@/components/ui/table";
import {Order} from "@/types/order";
import StatusBadge from "app/dashboard/orders/components/OrderTable/StatusBadge";


const OrderTableRow: FC<Order> = (order) => {
    return (
        <OrderDrawerDialog {...order}>
            <TableRow className={"text-center hover:cursor-pointer"}>
                <TableCell className="font-medium">#{order.id}</TableCell>
                <TableCell className={"max-md:hidden"}>{order.email}</TableCell>
                <TableCell className={"max-lg:hidden"}>{order.phoneNumber}</TableCell>
                <TableCell className={"max-md:hidden"}>{order.street}, {order.city}, {order.province}</TableCell>
                <TableCell className={"w-[250px]"}>{order.createdAt.toLocaleString().split('T')[0]} {order.createdAt.toLocaleString().split('T')[1].split(".")[0]}</TableCell>
                <TableCell className={"max-lg:hidden"}>Rp.{order.price.toLocaleString()}</TableCell>
                <TableCell>
                    <StatusBadge status={order.status} />
                </TableCell>
            </TableRow>
        </OrderDrawerDialog>
    )
}

export default OrderTableRow